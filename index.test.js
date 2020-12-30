const hpp_http = require("./index");
const app = hpp_http.createApplication();

app.get("/test", (req, res) => {
    console.log(req.headers);
    res.status(200).send({ api: true });
});

app.get("/test_require_header", (req, res) => {
    console.log(req.headers);
    const header_x = req.headers['header-x'];
    req.requireHeader(['header-x']);
    res.status(200).send({ header_x });
});

app.post("/test_post", (req, res) => {
    const param_x = req.body['param-x'];
    res.status(200).send({ param_x });
});

app.post("/test_requireType", (req, res) => {
    const param_x = req.body['param-x'];
    req.require(["param-x"]);
    req.requireType([
        ["param-x", "string"] // param_x must be a string
    ]);

    res.status(200).send({ param_x });
});

app.post("/test_post_required", (req, res) => {
    const param_x = req.body['param-x'];
    const param_y = req.body['param-y'];
    const param_z = req.body['param-z'];
    req.require(['param-x', 'param-y', 'param-z']);
    res.status(200).send({ param_x, param_y, param_z });
});

app.use(hpp_http.hppJson);
app.listen(30120, () => console.log("Server is running in port 30120"));