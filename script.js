async function handleSearch() {
    const userInput = document.getElementById('userInput').value;
    const url = `https://github-profiles-trending-developers-repositories-scrapping.p.rapidapi.com/profiles?profileUrl=https://github.com/${userInput}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '987a57d7eemsh4d1a13f773393d8p1d2236jsn316d52f0c877',
            'x-rapidapi-host': 'github-profiles-trending-developers-repositories-scrapping.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();


        const profile = result.data;

        const avatarUrl = profile.avatarUrl || `https://github.com/${userInput}.png`;


        document.getElementById('result').innerHTML = `
            <div style="text-align: center;">
                <img src="${avatarUrl}" alt="GitHub Avatar" style="width: 150px; height: 150px; border-radius: 50%; border: 3px solid white; margin-bottom: 15px;">
                <h2>${profile.name || 'No name found'}</h2>
                <p><strong>Username:</strong> ${userInput}</p>
                <p><strong>Bio:</strong> ${profile.bio || 'No bio available'}</p>
                <p><strong>Followers:</strong> ${profile.followers || 0}</p>
                <p><strong>Following:</strong> ${profile.following || 0}</p>
                <p><strong>LinkedIn:</strong> <a href="${profile.linkedIn || '#'}" target="_blank">${profile.linkedIn || 'Not available'}</a></p>
                <p><strong>Email:</strong> ${profile.emails ? profile.emails.join(', ') : 'Not available'}</p>
                <p><strong>Achievements:</strong> ${profile.achievements ? profile.achievements.join(', ') : 'No achievements listed'}</p>
            </div>
        `;
    } catch (error) {
        console.error(error);
        document.getElementById('result').innerHTML = `<p style="color:red;">Error fetching data. Please check the username.</p>`;
    }
}
