const imgNode = document.createElement('img')
imgNode.setAttribute('data-validation', 'invalid')
imgNode.setAttribute('src', './images/icons/important-dark.png')

function Warning() {
    this.clonedNodes = []
}

Object.defineProperty(Array.prototype, 'toPush', {
    value: Array.prototype.toPush || function toPush(...items) {
        const proto = Array.prototype
        proto.push.apply(this, items)
        return items.length === 1 ? items.at(0) : items
    }
})

Object.setPrototypeOf(Warning.prototype, {

    exists: function(target) {

        const img = target.querySelector('img')

        if(!img || img.getAttribute('data-validation') !== 'invalid') {
            return false
        }

        return true
    },

    create: function(target) {

        if(!(target instanceof HTMLElement)) {
            return
        }

        if(this.exists(target)) {
            return
        }

        const o = { key: target.dataset.label, clonedNode: imgNode.cloneNode(true) }
        const { clonedNode } = this.clonedNodes.toPush(o)

        target.appendChild(clonedNode)

        return this.clonedNode
    },

    delete: function(target) {

        if(!this.exists(target)) {
            return
        }

        const cb = ({ key }) => key === target.dataset.label

        const { clonedNode } = this.clonedNodes.find(cb)
        const indexOf = this.clonedNodes.findIndex(cb)
        this.clonedNodes.splice(indexOf, 1)
        clonedNode.remove()
    }
})

const warn = new Warning()
export default Warning