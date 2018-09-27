function Compile (el, templateDescriptor, model, options) {
  this.model = model
  this.$vm = Object.assign({}, model.data, model.methods, options.inject)
  this.$el = document.querySelector(el)
  if (this.$el) {
    this.$fragment = this.node2Fragment()
    this.init(templateDescriptor)
    this.$el.appendChild(this.$fragment)
  }
}

function createElement (tag, data, childrens = []) {
  const dom = document.createElement(tag)

  const attrs = (data && data.attrs) ? data.attrs : {}
  Object.keys(attrs).forEach((attr) => {
    dom.setAttribute(attr, data.attrs[attr])
  })

  if (data && (data.class || data.staticClass)) {
    dom.setAttribute('class', ((data.class ? data.class : ' ') + ' ' + (data.staticClass ? data.staticClass : ' ')).trim())
  }

  childrens && childrens.forEach((child) => {
    dom.appendChild(child)
  })
  return dom
}

Compile.prototype = {
  node2Fragment: function () {
    var fragment = document.createDocumentFragment()

    return fragment
  },

  init: function (templateDescriptor) {
    this.$vm.ast = templateDescriptor.ast
    this.$vm.render = new Function(templateDescriptor.render)
    this.$vm._c = createElement
    this.$vm._e = document.createComment.bind(document, '')
    // this.$vm._v = document.createTextNode;
    this.$vm._v = document.createTextNode.bind(document)
    this.$vm._s = (str) => {
      return `${str.toString()}`
    }
    let res = this.$vm.render()
    this.$fragment.appendChild(res)
    this.compileElement(this.$fragment, [this.$vm.ast])
    this.model.mounted.call(this.$vm)
  },

  compileElement: function (el, ast) {
    var childNodes = el.childNodes;
    [].slice.call(childNodes).forEach((node, index) => {
      if (this.isElementNode(node) || this.isTextNode(node)) {
        this.compile(node, ast[index])
      }

      if (node.childNodes && node.childNodes.length) {
        this.compileElement(node, ast[index].children)
      }
    })
  },

  compile: function (node, ast) {
    if (ast.events) {
      const self = this
      Object.keys(ast.events).forEach((event) => {
        if (event === 'click') {
          const exp = ast.events[event].value
          const fn = self.$vm[exp]
          node.addEventListener('click', fn.bind(self.$vm), false)
        }
        if (event === 'mousedown') {
          const exp = ast.events[event].value
          const fn = self.$vm[exp]
          node.addEventListener('mousedown', fn.bind(self.$vm), false)
        }
      })
    }
  },

  isDirective: function (attr) {
    return attr.indexOf('v-') === 0
  },

  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0
  },

  isElementNode: function (node) {
    return node.nodeType === 1
  },

  isTextNode: function (node) {
    return node.nodeType === 3
  }
}

export default Compile
