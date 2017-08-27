var PROPS = injectProps;
var hookOnReload = injectOnReload;

const io = require('socket.io-client');
const socket = io(`http://127.0.0.1:${PROPS.port}`);
const { id: ext_id } = chrome.runtime;

const onReload = (query = {}, cb) => {
    query = Object.assign({
        url: [`chrome-extension://${ext_id}/*`]
    }, query);

    chrome.tabs.query(query, (tabs) => {
        cb(tabs);
        hookOnReload();
        chrome.runtime.reload();
    });
};

const onReopen = (tabs = [], cb) => {
    tabs.forEach((tab) => {
        var { windowId, index, url, active, pinned, openerTabId } = tab;
        var new_tab = { windowId, index, url, active, pinned, openerTabId };
        chrome.tabs.create(new_tab);
    });

    cb(tabs);
}

socket.on('reload', onReload);
socket.on('reopen', onReopen);