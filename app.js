const Express = require('express');
const Router = require('./routes');
const { sequelize, Word } = require('./models');


async function initialize() {
  const app = Express();
  
  app.use(Express.json());
  app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
    res.set("Access-Control-Allow-Headers", "Content-type")
    next();
  })
  app.use("/api", Router);

  app.get("/cookie", (req, res) => {
    res.setHeader("Set-Cookie", "name=jatin")

    res.send("Hello World")
  })

  await sequelize.sync();

  app.listen(8000, () => {
    console.log("Running application on port 8000")
  })
}

initialize();
