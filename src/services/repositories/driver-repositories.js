const moment = require("moment/moment");
const { queryMethods } = require(`./query-methods`);

module.exports.driver = {
  save: async (params) => {
    const columns = Object.keys(params);
    const data = Object.values(params);
    await queryMethods.insert("tbl_driver_details", columns, data);
    return {};
  },
  get: async (conditions = "", options = "") => {
    let item = await queryMethods.select("tbl_driver_details", [], conditions, options);
    return item;
  },
  update: async (data, conditions) => {
    await queryMethods.update("tbl_driver_details", data, conditions);
    return {};
  },
  delete: async (conditions) => {
    await queryMethods.delete("tbl_driver_details", conditions);
    return {};
  },
};
