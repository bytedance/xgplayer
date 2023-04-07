function X2JS () {
  function xml_str2json (xmlDocStr) { // eslint-disable-line
    const xmlDoc = parseXmlString(xmlDocStr)
    if (!xmlDoc) { return parseDOMChildren(xmlDoc) } else { return null }
  }

  function parseXmlString (xmlDocStr) {
    if (xmlDocStr === undefined) {
      return null
    }
    let xmlDoc
    if (window.DOMParser) {
      const parser = new window.DOMParser()
      try {
        xmlDoc = parser.parseFromString(xmlDocStr, 'text/xml')
        if (xmlDoc.getElementsByTagNameNS('*', 'parsererror').length > 0) {
          xmlDoc = null
        }
      } catch (err) {
        xmlDoc = null
      }
    } else {
      // IE :(
      if (xmlDocStr.indexOf('<?') === 0) {
        xmlDocStr = xmlDocStr.substr(xmlDocStr.indexOf('?>') + 2)
      }
      xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM')
      xmlDoc.async = 'false'
      xmlDoc.loadXML(xmlDocStr)
    }
    return xmlDoc
  }

  const DOMNodeTypes = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9
  }

  function parseDOMChildren (node, path) {
    if (node.nodeType === DOMNodeTypes.DOCUMENT_NODE) {
      let result = {}
      const nodeChildren = node.childNodes
      // Alternative for firstElementChild which is not supported in some environments
      for (let cidx = 0; cidx < nodeChildren.length; cidx++) {
        const child = nodeChildren[cidx]
        if (child.nodeType === DOMNodeTypes.ELEMENT_NODE) {
          result = parseDOMChildren(child)
        }
      }
      return result
    } else if (node.nodeType === DOMNodeTypes.ELEMENT_NODE) {
      let result = {}
      result.__cnt = 0

      const children = []
      const nodeChildren = node.childNodes

      // Children nodes
      for (let cidx = 0; cidx < nodeChildren.length; cidx++) {
        const child = nodeChildren[cidx]
        const childName = getNodeLocalName(child)

        if (child.nodeType !== DOMNodeTypes.COMMENT_NODE) {
          const childPath = path + '.' + childName
          result.__cnt++
          if (!result[childName]) {
            const c = parseDOMChildren(child, childPath)
            if (childName !== '#text' || /[^\s]/.test(c)) {
              const o = {}
              o[childName] = c
              children.push(o)
            }
            result[childName] = c
            toArrayAccessForm(result, childName)
          } else {
            if (!(result[childName] instanceof Array)) {
              result[childName] = [result[childName]]
              toArrayAccessForm(result, childName, childPath)
            }

            const c = parseDOMChildren(child, childPath)
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
      if (nodePrefix && nodePrefix !== '') {
        result.__cnt++
        result.__prefix = nodePrefix
      }

      if (result['#text'] !== null) {
        result.__text = result['#text']
        if (result.__text instanceof Array) {
          result.__text = result.__text.join('\n')
        }
        // if(config.escapeMode)
        // result.__text = unescapeXmlChars(result.__text);
        delete result['#text']
        delete result['#text_asArray']
      }
      if (result['#cdata-section'] !== null) {
        result.__cdata = result['#cdata-section']
        delete result['#cdata-section']
        delete result['#cdata-section_asArray']
      }

      if (result.__cnt === 1 && result.__text !== null) {
        result = result.__text
      } else if (result.__cnt === 1 && result.__cdata !== null) {
        result = result.__cdata
      }
      delete result.__cnt

      return result
    } else if (node.nodeType === DOMNodeTypes.TEXT_NODE || node.nodeType === DOMNodeTypes.CDATA_SECTION_NODE) {
      return node.nodeValue
    }
  }

  function getNodeLocalName (node) {
    let nodeLocalName = node.localName
    if (nodeLocalName === null) { nodeLocalName = node.baseName } // Yeah, this is IE!!
    if (nodeLocalName === null || nodeLocalName === '') { nodeLocalName = node.nodeName } // =="" is IE too
    return nodeLocalName
  }

  function toArrayAccessForm (obj, childName) {
    if (!(obj[childName] instanceof Array)) {
      obj[childName] = [obj[childName]]
    }
  }

  return {
    xml_str2json
  }
}

export default new X2JS()
