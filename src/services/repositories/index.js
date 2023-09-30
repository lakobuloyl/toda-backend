module.exports = {
  queryReposity: require("./query-methods"),
  adminRepositories: require("./admin-repositories").admin,
  driverRepositories: require("./driver-repositories").driver,
  todaRepositories: require("./toda-repositories").toda,
  terminalRepositories: require("./toda-repositories").terminal,
  superAdminRepositories: require("./super-admin-repositories").superAdmin,
  userRepositories: require("./user-repositories").user,
  queueingRepositories: require("./transaction-repositories").queuing,
  orderRepositories: require("./transaction-repositories").order,
};
