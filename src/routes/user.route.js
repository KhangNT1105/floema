const express = require("express");
const router = express.Router();
const { initApi } = require("../utils/prismicHelper");
const Prismic = require("@prismicio/client");
const { meta } = require("../constants");

const fetchCommonApi = async (api) => {
  const home = await api.getSingle("home");
  const navigation = await api.getSingle("navigation");
  const preloader = await api.getSingle("preloader");
  return {
    home,
    navigation,
    meta,
    preloader,
  };
};

router.get("/about", async (req, res) => {
  const api = await initApi(req);
  const response = await api.getSingle("about");
  const commonData = await fetchCommonApi(api);
  const { body } = response.data;
  const data = {
    ...commonData,
    body,
  };
  // response is the response object. Render your views here.
  res.render("pages/about", data);
});
router.get("/collections", async (req, res) => {
  const api = await initApi(req);
  const commonData = await fetchCommonApi(api);
  const response = await api.query(
    Prismic.Predicates.at("document.type", "collection"),
    {
      fetchLinks: ["product.img1", "product.img2"],
    }
  );
  const collections = response.results.map((item) => ({
    ...item.data,
  }));
  console.log("home", commonData.navigation.data.links);
  const data = {
    ...commonData,
    collections,
  };
  res.render("pages/collections", data);
});
router.get("/detail/:uid", async (req, res) => {
  
  const api = await initApi(req);
  
  const commonData = await fetchCommonApi(api);
  
  const response = await api.getByUID("product", req.params.uid, {
    fetchLinks: "collection.title",
  });
  
  const { data } = response;

  const updatedData = {
    ...data,
    ...commonData,
  };
  
  res.render("pages/detail", updatedData);

});

router.get("/", async (req, res) => {
  const api = await initApi(req);
  const commonData = await fetchCommonApi(api);
  const response = await api.query(
    Prismic.Predicates.at("document.type", "collection"),
    {
      fetchLinks: ["product.img1", "product.img2"],
    }
  );
  const collections = response.results.map((item) => ({
    ...item.data,
  }));
  const updatedData = {
    ...commonData,
    collections,
  };
  res.render("pages/home", updatedData);
});

module.exports = router;
