const sql = require("../connection/db");
const registerValidator = require('../validator/registerValidator');
const loginValidator = require('../validator/loginValidator');
const {serverError, resourceError} = require('../utils/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports={
    register(req, res){
        let {name, email, password, confirmPassword, gender} = req.body;
        let validate = registerValidator({name, email, password, confirmPassword}); 
        
        if (!validate.isValid){
            return res.status(400).json(validate.error)
        } else { 
            sql.query(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {  
                if(user.length===0){
                    bcrypt.hash(password, 11, (err, hash)=>{
                        if(err){
                            return serverError(res, err)
                        }
                        sql.query("INSERT INTO users SET ?", {name, email, password: hash, gender}, (err, result) => {
                            if (err) {
                              console.log("error: ", err);
                              return;
                            }        
                            console.log("user register successfully",result)
                        });
                    });
                    
                } else {
                    return resourceError(res, "Email Already Exist");
                }
            });
        }        
    },
    login(req, res){
        let {email, password} = req.body;
        let validate = loginValidator({email, password});
        if (!validate.isValid){
            return res.status(400).json(validate.error)
        }
        sql.query(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {  
            if (!user.length){
                return resourceError(res, "user not found")
            } else { //if user exist on database
                bcrypt.compare(password, user[0].password, (err, result)=>{
                    if (err) {
                        serverError(res, err)
                    }
                    if (!result) { // if password not matched
                        resourceError(res, "Password dosen't matched")
                    }
                    //make token for provide user time for login
                    let token = jwt.sign({
                        // _id : user._id,
                        name : user.name,
                        email : user.email
                    }, "SECRET", {expiresIn: "2h"})

                    res.status(200).json({
                        message: "login successfully",
                        token : `Barer ${token}`
                    })
                })
            }
        })
    },
    allUsers(req, res){
        sql.query("SELECT * FROM users", (err, result) => {
            if (err) {
              console.log("error: ", err);
              return;
            }        
            res.send(result)
        });
    }
}