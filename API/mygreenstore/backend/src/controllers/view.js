var path = require('path');

var renderMainView = function (req, res, next) {
  res.sendFile(path.join(__dirname, CONFIG.gui_root, '\\index.html'))
}

module.exports = {
  renderMainView : renderMainView
}
