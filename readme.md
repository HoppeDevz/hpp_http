
<p style="text-align:center" >
<img src="https://miro.medium.com/max/4000/0*9MuDUrkFfwXvA8J5.png" width="200rem">
</p>

#### 🥤 HPP_HTTP (in development)

## <br>

- 🧶 Create application;
```js
    const hpp_http = require("./index");
    const app = hpp_http.createApplication();
```

## <br>

- 🧶 GET route
```js
    app.get("/test", (req, res) => {
        console.log(req.headers);
        res.status(200).send({ api: true });
    });
```

## <br>

- 🧶 POST route
```js
    app.post("/test_post", (req, res) => {
        console.log(req.headers);
        const bodyparam = req.body['body-param'];
        res.status(200).send({ bodyparam });
    });
```

## <br>

- 🧶 Use JSON Content-Type or your custom Content-Type
```js
    app.use(hpp_http.hppJson);
    app.use(hpp_http.hppCustomContentTyp("your-custom-Content-Type"))
```
## <br>

- 🧶 Start Server
```js
    app.listen(_port, callback);
```

