const User = require('./user')
const Post = require('./post')
const Comment = require('./comment')

// users
User.hasMany(Post, {
  foreignKey: 'user.id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user.id',
    onDelete: 'CASCADE'
  });



// posts
Post.belongsTo(User, {
  foreignKey: 'user.id'
});

Post.hasMany(Comment, {
  foreignKey: 'post.id'
})



// comments
Comment.belongsTo(User, {
    foreignKey: 'user.id'
  });

Comment.belongsTo(Post, {
  foreignKey: "post.id",
});

module.exports = { User, Post, Comment };