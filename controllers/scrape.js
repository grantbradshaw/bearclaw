'use strict'

// Get /scrapes

exports.getScrapes = (req, res) => {
  res.render('scrapes', {
    title: 'My scrapes'
  })
}