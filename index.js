
'use strict';

const convert = (targetObject, elementCallback) => {

    const elementCallbacks = [];
    const recursive = (_targetObject) => {

        if (_targetObject.constructor === Object) {
            for (const [index, key] of Object.keys(_targetObject).entries()) {

                const value = _targetObject[key];

                if (value !== undefined && value !== null) {
                    if (value.constructor === Object) {
                        recursive(value);
                    }

                    if (value.constructor === Array) {
                        recursive(value);
                    }
                }

                elementCallbacks.push(elementCallback.bind(null, key, value, _targetObject));
            }
        }

        if (_targetObject.constructor === Array) {

            _targetObject.forEach((item, index, array) => {
                if (item !== undefined && item !== null) {
                    recursive(item);
                }
            });
        }
    }

    recursive(targetObject);
    elementCallbacks.map((elementCallback) => elementCallback());
}

const convertKeys = (targetObject, keymap) => {

    convert(targetObject, (key, value, target) => {

        console.log(key, value);

        const convertKey = keymap[key] || key;

        if (convertKey !== key) {
            target[convertKey] = value;
            delete target[key];
        }
    });

    return targetObject;
}

module.exports = {
    convert: convert
};
