const Sequelize = require("sequelize");
const { Umzug, SequelizeStorage } = require("Umzug");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL);
// *** Error wehen POST i.e. register a new user. ***
const migrationConf = {
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("Connected to database");
  } catch (error) {
    console.log("Failed to connect to database");
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize, rollbackMigration };
