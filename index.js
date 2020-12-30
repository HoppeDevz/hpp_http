const http = require("http");
const errors = require("./errors");
const methods_handler = require("./methods_handler");
let server;

let ContentType = 'text/plain'; // default ContentType;
let hppJson = () => ContentType = 'application/json';
let hppCustomContentType = (_custom = String(_custom)) => ContentType = _custom;

let get_arr = [];
let post_arr = [];

let createApplication = () => {
    return {
        use: (fn) => {
            fn();
        },

        get: (path, callback) => {
            get_arr.push([path, callback]);
        },

        post: (path, callback) => {
            post_arr.push([path, callback]);
        },

        listen: (_port, fn) => {
            if (isNaN(Number(_port))) throw (errors.NotPortValidFormat(_port));

            _port = Number(_port);

            let return_value = 
            http.createServer((req, res) => {
                () => [res.writeHead(200, {  'Content-Type': ContentType }), res.setHeader(200, {  'Content-Type': ContentType })];
                switch (req.method) {
                    case 'GET':
                        return methods_handler['GET'](req, res, get_arr);
                        break;
                    case 'POST':
                        return methods_handler['POST'](req, res, post_arr);
                        break;
                }
            });

            fn();
            server = return_value;
            return_value.listen(_port);
        }
    }
}

module.exports = {
    hppJson,
    createApplication
}
