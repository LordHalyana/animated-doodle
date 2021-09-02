/* Whats needed/gets imported */
const methodOverride = require("method-override");
const Campground = require("./models/campground");
const mongoose = require("mongoose");
const express = require("express");
const catchAsync = require("./utils/CatchAsync");
const ExpressError = require("./utils/ExpressError");
const ejsMate = require("ejs-mate");
const morgan = require("morgan");
const exp = require("constants");
const path = require("path");
const app = express();

/* connect to DB */
mongoose.connect("mongodb://localhost:27017/yelpers", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "## DB Connection Error ##"));
db.once("open", () => {
  console.log("## Database Connected ##");
});

/* Settings what to expect */
/* Set public folder to be public, expect urlencoded and JSon data from forms and methodOveride */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(morgan("tiny"));

/* Set views and public folder to be reachable if you run index.js from another folder */
app.set("views", path.join(__dirname, "/views"));
app.set("public", path.join(__dirname, "/public"));
/* Set Enegine to ejs */
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

/*  ###############  */
/* Get/ POST RESPONSE GOES HERE */
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new.ejs");
});

app.get(
  "/campgrounds",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index.ejs", { campgrounds });
  })
);

app.post(
  "/campgrounds",
  catchAsync(async (req, res, next) => {
    if (!req.body.campground)
      throw new ExpressError("Invalid Campground Data", 500);
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.get(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show.ejs", { campground });
  })
);

app.get(
  "/campgrounds/:id/edit",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit.ejs", { campground });
  })
);

app.put(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.delete(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect(`/campgrounds`);
  })
);
/*  ################  */
/*  ERROR HANDELING  */
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
  /*res.render("notfound.ejs"); */
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).send(message);
});

/*  ################  */

app.listen(3000, () => {
  console.log(" ## Serving ON PORT 3000! ## ");
});
