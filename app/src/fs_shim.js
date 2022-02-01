// @seald-io/nestdb shim for browserfs


const bfs_shim = require('browserfs/dist/shims/fs');
const fs_const = require('fs-constants');
// const fs_promises = require('fs-promise-polyfill').promises;


bfs_shim.constants = fs_const;
// bfs_shim.promises = fs_promises;

delete bfs_shim.createReadStream;


// bfs_shim.access = (path, mode, cb) => { return bfs_shim.exists(path, cb); }
bfs_shim.access = (function (path, mode, cb) {
    console.log(this)
    if (mode == fs_const.F_OK) {
        // return this.getFSModule().exists.apply(this.getFSModule(), [path, (ret) => { cb(!ret); }]);
        return this.exists(path, (ret) => { console.log(this); cb(!ret); });
    }
    else {
        throw `fs.access shim for mode F_OK only! got ${mode}`;
    }
}).bind(bfs_shim.getFSModule());


function callee_wrapper(obj) {
    let wrapper = {};

    Object.keys(obj)
        .forEach((k) => {
            if (typeof obj[k] === 'function') {
                wrapper[k] = function () {
                    console.log(k);
                    return obj[k].apply(obj, arguments);
                };
            }
            else {
                wrapper[k] = obj[k];
            }
        });
    
    return wrapper;
}

module.exports = callee_wrapper(bfs_shim);