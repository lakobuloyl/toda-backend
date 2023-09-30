const moment = require("moment");
const { decodeToken } = require("../../../services/jwt/jwt");

const {
  queueingRepositories,
  driverRepositories,
} = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { body, headers } = req;
    const { remarks } = body;
    let driver_id = decodeToken(headers.authorization).user_id;

    let setParams = ` where 
    driver_id="${driver_id}" AND 
    status="ONQUEUE"`;
    let getItem = await queueingRepositories.get(setParams);

    if (!getItem[0])
      return res.status(409).send({ message: "Driver Queued dont exist" });

    let createParams = {
      status: "REMOVE",
      update_date: moment().format(),
      remarks: remarks,
    };

    await queueingRepositories.update(
      createParams,
      `queue_id="${getItem[0].queue_id}"`
    );
    res.send({});
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
