const Community = require("../models/community");
const User = require("../models/user");

module.exports = {
  addPost,
  show,
  remove
};

async function addPost(req, res, next) {
  try {
    await Community.create({
      content: req.body.content_post,
      user: req.user.id
    });

    let content = { content: req.body.content_post };

    res.redirect("/show");
  } catch (erroror) {
    console.log("The erroror Is - " + erroror);
  }
}

function show(req, res) {
  Community.find({})
    .sort("-createdAt")
    .exec(async function(error, post) {
      let postsWithUsers = [];

      for (let p of post) {
        let userObj = await User.findById(p.user);

        let obj = {
          id: p.id,
          content: p.content,
          date: p.createdAt,
          userObj: userObj
        };
        console.log("Id at show function " + obj.id);
        postsWithUsers.push(obj);
      }
      res.render("show", { user: req.user, post: postsWithUsers });
    });
  // await post.execPopulate("user");
}

function update(req, res) {
  // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
  // Find the existing resource by ID
  Community.findByIdAndUpdate(
    // the id of the item to find
    req.params.todoId,

    // the change to be made. Mongoose will smartly combine your existing
    // document with this change, which allows for partial updates too
    req.body,

    // an option that asks mongoose to return the updated version
    // of the document instead of the pre-updated one.
    { new: true },

    // the callback function
    (erroror, todo) => {
      // Handle any possible database errorors
      if (erroror) return res.status(500).send(erroror);
      return res.send(todo);
    }
  );
}

async function remove(req, res) {
  // The "todo" in this callback function represents the document that was found.
  // It allows you to pass a reference back to the client in case they need a reference for some reason.

  await Community.findByIdAndRemove(req.params.id, (error, post) => {
    // As always, handle any potential errorors:
    if (error) return res.status(500).send(error);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    console.log("Id at remove function " + req.params.id);

    return res.status(200).redirect("/show");
  });
}
