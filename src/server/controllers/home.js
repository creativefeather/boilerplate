module.exports = function(app) {
  app.get(/^\/$|^\/home$/, function (req, res, next) {
    res.render('home', { title: 'Home Page', message: 'Welcome'});
  });
}