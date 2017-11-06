/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Function
const convert = (result, resources) => {
    return Object.keys(resources).reduce((collection, key) => {
        const resource = resources[key];
        if (resource.Type && resource.Properties) {
            collection[key] = {
                Type: resource.Type,
                Properties: resource.Properties
            };
            if (resource.DependsOn) {
                collection[key].DependsOn = resource.DependsOn;
            }
        }

        return convert(collection, Object.keys(resource).reduce((data, name) => {
            if (0 > ['Type', 'Properties', 'DependsOn'].indexOf(name)) {
                data[name] = resource[name];
            }

            return data;
        }, {}));
    }, result);
};


// Export module
module.exports = convert;



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
