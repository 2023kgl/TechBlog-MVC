const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../model');

const commentSeedData = require('./commentsSeedData.json')
const postSeedData = require('./postsSeedData.json')
const userSeedData = require('./usersSeedData.json')

const seedDatabase = async () => {
    try {
    await sequelize.sync({ force: true });

    //seed users
    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true,
    })

    // seed posts
    const posts = await Post.bulkCreate(postSeedData, {
        returning: true,
    })

    // seed comments
    for (const comment of commentSeedData) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            post_id: posts[Math.floor(Math.random() * posts.length)].id,
        });
    }
    console.log('Database seeded successfully!');

} catch (err) {
    console.error('Failed to seed database:', err);
} finally {
    process.exit(0);
}
};

seedDatabase();
