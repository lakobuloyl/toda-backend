const moment = require("moment/moment");
const { queryMethods } = require(`./query-methods`);

module.exports.user = {
  save: async (params) => {
    const columns = Object.keys(params);
    const data = Object.values(params);
    await queryMethods.insert("tbl_user_accounts", columns, data);
    return {};
  },
  get: async (conditions = "", options = "") => {
    let item = await queryMethods.select("tbl_user_accounts", [], conditions, options);
    return item;
  },
  update: async (data, conditions) => {
    await queryMethods.update("tbl_user_accounts", data, conditions);
    return {};
  },
  delete: async (conditions) => {
    await queryMethods.delete("tbl_user_accounts", conditions);
    return {};
  },
};
