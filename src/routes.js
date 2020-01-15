const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Devs');
const arrayAsString = require('./utils/parseStringAsArray');
const routes = Router();

routes.post('/devs', async (req, resp) => {
    try {
        const { github_username, techs, latitude, longitude } = req.body;

        // let resFindOne = await axios.findOne({ github_username }, () => {
        //     try {
        //         console.info(' ===> ', resFindOne); // validando
        //     } catch (error) {}
        // });

        const apiResp = await axios.get(
            `https://api.github.com/users/${github_username}`
        );

        const { name = login, avatar_url, bio } = apiResp.data;

        // console.log(apiResp); // validando

        const techArray = arrayAsString(techs); // irá remove caracter vazio.

        console.info(' techArray ===>', techArray);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        console.info(' location ===>', location);

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
