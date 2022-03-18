const express = require('express');
const { Model } = require('objection');

const Knex = require('knex');
const knexConfig = require('./knexfile');

const knex = Knex(knexConfig.development);
knex
	.raw('SELECT 1')
	.then(() => {
		console.log('Connected to MYSQL DB');
	})
	.catch((e) => {
		console.log('MYSQL not connected');
		console.error(e);
	});
Model.knex(knex);

// import routes
// import restaurantRoutes from './routes/restaurant.routes';
// import userRoutes from './routes/user.routes';

const server = express();

// middle wares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// initiate routes
// home
server.get('/', (request, response) => {
	response.redirect('/api/restaurant');
});

// server.use('/', restaurantRoutes);
// server.use('/', userRoutes);

// 404
server.use((request, response) => {
	response.status(404).send('<h1>404</h1>Page Not Found :(');
});

const port = parseInt(process.env.PORT, 10) || 5000;

server.listen(port, () => {
	console.log(`> Ready on http://localhost:${port}`);
});
