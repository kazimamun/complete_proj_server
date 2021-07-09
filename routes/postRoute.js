const router = require('express').Router();
const {getAllPost,createPost, getSinglePost, deletePostById} = require('../controllers/postController');

router.get('/allPost', getAllPost);
router.post('/createPost', createPost);
router.get('/posts/:id', getSinglePost);
router.delete('/delete/:id', deletePostById);

module.exports = router;