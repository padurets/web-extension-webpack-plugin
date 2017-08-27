## Settings

```js
new WebExtensionReloader({
    background: './background.js', // required
    port: 7031 // by default
})
```

## Example webpack.config.js

```js

const webpack = require('webpack');
const WebExtension = require('web-extension-webpack-plugin');
const is_pro = process.env.NODE_ENV === 'production';

const config = {
    entry: {
        background: './src/background.js',
        content: './src/content.js'
    },
    output: {
        path: './app',
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'background',
            chunks: ['background'],
            filename: './background.js'
        })
    ]
};

if(!is_pro){
    config.plugins.push(
        new WebExtensionReloader({
            background: './background.js'
        })
    );
}


```