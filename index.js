const express = require('express');
const { randomBytes } = require('crypto');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = {};
const commentsById = {};

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/posts", (req, res) => {
	const { title } = req.body;
	const id = randomBytes(4).toString("hex");

	posts[id] = { id, title };

	res.status(201).send(posts[id]);
});

app.get("/posts/:id/comments", (req, res) => {
	const id = req.params.id;
	res.send(commentsById[id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
	const { content } = req.body;
	const postId = req.params.id;
	const commentId = randomBytes(4).toString("hex");

	const comments = commentsById[postId] || [];
	comments.push({ id: commentId, content });
	commentsById[postId] = comments;

	res.status(201).send(comments);
});

app.listen(4000, () => {
	console.log("Listening on port 4000");
})