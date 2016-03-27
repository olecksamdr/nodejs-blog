var requireRole = require('../middleware/requireRole');

module.exports = function (app) {
  app.get('/', require('./frontPage').get);
  app.get('/page/:num', require('./pages').get);
  app.get('/blog/:id', require('./byId').get);

  // зберігає текст нових статтей
  app.post('/newArticle', require('./saveNewArticle').post); //^

  // зберігає картинки для статті
  app.post('/base64', require('./saveBase64').post);

  // сторінка для редагування статтей
  app.get('/newArticle', requireRole('admin'), require('./newArticle').get); //^
  app.post('/removeArticle/:id', requireRole('admin'), require('./removeArticle').post);
  app.get('/manage', requireRole('admin'), require('./manage').get);
  app.get('/manage/page/:num', requireRole('admin'), require('./manage').getPages);

  app.get('/editArticle/:id', requireRole('admin'), require('./editArticle').get);
  app.post('/updateArticle', requireRole('admin'), require('./editArticle').update)

  // для реєстрації
  app.get('/registration', require('./registration').get);
  app.post('/login', require('./login').post);
  app.post('/logout', require('./logout').post);

  app.post('/signup', require('./signup').post);

  // для користувача
};
