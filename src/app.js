const path    = require( 'path' );
const express = require( 'express' );

const app = express();

const publicDirectoryPath = path.join( __dirname, '../public' );
const options             = {
	extensions: [ 'html', 'htm' ],
}

app.use( express.static( publicDirectoryPath, options ) );

app.get( '', ( req, res ) => {
	res.send( '<h1>Weather</h1>' );
});

app.get( '/weather', ( req, res ) => {
	res.send({
		temperature: 20,
		location: 'Sarajevo',
	});
});

app.listen( 3000, () => {
	console.log( 'Server is up on port 3000.' );
});
