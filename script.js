// Function to toggle spinning animation on the image
function toggleSpinningEffect() {
    var img = document.getElementById('raspberryImage');
    img.classList.toggle('spinning');
}

// Event listener for clicks on the document body to toggle image spinning
document.body.addEventListener('click', toggleSpinningEffect);

var audio = new Audio();

// Function to fetch and play the latest audio
function playLatestAudio() {
    // If the audio is already playing, reset it
    if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
    }

    fetch('https://1mkbfmthe9.execute-api.us-east-2.amazonaws.com/getLatestAudio')
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .then(blob => {
            // Only change the src if a new blob is fetched
            const audioUrl = URL.createObjectURL(blob);
            if (audio.src !== audioUrl) {
                audio.src = audioUrl;
            }
            audio.play();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Event listener for the audio button
document.getElementById('audioButton').addEventListener('click', playLatestAudio);


// This function fetches and displays weight data
function displayWeightData() {
    const startDate = '2023-11-04T16:22:14.452559';
    const endDate = '2023-11-04T17:52:14.452559';
    const apiUrl = `https://1mkbfmthe9.execute-api.us-east-2.amazonaws.com/getWeights?startDate=${startDate}&endDate=${endDate}`;

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            const tableBody = document.getElementById('weightTable').querySelector('tbody');
            // Convert fetched data into a plain text string
            let plainTextData = '';
            data.forEach(item => {
                // Append each data item as a line of text
                plainTextData += `${item.date}: ${item.weight}\n`; // Adjust keys according to your actual data properties
            });
            // Insert plain text data into the table body
            tableBody.innerHTML = `<tr><td><pre>${plainTextData}</pre></td></tr>`;
        })
        .catch(error => {
            console.error('There was a problem with fetching weight data:', error);
        });
}

// This function will run when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
    // Fetch and display the latest image from the Raspberry Pi
    fetch('https://1mkbfmthe9.execute-api.us-east-2.amazonaws.com/getLatestImage')
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            document.getElementById('raspberryImage').src = imageUrl;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    displayWeightData();
});
