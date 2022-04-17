const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL
const dbConnection = async () => {
    try {
        let result = await mongoose.connect(mongoUrl);
        console.log("mongo db connected");
        return result;
    } catch (error) {
        throw Error(error);
    }
}
module.exports = dbConnection;
