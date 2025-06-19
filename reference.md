 building a **reactive state system** with `useReference`, similar to `useState` in React or `ref` in Vue.


---

## ✅ What is `useReference`?

`useReference()` creates a **reactive variable** that can:

* Store a value
* Notify subscribers (triggers) when the value changes
* Be used for reactive DOM updates (`.map`)
* Support reactive computations (`.every`, `.filterRef`, `.len`)

This is the **core of your reactivity system**.

---

## 🧱 How it works

### 1. `let value = defaultValue`

It stores the **current value** inside the closure.

---

### 2. `const triggers = new Set();`

It stores **functions** (called *triggers*) that run every time the value changes.

---

### 3. `const fn = function (newValue) { ... }`

This is the **reactive function** that:

* **Reads** the value → when called with no arguments.
* **Updates** the value → when called with a new value or updater function.
* **Notifies** all triggers after change.

#### 🧪 Example:

```js
const count = useReference(0);
console.log(count());       // → 0
count(1);                   // sets to 1
count((v) => v + 1);        // sets to 2
```

---

### 4. `fn.addTrigger(triggerFn, { invoke })`

Adds a **listener** that will be called every time the value changes.

```js
count.addTrigger((val) => console.log("Now:", val));
count(5);  // logs: Now: 5
```

---

## 🔄 Advanced API: `map`, `every`, `filterRef`, `len`

These allow you to **transform references** in a reactive way.

---

### 🔁 `map(callback)`

Returns a **fragment** that updates when the reference changes.

Used for **rendering lists** reactively.

```js
const items = useReference(["one", "two"]);

const fragment = items.map((item) => {
  return div({ textContent: item });
});
```

This inserts:

```html
<!--bindjs-fragment-start-->
<div>one</div>
<div>two</div>
<!--bindjs-fragment-end-->
```

When `items()` changes, the list re-renders between the comments.

---

### ✅ `every(callback)`

Creates a **new reference** that holds `true` if **every item** in the array passes the callback.

```js
const items = useReference([1, 2, 3]);
const allPositive = items.every((v) => v > 0);

allPositive.addTrigger(console.log); // true
items([1, -1, 2]);                   // logs false
```

---

### 🔍 `filterRef(callback)`

Creates a new reference of filtered items.

```js
const users = useReference(["Ali", "Tom", "Amine"]);
const filtered = users.filterRef((name) => name.startsWith("A"));

filtered.addTrigger(console.log); // ["Ali", "Amine"]
```

---

### 🔢 `len()`

Returns a new reference that holds the **length** of the value.

```js
const tasks = useReference(["A", "B"]);
const taskCount = tasks.len();

taskCount.addTrigger(console.log); // 2
tasks(["A", "B", "C"]);            // logs 3
```

---

## 🧠 Summary

| Feature           | Purpose                                 |
| ----------------- | --------------------------------------- |
| `fn()`            | Get or set the value                    |
| `fn.addTrigger()` | Listen to value changes                 |
| `fn.map()`        | Render a fragment from array            |
| `fn.every()`      | Create a ref based on `.every()` result |
| `fn.filterRef()`  | Reactive `.filter()`                    |
| `fn.len()`        | Reactive `.length`                      |

---

## 🔥 Real-Life Example: Counter

```js
const count = useReference(0);

const el = div({
  textContent: () => `Count is: ${count()}`
});

button({
  textContent: "Increment",
  onclick: () => count((v) => v + 1)
});
```

→ When button is clicked:

* `count` changes
* Triggers fire
* UI updates automatically

---
