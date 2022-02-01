const path = require('path');
const fs = require('fs');
const glob = require('fast-glob');

const util = require('util');
const colors = require('colors');

const deb_control = require('debian-control');
const { Stream, Readable } = require('stream');

const DB = require('nedb');


const inspect_log_opts = {
    showHidden: false,
    depth: Infinity,
    colors: true,
    maxArrayLength: Infinity,
    maxStringLength: 60,
    breakLength: Infinity,
    compact: true
}

function log_data(container) {
    return util.inspect(container, inspect_log_opts);
}


// https://vcpkg.readthedocs.io/en/latest/maintainers/control-files/
// https://vcpkg.readthedocs.io/en/latest/specifications/manifests/
// {
//     key:     <translate to name>,
//     ignore:  <mark as known but do not translate>,
//     map:     <value mapping method>
// }
const vcpkg_source_control_json_mapping = {
        'Source'            : { key: 'name'             },
        'Description'       : { key: 'description'      },

        'Homepage'          : { key: 'homepage'         },
        'Maintainer'  : {
            key: 'maintainers',
            map: function (val) {
                return val.split(',').map(val => val.trim());
            }
        },

        'Version'           : { key: 'version-string'   },
        'Port-Version'      : { key: 'port-version'     },

        'Supports'          : { key: 'supports'         },

        'Feature'           : { ignore: true            },

        'Default-Features'  : {
            key: 'default-features',
            map: function (val) {
                return val.split(',').map(val => val.trim());
            }
        },
        'Build-Depends'     : {
            key: 'dependencies',
            map: function (val) {
                // return val.split(',').map(val => val.trim());
                let matches = [
                    ...val.matchAll(
                        /(^|,)\s*([-a-z0-9]+)\s*(\[[-a-z0-9\s,]+?\])?\s*(!?\(.*?\))?/g
                        )
                    ]
                // dependency([<whole match>, <separator>, <name>, [<features>], [<platform>]])
                let depends = matches.reduce((acc, dep) => {
                        let dependency = dep[2];
                        if(dep[3]) { // has platform or features
                            dependency = { name: dependency }

                            let resolve = (feat_plat) => {
                                if(feat_plat) {
                                    if(feat_plat[0] == '[') { // features
                                        return { features: feat_plat.slice(1, -1).split(',').map(val => val.trim()) }
                                    } else { // assume platform
                                        return { platform: feat_plat };
                                    }
                                }
                                else {
                                    return {};
                                }
                            };

                            dependency = dep.slice(3).reduce((acc, feat_plat) => {
                                    Object.assign(acc, resolve(feat_plat));
                                    return acc;
                                }, dependency);
                        }
                        
                        acc.push(dependency);
                        return acc;
                    }, []);
                
                    return depends;
            }
        }
    };

// [source, [feature, [...]]
function translate_control_paragraphs(paragraphs) {
    if(!paragraphs.length || !paragraphs[0]['Source']) {
        console.log(`could not use dataset: ${log_data(paragraphs)}`)
        return; // return undefined
    }

    let map_control_json = (control) => {
        let keys_ignored = [];
        Object.keys(control).forEach((key) => {
            if(key[0] == '#') {
                keys_ignored.push(key);
                delete control[key];
            }
        });

        if(keys_ignored.length) {
            console.log(`[${(paragraphs[0]['Source']).blue}] ${'ignored keys'.yellow} ${log_data(keys_ignored)} from ${log_data(control)}`);
        }

        return Object.keys(control).reduce((acc, key) => {
                if(vcpkg_source_control_json_mapping[key]) {
                    if(!vcpkg_source_control_json_mapping[key]['ignore']) {
                        acc[vcpkg_source_control_json_mapping[key].key] = (
                                vcpkg_source_control_json_mapping[key].map ||
                                ((v) => v)
                            )(control[key]);
                    }
                }
                else {
                    console.log(`[${(paragraphs[0]['Source']).blue}] ${'no translation'.yellow} for '${(key).green}' in ${log_data(control)}`)
                }
                return acc;
            }, {});
    };

    let source = map_control_json(paragraphs[0]);
    let features = paragraphs.slice(1).reduce((acc, feature) => {
            if(feature['Feature']) {
                acc[feature['Feature']] = map_control_json(feature);
            }
            return acc;
        }, {});

    if(Object.keys(features).length) {
        source['features'] = features;
    }

    return source;
}

