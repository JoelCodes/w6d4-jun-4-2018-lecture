module.exports = function(userDataSvc){
  const LoginRouter = require('express').Router();
  LoginRouter.use(async (req, res, next) => {
    req.user = await userDataSvc.getUserById(req.session.userId);
    next();
  });

  LoginRouter.post('/login', async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    const user = await userDataSvc.getUserByEmailAndPassword(email, password);
    if(user){
      req.session.userId = user.id;
      res.json(user);
    } else {
      res.status(401).json({error: 'Email and Password combination not found.'})
    }
  });

  LoginRouter.post('/logout', (req, res) => {
    req.session = null;
    res.sendStatus(202);
  });

  LoginRouter.get('/me', (req, res) => {
    if(req.user){
      res.json(req.user);
    } else {
      res.sendStatus(401);
    }
  });
  return LoginRouter;
}