const Dev = require('../models/Devs');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, resp) {
        try {
            const { latitude, longitude, techs } = req.query;

            const techsArray = parseStringAsArray(techs);

            const devs = await Dev.find({
                techs: {
                    $in: techsArray,
                },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: 1000,
                    },
                },
            });

            return resp.json({ devs });
        } catch (error) {
            return resp.status(400).send(error);
        }
    },
};
