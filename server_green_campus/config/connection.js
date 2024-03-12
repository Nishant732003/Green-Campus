const mongoose = require("mongoose");

mongoose.connect(
  //"mongodb+srv://theneoalpha:VikashKaushik@cluster0.cxmotro.mongodb.net/?retryWrites=true&w=majority",
  "mongodb+srv://rohit23:1009@cluster0.uku0if6.mongodb.net/green",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;