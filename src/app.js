const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//* path config
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicPath = path.join(__dirname, "../public");

const app = express();
const port = process.env.PORT || 3000;

//* setup static directory to serve
app.use(express.static(publicPath)); //this will serve all the static data in public.html

//* view templates config
app.set("views", viewPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
    res.render("index", {
        name: "Title",
        title: "Index page",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Huzefa",
        help: "If u need any help please let me know",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "about Page",
        name: "Huzefa",
    });
});

app.get("/weather", (req, res) => {
    const query = req.query;
    const { address } = query;
    if (!query.address) {
        return res.send({ error: "Address not provided" });
    }
    geocode(address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({
                error: err,
            });
        }
        forecast(latitude, longitude, (error, { temperature, feelslike }) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            res.send({
                location,
                temperature,
                feelslike,
            });
        });
    });
});

app.get("/products", (req, res) => {
    const query = req.query;
    if (!query.search) {
        return res.send({
            error: "Must provide a search term",
        });
    }
    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        error: "Help page not found",
    });
    //   res.send("404 error");
});

app.get("*", (req, res) => {
    res.render("404", {
        error: "Page not found",
    });
    //   res.send("404 error");
});

app.listen(port, () => {
    console.log("server started");
});