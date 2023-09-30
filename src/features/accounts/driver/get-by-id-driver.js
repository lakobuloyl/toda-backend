const {
  userRepositories,
  driverRepositories,
} = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { query } = req;
    let setParams = `where user_id="${query.user_id}"`;
    let user = await userRepositories.get(setParams);
    let driver = await driverRepositories.get(setParams);
    
    res.send({
      data: {
        user_accounts: user[0],
        driver_details: driver[0],
      },
    });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
