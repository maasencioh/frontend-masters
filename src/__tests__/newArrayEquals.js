import { toBeDeepCloseTo } from '../utils/customMatcher'
expect.extend({ toBeDeepCloseTo })

const initial = [1, 2, 3, 4]
const divided = initial.map(val => val / 4)
const response = [0.25, 0.5, 0.75, 1]

describe('Comparison fashion jest', () => {
  test('Old way', () => {
    for (let i = 0; i < 4; i++) {
      const ans = Math.abs(divided[i] - response[i]) <= Math.pow(10, -2)
      if (!ans) {
        console.log(`En el índice ${i} los valores no son iguales`)
        console.log(`Recibido ${divided[i]}, se esperaba ${response[i]}`)
      }
      expect(ans).toBeTruthy()
    }
  })

  test('old 2D', () => {
    const matrix = [initial, divided]
    const matrixResponse = [initial, response]

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 4; j++) {
        expect(matrix[i][j]).toBeCloseTo(matrixResponse[i][j])
      }
    }
  })

  test('New way', () => {
    const matrix = [initial, divided]
    const matrixResponse = [initial, response]

    expect(divided).toBeDeepCloseTo(response)
    expect(matrix).toBeDeepCloseTo(matrixResponse)
  })
})
