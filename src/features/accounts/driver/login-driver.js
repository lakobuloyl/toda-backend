const { comparePass } = require("../../../services/auth/bcrypt");
const { generateAppAccessToken } = require("../../../services/jwt/jwt");
const { driverRepositories, userRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { body } = req;
    let setParams = ` where username="${body.username}"`;
    let getItem = await userRepositories.get(setParams);
    if (!getItem[0])
      return res.status(309).send({ message: "Username  is Incorrect" });
    let passwordCompare = await comparePass(body.password, getItem[0].password);
    if (!passwordCompare)
      return res.status(309).send({ message: "Password  is Incorrect" });
    let setToken = {
      user_id: getItem[0].user_id,
      username: getItem[0].username,
    };
    let accessToken = await generateAppAccessToken(setToken);

    res.send({ Authorization: accessToken });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
