
'use strict';

const Converter = require('../lib/Converter');

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

console.log(require('util').inspect(new Converter(data).select(`
    first,
    number.first,
    number.second,
    english.c.d.e.f.g
`), false, null));