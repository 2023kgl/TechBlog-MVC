const router = require('express').Router();
const { Post, User, Comment } = require("../../model");
const withAuth = require("../../utils/auth");

// C R U D for posts


// GET ALL USER POSTS
router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({ include: [{ model:User, attributes:['name']}]})
        res.status(200).json(postData);
    }catch (err) {
        res.status(500).json(err);
    }
})

// NEW POST FOR USER
router.post("/", withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newPost)
    } catch (err) {
      res.status(400).json(err)
    }
})

// UPDATE POST
router.put("/:id", withAuth, async (req, res) => {
    try {
      const updatedPost = await Post.update(req.body, {
        where: { id: req.params.id },
      });
  
      if (!updatedPost) {
        res.status(404).json({ message: "POST NOT FOUND/UPDATED" })
        return;
      }
      res.status(200).json(updatedPost)
    } catch (err) {
      res.status(500).json(err);
    }
})

// DELETE POST
router.delete("/:id", withAuth, async (req, res) => {
    try {
      await Comment.destroy({
        where: { post_id: req.params.id },
      });
      const deletedPost = await Post.destroy({
        where: { id: req.params.id },
      })
  
      if (!deletedPost) {
        res.status(404).json({ message: "POST NOT FOUND/DELETED" })
        return;
      }
      res.status(200).json(deletedPost);
    } catch (err) {
      res.status(500).json(err)
    }
})

// GET SINGLE POST BY ID 
router.get("/:id", async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ["name"] },
          {
            model: Comment,
            include: [{ model: User, attributes: ["name"] }],
          },
        ],
      })
      if (!postData) {
        res.status(404).json({ message: "POST NO FOUND" })
        return;
      }
      res.status(200).json(postData)
    } catch (err) {
      res.status(500).json(err)
    }
})

module.exports = router;