const router = require("express").Router();

const authenticate = require("../middlewares/authenticate");
const userController = require("../controllers/userController");

router.post("", authenticate(["superadmin"]), userController.createAdmin);
router.get("", userController.findUsers);
router.get("/current-user", authenticate(["admin", "superadmin", "member"]), userController.getCurrentUser);
router.get("/:id", userController.findUserById);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
