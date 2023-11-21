const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = {
	"test-id": {
		id: "test-id",
		title: "Post Title"
	}
};

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.listen(4000, () => {
	console.log("Listening on port 4000");
})