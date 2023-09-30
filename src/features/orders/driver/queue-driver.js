const moment = require("moment");
const { decodeToken } = require("../../../services/jwt/jwt");

const {
  queueingRepositories,
  driverRepositories,
} = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { query, headers } = req;
    const { terminal_id } = query;
    let driver_id = decodeToken(headers.authorization).user_id;

    let setParams = ` where 
    terminal_id="${terminal_id}" AND 
    driver_id="${driver_id}" AND 
    status="ONQUEUE"`;
    let getItem = await queueingRepositories.get(setParams);
    let getDriver = await driverRepositories.get(
      ` where user_id="${driver_id}"`
    );
    if (getItem[0])
      return res.status(409).send({ message: "Driver is already Queued Up" });

    let createParams = {
      queue_id: "QID~" + driver_id.split("~")[2] + "~" + moment().unix(),
      driver_id: driver_id,
      terminal_id: terminal_id,
      status: "ONQUEUE",
      plate_number: getDriver[0].plate_number,
      queuing_date: moment().format(),
    };

    await queueingRepositories.save(createParams);
    res.send({});
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
