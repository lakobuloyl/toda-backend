const mysqlConnection = require("./config");

module.exports.queryMethods = {
  insert: async (tableName, columns, data) => {
    const placeholders = columns.map(() => "?").join(", ");
    const query = `INSERT INTO ${tableName} (${columns.join(
      ", "
    )}) VALUES (${placeholders})`;
    const [results] = await mysqlConnection.execute(query, data);
    return {};
  },
  select: async (tableName, columns, conditions = "", options = "") => {
    const query = `SELECT * FROM ${tableName} ${conditions} ${options}`;
    const data = await mysqlConnection.execute(query);
    return data[0];
  },
  update: async (tableName, updateData, condition) => {
    console.log(updateData);
    const updateColumns = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const updateValues = Object.values(updateData);
    // Build the SQL query with the dynamic SET clause and condition
    const query = `UPDATE ${tableName} SET ${updateColumns} WHERE ${condition}`;
    // Execute the update query with placeholders
    const [result] = await mysqlConnection.execute(query, updateValues);

    return {};
  },
  delete: async (tableName, conditions) => {
    console.log(conditions);
    const query = `delete  FROM ${tableName} where ${conditions}`;
    await mysqlConnection.execute(query);
    return {}
  },
};
