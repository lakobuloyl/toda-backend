const { hashPasswords } = require("../../../services/auth/bcrypt");
const {
  adminRepositories,
  todaRepositories,
} = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    const { body } = req;
    body.password = await hashPasswords(body.password);
    let setParams = ` where username="${body.username}"`;
    let checkExist = await adminRepositories.get(setParams);
    let checkToda = await todaRepositories.get(
      ` where toda_id="${body.toda_id}"`
    );
    if (checkToda.length <= 0)
      return res.status(409).send({ message: "Toda does not  exist" });
    if (checkExist.length > 0)
      return res.status(409).send({ message: "Username is already exist" });

    await adminRepositories.save(body);
    res.send({});
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
