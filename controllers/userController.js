const sql = require("../connection/db");
const registerValidator = require('../validator/registerValidator');
const {serverError, resourceError} = require('../utils/error');
const bcrypt = require('bcrypt');
module.exports={
    register(req, res){
        let {name, email, password, confirmPassword, gender, country} = req.body;
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
                        sql.query("INSERT INTO users SET ?", {name, email, password: hash, gender, country}, (err, result) => {
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