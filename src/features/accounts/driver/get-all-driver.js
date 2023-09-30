const { userRepositories } = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { search, page, limit } = req.query;
    let setParams = `where user_type="DRIVER"`;
    if (search) {
      setParams = `    
            firstname LIKE "%${search}%" OR 
            lastname  LIKE "%${search}%" OR 
            midname  LIKE "%${search}%" OR 
            address  LIKE "%${search}%" OR 
            contact_no  LIKE "%${search}%" OR 
            email  LIKE "%${search}%" OR 
            birthday  LIKE "%${search}%" OR 
            age  LIKE "%${search}%" OR 
            username  LIKE "%${search}%"
            `;
    }
    let secondaryParams = "";
    if (page && limit) {
      const offset = (page - 1) * limit;
      secondaryParams = `LIMIT  ${offset}, ${limit}`;
    }
    let getItems = await userRepositories.get(setParams, secondaryParams);
    let getTotalCount = await userRepositories.get(setParams);

    res.send({
      data: getItems,
      count: getTotalCount.length,
    });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
