const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

// post Object will look like ==> { 'j121':
// { id: 'j121', 
//   title: title , 
//   comments: [{id: commentId, content: commentContent}]
//    } 
//} 

const posts = {};

app.post('/events', (req, res) => {
    console.log(req.body);
    const { type, data } = req.body;
    if (type == 'PostCreated') {
        posts[data.id] = {
            id: data.id,
            title: data.title,
            comments: []
        }
                //not needed
       // Object.assign(posts, posts[data.id]);
    };
    if (type == 'CommentCreated') {
        id = data.id;
        content = data.content;
        const post = posts[data.postId];
        if (post) {
            // still a question why can't a Object have a dot in it to access a value?
            post.comments.push({id, content });
        }
        //not needed
       // Object.assign(posts, post);
    }
    console.log(posts);
   
    res.send({});
});

app.get('/posts', (req, res) => {
    console.log('In get method ',posts);
    res.json(posts);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})