const moment = require("moment/moment");
const { queryMethods } = require(`./query-methods`);

module.exports.toda = {
  save: async (params) => {
    let removespaces = params.toda_name.replace(/ /g, "");
    params["toda_id"] =
      "toda~" + removespaces.toLowerCase() + "~" + moment().unix();
    const columns = Object.keys(params);
    const data = Object.values(params);
    await queryMethods.insert("tbl_toda", columns, data);
    return {};
  },
  get: async (conditions = "", options = "") => {
    let item = await queryMethods.select("tbl_toda", [], conditions, options);
    return item;
  },
  update: async (data, conditions) => {
    await queryMethods.update("tbl_toda", data, conditions);
    return {};
  },
  delete: async (conditions) => {
    await queryMethods.delete("tbl_toda", conditions);
    return {};
  },
};

module.exports.terminal = {
  save: async (params) => {
    let todaName = params.toda_id.split("~")[1];
    params["terminal_id"] =
      "terminal~" + todaName.toLowerCase() + "~" + moment().unix();
    const columns = Object.keys(params);
    const data = Object.values(params);
    await queryMethods.insert("tbl_terminal", columns, data);
    return {};
  },
  get: async (conditions = "", options = "") => {
    let item = await queryMethods.select("tbl_terminal", [], conditions, options);
    return item;
  },
  update: async (data, conditions) => {
    await queryMethods.update("tbl_terminal", data, conditions);
    return {};
  },
  delete: async (conditions) => {
    await queryMethods.delete("tbl_terminal", conditions);
    return {};
  },
};
