const { adminRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { search, page, limit } = req.query;
    let setParams = "";
    if (search) {
      setParams = ` where   
            admin_firstname LIKE "%${search}%" OR 
            admin_lastname  LIKE "%${search}%" OR 
            admin_contact_no  LIKE "%${search}%" OR 
            `;
    }
    let secondaryParams = "";
    if (page && limit) {
      const offset = (page - 1) * limit;
      secondaryParams = `LIMIT  ${offset}, ${limit}`;
    }
    let getItems = await adminRepositories.get(setParams, secondaryParams);
    let getTotalCount = await adminRepositories.get(setParams);

    res.send({
      data: getItems,
      count: getTotalCount.length,
    });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
