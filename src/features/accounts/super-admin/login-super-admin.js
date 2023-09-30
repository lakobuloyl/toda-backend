const { comparePass } = require("../../../services/auth/bcrypt");
const { generateAppAccessToken } = require("../../../services/jwt/jwt");
const {
  adminRepositories,
} = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { body } = req;
    let setParams = ` where username="${body.username}"`;
    let admin = await adminRepositories.get(setParams);
    let passwordCompare = await comparePass(body.password, admin[0].password);
    if (!passwordCompare)
      return res
        .status(309)
        .send({ message: "Password or Email is Incorrect" });
    let setToken = {
      admin_type:"SUPER_ADMIN",
      username: admin[0].username,
    };
    let accessToken = await generateAppAccessToken(setToken);

    res.send({ Authorization: accessToken });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
