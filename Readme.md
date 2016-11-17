
# object converter

Javascript object converter library

## Installation

```
npm install object-converter
```

## Quick Example

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

//[ { first: 1,
//    number: [ { first: 1, second: 2 }, { first: 1, second: 2 } ],
//    english: { a: null, c: [ { d: { e: { f: { g: null } } } } ] } } ]
console.log(require('util').inspect(Converter.select(`
    first,
    number.first,
    number.second,
    english.c.d.e.f.g
`, data), false, null));
```

# API

## Converter.select(field, data)

- field: selection
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
