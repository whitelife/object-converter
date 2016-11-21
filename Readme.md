
# object converter

Javascript object converter library

## Installation

```
npm install object-converter
```

## Sample Data

```javascript
const Converter = require('object-converter').Converter;

const data = [
    {
        first: 1,
        second: 2,
        number: [
            {
                first: 1,
                second: 2,
            },
            {
                first: 1,
                second: 2,
            }
        ],
        english: {
            a: null,
            b: undefined,
            c: [
                {
                    d: {
                        e: {
                            f: {
                                g: null
                            }
                        }
                    }
                }
            ]
        }
    }
]
```

# API

## Converter.select(field, data)

- field: selection (ex: [key])
- data: origin object (array supported)

```javascript
// [ { first: 1,
//    number: [ { first: 1, second: 2 }, { first: 1, second: 2 } ],
//    english: { c: [ { d: { e: { f: { g: null } } } } ] } } ]
Converter.select(`
    first,
    number.first,
    number.second,
    english.c.d.e.f.g
`, data);
```

## Converter.alias(field, data)

- field: alias (ex: [key] as [alias key])
- data: origin object (array supported)

```javascript
// [ { number: [ { one: 1, two: 2 }, { one: 1, two: 2 } ],
//    english: { c: [ { d: { e: { f: { won: null } } } } ] } } ]
Converter.alias(`
    first as one,
    number.first as one,
    number.second as two,
    english.c.d.e.f.g as won
`, data);
```

## Converter.update(field, value, data)

- field: update field
- value: update value
- data: origin object (array supported)

```javascript
// [ { first: 1,
//  second: 2,
//  number: [ { first: 1, second: 2 }, { first: 1, second: 2 } ],
//  english: { a: null, b: undefined, c: 3 } } ]
Converter.update('english.c', 3, data);
```

## Converter.getObjectKeys(data)

- data: origin object (array supported)

```javascript
// [ 'first',
//   'second',
//   'number',
//   'number.first',
//   'number.second',
//   'english',
//   'english.a',
//   'english.b',
//   'english.c',
//   'english.c.d',
//   'english.c.d.e',
//   'english.c.d.e.f',
//   'english.c.d.e.f.g' ]
Converter.getObjectKeys(data);
```

## Converter.getObjectValue(field, data)

- field: selection (ex: [key])
- data: origin object (array unsupported)

```javascript
// {
//     english: {
//         a: null,
//         b: undefined,
//         c: {
//             d: {
//                 e: {
//                     f: {
//                         g: null
//                     }
//                 }
//             }
//         }
//     }
// }
// { d: { e: { f: { g: null } } } }
Converter.getObjectValue('english.c', data);
// { e: { f: { g: null } } }
Converter.getObjectValue('english.c.d', data);
// { f: { g: null } }
Converter.getObjectValue('english.c.d.e', data);
```
