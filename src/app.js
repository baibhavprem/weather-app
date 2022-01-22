const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000;  //Providing a port to heroku to listen to. Locally use port 3000 and the other one if run on heroku.

// --> Setting up a extensions array in options object to get the html type extensions for other html files such as about,weather,etc and also simplify routing and hence we need not write saperate app.get code for getting the respective pages in the browser.
const options = {
  extensions: ['html', 'htm']
}

// --> Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');    // Joins the two given paths to get the absolute public dir path in this case
const viewsPath = path.join('__dirname', '../templates/views');
const partialsPath = path.join('__dirname', '../templates/partials');

// --> Setting up handlebars, views location and registering handlebars location for partials path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// --> Setting up the static directory to serve
app.use(express.static(publicDirectoryPath, options));      // Using the public folder and serving its contents as per the request of the user
// Note: Here static means the content of the page is static and dosent change upon refreshing

// --> Setting up the get requests for pages
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'VA007'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'VA007'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'VA007',
    helpTxt: `You can contact for any required help :)`
  });
});

// --> Setting up the query string to take in address and provide the forecast
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }

      res.send({
        forecast: forecastData,
        location,                    // Using ES6 destructuring shorthand property
        address: req.query.address
      });
    });
  });
});

// Setting up 404 pages
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 :(',
    name: 'VA007',
    errorMessage: 'Help article not found.'
  });
});

app.get('*', (req, res) => {   // Here '*' is known as the wild card character and it gets matched for every other page except the above pages.
  res.render('404', {
    title: '404 :(',
    name: 'VA007',
    errorMessage: '404. Not Found.'
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

// <-------------------------------------------------------Old Code Start------------------------------------------------------------>
// app.get('', (req, res) => {
//   res.send('Hello Express!');
// });

// app.get('/about', (req, res) => {   
//   res.send('<h1>This is the about page</h1>');      // Serving HTML to the webpage
// });

// app.get('/weather', (req, res) => {                 
//   res.send({                                        // Serving JSON to the webpage
//     temperature: 24,
//     description: 'Partially Cloudy'
//   });
// });

// app.get('/contact', (req, res) => {
//   res.send('This is the contact page');
// });

//  In the above get functions first parameter passed will be the route of the website to get from the user like- 
//  app.com          -->   will be  -->  ''
//  app.com/home     -->   will be  -->  '/home'
//  app.com/about    -->   will be  -->  '/about'
//  app.com/contact  -->   will be  -->  '/contact'
// <-------------------------------------------------------Old Code End------------------------------------------------------------>

