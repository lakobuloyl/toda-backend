const { todaRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { query, body } = req;
    let setParams = `where toda_id="${query.toda_id}"`;
    let checkExist = await todaRepositories.get(setParams);
    if (checkExist.length <= 0)
      return res.status(409).send({ message: "Toda dont exist" });

    await todaRepositories.delete(`toda_id="${query.toda_id}"`);
    res.send({
     
    });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
