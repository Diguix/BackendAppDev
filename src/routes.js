const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Devs');
const routes = Router();

routes.post('/devs', async (req, resp) => {
    try {
        const { github_username, techs, latitude, longitude } = req.body;

        const apiResp = await axios.get(
            `https://api.github.com/users/${github_username}`
        );

        const { name = login, avatar_url, bio } = apiResp.data;

        console.log(name, avatar_url);

        const techArray = techs.split(',').map(tech => tech.trim()); // irá remove caracter vazio.

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        const dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techArray,
            location,
        });

        return resp.json(dev);
    } catch (e) {
        console.info('Error no ', e);
    }
});

module.exports = routes;
