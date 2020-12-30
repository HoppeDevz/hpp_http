const hpp_http = require("./index");
const app = hpp_http.createApplication();

app.get("/test", (req, res) => {
    console.log(req.headers);
    res.status(200).send({ api: true });
});

app.post("/test_post", (req, res) => {
    console.log(req.headers);
    const bodyparam = req.body['body-param'];
    res.status(200).send({ bodyparam });
});

app.use(hpp_http.hppJson);
app.listen(30120, () => console.log("Server is running in port 30120"));