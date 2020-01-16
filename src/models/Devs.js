const mongoose = require('mongoose');

const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({
    id: String,
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: {type: [String], uppercase: true},
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Dev', DevSchema); // primeiro paramentro é o nome do banco e o segundo é o schema.
