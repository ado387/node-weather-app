const request = require( 'postman-request' );

const API_KEY = '0bb822ab95c07a420e8d51b570023b94';

const geocode = ( address, callback ) => {
	const uri = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent( address )}&limit=3&appid=${API_KEY}&lang=en`;

	request( { uri, json: true }, ( error, response, body ) => {
		if ( error ) {
			callback( 'Unable to connect to location services!', undefined );
		}
		else if ( body.length === 0 ) {
			callback( 'No results for searched address. Try another search.', undefined );
		}
		else {
			callback( undefined, {
				latitude: body[0].lat,
				longitude: body[0].lon,
				location: body[0].name + ' - ' + body[0].state,
			});
		}
	});
}

module.exports = geocode;
