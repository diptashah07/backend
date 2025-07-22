const express = require('express');
const AdminRouter = require('./admin-route');
const AuthRouter = require('./auth-route');

const AppRouter = express.Router();

AppRouter.use('/admin',AdminRouter)
AppRouter.use('/auth',AuthRouter)

module.exports = AppRouter;