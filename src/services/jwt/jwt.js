const jwt = require("jsonwebtoken");
const mysqlConnection = require("../repositories/config");

exports.generateAppAccessToken = (payload) => {
  let key = "dsds";
  return jwt.sign(payload, key, { expiresIn: "365d" });
};
exports.decodeToken = (payload) => {
  return (decoded = jwt.verify(payload, "dsds"));
};
checkToken = (req) => {
  const token = req.header("Authorization"); // Assuming the token is sent in the 'Authorization' header
  if (!token) {
    return res.json({ message: "Authentication failed. Token missing." });
  }
  return token;
};
exports.validateTokenSuperAdmin = (req, res, next) => {
  try {
    const getToken = checkToken(req);
    const decoded = jwt.verify(getToken, "dsds"); // Replace with your actual secret key
    req.user = decoded; // You can access the token payload in your route handlers as req.user
    mysqlConnection
      .query(
        `select * from tbl_toda_admin where username="${decoded.username}"`
      )
      .then((data) => {
        if (data[0].length <= 0)
          return res.json({
            message: "Authentication failed. Invalid SuperAdmin Access.",
          });

        if (data[0][0].admin_type !== "SUPER_ADMIN")
          return res.json({
            message: "Authentication failed. Invalid SuperAdmin Access.",
          });
      })
      .catch((err) => {
        return res.json({ message: "Authentication failed. Invalid Access." });
      });
    next();
  } catch (error) {
    return res.json({ message: "Authentication failed. Invalid token." });
  }
};

exports.validateTokenAdmin = (req, res, next) => {
  try {
    const getToken = checkToken(req);
    const decoded = jwt.verify(getToken, "dsds"); // Replace with your actual secret key
    req.user = decoded; // You can access the token payload in your route handlers as req.user
    mysqlConnection
      .query(
        `select * from tbl_toda_admin where username="${decoded.username}"`
      )
      .then((data) => {
        if (data[0].length <= 0)
          return res.json({
            message: "Authentication failed. Invalid Access.",
          });
      })
      .catch((err) => {
        return res.json({
          message: "Authentication failed. Invalid Admin Access.",
        });
      });
    next();
  } catch (error) {
    return res.json({ message: "Authentication failed. Invalid token." });
  }
};

exports.validateTokenUser = (req, res, next) => {
  try {
    const getToken = checkToken(req);
    const decoded = jwt.verify(getToken, "dsds"); // Replace with your actual secret key
    req.user = decoded; // You can access the token payload in your route handlers as req.user
    mysqlConnection
      .query(
        `select * from tbl_user_accounts where username="${decoded.username}"`
      )
      .then((data) => {
        if (data[0].length <= 0)
          return res.json({
            message: "Authentication failed. Invalid Access.",
          });
      })
      .catch((err) => {
        return res.json({
          message: "Authentication failed. Invalid User Access.",
        });
      });
    next();
  } catch (error) {
    return res.json({ message: "Authentication failed. Invalid token." });
  }
};
