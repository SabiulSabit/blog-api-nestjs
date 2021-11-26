import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    username: {
        unique: true,
        type: String
    },
    email: {
        unique: true,
        type: String
    },
    password: String
})