const moment = require("moment");
const { decodeToken } = require("../../../services/jwt/jwt");

const {
  queueingRepositories,
} = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { query, headers } = req;
    const { status } = query;
    let driver_id = decodeToken(headers.authorization).user_id;

    let setParams = ` where 
    driver_id="${driver_id}" `;
    if (status) {
      setParams = setParams + ` AND status="${status}"`;
    }
    let getItem = await queueingRepositories.get(setParams);
    let formatResult = getItem.map((item) => {
      return {
        plate_number: item.plate_number,
        queuing_date: item.queuing_date,
        update_date: item.update_date,
        status: item.status,
        remarks: item.remarks,
      };
    });
    res.send({ data: formatResult });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
