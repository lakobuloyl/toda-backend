const { queryMethods } = require(`./query-methods`);
const moment = require("moment/moment");
module.exports.superAdmin = {
  save: async (params) => {
    const columns = Object.keys(params);
    const data = Object.values(params);
    await queryMethods.insert("tbl_toda_admin", columns, data);
    return {};
  },
  get: async (conditions = "", options = "") => {
    let admin = await queryMethods.select("admin", [], conditions, options);

    return admin;
  },
};
