const { Router } = require("express");
const { Signup, Login, getProfile, Logout } = require("../controller/UserControllers");

const router = Router();


router.post("/signup", Signup);
router.post("/login", Login);
router.get("/profile",getProfile);
router.post("/logout",Logout);
module.exports = router;
