import Watcher from './watcher'

function Compile (el, templateDescriptor, vm) {
  this.$vm = vm
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
    var attrs = ast.attrsMap || {}
    Object.keys(attrs).forEach((attr) => {

    })

    if (ast.classBinding) {
      compileUtil.bindClass(node, this.$vm, ast.classBinding)
    }

    // v-if
    // if(ast.ifConditions) {
    //   compileUtil.bindIf(node, this.$vm, ast.ifConditions[0].exp);
    // }

    if (ast.events) {
      const self = this
      Object.keys(ast.events).forEach((event) => {
        if (event === 'click') {
          const exp = ast.events[event].value
          const fn = self.$vm.$options.methods && self.$vm.$options.methods[exp]
          node.addEventListener('click', fn.bind(self.$vm), false)
        }
      })
    }
    // text binding
    if (ast.type === 2) {
      ast.tokens.forEach((token) => {
        if (token['@binding']) {
          compileUtil.bindText(node, this.$vm, token['@binding'])
        }
      })
    }
    // classBinding

    // attrsBinding

    // eventBinding
  },

  compileText: function (node, exp) {
    compileUtil.text(node, this.$vm, exp)
  },

  isDirective: function (attr) {
    return attr.indexOf('v-') == 0
  },

  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0
  },

  isElementNode: function (node) {
    return node.nodeType == 1
  },

  isTextNode: function (node) {
    return node.nodeType == 3
  }
}

// 防止重复binding
var bindingCached = {}

// 指令处理集合
var compileUtil = {
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text')
  },

  html: function (node, vm, exp) {
    this.bind(node, vm, exp, 'html')
  },

  model: function (node, vm, exp) {
    this.bind(node, vm, exp, 'model')

    var me = this,
      val = this._getVMVal(vm, exp)
    node.addEventListener('input', function (e) {
      var newValue = e.target.value
      if (val === newValue) {
        return
      }

      me._setVMVal(vm, exp, newValue)
      val = newValue
    })
  },

  bindText: function (node, vm, exp) {
    function textUpdater (node, value, oldValue) {
      node.nodeValue = value
    }
    new Watcher(vm, exp, function (value, oldValue) {
      textUpdater(node, value, oldValue)
    })
  },

  bindClass: function (node, vm, exp) {
    function classUpdater (node, value, oldValue) {
      let className = node.className
      const reg = new RegExp(`\\b${oldValue}\\b`)
      className = className.replace(reg, value)

      node.className = className
    }
    new Watcher(vm, exp, function (value, oldValue) {
      classUpdater(node, value, oldValue)
    })
  },

  // bindIf: function(node, vm, exp) {
  //   // 这个注释节点就是用来占位的，好让我们记住原先的b-if指令DOM结构在哪儿
  //   let ref = document.createComment("yuefu-if");
  //   // node.parentNode.insertBefore(ref, node);
  //   function ifUpdater(node, value, oldValue) {
  //     if(value) {
  //       node.parentNode.replaceChild(ref, node);
  //       ref = node;
  //     } else {
  //       node.parentNode.replaceChild(ref, node);
  //       ref = node;
  //     }
  //   }

  //   new Watcher(
  //     vm,
  //     (vm) => {
  //       const evaluation = new Function(`with(this) {
  //         return ${exp}
  //       }`);
  //       return evaluation.call(vm, exp);
  //     },
  //     function(value, oldValue) {
  //       ifUpdater(node, value, oldValue);
  //     });

  //   this.inserted = false;
  // },

  // TODO: 局部更新？
  bind: function (vm, exp) {
    if (bindingCached[exp]) {
      return
    }
    var updaterFn = () => {
      const wrapperDOM = document.querySelector(vm.$options.el)
      wrapperDOM.replaceChild(vm.render(), wrapperDOM.childNodes[0])
    }
    new Watcher(vm, exp, function (value, oldValue) {
      updaterFn && updaterFn()
    })
    bindingCached[exp] = true
  },

  _getVMVal: function (vm, exp) {
    var val = vm
    exp = exp.split('.')
    exp.forEach(function (k) {
      val = val[k]
    })
    return val
  },

  _setVMVal: function (vm, exp, value) {
    var val = vm
    exp = exp.split('.')
    exp.forEach(function (k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k]
      } else {
        val[k] = value
      }
    })
  }
}

var updater = {
  textUpdater: function (node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value
  },

  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value === 'undefined' ? '' : value
  },

  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value === 'undefined' ? '' : value
  }
}

export default Compile
