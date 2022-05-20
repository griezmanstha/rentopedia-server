const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
//guard

// seller - customer - admin ->>>>>>>>>>> collection



module.exports.mainGuard = function(req, res, next){
    try{
        // we have to receive the token first from client.....
        const token =  req.headers.authorization.split(" ")[1];
        // it tries to verify the token provided by client
        const data = jwt.verify(token, 'anykey');
        // user id in in data now....
        ///////// ----- ///////////////////
      
        userModel.findOne({_id : data.YourId})
        .then(function(result){
           // all the data of the logged in user is now available in result
            req.userData = result;
            next();

        })
        .catch(function(e){
            res.status(401).json({error : e})
        })
    }
    catch(e){
        res.status(401).json({error : e})
    }
  
    
}






module.exports.verifyUser = function(req, res, next){
    try{
        // we have to receive the token first from client.....
        const token =  req.headers.authorization.split(" ")[1];
        // it tries to verify the token provided by client
        const data = jwt.verify(token, 'anykey');
        // user id in in data now....
        ///////// ----- ///////////////////
      
        userModel.findOne({_id : data.YourId})
        .then(function(result){
           // all the data of the logged in user is now available in result
            req.data = result;
            next();

        })
        .catch(function(e){
            res.status(401).json({error : e})
        })
    }
    catch(e){
        res.status(401).json({error : e})
    }
  
    
}