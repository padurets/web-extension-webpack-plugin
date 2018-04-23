const path = require('path');
const config = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        client_filename: 'client.js',
        ext_filename: 'index.js',
    },
    default_props: {
        background: null,
        port: 7031,
        onReload: function () {}
    }
};

module.exports = config;