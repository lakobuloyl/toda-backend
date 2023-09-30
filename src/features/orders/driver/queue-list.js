const moment = require("moment");
const { decodeToken } = require("../../../services/jwt/jwt");

const {
  queueingRepositories,
} = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { query, headers } = req;

    let setParams = ` where 
    terminal_id="${query.terminal_id}" AND 
    status="ONQUEUE"`;
    let getItem = await queueingRepositories.get(setParams);
    let formatResult = getItem.map((item, index) => {
      return {
        order: index + 1,
        queue_id: item.queue_id,
        driver_id: item.driver_id,
        terminal_id: item.terminal_id,
        plate_number: item.plate_number,
      };
    });
    res.send({ data: formatResult });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
