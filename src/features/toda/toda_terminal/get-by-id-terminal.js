
const { terminalRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { query } = req;
    let setParams = `where terminal_id="${query.terminal_id}"`; 
    let getToda = await terminalRepositories.get(setParams);  
    res.send({
      data: getToda[0],
    });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
