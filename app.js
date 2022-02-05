const Express = require('express');
const Router = require('./routes');
const { sequelize, Word } = require('./models');


async function initialize() {
  const app = Express();
  
  app.use(Express.json());
  app.use("/api", Router);

  await sequelize.sync();

  app.listen(8000, () => {
    console.log("Running application on port 8000")
  })
}

initialize();
