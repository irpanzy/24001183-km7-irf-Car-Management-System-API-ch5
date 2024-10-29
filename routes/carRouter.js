const router = require("express").Router();

const { carController } = require("../controllers");

router.post("", carController.createCar);
router.get("", carController.getAllCar);
router.get("/:id", carController.getCarById);
router.patch("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;