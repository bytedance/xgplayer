
export default class Xml2Json {
  static parse (xmlDocStr) {
    const xmlDoc = Xml2Json.parseXmlString(xmlDocStr)
    if (xmlDoc != null) { return Xml2Json.parseDOMChildren(xmlDoc) } else { return null }
  }

  static parseXmlString (xmlDocStr) {
    if (xmlDocStr === undefined) {
      return null
    }
    let xmlDoc

    const parser = new window.DOMParser() // IE9+ 不需要处理IE10以下
    try {
      xmlDoc = parser.parseFromString(xmlDocStr, 'text/xml')
      if (xmlDoc.getElementsByTagNameNS('*', 'parsererror').length > 0) {
        xmlDoc = null
      }
    } catch (err) {
      xmlDoc = null
    }
    return xmlDoc
  }

  static parseDOMChildren (node, path) {
    if (node.nodeType === Node.DOCUMENT_NODE) {
      let result = {}
      const nodeChildren = node.childNodes
      // Alternative for firstElementChild which is not supported in some environments
      for (let cidx = 0; cidx < nodeChildren.length; cidx++) {
        const child = nodeChildren[cidx]
        if (child.nodeType === Node.ELEMENT_NODE) {
          result = Xml2Json.parseDOMChildren(child)
        }
      }
      return result
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      let result = {}
      result.__cnt = 0

      const children = []
      const nodeChildren = node.childNodes

      // Children nodes
      for (let cidx = 0; cidx < nodeChildren.length; cidx++) {
        const child = nodeChildren[cidx]
        const childName = Xml2Json.getNodeLocalName(child)

        if (child.nodeType !== Node.COMMENT_NODE) {
          const childPath = path + '.' + childName
          result.__cnt++
          if (result[childName] == null) {
            const c = Xml2Json.parseDOMChildren(child, childPath)
            if (childName !== '#text' || /[^\s]/.test(c)) {
              const o = {}
              o[childName] = c
              children.push(o)
            }
            result[childName] = c
            Xml2Json.toArrayAccessForm(result, childName)
          } else {
            if (result[childName] != null) {
              if (!(result[childName] instanceof Array)) {
                result[childName] = [result[childName]]
                Xml2Json.toArrayAccessForm(result, childName, childPath)
              }
            }

            const c = Xml2Json.parseDOMChildren(child, childPath)
            if (childName !== '#text' || /[^\s]/.test(c)) { // Don't add white-space text nodes
              const o = {}
              o[childName] = c
              children.push(o)
            }
            (result[childName])[result[childName].length] = c
          }
        }
      }

      // Attributes
      for (let aidx = 0; aidx < node.attributes.length; aidx++) {
        const attr = node.attributes[aidx]
        result.__cnt++

        const value2 = attr.value
        result[attr.name] = value2
      }

      // Node namespace prefix
      const nodePrefix = node.prefix
      if (nodePrefix != null && nodePrefix !== '') {
        result.__cnt++
        result.__prefix = nodePrefix
      }

      if (result['#text'] != null) {
        result.__text = result['#text']
        if (result.__text instanceof Array) {
          result.__text = result.__text.join('\n')
        }
        // if(config.escapeMode)
        // result.__text = unescapeXmlChars(result.__text);
        delete result['#text']
        delete result['#text_asArray']
      }
      if (result['#cdata-section'] != null) {
        result.__cdata = result['#cdata-section']
        delete result['#cdata-section']
        delete result['#cdata-section_asArray']
      }

      if (result.__cnt === 1 && result.__text != null) {
        result = result.__text
      } else if (result.__cnt === 1 && result.__cdata != null) {
        result = result.__cdata
      }
      delete result.__cnt

      return result
    } else if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.CDATA_SECTION_NODE) {
      return node.nodeValue
    }
  }

  static getNodeLocalName (node) {
    let nodeLocalName = node.localName
    if (nodeLocalName == null) { nodeLocalName = node.baseName } // Yeah, this is IE!!
    if (nodeLocalName == null || nodeLocalName === '') { nodeLocalName = node.nodeName } // =="" is IE too
    return nodeLocalName
  }

  static toArrayAccessForm (obj, childName) {
    if (!(obj[childName] instanceof Array)) {
      obj[childName] = [obj[childName]]
    }
  }
}
