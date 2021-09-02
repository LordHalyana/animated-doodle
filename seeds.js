const Product = require("./models/campground");
const mongoose = require("mongoose");

/* connect to DB */
mongoose
  .connect("mongodb://localhost:27017/yelpers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Database error");
    console.log(err);
  });

const seedProducts = [
  {
    title: "Arne's Telt",
    price: 400,
    description: "Fantastisk telt i skogen",
    location: "midt i skaun",
    image: "../img/camp1.jpg",
  },
  {
    title: "Anniken's Party Palace",
    price: 20000,
    description: "Gigantisk party pad",
    location: "Sentrum",
    image: "../img/camp1.jpg",
  },
  {
    title: "Patricks Cave",
    price: 400,
    description: "Fantastisk Cave i fjellet",
    location: "storfjell",
    image: "../img/camp1.jpg",
  },
  {
    title: "Mathilde's Pølseskur",
    price: 2.5,
    description: "Gratis om du har pølse",
    location: "pølsegata",
    image: "../img/camp1.jpg",
  },
  {
    title: "Ola's Olahus",
    price: 400,
    description: "SKUR i hagen BYGD SJØL VERY GUD",
    location: "midt i skaun",
    image: "../img/camp1.jpg",
  },
  {
    title: "Kåre's Knallbrae Utedo",
    price: 20000,
    description: "Utedo i hagen. Gratis om du tømmer den.",
    location: "Sentrum",
    image: "../img/camp1.jpg",
  },
  {
    title: "Arne's Telt 3",
    price: 400,
    description: "Fantastisk telt i skogen",
    location: "midt i skaun",
    image: "../img/camp1.jpg",
  },
  {
    title: "Anniken's Party Palace 4",
    price: 20000,
    description: "Gigantisk party pad",
    location: "Sentrum",
    image: "../img/camp1.jpg",
  },
];

Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
