const request = require( 'postman-request' );

const API_KEY = '0bb822ab95c07a420e8d51b570023b94';

const forecast = ( latitude, longitude, callback ) => {
	const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

	request( { uri, json: true }, (error, response, body ) => {
		if ( error ) {
			callback( 'Unable to connect to weather service.', undefined );
		}
		else if ( body.cod >= 300 || body.cod < 200 ) {
			callback( body.message, undefined );
		}
		else if ( Array.isArray( body ) && body.length === 0 ) {
			callback( 'No data for searched address, try another search.', undefined );
		}
		else {
			callback( undefined, {
				description: body.weather[0].main,
				temperature: body.main.temp,
				feelsLike: body.main.feels_like,
			});
		}

	});
}

module.exports = forecast;
