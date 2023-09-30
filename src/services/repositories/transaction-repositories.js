const moment = require("moment/moment");
const { queryMethods } = require(`./query-methods`);


module.exports.order = {
  save: async (params) => {
      params["order_id"] = "TRN~"+ moment().unix();
    const columns = Object.keys(params);
    const data = Object.values(params);
    await queryMethods.insert("tbl_order", columns, data);
    return {};
  },
  get: async (conditions = "", options = "") => {
    let item = await queryMethods.select(
      "tbl_order",
      [],
      conditions,
      options
    );
    return item;
  },
  update: async (data, conditions) => {
    await queryMethods.update("tbl_order", data, conditions);
    return {};
  },
  delete: async (conditions) => {
    await queryMethods.delete("tbl_order", conditions);
    return {};
  },
};


module.exports.queuing = {
  save: async (params) => {
    const columns = Object.keys(params);
    const data = Object.values(params);
    await queryMethods.insert("tbl_terminal_queue", columns, data);
    return {};
  },
  get: async (conditions = "", options = "") => {
    let item = await queryMethods.select("tbl_terminal_queue", [], conditions, options);
    return item;
  },
  update: async (data, conditions) => {
    await queryMethods.update("tbl_terminal_queue", data, conditions);
    return {};
  },
  delete: async (conditions) => {
    await queryMethods.delete("tbl_terminal_queue", conditions);
    return {};
  },
};
