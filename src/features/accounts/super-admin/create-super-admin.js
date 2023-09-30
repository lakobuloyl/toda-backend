const { hashPasswords } = require("../../../services/auth/bcrypt");
const {
  adminRepositories,
} = require("../../../services/repositories/index");

module.exports = async function (req, res) {
  try {
    let body = {
      admin_id: "SUPER_ADMIN",
      admin_type: "SUPER_ADMIN",
      username: "superadmin",
      password: "admin",
    };
    body.password = await hashPasswords(body.password);
    await adminRepositories.save(body);
    res.send({});
  } catch (error) {
    console.log("errr", error);
    res.status(500).send({ message: error });
  }
};
