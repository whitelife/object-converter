
# object converter

Javascript object converter library

## Installation

```
npm install object-converter
```

## Quick Example

```javascript
const test = {
    a: {
        b: {
            c: {
                d: {
                    e: {
                        f: 'g'
                    }
                }
            }
        }
    }
};

const converter = require('object-converter');
converter.convert(test, (key, value, target) => {

    target[key + '_1'] = value;
    delete target[key];
});

console.log(require('util').inspect(test, false, null));
```
