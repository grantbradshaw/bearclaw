'use strict';

// GET /about

exports.getAbout = (req, res) => {
  res.render('about', {
    title: 'About'
  });
};

// exports.getContact = (req, res) => {
//   res.render('contact', {
//     title: 'Contact Us'
//   });
// };