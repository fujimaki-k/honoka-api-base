/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules
const converter = require('../lib/converter/resources');



// Export module
module.exports = {
    AWSTemplateFormatVersion: '2010-09-09',
    Parameters: {},
    Conditions: {},
    Resources: converter({}, require('./resources'))
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
