async function handleSearch() {
	const userInput = document.getElementById('userInput').value;
	const url = `https://api.github.com/users/${userInput}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`User not found (HTTP ${response.status})`);
		}
		const profile = await response.json();

		document.getElementById('result').innerHTML = `
			<div style="text-align: center;">
				<img src="${profile.avatar_url}" alt="GitHub Avatar" style="width: 150px; height: 150px; border-radius: 50%; border: 3px solid white; margin-bottom: 15px;">
				<h2>${profile.name || 'No name found'}</h2>
				<p><strong>Username:</strong> ${profile.login}</p>
				<p><strong>Bio:</strong> ${profile.bio || 'No bio available'}</p>
				<p><strong>Followers:</strong> ${profile.followers}</p>
				<p><strong>Following:</strong> ${profile.following}</p>
				<p><strong>GitHub:</strong> <a href="${profile.html_url}" target="_blank">${profile.html_url}</a></p>
			</div>
		`;
	} catch (error) {
		console.error(error);
		document.getElementById('result').innerHTML = `<p style="color:red;">Error fetching data: ${error.message}</p>`;
	}
}

function handleScrapeSearch() {
	const data = JSON.stringify({
		url: 'https://github.com/search?q=python+is:sponsorable&type=marketplace',
		pageNumber: 1,
		maxPage: 2,
		cookies: []
	});

	const xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener('readystatechange', function () {
		if (this.readyState === this.DONE) {
			try {
				const json = JSON.parse(this.responseText);
				document.getElementById('scrapeResult').innerHTML =
					`<pre>${JSON.stringify(json, null, 2)}</pre>`;
			} catch (e) {
				console.error("Invalid JSON:", this.responseText);
				document.getElementById('scrapeResult').innerHTML =
					`<p style="color:red;">Failed to parse scrape data.</p>`;
			}
		}
	});

	xhr.open('POST', 'https://github-profiles-trending-developers-repositories-scrapping.p.rapidapi.com/search');
	xhr.setRequestHeader('x-rapidapi-key', '44d9f30f8amsh22195e39736922fp1be220jsnc335c609d058');
	xhr.setRequestHeader('x-rapidapi-host', 'github-profiles-trending-developers-repositories-scrapping.p.rapidapi.com');
	xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.send(data);
}
