const path     = require( 'path' );
const express  = require( 'express' );
const hbs      = require( 'hbs' );
const geocode  = require( './util/geocode');
const forecast = require( './util/forecast');

const app  = express();
const port = process.env.PORT || 3000;

// Define paths for express config.
const publicPath   = path.join( __dirname, '../public' );
const viewsPath    = path.join( __dirname, '../templates/views' );
const partialsPath = path.join( __dirname, '../templates/partials' );

const options    = {
	extensions: [ 'html', 'htm' ],
}

// Setup handlebars engine and views location.
app.set( 'view engine', 'hbs' );
app.set( 'views', viewsPath );
hbs.registerPartials( partialsPath );

// Setup static directory to serve.
app.use( express.static( publicPath, options ) );

app.get( '', ( req, res ) => {
	res.render( 'index', {
		title: 'Weather',
		name: 'Adnan Požegić',
	});
});

app.get( '/about', ( req, res ) => {
	res.render( 'about', {
		title: 'About',
		name: 'Adnan Požegić',
	});
});

app.get( '/help', ( req, res ) => {
	res.render( 'help', {
		title: 'Help',
		message: 'Here you can find weather app api documentation.',
		name: 'Adnan Požegić',
	});
});

app.get( '/weather', ( req, res ) => {
	if ( ! req.query.address ) {
		res.send({
			error: 'Address must be provided.',
		});

		return;
	}

	geocode( req.query.address, ( error, { latitude, longitude, location } = {} ) => {
		if ( error ) {
			res.send( { error } );
			return;
		}

		forecast( latitude, longitude, ( error, { description, temperature, feelsLike } = {} ) => {
			if ( error ) {
				res.send( { error } );
				return;
			}

			res.send({
				description,
				temperature,
				feelsLike,
				location
			})
		});
	});
});

app.get( '/help/*', ( req, res ) => {
	res.render( '404', {
		title: '404 Help',
		name: 'Adnan Požegić',
	});
});

app.get( '*', ( req, res ) => {
	res.render( '404', {
		title: '404',
		name: 'Adnan Požegić',
	});
});

app.listen( port, () => {
	console.log( `Server is up on port ${port}.` );
});
