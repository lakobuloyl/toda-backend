const moment = require("moment");
const { decodeToken } = require("../../../services/jwt/jwt");

const {
  orderRepositories,
  userRepositories,
} = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { query, headers } = req;

    let setParams = ` INNER JOIN tbl_user_accounts ON 
    tbl_order.user_id = tbl_user_accounts.user_id
    where
    terminal_id="${query.terminal_id}" AND 
    status="PENDING"`;
    let getItem = await orderRepositories.get(setParams);
    if (!getItem[0]) return res.send({ data: [] });
    
    let formatResult = getItem.map((item) => {
      return {
        order_id: item.order_id,
        pickup: item.pickup,
        dropoff: item.dropoff,
        customer: item.firstname + " " + item.lastname,
        contact_no: item.contact_no,
        order_date: item.orderDate
      };
    });
    res.send({ data: formatResult });
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
