const sql = require("../connection/db");
const validator = require('validator');
require('dotenv').config();
module.exports = {
    adminByEmail(req, res){
        let {email} = req.params;
        let result = validator.isEmail(email);
        if(!result){
            res.send('wrong email')
        }
        sql.query(`SELECT * FROM admin WHERE email = ?`, [email], (err, admin) => {  
            if(err){
                return err;
            }
            console.log(admin[0].name)
            res.send('admin route')
            console.log(process.env.adminPin)
        })
    }
}