export async function getFiles(fileName = ''){
	const baseUrl = 'http://localhost:5000/files/data'
	const params = new URLSearchParams();
	if(fileName){
		params.append('fileName', fileName);
	}
	const fullUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
	return fetch(fullUrl)
	.then((response) => {
		if (!response.ok) {
			throw new Error('Files fetching failed');
		}
		return response.json();
	})
}