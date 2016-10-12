/**
 * element https://github.com/ElemeFE/element
 * clickoutside.js
 */
const clickoutsideContext = '@@clickoutsideContext'

export default {
  bind (el, binding, vnode) {
    const documentHandler = function (e) {
      if (!vnode.context || el.contains(e.target)) return
      if (binding.expression) {
        vnode.context[el[clickoutsideContext].methodName]()
      } else {
        el[clickoutsideContext].bindingFn()
      }
    }
    el[clickoutsideContext] = {
      documentHandler,
      methodName: binding.expression,
      bindingFn: binding.value
    }
    setTimeout(() => {
      document.addEventListener('click', documentHandler)
    }, 0)
  },

  update (el, binding) {
    el[clickoutsideContext].methodName = binding.expression
    el[clickoutsideContext].bindingFn = binding.value
  },

  unbind (el) {
    document.removeEventListener('click', el[clickoutsideContext].documentHandler)
  }
}