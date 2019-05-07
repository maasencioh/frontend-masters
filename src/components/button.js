import React from 'react'

const Button = ({ label, callback }) => (
  <button onClick={callback}>{label}</button>
)

export default Button
