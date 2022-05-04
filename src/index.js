const express = require('express');
const app = express();
const router = require("./routes/router");
require("./database")
const server = require('http').Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(router);

const port_number = server.listen(process.env.PORT || 3000);

app.listen(port_number, () => {
  console.log("Server is running at localhost: ", port_number);
});




module.exports = app;