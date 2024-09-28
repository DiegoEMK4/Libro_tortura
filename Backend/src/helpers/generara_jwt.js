const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')

const generarToken = (id='') => {

     return new Promise((resolve,reject) => {

        const payload = {id};
        jwt.sign(payload, process.env.Key_token,{
        expiresIn:'1h' 
        },(err,token) => {
         if(err){
           console.log(err);
           reject("no se creo");
         }else {
         resolve (token);
    }
  })
 })
};

module.exports = { generarToken };