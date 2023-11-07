// This function will run when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
    // Fetch and display the latest image from the Raspberry Pi
    fetch('https://1mkbfmthe9.execute-api.us-east-2.amazonaws.com/getLatestImage')
        .then(response => {
            if (response.ok) {
                return response.blob(); // Assuming the response is an image blob
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

// Event listener to fire confetti when the user clicks anywhere on the page
document.addEventListener('click', function() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5, x: 0.5 } // Fire from the center of the screen
    });
});