function parse_control_file(path) {
    return new Promise((resolve, reject) => {
        let paragraphs = [];
        
        let paragraphStream = new deb_control.ParagraphStream();
        paragraphStream.on("data", (paragraph) => {
            let data = deb_control.parse(paragraph.toString() + '\n');
            paragraphs.push(data);
        });
        paragraphStream.on("end", () => {
            resolve(paragraphs);
        });

        // inefficient windows lineending removal! should use transform stream as well
        const data = fs.readFileSync(path, { encoding: 'utf-8'}).replace(/\r/g, '');
        const readable = Readable.from([data]);
        readable.pipe(paragraphStream);
        // const file = fs.createReadStream(path);
        // file.pipe(paragraphStream);
    });
}

function read_control_file(path) {
    return new Promise((resolve, reject) => {
        parse_control_file(path).then((pars) => {
            let manifest = translate_control_paragraphs(pars);
            resolve(manifest);
        });
    });
}


async function parse_ports(rootpath) {
    return Promise.all(
        glob
        .sync('*/**/{vcpkg.json,CONTROL}', {cwd: path.resolve(rootpath), absolute: true})
        .sort()
        .reduce((acc, pkg_file) => {
                let tail = acc.slice(-1)[0];
                if(tail && path.dirname(tail) == path.dirname(pkg_file)){
                    if(path.basename(pkg_file) == 'vcpkg.json') {
                        acc[acc.length - 1] = pkg_file;
                        console.log('replacing CONTROL with vcpkg.json');
                    }
                    else {
                        console.log('ignoring CONTROL for vcpkg.json');
                    }
                }
                else {
                    acc.push(pkg_file);
                }
                return acc;
            },
        [])
        .map((pkg_file) => {
            return new Promise((resolve, reject) => {
                if(path.basename(pkg_file) == 'CONTROL') {
                    read_control_file(pkg_file).then((data) => { resolve(data); });
                }
                else { // assume vcpkg.json
                    resolve(require(pkg_file));
                }
            });
        })
    );
}

function build_ports_index(rootpath, output, write_json = false) {
    let base_path = () => {
        return path.resolve(output || 'vcpkg-index');
    }
    let out_json = () => {
        return path.resolve(base_path() + '.json');
    };
    let out_nedb = () => {
        return path.resolve(base_path() + '.nedb');
    };

    parse_ports(rootpath).then((ports) => {
        // write json index?
        if(write_json) {
            let ports_idx = ports.reduce((acc, port) => {
                if(port['name']) {
                    acc[port.name] = port;
                }
                else {
                    console.log(`[${'<unknown>'.blue}] port is ${'missing name or empty'.yellow} ${log_data(port)}`);
                }
                return acc;
            }, {});
            
            fs.writeFileSync(out_json(), JSON.stringify(ports_idx));
        }

        // build nedb
        if(fs.existsSync(out_nedb())) {
            console.warn('deleting vcpkg-index.nedb');
            try {
                fs.unlinkSync(out_nedb());
            } catch (err) {
                console.error('error deleting', out_nedb(), '-', err);
                process.exit(1);
            }
        }
    
        let db = new DB({ filename: out_nedb(), autoload: true });

        db.insert(
            ports.map((pkg) => {
              // drop: $<key> and _id
              let drop_restricted = (obj) => {
                Object.keys(obj).forEach((key) => {
                  if (key[0] == "$" || key == "_id") {
                    delete obj[key];
                  }
                  if (typeof obj[key] === "object" && obj[key] !== null) {
                    drop_restricted(obj[key]);
                  }
                });
              };
              drop_restricted(pkg);
              // make full text search property
              return Object.assign(
                {},
                {
                  fts: [
                    pkg["name"] || "",
                    pkg["homepage"] || "",
                    ((m) => {
                      return Array.isArray(m) ? m : [m];
                    })(pkg["maintainers"] || []).join(" "),
                    Object.keys(pkg["features"] || {})
                      .map((feature) => {
                        return `${feature} ${
                          pkg.features[feature]["description"] || ""
                        }`;
                      })
                      .join(" "),
                    (Array.isArray(pkg.description)
                      ? pkg.description
                      : [pkg.description]
                    ).join(" "),
                  ]
                    .join(" ")
                    .toLowerCase(),
                },
                pkg
              );
            }),
            (err, docs) => {
              if (err) {
                console.log(`an error occured while inserting packages to db: ${err}`);
                process.exit(1);
              }
            }
          );
      
    });
}

module.exports.read_control_file = read_control_file
module.exports.parse_ports = parse_ports
module.exports.build_ports_index = build_ports_index;


if (require.main === module) {
    let args = process.argv.slice(2);

    if(args.length != 1) {
        console.log('usage: node makeindex <path/to/vcpkg/ports>');
        process.exit(1);
    }
    
    if(!fs.existsSync(path.resolve(args[0]))) {
        console.error(`provided path does not exist! (${args[0]})`);
        process.exit(1);
    }

    build_ports_index(args[0]);
}