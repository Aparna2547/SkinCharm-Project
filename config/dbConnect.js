const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    mongoose.connect(
     process.env.MONGO_URL,
        {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('db connected with my project')
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
