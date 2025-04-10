const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image_url: { type: String, required: true },
    likes_count: { type: Number, default: 0 },
    tags: { type: [String] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'userData', required: true } // Add reference to user
}, {
    timestamps: true,
});

const Post = model('Post', postSchema);

module.exports = Post;
