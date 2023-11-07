window.addEventListener('DOMContentLoaded', (event) => {
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
