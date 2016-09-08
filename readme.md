## Introduction

This is a single page application that will allow users to submit a URL of a product feed. Default URL is: 

https://s3-ap-southeast-1.amazonaws.com/theincitement.com/exam/productfeed.xml


On submitting the form, the URL should be processed by back-end extracting following properties from each feed entry:

1. productID

2. name

3. description

4. price & currency

5. category (all)

6. productURL

7. imageURL

The results should be streamed to the browser and shown to the user in a visually interactive layout. 


## Technologies 
This application has been made by HTML5, Sass & Compass, Bootstrap, Angular JS and PHP. 


## Deployment
Download or clone the repository.


## Responsive design
Its reponsive for all sizes and different devices. I used Bootstrap v3.3.7. I also added extra manual media queries  from 320px to 767px for mobile phones and small screens to create a better user experience. As it supports 320px it can support older models of iPhones like iphone 5 and 5s too. 

## Key files
/api/ttAPI.php : Our PHP API. It handles HTTP requests and compile the xml file and will send the result to client.

/index.html : main Markup file which contains the view elements.

/sass/style.scss : main scss file which includes all of the stylesheets there. 

/sass/_mixin.scss : Includes all of mixins we used in style.scss

/js/controller.js : Includes our Angular js app, controller and all functions.

/test/test.js : our Mocha test suites which is written with Karma-chai Assertion library

/lib/ : This folder keeps external libraries I used in this app including, Angular js,jQuery and Bootstrap JS files

## Tests

I tested this app in different devices and browsers. Code coverage of our statements in controller.js is 95% according to Istanbul plugin. You can see the code coverage result for chrome and firefox in /coverage folder. I also generated a full test report for you in test/test-report.pdf.

To run the test files, you need to install following npm packages:
Karma 
Karma-mocha 
Karma-chai 
Karma-cli
Karma-coverage 
Karma-firefox-launcher 
Karma-chrome-launcher
karma-htmlfile-reporter





