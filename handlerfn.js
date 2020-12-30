const url = require("url");
const errors = require("./errors");

let requireTypeTable = {
    'string': typeof(""),
    'number': typeof(1),
    'bool': typeof(true),
    'object': typeof({}),
    'array': typeof([])
}

const PostMethodHandler = (req, res, arr) => {
    arr.map(([path, fn]) => {
        const { pathname } = url.parse(req.url);
        if (pathname == path) {

            let res_callback =  {

                status: (_code) => {
                    res.statusCode = _code;
                    return res_callback;
                },

                send: (_value) => {
                    res.end(JSON.stringify(_value));
                    return res_callback;
                }

            }

            const size = parseInt(req.headers['content-length'], 10);
            const buffer = Buffer.allocUnsafe(size);

            let getBodyData = () => {
                return new Promise((resolve, reject) => {
                    req.on('data', chunk => {
                        let pos = 0;
                        const offset = pos + chunk.length;
                        chunk.copy(buffer, pos);
                        pos = offset;
                    }).on('end', () => {
                        let data = JSON.parse(buffer.toString());
                        resolve(data);
                    });
                })
            }

            getBodyData().then(data => {
                let req_callback = {
                    headers: req.headers,
                    body: data,

                    require: (_arr) => {
                        let rejected_values = [];
                        let rejected = false;
                        _arr.map(_parameter => {
                            if (!data[_parameter] && data[_parameter] != 0) {
                                rejected_values.push(_parameter);
                                rejected = true;
                            }
                        })

                        if (rejected) {
                            res_callback.status(400).send(`bad_request -> ${rejected_values.map(rejected_value => `${rejected_value} is null -> `)}`)
                        }
                    },

                    requireHeader: (_arr) => {
                        let rejected_values = [];
                        let rejected = false;
                        _arr.map(_parameter => {
                            if (!req.headers[_parameter] && req.headers[_parameter] != 0) {
                                rejected_values.push(_parameter);
                                rejected = true;
                            }
                        })

                        if (rejected) {
                            res_callback.status(400).send(`bad_request -> ${rejected_values.map(rejected_value => `${rejected_value} is null -> `)}`)
                        }
                    },

                    requireType: (_arr) => {
                        let rejected_values = [];
                        let rejected = false;
                        _arr.map(([_parameter, type]) => {
                            let required_type = requireTypeTable[type];
                            if (typeof(data[_parameter]) != required_type) {
                                rejected_values.push([_parameter, required_type, data[_parameter]]);
                                rejected = true;
                            }
                        });
                        
                        if (rejected) {
                            res_callback.status(400).send(`bad_request -> ${rejected_values.map(rejected_value => ` type of ${rejected_value[0]} is ${typeof(rejected_value[2])} but expected ${rejected_value[1]} -> `)}`)
                        }
                    }
                }

                fn(req_callback, res_callback);
            });
            
        }
    });
}

const GetMethodHandler = (req, res, arr) => {
    arr.map(([path, fn]) => {
        const { pathname } = url.parse(req.url);
        if (pathname == path) {

            let res_callback =  {

                status: (_code) => {
                    res.statusCode = _code;
                    return res_callback;
                },

                send: (_value) => {
                    res.end(JSON.stringify(_value));
                    return res_callback;
                }

            }

            let req_callback = {
                headers: req.headers,

                requireHeader: (_arr) => {
                    let rejected_values = [];
                    let rejected = false;
                    _arr.map(_parameter => {
                        if (!req.headers[_parameter] && req.headers[_parameter] != 0) {
                            rejected_values.push(_parameter);
                            rejected = true;
                        }
                    })

                    if (rejected) {
                        res_callback.status(400).send(`bad_request -> ${rejected_values.map(rejected_value => `${rejected_value} is null -> `)}`)
                    }
                }
            }
            fn(req_callback, res_callback);
        }
    });
}

module.exports = {
    PostMethodHandler,
    GetMethodHandler
}