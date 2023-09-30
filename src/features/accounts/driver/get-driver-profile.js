
const { decodeToken } = require("../../../services/jwt/jwt");
const { driverRepositories, userRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { headers } = req;
    let decoded = decodeToken(headers.authorization);
    let setParams = `where user_id="${decoded.user_id}"`; 
    let user = await userRepositories.get(setParams);  
    let driver = await driverRepositories.get(setParams);  
    console.log(decoded);
    res.send({
      user_accounts: user[0],
      driver_details: driver[0],
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
