const redis = require('redis');
const models = require('../db/models');
const { UserModel } = models;
const redisClient = redis.createClient(6379)
redisClient.connect();

module.exports = {
    async addUser(req, res, next) {
        try {
            let data = await UserModel.create(req.body);
            return res.status(201).json({
                success: true,
                data,
                message: 'User Added'
            });
        } catch (error) {
            return next(error);
        }
    },

    async getUser(req, res, next) {
        try {
            let data1 = []
            let keyName = "db1";
            let getChachedData = await redisClient.get(keyName);
            if (getChachedData) {
                data1 = JSON.parse(getChachedData);
            } else {
                data1 = await UserModel.find({});
                redisClient.set(keyName, JSON.stringify(data1));
            }
            return res.status(200).json({
                success: true,
                data: data1,
                message: 'User List'
            });
        } catch (error) {
            return next(error);
        }
    }
}