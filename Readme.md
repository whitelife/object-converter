
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
console.log(require('util').inspect(new Converter(data).select(`
    first,
    number.first,
    number.second,
    english.a,
    english.c
`), false, null));
```

# API

## new Converter(data).select(field)

object, array support

- data: origin object
- field: selection

```javascript
// [ { first: 1,
//    number: [ { first: 1, second: 2 }, { first: 1, second: 2 } ],
//    english: { c: [ { d: { e: { f: { g: null } } } } ] } } ]
new Converter(data).select(`
    first, // 1 dept
    number.first, // 2 dept
    number.second, // 2 dept
    english.c.d.e.f.g // 6 dept ~ n dept
`), false, null)
```
