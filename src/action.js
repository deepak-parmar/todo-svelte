export default function selectOnFocus(node) {
  // make sure node exists and it's node.select is a defined function
  if (node && typeof node.select === "function") {
    const onFocus = event => node.select()
    node.addEventListener("focus", onFocus)

    return {
      distroy: () => node.removeEventListener("focus", onFocus)
    }
  }
}

export const focusOnInit = (node) => node && typeof node.focus === 'function' && node.focus()