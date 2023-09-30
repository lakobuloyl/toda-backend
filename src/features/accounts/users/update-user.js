const { userRepositories } = require("../../../services/repositories/index");
const { decodeToken } = require("../../../services/jwt/jwt");
const { hashPasswords } = require("../../../services/auth/bcrypt");
module.exports = async function (req, res) {
  try {
    const { query, body, headers } = req;

    let decoded = decodeToken(headers.authorization);
    let setParams = `where user_id="${decoded.user_id}"`;
    let checkExist = await userRepositories.get(setParams);
    if (checkExist.length <= 0)
      return res.status(409).send({ message: "admin dont exist" });
    if (body.password) {
      body.password = await hashPasswords(body.password);
    }
    await userRepositories.update(body, `user_id="${decoded.user_id}"`);
    res.send({});
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
