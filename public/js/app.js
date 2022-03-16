console.log( 'Client side JS loaded...' );



const weatherForm = document.querySelector( 'form' );
const search      = document.querySelector( 'input' );
const messageOne  = document.querySelector( '#message-1' );
const messageTwo  = document.querySelector( '#message-2' );

weatherForm.addEventListener( 'submit', ( event ) => {
	event.preventDefault();

	messageOne.innerHTML = `<p>Loading...</p>`;
	messageTwo.innerHTML = '';

	const location = search.value;

	fetch( `/weather?address=${location}` )
	.then( response => {
		return response.json()
	})
	.then( data => {
		if ( data.error ) {
			messageOne.innerHTML = `<p>${data.error}</p>`;
			return;
		}

		messageOne.innerHTML = `
			<h2>Current Weather</h2>
			<h3>${data.location}</h3>
			<p>
				<span><b>Status</b>: ${data.description}</span> <br>
				<span><b>Temperature</b>: ${data.temperature}°C</span> <br>
				<span><b>Feels like</b>: ${data.feelsLike}°C</span> <br>
			</p>
		`;

		console.log( data );
	});
});
