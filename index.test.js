const hpp_http = require("./index");
const app = hpp_http.createApplication();

app.get("/test", (req, res) => {
    console.log(req.headers);
    res.status(200).send({ api: true });
});

app.post("/test_post", (req, res) => {
    const param_x = req.body['param-x'];
    res.status(200).send({ param_x });
});

app.post("/test_post_required", (req, res) => {
    const param_x = req.body['param-x'];
    const param_y = req.body['param-y'];
    const param_z = req.body['param-z'];
    req.require(['param-x', 'param-y', 'param-z']);
    res.status(200).send({ param_x, param_y, param_z });
})

app.use(hpp_http.hppJson);
app.listen(30120, () => console.log("Server is running in port 30120"));