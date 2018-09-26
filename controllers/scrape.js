'use strict'

// Get /scrapes

exports.getScrapes = (req, res) => {
  res.render('scrapes', {
    title: 'My scrapes'
  })
}

exports.postScrapes = function(req, res) {
  console.log(req.body);
  res.send({success: true });
}