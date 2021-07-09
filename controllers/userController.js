const sql = require("../connection/db");
module.exports={
    register(req, res){
        let {name, email, password, gender, country} = req.body;
        sql.query(`SELECT * FROM users WHERE email = ${email}`, (err, user) => {        
            if (!user) {
                sql.query("INSERT INTO users SET ?", {name, email, password, gender, country}, (err, result) => {
                    if (err) {
                      console.log("error: ", err);
                      return;
                    }        
                    console.log("user register successfully",result)
                  });
            } else if (user){                
                console.log('user exists')  
            }
        });
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