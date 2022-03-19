const dotenv = require('dotenv');
dotenv.config();
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
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');

const server = express();

// middle wares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// initiate routes
// home
server.get('/', (request, response) => {
	response.redirect('/api/product');
});

server.use('/', userRoutes);
server.use('/', productRoutes);
server.use('/', orderRoutes);

// 404
server.use((request, response) => {
	response.status(404).send('<h1>404</h1>API does not exist :(</h1>');
});

const port = parseInt(process.env.PORT, 10) || 5000;

server.listen(port, () => {
	console.log(`> Ready on http://localhost:${port}`);
});
