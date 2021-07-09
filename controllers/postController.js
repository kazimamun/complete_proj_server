const sql = require("../connection/db");
module.exports={
    getAllPost(req, res){
        sql.query("SELECT * FROM posts", (err, result) => {
            if (err) {
              console.log("error: ", err);
              return;
            }        
            res.send(result)
        });
    },
    createPost(req,res){
        let {post_title, post_body, email} = req.body;
        sql.query("INSERT INTO posts SET ?", {post_title, post_body, email}, (err, result) => {
            if (err) {
              console.log("error: ", err);
              return;
            }        
            res.send(result)
          });
    },
    getSinglePost(req, res){
        let {id} = req.params;
        sql.query(`SELECT * FROM posts WHERE id = ${id}`, (err, result) => {
            if (err) {
              console.log("error: ", err);
              return;
            }
        
            if (result.length) {
              console.log("found post: ", result[0]);
              res.send(result);
            }        
          });
    },
    deletePostById(req, res){
        let {id} = req.params;
        sql.query("DELETE FROM posts WHERE id = ?", id, (err, result) => {
            if (err) {
              console.log("error: ", err);
              return;
            }
        
            if (result.affectedRows == 0) {
              console.log(`${id} no post deleted`)
            }
        
            console.log("deleted post with id: ", id);
          });
    }
}