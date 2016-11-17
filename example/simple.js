
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

console.log(require('util').inspect(Converter.select(`
    first,
    number.first,
    number.second,
    english.c.d.e.f.g
`, data), false, null));

console.log(require('util').inspect(Converter.alias(`
    first as one,
    number.first as one,
    number.second as two,
    english.c.d.e.f.g as won
`, data), false, null));
