const Prismic = require("@prismicio/client");

const { PRISMIC_ENDPOINT, PRISMIC_ACCESS_TOKEN } = process.env;

const initApi = (req) => {
  return Prismic.getApi(PRISMIC_ENDPOINT, {
    accessToken: PRISMIC_ACCESS_TOKEN,
    req,
  });
};
module.exports = {
  initApi,
};
