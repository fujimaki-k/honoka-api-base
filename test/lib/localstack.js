/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules
const child_process = require('child_process');

// Variables
const localstack = child_process.spawn('docker', ['run', '--rm', '--name', 'localstack', 'localstack/localstack']),
    command = 'docker inspect --format "{{.NetworkSettings.IPAddress}}" localstack',
    mock = {};


// Before
before((done) => {
    localstack.stdout.on('data', (data) => {
        const lines = data.toString().split(/\r\n|\r|\n/).forEach((line) => {
            if (-1 < line.indexOf('Starting mock')) {
                const service = line.substring(14, line.indexOf('(') - 1).split(' ').join(''),
                    port = Number(line.substring(line.lastIndexOf(' '), line.indexOf(')')));
                mock.services = mock.services || {};
                mock.services[service] = port;
            }

            if (-1 < line.indexOf('Ready.')) {
                mock.url = child_process.execSync(command).toString().trim();
                done();
            }    
        });
    });
});

// After
after((done) => {
    localstack.kill('SIGTERM');
    done();
});


// Export module
module.exports = mock;



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

