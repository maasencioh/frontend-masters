const initial = [1, 2, 3, 4]
const divided = initial.map(val => val / 4)
const response = [0.25, 0.5, 0.75, 1]

describe('Old fashion jest', () => {
  test('Please dont', () => {
    expect(divided).toEqual(response)
  })

  test('Works', () => {
    for (let i = 0; i < 4; i++) {
      expect(divided[i]).toBeCloseTo(response[i])
    }
  })

  test('2D', () => {
    const matrix = [initial, divided]
    const matrixResponse = [initial, response]

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 4; j++) {
        expect(matrix[i][j]).toBeCloseTo(matrixResponse[i][j])
      }
    }
  })
})
