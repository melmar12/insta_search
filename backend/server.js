const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const postRoutes = express.Router();
const PORT = 4000;

let Post = require('./post.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/posts', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

postRoutes.route('/').get(function(req, res) {
    Post.find(function(err, posts) {
        if (err) {
            console.log(err);
        } else {
            res.json(posts);
        }
    });
});

postRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Post.findById(id, function(err, post) {
        res.json(post);
    });
});

postRoutes.route('/update/:id').post(function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (!post)
            res.status(404).send("data is not found");
        else
            post.username = req.body.username;
            post.location = req.body.location;
            post.hashtags = req.body.hashtags;

            post.save().then(post => {
                res.json('Post updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

postRoutes.route('/add').post(function(req, res) {
    let post = new Post(req.body);
    post.save()
        .then(post => {
            res.status(200).json({'post': 'post added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new post failed');
        });
});

// search algorithm
postRoutes.route('/search/:query').get(function(req, res) {
    // relys on frontend to pass a correctly formatted query...
    let query = JSON.parse(req.params.query)
    let tags = query.hashtags
    let username = query.username
    let location = query.location

    // determines what type of search query to run...
    if(tags){ // need to check for tags bc the $all: operator will be used in search
        if(username && location) {
            // all three: tags, username and location
            Post.find({"hashtags": {$all: tags }, "username": username, "location": location}, function(err, post) {
                if(!post) {
                    res.status(404).send("not found");
                }
                else {
                    res.json(post);
                } 
            }).catch(err => {
             res.status(400).send("not possible");
            });
        } else if (username && !location){
            // tags and username
            Post.find({"hashtags": {$all: tags }, "username": username}, function(err, post) {
                if(!post) {
                    res.status(404).send("not found");
                }
                else {
                    res.json(post);
                } 
            }).catch(err => {
             res.status(400).send("not possible");
            });
        } else if (!username && location) {
            // tags and location
            Post.find({"hashtags": {$all: tags }, "location": location}, function(err, post) {
                if(!post) {
                    res.status(404).send("not found");
                }
                else {
                    res.json(post);
                } 
            }).catch(err => {
             res.status(400).send("not possible");
            });
        } else {
            // just tags
            Post.find({"hashtags": {$all: tags }}, function(err, post) {
                if(!post) {
                    res.status(404).send("not found");
                }
                else {
                    res.json(post);
                } 
            }).catch(err => {
             res.status(400).send("not possible");
            });
        }
    } else {
        // either location and username, just location or just username
        // not necessary to alter query 
        Post.find(query, function(err, post) {
         if(!post)
             res.status(404).send("not found");
         else {
             res.json(post);
         } 
        }).catch(err => {
         res.status(400).send("not possible");
        });
    // wish i could make this smaller lol
    }
});


app.use('/posts', postRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});