const User = require('./user')
const Post = require('./post')
const Comment = require('./comment')

// users
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });



// posts
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
})



// comments
Comment.belongsTo(User, {
  foreignKey: 'user_id'
  });

Comment.belongsTo(Post, {
  foreignKey: "post_id"
});

module.exports = { User, Post, Comment };