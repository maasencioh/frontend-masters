/**
 * Custom matcher
 * @param {number|Array} received
 * @param {number|Array} expected
 * @param {number} [decimals]
 * @return {{message: (function(): string), pass: boolean}}
 */
export function toBeDeepCloseTo(received, expected, decimals) {
  const error = recursiveCheck(received, expected, decimals)
  if (error) {
    return {
      message: () =>
        `${this.utils.matcherHint('.toBeDeepCloseTo')}\n\n` +
        `${error.reason}:\n` +
        `  ${this.utils.printExpected(error.expected)}\n` +
        'Received:\n' +
        `  ${this.utils.printReceived(error.received)}`,
      pass: false
    }
  } else {
    return {
      message: () =>
        `${this.utils.matcherHint('.not.toBeDeepCloseTo')}\n\n` +
        'The two objects are deeply equal:\n' +
        `  ${this.utils.printExpected(expected)}\n` +
        'Received:\n' +
        `  ${this.utils.printReceived(received)}`,
      pass: true
    }
  }
}

/**
 * Recursive checks the correct values
 * @param {number|Array} actual
 * @param {number|Array} expected
 * @param {number} [decimals]
 * @return {false|{reason, expected, received}} - error details or false otherwise
 */
function recursiveCheck(actual, expected, decimals = 2) {
  if (typeof actual === 'number' && typeof expected === 'number') {
    // Check the base case of numbers
    if (isNaN(actual)) {
      return !isNaN(expected)
    } else if (Math.abs(actual - expected) <= Math.pow(10, -decimals)) {
      return false
    } else {
      return {
        reason: `Expected value to be (using ${decimals} decimals)`,
        expected: expected,
        received: actual
      }
    }
  } else if (Array.isArray(actual) && Array.isArray(expected)) {
    // Recurrent case for arrays
    if (actual.length !== expected.length) {
      return {
        reason: 'The arrays length does not match',
        expected: expected.length,
        received: actual.length
      }
    }
    for (var i = 0; i < actual.length; i++) {
      var error = recursiveCheck(actual[i], expected[i], decimals)
      if (error) return error
    }
    return false
  } else {
    // error for all other types
    return {
      reason: 'The current data type is not supported or they do not match',
      expected: typeof expected,
      received: typeof actual
    }
  }
}
