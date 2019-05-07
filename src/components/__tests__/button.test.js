import React from 'react'
import Button from '../button'
import { toHaveClass } from '../../utils/reactMatcher'
expect.extend({ toHaveClass })

const mock = jest.fn()
const button = <Button label="hola" className="prueba" callback={mock} />

describe('react example', () => {
  test('positive', () => {
    expect(button).toHaveClass('prueba')
  })

  test('negative', () => {
    expect(button).not.toHaveClass('test')
  })
})
