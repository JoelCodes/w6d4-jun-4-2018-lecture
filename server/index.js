const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  secret: 'agent man'
}));

const userDataSvc = require('./user-data-svc');
const loginRoutes = require('./login-routes')(userDataSvc);

app.use(loginRoutes);

app.listen(3001, () => {
  console.log('Listening on 3001');
});