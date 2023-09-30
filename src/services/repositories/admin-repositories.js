const moment = require("moment/moment");
const { queryMethods } = require(`./query-methods`);

module.exports.admin = {
  save: async (params) => {
    params["admin_id"]=""
    if (params.admin_type !== "SUPER_ADMIN") {
      let todaName = params.toda_id.split("~")[1];
      params.admin_id = "admin~" + todaName + "~" + moment().unix();
    }
    const columns = Object.keys(params);
    const data = Object.values(params);
    await queryMethods.insert("tbl_toda_admin", columns, data);
    return {};
  },
  get: async (conditions = "", options = "") => {
    let item = await queryMethods.select(
      "tbl_toda_admin",
      [],
      conditions,
      options
    );
    return item;
  },
  update: async (data, conditions) => {
    await queryMethods.update("tbl_toda_admin", data, conditions);
    return {};
  },
  delete: async (conditions) => {
    await queryMethods.delete("tbl_toda_admin", conditions);
    return {};
  },
};
