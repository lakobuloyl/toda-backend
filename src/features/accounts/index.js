// super admin
const setSuperAdmin = require("./super-admin/create-super-admin");
const superAdminLogin = require("./super-admin/login-super-admin");

// admin accounts
const createAdmin = require("./admin/create-admin");
const getAllAdmin = require("./admin/get-all-admin");
const getByIdAdmin = require("./admin/get-by-id-admin");
const updateAdmin = require("./admin/update-admin");

const loginAdmin = require("./admin/login-admin");
const profileAdmin = require("./admin/get-admin-profile");

const createDriver = require("./driver/create-driver");
const getAllDriver = require("./driver/get-all-driver");
const getbyidDriver = require("./driver/get-by-id-driver");
const updateDriver = require("./driver/update-driver");

const loginDriver = require("./driver/login-driver");
const profileDriver = require("./driver/get-driver-profile");

const registerUser = require("./users/register-user");
const loginUser = require("./users/login-user");
const profileUser = require("./users/get-user-profile");
const updateUser = require("./users/update-user");

module.exports = {
  setSuperAdmin,
  superAdminLogin,

  createAdmin,
  getAllAdmin,
  getByIdAdmin,
  updateAdmin,

  loginAdmin,
  profileAdmin,

  createDriver,
  getAllDriver,
  getbyidDriver,
  updateDriver,

  loginDriver,
  profileDriver,

  registerUser,
  loginUser,
  profileUser,
  updateUser,
};
