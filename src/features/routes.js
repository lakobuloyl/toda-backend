const express = require("express");
const router = express.Router();

const {
  validateTokenSuperAdmin,
  validateTokenAdmin,
  validateTokenUser,
} = require("../services/jwt/jwt");

// super admin
const { setSuperAdmin, superAdminLogin } = require("./accounts/index");

router.post("/v1/superAdmin", setSuperAdmin);
router.post("/v1/superAdminLogin", superAdminLogin);

// accounts admin
const {
  createAdmin,
  getAllAdmin,
  getByIdAdmin,
  updateAdmin,
  loginAdmin,
  profileAdmin,
} = require("./accounts/index");

router.post("/v1/admin", validateTokenSuperAdmin, createAdmin);
router.get("/v1/admin", validateTokenSuperAdmin, getAllAdmin);
router.put("/v1/admin", validateTokenSuperAdmin, updateAdmin);
router.get("/v1/admin/id", validateTokenSuperAdmin, getByIdAdmin);

router.post("/v1/admin/login", loginAdmin);
router.get("/v1/admin/profile", validateTokenAdmin, profileAdmin);

// accounts driver

const {
  createDriver,
  getAllDriver,
  getbyidDriver,
  updateDriver,
  loginDriver,
  profileDriver,
} = require("./accounts/index");

router.post("/v1/driver", validateTokenAdmin, createDriver);
router.get("/v1/driver", validateTokenAdmin, getAllDriver);
router.get("/v1/driver/id", validateTokenAdmin, getbyidDriver);
router.put("/v1/driver", validateTokenAdmin, updateDriver);

router.post("/v1/driver/login", loginDriver);
router.get("/v1/driver/profile", validateTokenUser, profileDriver);

// accounts user

const {
  registerUser,
  loginUser,
  profileUser,
  updateUser,
} = require("./accounts/index");

router.post("/v1/user", registerUser);
router.post("/v1/user/login", loginUser);
router.get("/v1/user/profile", validateTokenUser, profileUser);
router.put("/v1/user", validateTokenUser, updateUser);

// toda
const {
  createToda,
  getAllToda,
  getByIdToda,
  updateToda,
  deleteToda,
} = require("./toda/index");

router.post("/v1/toda", validateTokenSuperAdmin, createToda);
router.get("/v1/toda", validateTokenSuperAdmin, getAllToda);
router.get("/v1/toda/id", validateTokenSuperAdmin, getByIdToda);
router.put("/v1/toda", validateTokenSuperAdmin, updateToda);
router.delete("/v1/toda", validateTokenSuperAdmin, deleteToda);

const {
  createTerminal,
  getAllTerminal,
  getByIdTerminal,
  updateTerminal,
  deleteTerminal,
} = require("./toda/index");

router.post("/v1/terminal", validateTokenAdmin, createTerminal);
router.get("/v1/terminal", validateTokenAdmin, getAllTerminal);
router.get("/v1/terminal/id", validateTokenAdmin, getByIdTerminal);
router.put("/v1/terminal", validateTokenAdmin, updateTerminal);
router.delete("/v1/terminal", validateTokenAdmin, deleteTerminal);

/// orders driver

const { queueDriver, queueList, acceptOrder, unqueueDriver, queueHistory, listOrder,statusOrder } = require("./orders/index");

router.post("/v1/order/queueDriver", validateTokenUser, queueDriver);
router.post("/v1/order/unqueueDriver", validateTokenUser, unqueueDriver);
router.get("/v1/order/queueList", validateTokenUser, queueList);
router.get("/v1/order/queueHistory", validateTokenUser, queueHistory);

router.get("/v1/order/driver/list", validateTokenUser, listOrder);
router.post("/v1/order/driver", validateTokenUser, acceptOrder);
router.post("/v1/order/driver/status", validateTokenUser, statusOrder);


/// orders user

const { createOrder } = require("./orders/index");

router.post("/v1/order", validateTokenUser, createOrder);

module.exports = router;
