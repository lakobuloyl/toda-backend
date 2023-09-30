
const { todaRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { query } = req;
    let setParams = `where toda_id="${query.toda_id}"`; 
    let getToda = await todaRepositories.get(  setParams );  
    res.send({
      data: getToda[0],
    });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
