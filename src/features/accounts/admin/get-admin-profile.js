
const { decodeToken } = require("../../../services/jwt/jwt");
const { adminRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { headers } = req;
    let decoded = decodeToken(headers.authorization);
    let setParams = `where admin_id="${decoded.admin_id}"`; 
    let getItem = await adminRepositories.get(setParams);  
    console.log(getItem);
    res.send({
      data: getItem[0],
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
