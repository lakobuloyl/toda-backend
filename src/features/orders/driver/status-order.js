const moment = require("moment");
const { decodeToken } = require("../../../services/jwt/jwt");

const { orderRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { query, headers } = req;
    const { status } = query;
    let setParams = ` where order_id="${query.order_id}"`;
    let getItem = await orderRepositories.get(setParams);
    if (getItem.length <= 0)
      return res.status(409).send({ message: "order dont exist" });
    let params = { status: status };
    if (status === "PICKUP") {
      params["pickUpDate"] = moment().format();
    } else if (status === "DROP") {
      params["completeDate"] = moment().format();
    } else if (status === "CANCEL") {
      params["cancelDate"] = moment().format();
    } else {
         return res.status(500).send({ message: "status params is required" });
    }
    await orderRepositories.update(params, ` order_id="${query.order_id}"`);
    res.send({});
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
