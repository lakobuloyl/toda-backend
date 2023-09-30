const { hashPasswords } = require("../../../services/auth/bcrypt");
const { userRepositories } = require("../../../services/repositories/index");
const moment = require("moment");

module.exports = async function (req, res) {
  try {
    const { user_accounts } = req.body;
    user_accounts["user_id"] = "custId~" + moment().unix();
    user_accounts["user_type"] = "CUSTOMER";
    user_accounts.password = await hashPasswords(user_accounts.password);
    let setParams = ` where username="${user_accounts.username}" AND user_type="CUSTOMER"`;
    let checkExist = await userRepositories.get(setParams);
    if (checkExist.length > 0)
      return res.status(409).send({ message: "Username is already exist" });

    await userRepositories.save(user_accounts);
    res.send({});
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
