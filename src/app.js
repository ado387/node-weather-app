const path    = require( 'path' );
const express = require( 'express' );
const hbs     = require( 'hbs' );

const app = express();

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
	res.send({
		temperature: 20,
		location: 'Sarajevo',
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

app.listen( 3000, () => {
	console.log( 'Server is up on port 3000.' );
});
