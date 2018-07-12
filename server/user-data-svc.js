const bcrypt = require('bcrypt');

function getRandomId(){
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let output = '';
  for(let i = 0; i < 6; i++){
    output += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return output;
}

const users = [{id: getRandomId(), email: 'joel@joel.joel', password: bcrypt.hashSync('joel', 12), userName: 'Joel Shinness', github: 'JoelCodes', avatar: 'https://avatars2.githubusercontent.com/u/1128994?s=460&v=4'}];

function delay(timeout = 200){
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function delayResolve(val, timeout = 200){
  return delay(timeout)
    .then(() => val);
}
function getUserById(id){
  return delayResolve(users.find(user => user.id === id));
}

function getUserByEmail(email){
  return delayResolve(users.find(user => user.email === email));
}

function getUserByEmailAndPassword(email, password){
  console.log(email, password);
  return getUserByEmail(email)
    .then((user) => {
      if(user){

        return bcrypt.compare(password, user.password)
          .then((isValid) => {
            if(isValid){
              return user;
            }
            return undefined;
          });
      }
      return undefined;
    });
}

module.exports = {
  getUserById,
  getUserByEmail,
  getUserByEmailAndPassword
};