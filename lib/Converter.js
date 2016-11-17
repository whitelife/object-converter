
'use strict';

const clone = require('clone');

class Converter {

    static _matchObject(field, element, selection = {}) {

        const fields = field.split(',');

        for (const [index, key] of Object.keys(element).entries()) {

            for (let field of fields) {

                if (field.indexOf('.') !== -1) {
                    const fieldParts = field.split('.');
                    const fieldFirstKey = fieldParts[0] || null;

                    if (fieldFirstKey === key) {
                        const fieldSelection = element[fieldFirstKey];

                        if (fieldSelection.constructor === Object) {
                            fieldParts.shift();
                            selection[key] = selection[key] || {};
                            selection[key] = Object.assign(selection[key], Converter._matchObject(fieldParts.join('.'), fieldSelection, selection[key]));
                        }

                        if (fieldSelection.constructor === Array) {
                            fieldParts.shift();
                            selection[key] = selection[key] || [];

                            for (let _index = 0, _len = fieldSelection.length; _index < _len; _index++) {
                                selection[key][_index] = selection[key][_index] || {};
                                selection[key][_index] = Object.assign(selection[key][_index] || {}, Converter._matchObject(fieldParts.join('.'), fieldSelection[_index], selection[key][_index]));
                            }
                        }
                    }
                }

                if (field === key) {
                    selection[key] = element[field];
                }
            }
        }
    }

    static select(field, data) {

        field = field.replace(/\n|\ /g, '');
        data = clone(data);

        // object
        if (data.constructor === Object) {
            let selection = {};
            Converter._matchObject(field, data, selection);
            return selection;
        }

        // array
        if (data.constructor === Array) {

            for (let index = 0, len = data.length; index < len; index++) {
                let selection = {};
                data[index] = Converter._matchObject(field, data[index], selection);
                data[index] = selection;
            }

            return data;
        }

        // except
        return 'unsupported type';
    }

    static alias(field, data) {

        field = field.replace(/\ as\ /g, '|');
        field = field.replace(/\n|\ /g, '');

        const fields = field.split(',');
        let selection = [];

        for (let field of fields) {
            selection.push(field.substring(0, field.indexOf('|')));
        }

        selection = selection.join(',');
        data = clone(data);
        data = Converter.select(selection, data);



        return data;
    }
}

module.exports = Converter;
