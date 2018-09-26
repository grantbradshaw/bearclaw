Bearclaw
========

Migration of this 2016 <a href="https://github.com/grantbradshaw/snowshoe_site">project</a> - upgrading packages.

Project works in tandem with this <a href="https://github.com/grantbradshaw/snowshoe_extension">Chrome Extension</a>.

Originally a final project from Lighthouse Labs with Jonathan Morrisey, this project is a universal web scraping application for shopping. Users can go to any site, indicate the price they wish to track, and receive an alert when the price drops below a threshold they indicate.

#### Executing Project
To run this project, you'll need to,
1) Clone 'Snowshoe Extension' locally. After you've done that, load <a href="chrome://extensions/">chrome://extensions/</a>, enable developer mode, and select 'Load unpacked'.
With that done, you will have a locally running extension.
2) Clone this repository, and run `npm install` to install the packages locally.
3) Create a .env file, with the following values populated,
 - MONGODB_URI (for instance, mongodb://127.0.0.1:27017/test)
 - SESSION_SECRET (pick some complicated string)
 - NODE_ENV (should be set to development)
 - SENDGRID_USER / SENDGRID_PASSWORD (create an account at <a href="https://sendgrid.com">https://sendgrid.com</a>, and enter your credentials)
4) Start up your local mongo database (i.e. `mongod`)
5) The application should be ready to run (i.e. `nodemon app`)


#### Demo
Using this project is fairly simple. You simply naviagate to a page with a product you wish to track (here, we use a demo built in to the application).
![1](https://www.dropbox.com/s/njlojcr8fxtxkdz/Screenshot%202018-09-26%2016.23.48.png?raw=1)

To track the price, you alt + click on the price of the product. The chrome extension will create a lightbox, where the user will input the name they want to refer to the product by,
in addition to their target price. You can simply click on the name of the text on the page to populate it in the name field.

![2](https://www.dropbox.com/s/kw0cc1efrv31iip/Screenshot%202018-09-26%2016.25.52.png?raw=1)

Once you've saved the product, the product is saved in the database, and an agenda job is created to consistently scrape the relevant page, checking what the price is. In this index
page, the user is able to see the up to date price of the product.

![3](https://www.dropbox.com/s/2nlpelw3rca6ik5/Screenshot%202018-09-26%2016.26.55.png?raw=1)

When the product drops below the users reservation price, Sendgrid will send an email to the user, alerting them that the time to buy is now.

![4](https://www.dropbox.com/s/kh6aez5bawseuwx/Screenshot%202018-09-26%2016.31.04.png?raw=1)

The updated price will be reflected on the main page, and new products from other sites (such as Amazon here) can be saved as well.

![5](https://www.dropbox.com/s/jyuoxxhjotu7wps/Screenshot%202018-09-26%2016.32.25.png?raw=1)

##### Tech Stack
This application is built on a Node.js (Express) back end, MongoDB as the database, and uses jQuery for responsiveness on the front end. The application interfaces with the aforementioned Chrome extension. Other features include,
- Job automation, checking on prices consistently
- Leveraging Selenium WebDriver with headless Chrome to scrape web pages which load data using javascript.
- Sendgrid to automate sending emails


#### License
This project was started using https://github.com/sahat/hackathon-starter, which is provided under the MIT License.
