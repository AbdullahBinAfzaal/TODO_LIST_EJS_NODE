import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

const now = new Date();
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};
const formattedDate = now.toLocaleDateString('en-US', options);

var newitems = [];

app.get("/", (req, res) => {
    res.render("index.ejs", { formattedDate, newlistitem: newitems });
});

app.post("/", (req, res) => {
    var newitem = req.body.newitem;
    newitems.push({ text: newitem, completed: false }); 
    res.redirect("/");
});

app.get("/work", (req, res) => {
    res.render("index.ejs");
});

app.post("/toggle", (req, res) => {
    const index = req.body.index;
    if (index >= 0 && index < newitems.length) {
        newitems[index].completed = !newitems[index].completed;
    }
    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });