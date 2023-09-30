const { decodeToken } = require("../../../services/jwt/jwt");
const { userRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { headers } = req;
    let decoded = decodeToken(headers.authorization);
    let setParams = `where user_id="${decoded.user_id}"`;
    let getItem = await userRepositories.get(setParams);
    res.send({
      data: getItem[0],
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
