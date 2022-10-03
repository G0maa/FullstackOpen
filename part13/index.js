require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to DB URL, ", process.env.DATABASE_URL);
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING(50),
    },
    url: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "note",
  }
);

Blog.sync();

// Routes
app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

// req.body
app.use(express.json());

app.post("/api/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  await Blog.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
