
'use strict';

const clone = require('clone');

class Converter {

    static _isObject(object) {

        if (object === undefined) {
            return false;
        }

        if (object === null) {
            return false;
        }

        if (typeof object !== 'object') {
            return false;
        }

        if (object.constructor !== Object) {
            return false;
        }

        return true;
    }

    static _isArray(array) {

        if (array === undefined) {
            return false;
        }

        if (array === null) {
            return false;
        }

        if (typeof array !== 'object') {
            return false;
        }

        if (array.constructor !== Array) {
            return false;
        }

        return true;
    }

    static _aliasObject(field, alias, element, selection = {}) {

        const fields = field.split(',');

        for (const [index, key] of Object.keys(element).entries()) {

            for (let _index = 0, _len = fields.length; _index < _len; _index++) {
                const fieldPart = fields[_index];
                const aliasPart = typeof alias !== 'object' ? alias : alias[_index];

                if (field.indexOf('.') !== -1) {
                    const fieldParts = fieldPart.split('.');
                    const fieldFirstKey = fieldParts[0] || null;

                    if (fieldFirstKey === key) {
                        const fieldSelection = element[fieldFirstKey];

                        if (Converter._isObject(fieldSelection) === true) {
                            fieldParts.shift();
                            selection[key] = selection[key] || {};
                            selection[key] = Object.assign(selection[key], Converter._aliasObject(fieldParts.join('.'), aliasPart, fieldSelection, selection[key]));
                        }

                        if (Converter._isArray(fieldSelection) === true) {
                            fieldParts.shift();
                            selection[key] = selection[key] || [];

                            for (let __index = 0, __len = fieldSelection.length; __index < __len; __index++) {
                                selection[key][__index] = selection[key][__index] || {};
                                selection[key][__index] = Object.assign(selection[key][__index] || {}, Converter._aliasObject(fieldParts.join('.'), aliasPart, fieldSelection[__index], selection[key][__index]));
                            }
                        }
                    }
                }

                if (field === key) {
                    selection[aliasPart || key] = element[field];
                }
            }
        }
    }

    static _matchObject(field, element, selection = {}) {

        const fields = field.split(',');

        for (const [index, key] of Object.keys(element).entries()) {

            for (let field of fields) {

                if (field.indexOf('.') !== -1) {
                    const fieldParts = field.split('.');
                    const fieldFirstKey = fieldParts[0] || null;

                    if (fieldFirstKey === key) {
                        const fieldSelection = element[fieldFirstKey];

                        if (Converter._isObject(fieldSelection) === true) {
                            fieldParts.shift();
                            selection[key] = selection[key] || {};
                            selection[key] = Object.assign(selection[key], Converter._matchObject(fieldParts.join('.'), fieldSelection, selection[key]));
                        }

                        if (Converter._isArray(fieldSelection) === true) {
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

    static _getObjectKeys(data, parentkey, selection = []) {

        if (Converter._isArray(data) === true && data.length > 0) {
            data = data[0];
        }

        if (Converter._isObject(data) === false) {
            return;
        }

        for (const [index, key] of Object.keys(data).entries()) {

            selection.push(`${parentkey}${key}`);

            // object
            if (Converter._isObject(data[key]) === true) {
                Converter._getObjectKeys(data[key], `${parentkey}${key}.`, selection);
                continue;
            }

            // array
            if (Converter._isArray(data[key]) === true) {
                Converter._getObjectKeys(data[key], `${parentkey}${key}.`, selection);
                continue;
            }
        }
    }

    static select(field, data) {

        field = field.replace(/\n|\ /g, '');
        data = clone(data);

        // object
        if (Converter._isObject(data) === true) {
            let selection = {};
            Converter._matchObject(field, data, selection);
            return selection;
        }

        // array
        if (Converter._isArray(data) === true) {

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
        let alias = [];

        for (let field of fields) {
            selection.push(field.substring(0, field.indexOf('|')));
            alias.push(field.substring(field.indexOf('|') + 1));
        }

        selection = selection.join(',');
        data = clone(data);
        data = Converter.select(selection, data);

        if (data === 'unsupported type') {
            return data;
        }

        if (Converter._isObject(data) === true) {
            let parking = {};
            Converter._aliasObject(selection, alias, data, parking);
            return parking;
        }

        // array
        if (Converter._isArray(data) === true) {

            for (let index = 0, len = data.length; index < len; index++) {
                let parking = {};
                data[index] = Converter._aliasObject(selection, alias, data[index], parking);
                data[index] = parking;
            }

            return data;
        }

        // except
        return 'unsupported type';
    }

    static getObjectKeys(data) {

        const parking = [];
        Converter._getObjectKeys(data, '', parking);
        return parking;
    }
}

module.exports = Converter;
