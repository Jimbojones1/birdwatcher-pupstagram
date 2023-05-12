require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const favicon = require("serve-favicon");

require("./config/database");

// Require controllers here

const app = express();

app.set('view engine', 'ejs');
// add in when the app is ready to be deployed
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger("dev"));
app.use(express.json()); // parses json http requests, to make them availiable on 
// req.body


// Configure the auth middleware
// This decodes the jwt token, and assigns
// the user information to req.user
app.use(require("./config/auth"));
// api routes must be before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api', require('./routes/api/likes'));

const manifest = require('./dist/manifest.json');

app.use(express.static(path.join(__dirname, "dist")));

// "catch all" route
app.get('/*', function(req, res) {
  res.render(path.join(__dirname, 'dist', 'index.ejs'), {manifest});
});




const { PORT = 8000 } = process.env;
app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
