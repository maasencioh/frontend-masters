# frontend-masters

> Cuando la realidad supera el "expect" de jest

### Introducción

Normalmente los [matchers de jest](https://jestjs.io/docs/en/expect) son suficientes para hacer el trabajo, de forma que se puede hacer una prueba del siguiente tipo

```js
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2
  expect(value).toBeCloseTo(0.3)
  expect(value).not.toBeCloseTo(4.3)
})
```

El método que sigue después del expect es el matcher con el cual se quiere revisar que se cumpla una condición, pero ¿qué pasa si no existe una función de la (larga) lista de matchers?

### Ejemplo

Si se tiene una lista de floats y se quiere revisar contra un resultado se debería hacer actualmente de la siguiente forma

```js
test('test raro', () => {
  const initial = [1, 2, 3, 4]
  const divided = initial.map(val => val / 4)
  const response = [0.25, 0.5, 0.75, 1]

  // Feo 🤢
  for (let i = 0; i < 4; i++) {
    expect(divided[i]).toBeCloseTo(response[i])
  }
})
```

Esto no solo está feo, si no que además no de dice donde está fallando

### Implementación
> [Documentación](https://jestjs.io/docs/en/expect.html#expectextendmatchers)

Este es un ejemplo de la doc
```js
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

test('numeric ranges', () => {
  expect(100).toBeWithinRange(90, 110);
  expect(101).not.toBeWithinRange(0, 100);
  expect({apples: 6, bananas: 3}).toEqual({
    apples: expect.toBeWithinRange(1, 10),
    bananas: expect.not.toBeWithinRange(11, 20),
  });
});
```


