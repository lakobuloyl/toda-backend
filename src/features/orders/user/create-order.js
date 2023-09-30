const moment = require("moment");
const { decodeToken } = require("../../../services/jwt/jwt");

const {
  orderRepositories,
} = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { body, headers } = req;
    let {user_id} = decodeToken(headers.authorization);
    let createParams = {
      user_id,
      ...body,
      status: "PENDING",
      orderDate:moment().format()
    };
    await orderRepositories.save(createParams);
    res.send({});
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
