const exp = require("constants");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv } = require("uuid");

/* PLACEHOLDER DB */
let comments = [
  {
    id: uuidv(),
    username: "Patrick",
    comment: "Wooooo this is so much comment",
  },
  {
    id: uuidv(),
    username: "Anniken",
    comment: "Wooooo this is so much more comment",
  },
  {
    id: uuidv(),
    username: "Ola",
    comment: "Best blog EU",
  },
  {
    id: uuidv(),
    username: "MrMrMan",
    comment: "I AM MRMRMAN AND I ENDORSE THIS WEBPAGE",
  },
];

/* Set forms to expect url encoded and json */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
/* Set public folder to be public */
app.use(express.static(path.join(__dirname, "public")));

/* Set Enegine to ejs */
app.set("view engine", "ejs");

/* Set views and public folder to be reachable if you run index.js from another folder */
app.set("views", path.join(__dirname, "/views"));
app.set("public", path.join(__dirname, "/public"));

/*  ###############  */
/* Get/ POST RESPONSE GOES HERE */
app.get("/", (req, res) => {
  console.log("WE GOT A NEW REQUEST!");
  res.render("home.ejs");
});

app.get("/rand", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  console.log("RAND GOT A NEW REQUEST!");
  res.render("rand.ejs", { rand: num });
});

app.get("/blog/post/:blogpost", (req, res) => {
  const { blogpost } = req.params;
  res.send(`This is a blogpost about: ${blogpost} `);
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  if (!q) {
    ("Nothing Found if nothing Searched");
  }
  res.send(` <h1> Search results for: ${q}`);
});

/* ###############  */
/*  DB comment  */
app.get("/comments", (req, res) => {
  res.render("comments", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comment/new", { comments });
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuidv() });
  res.redirect("comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comment/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comment/edit", { comment });
});

/* this makes you able to edit comment */
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});

/*  this makes you able yo delete comment  */
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

/*  ################  */
/*  CATCH ALL AND 404  */
app.get("*", (req, res) => {
  res.render("notfound.ejs");
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000!");
});
