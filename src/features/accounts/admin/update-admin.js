
const { adminRepositories } = require("../../../services/repositories/index");
const { hashPasswords } = require("../../../services/auth/bcrypt");
module.exports = async function (req, res) {
  try {
    const { query, body } = req;
    let setParams = `where admin_id="${query.admin_id}"`; 
    let checkExist = await adminRepositories.get(setParams);  
    if (checkExist.length <= 0)
      return res.status(409).send({ message: "admin dont exist" });
    if (body.password) {
      body.password = await hashPasswords(body.password);
    }
    await adminRepositories.update(body, `admin_id="${query.admin_id}"`);  
    res.send({
    });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
