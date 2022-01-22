const hbs = require("hbs");
const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define path for express p

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

//setup static directory setup
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "welcome weather",
    name: "manish",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "Shanu",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "helper text",
    name: "Prateek",
  });
});
// app.get('*', (req,res) => {

//     res.render('404',{

//         title:'Page not Found 404',
//         name:'Admin'
//     })

// })

// app.get('/weather',(req,res) =>{
//     res.send({
//         forecast:'it is snowing',
//         location: 'philadelhphia'
//     })
// })

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      Error: "You have to enter valid keywords",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        } else
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address,
          });
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
