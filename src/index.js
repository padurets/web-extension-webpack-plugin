const fs = require('fs');
const path = require('path');
const { output, default_props } = require('../config');
const Server = require('./server');
const client_file = path.join(output.path, output.client_filename);

class WebExtension {

    constructor(props){
        props = Object.assign({}, default_props, props);
        this.server = new Server({ port: props.port });
        this.props = props;
    }

    apply(compiler) {
        var { props } = this;

        compiler.plugin('done', () => {
            this.server.sayReload();
        });

        compiler.plugin('emit', (compilation, callback) => {
            var { chunks, assets } = compilation;
            var { [props.background]: background } = assets;

            if(background){
                fs.readFile(client_file, 'utf8', (err, str) => {
                    var client_code = str.replace('PROPS', JSON.stringify(props));
                    var source = background.source() + `\n;(function() {${client_code}})();`;

                    compilation.assets[props.background] = {
                        source: () => source,
                        size: () => source.length
                    };

                    callback()
                });
            }
        });
    }
}

module.exports = WebExtension;