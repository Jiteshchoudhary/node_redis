const UserRouter = require('./user');

let routes = [
    {
        path: '/api/v1/user',
        routerHandler: UserRouter
    }
]

module.exports = routes;