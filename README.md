Bearclaw
========

Migrating this 2016 <a href="https://github.com/grantbradshaw/snowshoe_site">project</a> - upgrading packages. Accompanied by this <a href="https://github.com/grantbradshaw/snowshoe_extension">Chrome Extension</a>.

Originally a final project from Lighthouse Labs with Jonathan Morrisey, this project is a universal web scraping application for shopping. Users can go to any site, indicate the price they wish to track, and receive an alert when the price drops below a threshold they indicate.

##### Demo and Live Link
A live link will be made available shortly, as will a visual walkthrough of the application.

#### Tech Stack
This application is built on a Node.js (Express) back end, MongoDB as the database, and uses jQuery for responsiveness on the front end. The application interfaces with the aforementioned Chrome extension, and data transferring is done using JSON Web Tokens. Other features include,
- Security including CSRF and XSS protection, rate limiting
- Job automation, checking on prices consistently
- Leveraging Selenium WebDriver with headless Chrome to scrape web pages which load data using javascript.


#### License
This project was started using https://github.com/sahat/hackathon-starter, which is provided under the MIT License.
