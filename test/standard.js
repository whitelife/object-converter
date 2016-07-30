
'use strict';

const converter = require('../');
const test = {
    a: {
        b: {
            c: {
                d: {
                    e: {
                        f: {
                            g: [
                                {
                                    h: 'i',
                                    j: [
                                        {
                                            k: 'l',
                                            m: 'n'
                                        }
                                    ]
                                }
                            ],
                            o: 'p'
                        }
                    }
                }
            }
        }
    }
};

console.log(require('util').inspect(test, false, null));

converter.convert(test, (key, value, target) => {

    target[key + '_1'] = value;
    delete target[key];

});

console.log(require('util').inspect(test, false, null));
