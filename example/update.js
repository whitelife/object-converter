
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
];

Converter.update('english.c', 3, data);
process.stdout.write(require('util').inspect(data, false, null));
