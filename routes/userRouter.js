const router = require("express").Router();

const authenticate = require("../middlewares/authenticate");
const userController = require("../controllers/userController");

router.post("", authenticate(["superadmin"]), userController.createAdmin);
router.get("", authenticate(["admin", "superadmin", "member"]), userController.findUsers);
router.get("/current-user", authenticate(["admin", "superadmin", "member"]), userController.getCurrentUser);
router.get("/:id", authenticate(["admin", "superadmin", "member"]), userController.findUserById);
router.patch("/:id", authenticate(["admin", "superadmin", "member"]), userController.updateUser);
router.delete("/:id", authenticate(["admin", "superadmin", "member"]), userController.deleteUser);

module.exports = router;
