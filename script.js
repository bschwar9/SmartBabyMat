// Function to toggle spinning animation on the image
function toggleSpinningEffect() {
    var img = document.getElementById('raspberryImage');
    img.classList.toggle('spinning');
}

// Event listener for clicks on the document body
document.body.addEventListener('click', toggleSpinningEffect);

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
