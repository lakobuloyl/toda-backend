
const { driverRepositories, userRepositories } = require("../../../services/repositories/index");
const { hashPasswords } = require("../../../services/auth/bcrypt");
const { user } = require("../../../services/repositories/user-repositories");
module.exports = async function (req, res) {
  try {
    const { query, body } = req;
    const { user_accounts, driver_details } = body;
    let setParams = `where user_id="${query.user_id}"`; 
    let checkExist = await userRepositories.get(setParams);  
    if (checkExist.length <= 0)
      return res.status(409).send({ message: "Driver dont exist" });
    if (body.password) {
      body.password = await hashPasswords(body.password);
    }
    await userRepositories.update(user_accounts, `user_id="${query.user_id}"`);  
    await driverRepositories.update(
      driver_details,
      `user_id="${query.user_id}"`
    );  
    res.send({
    });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
