const fs = require('fs');
const path = require('path');
const { output, default_props } = require('../config');
const Server = require('./server');
const client_file = path.join(output.path, output.client_filename);
const replaceCode = (str, map) => {
    var { onReload, opt } = map;

    return str
            .replace('injectProps', JSON.stringify(opt))
            .replace('injectOnReload', onReload.toString());
};

class WebExtension {

    constructor(props){
        props = Object.assign({}, default_props, props);
        this.server = new Server(props);
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
                    var { onReload, ...opt } = props;
                    var opt = { opt, onReload };
                    var client_code = replaceCode(str, opt);
                    var source = background.source() + `\n;(function() {${client_code}})();`;

                    compilation.assets[props.background] = {
                        source: () => source,
                        size: () => source.length
                    };

                    callback()
                });
            }else{
                console.log('\n\n=== WEB EXTENSION WEBPACK PLUGIN ===');
                console.log(`\nbackground file with name ${props.background} not found in chunks:\n`);
                Object.keys(assets).forEach((key) => {
                    if(key.match(/\.js+$/i)){
                        console.log(`- ${key}`);
                    }
                });
                console.log('\n=======\n\n');
                callback();
            }
        });
    }
}

module.exports = WebExtension;