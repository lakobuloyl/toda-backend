const { hashPasswords } = require("../../../services/auth/bcrypt");
const {
  userRepositories,
  todaRepositories,
  driverRepositories,
} = require("../../../services/repositories/index");
const moment = require("moment");
module.exports = async function (req, res) {
  try {
    const { user_accounts, driver_details } = req.body;
    let todaName = driver_details.toda_id.split("~")[1]
    let driver_id ="driverId~" + todaName + "~" + moment().unix();
    user_accounts["user_id"] = driver_details["user_id"] = driver_id;
    user_accounts["user_type"] = "DRIVER"
  
    user_accounts.password = await hashPasswords(user_accounts.password);
    let setParams = ` where username="${user_accounts.username}" AND user_type="DRIVER"`;
    let checkExist = await userRepositories.get(setParams);
    let checkToda = await todaRepositories.get(
      ` where toda_id="${driver_details.toda_id}"`
    );
    if (checkToda.length <= 0)
      return res.status(409).send({ message: "Toda does not  exist" });
    if (checkExist.length > 0)
      return res.status(409).send({ message: "Username is already exist" });

    await userRepositories.save(user_accounts);
    await driverRepositories.save(driver_details);
    res.send({});
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
