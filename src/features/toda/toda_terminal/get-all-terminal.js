const { terminalRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { search, page, limit } = req.query;
    let setParams = "";
    if (search) {
      setParams = ` where   
            terminal_name LIKE "%${search}%" OR 
            terminal_address  LIKE "%${search}%"
            `;
    }
    let secondaryParams = "";
    if (page && limit) {
      const offset = (page - 1) * limit;
      secondaryParams = `LIMIT  ${offset}, ${limit}`;
    }
    let getItems = await terminalRepositories.get(setParams, secondaryParams);
    let getTotalCount = await terminalRepositories.get(setParams);

    res.send({
      data: getItems,
      count: getTotalCount.length,
    });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
