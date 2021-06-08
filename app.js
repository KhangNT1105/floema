const path = require("path");

const express = require("express");
const app = express();
const PORT = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  const data = {
    meta: {
      data: {
        title: "Floema",
        description: "Meta description",
      },
    },
  };
  res.render("pages/home", data);
});
app.get("/about", (req, res) => {
  const data = {
    meta: {
      data: {
        title: "About Floema",
        description: "Meta description",
      },
    },
  };
  res.render("pages/about", data);
});
app.get("/collections", (req, res) => {
  const data = {
    meta: {
      data: {
        title: "Collections Floema",
        description: "Meta description",
      },
    },
  };
  res.render("pages/collections", data);
});
app.get("/detail", (req, res) => {
  const data = {
    meta: {
      data: {
        title: "Detail Floema",
        description: "Meta description",
      },
    },
  };
  res.render("pages/detail", data);
});

app.listen(PORT, () => {
  console.log(`Server listen to port ${PORT}`);
});
