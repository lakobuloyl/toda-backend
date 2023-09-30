const { todaRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { search, page, limit } = req.query;
    let setParams = "";
    if (search) {
      setParams = ` where   
            toda_name LIKE "%${search}%" OR 
            toda_desc  LIKE "%${search}%" OR 
            toda_brgy  LIKE "%${search}%" OR 
            toda_city  LIKE "%${search}%" OR 
            toda_province  LIKE "%${search}%"  
            `;
    }
    let secondaryParams = "";
    if (page && limit) {
      const offset = (page - 1) * limit;
      secondaryParams = `LIMIT  ${offset}, ${limit}`;
    }
    let getToda = await todaRepositories.get(setParams, secondaryParams);
    let getTotalCount = await todaRepositories.get(setParams);

    res.send({
      data: getToda,
      count: getTotalCount.length,
    });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
