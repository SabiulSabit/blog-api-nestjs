import * as mongoose from 'mongoose';
import { UserSchema } from '../../user/models/user.model'

export const BlogSchema = new mongoose.Schema({

    title: String,

    headerImage: String,

    slug: String,

    description: String,

    body: String,

    likes: {
        type: Number,
        default: 0
    },

    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

}, { timestamps: true })