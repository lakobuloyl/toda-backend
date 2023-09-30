
const { terminalRepositories, todaRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { body } = req;
    
    let setTodaParams = `where toda_id="${body.toda_id}"`;
    let checkToda = await todaRepositories.get(setTodaParams);
    if (checkToda.length <= 0)
      return res.status(409).send({ message: "Toda dont exist" });
    let setParams = ` where terminal_name="${body.terminal_name}"`;
    let checkExist = await terminalRepositories.get(setParams);  
    if (checkExist.length > 0)
      return res.status(409).send({ message: "Terminal name is already exist" });

    await terminalRepositories.save(body); 
    res.send({});
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
