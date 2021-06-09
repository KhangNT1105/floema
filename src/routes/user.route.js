const express = require("express");
const router = express.Router();
const { initApi } = require("../utils/prismicHelper");

router.get("/about", async (req, res) => {
  const api = await initApi(req);
  const response = await api.getSingle("about");
  const { body } = response.data;
  const data = {
    body,
    meta: {
      data: {
        title: "About Floema",
        description: "Meta description",
      },
    },
  };
  console.log("data", body);
  // response is the response object. Render your views here.
  res.render("pages/about", data);
});
router.get("/collections", (req, res) => {
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
router.get("/detail/:uid", async (req, res) => {
  const api = await initApi(req);
  const response = await api.getByUID("product", "silver-necklace");
  const { body } = response.data;
  console.log("response", response);
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

router.get("/", (req, res) => {
  const data = {
    meta: {
      data: {
        title: "Floema",
        description: "Meta description",
      },
    },
  };
  // initApi(req).then((api) => {
  //   api
  //     .query(Prismic.Predicates.at("document.type", "home"))
  //     .then((response) => {
  //       // response is the response object. Render your views here.
  //       res.render("pages/home", data);
  //     });
  // });
});

module.exports = router;
