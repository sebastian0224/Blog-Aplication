// Importing necessary dependencies
import express from "express";
import bodyParser from "body-parser";

// Creating an instance of the Express application
const app = express();
const port = 3000;

// Middleware configuration
app.use(express.static("public")); // Serve static files from the "public" folder
app.use(bodyParser.urlencoded({ extended: true })); // Configure bodyParser to handle form data

// Array to store posts
const posts = [];

// Route for the homepage
app.get('/', (req, res) => {
  res.render("index.ejs", { posts }); // Render the "index.ejs" view and pass the posts
});

// Route for creating a new post
app.get('/new-post', (req, res) => {
    res.render("new_post.ejs"); // Render the "new_post.ejs" view
});

// Route for updating an existing post
app.get('/update-post/:id', (req, res) => {
    const id = req.params.id; // Get the post id from the URL parameters
    const index = posts.findIndex((post) => post.id == id); // Find the index of the post
    res.render("update_post.ejs", { index, posts, id }); // Render the "update_post.ejs" view with the index and posts
});

// Route for handling the creation of a new post
app.post('/', (req, res) => {
    // Create a new post object with the form data
    const newPost = {
        id: posts.length, // Assign an id based on the current length of the array
        title: req.body.title, // Title of the post
        content: req.body.content, // Content of the post
        autor: req.body.autor, // Author of the post
    };
    posts.push(newPost); // Add the new post to the array
    res.redirect("/"); // Redirect to the homepage
});

// Route for handling the update of an existing post
app.post('/update-post/:id', (req, res) => {
    const id = req.params.id; // Get the post id from the URL parameters
    const index = posts.findIndex((post) => post.id == id); // Find the index of the post

    // Create a new post object with the form data or keep the previous data
    const replacementPost = {
        id: id, // Keep the same id
        title: req.body.title || posts[index].title, // Take the new title or keep the old one
        content: req.body.content || posts[index].content, // Take the new content or keep the old one
        autor: req.body.autor || posts[index].autor, // Take the new author or keep the old one
    };

    posts[index] = replacementPost; // Replace the existing post with the new one
    res.redirect("/"); // Redirect to the homepage
});

// Route for handling the deletion of an existing post
app.post('/delete-post/:id', (req, res) => {
    const id = req.params.id; // Get the post id from the URL parameters
    const index = posts.findIndex((post) => post.id == id); // Find the index of the post

    if (index > -1) { // If the post is found
        posts.splice(index, 1); // Remove the post from the array
    } else {
        res.status(404).json({ error: "not found" }); // Return a 404 error if the post is not found
    }
    
    res.redirect("/"); // Redirect to the homepage
});

// Setting up the server to listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // Message in the console to confirm the server is running
});
