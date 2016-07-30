
'use strict';

const convert = (targetObject, elementCallback) => {

    const elementCallbacks = [];
    const recursive = (_targetObject) => {

        if (_targetObject.constructor === Object) {
            for (const [index, key] of Object.keys(_targetObject).entries()) {

                const value = _targetObject[key];

                if (value.constructor === Object) {
                    recursive(value);
                }

                if (value.constructor === Array) {
                    recursive(value);
                }

                elementCallbacks.push(elementCallback.bind(null, key, value, _targetObject));
            }
        }

        if (_targetObject.constructor === Array) {

            _targetObject.forEach((item, index, array) => {
                recursive(item);
            });
        }
    }

    recursive(targetObject);
    elementCallbacks.map((elementCallback) => elementCallback());
}

module.exports = {
    convert: convert
};
