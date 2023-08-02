const fetch = require('node-fetch');
const token = process.env.BESTTIME_TOKEN_PRIVATE;

module.exports = {
  SingleVenue
};

function SingleVenue (req, res, next) {
  const params = new URLSearchParams({ 
    'api_key_private': `${token}`,
     'venue_name': 'Novela',
     'venue_address': '662 Mission St San Francisco, CA 94105 United States'
   });

  fetch(`https://besttime.app/api/v1/forecasts?${params}`, {
  method: 'POST'
  })
  .then(res => res.json())
  .then(function(data) { res.render('index', 
  {
    title: 'Welcome to crowdShoo',
    data}) });
}
