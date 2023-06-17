
var moiveSearch = JSON.parse(localStorage.getItem("whereLookup"));
console.log(moiveSearch)

function findWheretoStream() {
    const url = 'https://streaming-availability.p.rapidapi.com/v2/search/title?title=batman&country=us&show_type=movie&output_language=en';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '708af97118msh3f74fb80ad20ee2p1f232ejsncd6d167e1b72',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

try {
	const response = fetch(url, options);
	const result = response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}}

    findWheretoStream();