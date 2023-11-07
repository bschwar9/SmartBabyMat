// Function to toggle spinning animation on the image
function toggleSpinningEffect() {
    var img = document.getElementById('raspberryImage');
    img.classList.toggle('spinning');
}

// Event listener for clicks on the document body to toggle image spinning
document.body.addEventListener('click', toggleSpinningEffect);

// Function to fetch and play the latest audio
function playLatestAudio() {
    fetch('https://1mkbfmthe9.execute-api.us-east-2.amazonaws.com/getLatestAudio')
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .then(blob => {
            const audioUrl = URL.createObjectURL(blob);
            const audio = new Audio(audioUrl);
            audio.play();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Event listener for the audio button
document.getElementById('audioButton').addEventListener('click', playLatestAudio);

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
});
