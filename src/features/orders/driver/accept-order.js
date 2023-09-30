const moment = require("moment");
const { decodeToken } = require("../../../services/jwt/jwt");

const {
  orderRepositories,
  queueingRepositories,
} = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { query, headers } = req;
    let driver_id = decodeToken(headers.authorization).user_id;

    let setParams = ` where order_id="${query.order_id}"`;
    let getItem = await orderRepositories.get(setParams);
    if (getItem.length <= 0)
      return res.status(409).send({ message: "order dont exist" });
    let selectParams = ` where 
    driver_id="${driver_id}"   AND 
    status="ONQUEUE"`;
    let checkQueuing = await queueingRepositories.get(selectParams);
    if (checkQueuing.length <= 0)
      return res
        .status(409)
        .send({ message: "You're not in the queuing list" });
    await orderRepositories.update(
      {
        driver_id: driver_id,
        acceptDate: moment().format(),
        status: "ACCEPTED",
      },
      ` order_id="${query.order_id}"`
    );
    res.send({});
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
