import htmlElements from "./src/html/index.js"
import { frag } from "./src/html/custom/fragment.js"

const { button } = htmlElements

const div = (attributes = {}) => {
    const elm = document.createElement("div")
    for (const [key, value] of Object.entries(attributes)) {
        // if (value instanceof Reference) {
        //     value.
        // }
        elm[key] = value
    }
    return elm
}
class Reference {
    #internalValue = null
    #listener = []

    constructor(defaultValue) {
        this.#internalValue = defaultValue
    }
    get value() {
        return this.#internalValue
    }
    set value(newValue) {
        this.#internalValue = newValue
        
    }
    onUpdate(callback) {
        this.#listener.push(callback)
    }
}
const createRef = (defaultValue) => {
    return new Reference(defaultValue)
}
const App = () => {
    const count = createRef(0)

    const countElement = div({ textContent: count.value })

    const updateCount = () => {
        count.value++
        countElement.textContent = count.value
    }

    return frag(countElement, button({ textContent: "increment", onclick: updateCount }))
}
document.body.append(App())