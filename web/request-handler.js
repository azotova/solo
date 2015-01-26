
var engine = require("./engine");

module.exports = {
  get: function (req, res) {
    res.json(engine.results);
  },
  post: function (req, res) {
    var content = req.body;
    engine.cleanNew();
    engine.askGoogleNew(content, engine.getPages, res); 
  }
};
