
const { todaRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { body } = req;
    let setParams = ` where toda_name="${body.toda_name}"`;
    let checkExist = await todaRepositories.get(setParams);  
    if (checkExist.length > 0)
      return res.status(409).send({ message: "toda name is already exist" });

    await todaRepositories.save(body); 
    res.send({});
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
