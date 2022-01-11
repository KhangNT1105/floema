const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("errorhandler");
const notifier = require("node-notifier");
const helmet = require("helmet");
const PrismicDOM = require("prismic-dom");
dotenv.config();

const routes = require("./routes");
const app = express();

const { PORT, PRISMIC_ENDPOINT } = process.env;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorHandler({ log: errorNotification }));
}

const errorNotification = (err, str, req) => {
  const title = "Error in " + req.method + " " + req.url;
  notifier.notify({
    title: title,
    message: str,
  });
};

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(helmet());

const linkResolver = ({ type }) => {
  switch (type) {
    case "collections":
      return "/collections";
    case "about":
      return "/about";
    default:
      return "/";
  }
};

app.use((req, res, next) => {
  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
  res.locals.Link = linkResolver;
  res.locals.Numbers = (index) =>
    index === 0 ? "One" : index === 1 ? "Two" : index === 2 ? "Three" : "Four";
  next();
});

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server listen to port ${PORT}`);
});
