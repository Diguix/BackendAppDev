const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.post('/devs/store', DevController.store);
routes.get('/devs/list', DevController.index);
routes.get('/devs/search', SearchController.index);
routes.delete('/devs/delete/:id', DevController.destroy);
routes.put('/devs/update/:id', DevController.update);

module.exports = routes;
