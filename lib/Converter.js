
'use strict';

const clone = require('clone');

class Converter {

    constructor(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }

    matchObject(field, element, selection = {}) {

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
                            selection[key] = Object.assign(selection[key], this.matchObject(fieldParts.join('.'), fieldSelection, selection[key]));
                        }

                        if (fieldSelection.constructor === Array) {
                            fieldParts.shift();
                            selection[key] = selection[key] || [];

                            for (let _index = 0, _len = fieldSelection.length; _index < _len; _index++) {
                                selection[key][_index] = selection[key][_index] || {};
                                selection[key][_index] = Object.assign(selection[key][_index] || {}, this.matchObject(fieldParts.join('.'), fieldSelection[_index], selection[key][_index]));
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

    select(field) {

        field = field.replace(/\n|\ /g, '');
        const cloneData = clone(this.data);

        // object
        if (this.data.constructor === Object) {
            let selection = {};
            this.matchObject(field, cloneData, selection);
            return selection;
        }

        // array
        if (this.data.constructor === Array) {

            for (let index = 0, len = cloneData.length; index < len; index++) {
                let selection = {};
                cloneData[index] = this.matchObject(field, cloneData[index], selection);
                cloneData[index] = selection;
            }

            return cloneData;
        }

        // except
        return 'unsupported type';
    }
}

module.exports = Converter;
