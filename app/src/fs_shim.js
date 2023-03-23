// browserfs shim for use with:
// - nedb
// - @seald-io/nestdb
// - @seald-io/nedb

const util = require('util');

const bfs_shim = require('browserfs/dist/shims/fs');

const fs_const = require('fs-constants');
bfs_shim.constants = fs_const;

// make nedb use readFile methods
// delete bfs_shim.createReadStream;

// // bfs_shim.access = (path, mode, cb) => { return bfs_shim.exists(path, cb); }
// bfs_shim.access = (function (path, mode, cb) {
//     console.log(this)
//     if (mode == fs_const.F_OK) {
//         // return this.getFSModule().exists.apply(this.getFSModule(), [path, (ret) => { cb(!ret); }]);
//         return this.exists(path, (ret) => { console.log(this); cb(!ret); });
//     }
//     else {
//         throw `fs.access shim for mode F_OK only! got ${mode}`;
//     }
// }).bind(bfs_shim.getFSModule());


// patch mkdir for use with mode: {recursive: true}
bfs_shim.__mkdir = bfs_shim.mkdir;
delete bfs_shim.mkdir;
bfs_shim.mkdir = (function(path, mode, cb) {
    // console.trace();
    if (this.existsSync(path) && mode.recursive) {
        cb();
    }
    else {
        this.__mkdir( 
            path,
            (typeof mode === 'object' && mode.mode) ? mode.mode : mode,
            cb
        );
    }
}).bind(bfs_shim);

// add fs.promises
const promisify = (obj) => {
    return new Proxy(obj, {
        get: (target, name) => {
            if (name in target) {
                if (target[name] instanceof Function) {
                    return util.promisify(target[name]);
                }
            }
            return target[name];
        }
    });
};

let fsPromises = bfs_shim.promises || promisify(bfs_shim);
bfs_shim.promises = fsPromises;

// export
module.exports = bfs_shim;