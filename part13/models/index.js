const Blog = require("./blog");
const ReadingList = require("./readingList");
const User = require("./user");
const Session = require("./session");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: "users_blogs" });
Blog.belongsToMany(User, { through: ReadingList, as: "blogs_users" });

// Replaced with Migrations
// Blog.sync({ alter: true });
// User.sync({ alter: true });

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
};
