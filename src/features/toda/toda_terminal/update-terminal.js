
const { terminalRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { query, body } = req;
    let setParams = `where terminal_id="${query.terminal_id}"`; 
    let checkExist = await terminalRepositories.get(setParams);  
    if (checkExist.length <= 0)
      return res.status(409).send({ message: "Toda dont exist" });
    
    await terminalRepositories.update(body,`terminal_id="${query.terminal_id}"`);  
    res.send({
    });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
