'use strict';

const { UserModel } = require('../models')

module.exports = async (req, res, next) =>{
console.log ('I am a middleware');
if (!req.headers.authorization){
    next('Invalid Login/Please sign in or Sign up');
return;
}

const token = req.headers.authorization.split(' ').pop();
//console.log(token)
try{
const validUser = UserModel.authenticateToken(token);
//console.log(validUser);
const userInfo = await UserModel.findOne({where: {username: validUser.username}});
//console.log(userInfo);
if(userInfo){
    req.user = userInfo;
    req.token = userInfo.token;
    next();
}else{
    next('you are not authorized');
}
} catch(e) { next(e.message || e)
}
}