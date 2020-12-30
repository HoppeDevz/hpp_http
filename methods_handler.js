const handlerfn = require("./handlerfn");

module.exports = {
    'GET': handlerfn.GetMethodHandler,
    'POST': handlerfn.PostMethodHandler
}