## Settings
```js
new WebExtension({
    background: './background.js', // required
    port: 7031, // by default (for socket),
    onReload: Function.prototype // performed in background file
})
```

## Examples

#### Reload other tabs
```js
new WebExtension({
    background: './background.js',
    onReload: () => {
        chrome.tabs.query({ url: ['*://www.instagram.com/*'] }, (tabs) => {
            tabs.forEach((tab) => chrome.tabs.reload(tab.id));
        });
    }
})
```

#### webpack.config.js
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
        new WebExtension({
            background: './background.js'
        })
    );
}
```