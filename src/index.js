const path = require("path");

const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PrismicDOM = require("prismic-dom");

const helmet = require("helmet");

const routes = require("./routes");


const { PORT,PRISMIC_ENDPOINT } = process.env;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(helmet());

const linkResolver = () => {
  // Define the url depending on the document type
  // if (doc.type === "page") {
  //   return "/page/" + doc.uid;
  // } else if (doc.type === "blog_post") {
  //   return "/blog/" + doc.uid;
  // }

  // Default to homepage
  return "/";
};

app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: PRISMIC_ENDPOINT,
    linkResolver: linkResolver,
  };
  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
  next();
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server listen to port ${PORT}`);
});
