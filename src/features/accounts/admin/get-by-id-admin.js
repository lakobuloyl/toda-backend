
const { adminRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { query } = req;
    let setParams = `where admin_id="${query.admin_id}"`; 
    let getItem = await adminRepositories.get(setParams);  
    console.log(getItem);
    res.send({
      data: getItem[0],
    });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
