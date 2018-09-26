/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  if (req.user) {
    return res.redirect('/scrapes');
  }
  res.render('home', {
    title: 'Home'
  });
};
