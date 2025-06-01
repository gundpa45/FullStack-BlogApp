const express = require("express")

  // Initialize the upload middleware with the storage config

const router = express.Router();
const userController = require('../controllers/auth')
const {auth} = require("../middleware.js/Auth")
const multer = require('multer'); 
const filter = require("../controllers/SearchFilter")



  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
const commentController = require("../controllers/comment")
router.post('/signup',userController.signup)
router.post('/verifyOtp',userController.verifyOtp)
router.post('/login',userController.login)
router.post('/create',auth,upload.single('image'),userController.createBlog)
router.get('/profile',auth,userController.profile)

router.put("/updateBlog/:blogId",auth,userController.updateBlog)


  
router.delete("/deleteBlog/:blogId",auth,userController.deleteBlog)


router.put('/like/:blogId',auth,userController.likeBlog)

router.get('/getallblogs',userController.getAllBlogs)
router.get('/blogs',filter.getCategory)
router.get('/blogs/:id',filter.getBlogDetails)
router.post('/forgotpassword',userController.getForgotPassword)
router.put("/updatepassword/:userId",userController.updatePassword)
router.post("/verifyotpPassword",userController.verifyOtpForPassword)
router.get("/getcomments/:blogId", commentController.getComments);
router.post("/comments/:blogId", auth, commentController.postComments);
module.exports = router
