export function toHaveClass(Component, text) {
  // console.log(Component)
  const { className } = Component.props || {}
  if (className !== text) {
    return {
      message: () =>
        `${this.utils.matcherHint('.toHaveClass')}\n\n` +
        'The component does not have the expected class:\n' +
        `  ${this.utils.printExpected(text)}\n` +
        'Received:\n' +
        `  ${this.utils.printReceived(className)}`,
      pass: false
    }
  } else {
    return {
      message: () =>
        `${this.utils.matcherHint('.not.toHaveClass')}\n\n` +
        'The component has the selected class name:\n' +
        `  ${this.utils.printExpected(className)}\n` +
        'Received:\n' +
        `  ${this.utils.printReceived(text)}`,
      pass: true
    }
  }
}
