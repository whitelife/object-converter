
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
            c:
                {
                    d: {
                        e: {
                            f: {
                                g: null
                            }
                        }
                    }
                }

        }
    }
];

process.stdout.write(require('util').inspect(Converter.select(`
    first,
    number,
    number.first,
    number.second,
    english.c.d.e.f.g
`, data), false, null));
