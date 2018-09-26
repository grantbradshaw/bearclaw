'use strict'

const Scrape = require('../models/Scrape');
const User = require('../models/User');
const cleanNumberData = require('../helpers/clean_number_data');
const prettyDate = require('pretty-date');
const shorten = require('../helpers/shorten');
const job_scrape = require('../jobs/scrape');
const agenda = require('../config/agenda');
const conditionMetNotification = require('../mailer/condition_met_notification');

// Get /scrapes

exports.getScrapes = (req, res) => {
  Scrape.find({_userId: {$in: [req.user.id]}}, (err, scrapes) => {
    res.render('scrapes', {
      title: 'My scrapes',
      scrapes: scrapes,
      prettyTrackStatus: prettyTrackStatus,
      prettyDate: prettyDate,
      shorten: shorten
    });
  });
}

exports.postScrapes = (req, res) => {
  // console.log(req.body);
  res.send({success: true });
  req.body.forEach((selection) => {
    // req.sanitize(selection.select.name).escape();
    var scrape = new Scrape({
      _userId: req.user.id,
      name: selection.selector.name,
      url: selection.url,
      selector: selection.selector.path,
      data: cleanNumberData(selection.selector.content),
      alert : {comparator: Number(selection.selector.comparator)},
      status: 'set'
    });

    scrape.save().then((scrape) => {
      addScrapeToUser(req.user.id, scrape);
      console.log(scrape);
      console.log('Scrape ' + scrape.id + ' saved');
      console.log('-----------');
      return scrape;
    }).then((scrape) => {
      console.log('Creating scrape job');
        var jobName = 'scrape ' + scrape._id;
        job_scrape(agenda, jobName);
        agenda.every('30 seconds', jobName, { scrapeId: scrape._id });
        return scrape;
    }).then((scrape) => {
      if (scrape.alert && scrape.alert.conditionMet) {
        console.log('Condition is met. Sending email...');
        conditionMetNotification(req, scrape); // check if this works w/ post to User
      }
    })
  });
}

exports.deleteScrape = (req, res) => {
  Scrape.findOne({ _id: {$in: [req.params.scrapeId]}}, (err, scrape) => {
    if (err) {
      return console.error(err);
    }
    scrape.remove();
    res.send({ success: true });
  })
}


function addScrapeToUser(id, scrape) {
  User.updateOne({ _id: [id]},
              { $push: {scrapeIds: scrape.id }},
              (err) => {
                if (err) {
                  return console.error(err);
                }
              })
};

function prettyTrackStatus(scrape) {
  var status;
  switch(scrape.status) {
    case 'new':
      status = 'New';
      break;
    case 'set':
      status = 'Alert set';
      break;
    case 'found':
      status = 'In price range';
      break;
    default:
      status = 'Unknown';
  }
  return status;
}