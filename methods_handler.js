const url = require("url");
const errors = require("./errors");

module.exports = {
    'GET': (req, res, arr) => {
        arr.map(([path, fn]) => {
            const { pathname } = url.parse(req.url);
            if (pathname == path) {
                let res_callback = {
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
                    headers: req.headers
                }

                fn(req_callback, res_callback);
            }
        });
    },

    'POST': (req, res, arr) => {
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
                        body: data
                    }
    
                    fn(req_callback, res_callback);
                });
                
            }
        });
    }
}