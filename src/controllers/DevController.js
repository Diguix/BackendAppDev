const axios = require('axios');
const arrayAsString = require('../utils/parseStringAsArray');
const Dev = require('../models/Devs');

module.exports = {
    async store(req, resp) {
        try {
            const { github_username, techs, latitude, longitude } = req.body;

            let devFindOne = await Dev.findOne({
                github_username: github_username,
            });

            if (!devFindOne) {
                console.log(
                    ' Usuario não existe na base de dados ',
                    devFindOne
                );

                // consulta api do github pelo parametro passado
                const apiResp = await axios.get(
                    `https://api.github.com/users/${github_username}`
                );
                console.log(apiResp.data);
                // if(apiResp){}

                const { name = login, avatar_url, bio, id } = apiResp.data;

                const techArray = arrayAsString(techs);

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
                    id,
                });
                return resp.json(dev);
            } else {
                // console.info('Usuario já cadastrado', devFindOne);
                let response = 'Usuario já cadastrado';
                return resp.json(response);
            }
        } catch (error) {
            // console.log(error.message);
            if (error.message == 'Request failed with status code 404') {
                return resp.status(404).json('Not Found!');
            } else {
                return resp.status(500).json(error.message);
            }
        }
    },

    async index(req, resp) {
        try {
            const dev = await Dev.find();

            return resp.json(dev);
        } catch (error) {
            return resp.status(404).send(error);
        }
    },

    //TODO criar rota update
    async update(req, resp) {
        try {
            const { name, id } = req.body;

            const updateID = await Dev.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            );

            if (!updateID) {
                return resp
                    .status(404)
                    .json(`O usuario: ${req.body.name}, ID: ${id} não foi encontrado`)
                    .send(req.body);
            } else {
                return resp
                    .status(200)
                    .json(
                        `O usuario: ${name},ID ${id} foi atualizado com sucesso`
                    )
                    .send(req.body);
            }
        } catch (err) {}
        return resp.status(500).json(err);
    },

    //TODO criar a rota de destroy
    async destroy(req, resp) {
        try {
            const { id } = req.params;

            let del = await Dev.findByIdAndRemove(req.params.id);

            if (!del) {
                return resp.status(404).json(`ID ${id} não encontrado na base`);
            } else {
                return resp.status(200).json(`Deletado com sucesso o id ${id}`);
            }
        } catch (err) {
            return resp.status(500).json(err);
        }
    },
};
