//spinning effect event listener
document.addEventListener('DOMContentLoaded', function() {
    var img = document.getElementById('raspberryImage');
    img.addEventListener('click', function() {
        //toggles spin for fun
        this.classList.toggle('spinning');
    });

    var audio = new Audio();

    //fetches and plays latest audio
    document.getElementById('audioButton').addEventListener('click', function() {
        fetch('https://1mkbfmthe9.execute-api.us-east-2.amazonaws.com/getLatestAudio')
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw new Error('Network response was not ok.');
            })
            .then(blob => {
                const audioUrl = URL.createObjectURL(blob);
                audio.src = audioUrl;
                audio.play();
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    });

    //fetches and displays weight data
    function displayWeightData() {
        const startDate = '2020-11-04T16:22:14.452559';
        const endDate = '2025-11-04T17:52:14.452559';
        const apiUrl = `https://1mkbfmthe9.execute-api.us-east-2.amazonaws.com/getWeights?startDate=${startDate}&endDate=${endDate}`;

        fetch(apiUrl)
            .then(response => response.ok ? response.json() : Promise.reject('Failed to load'))
            .then(data => {
                const tableBody = document.getElementById('weightTable').querySelector('tbody');
                let rows = '';
                data.forEach(item => {
                    rows += `<tr><td>${item.date}</td><td>${item.weight}</td></tr>`;
                });
                tableBody.innerHTML = rows;
            })
            .catch(error => {
                console.error('There was a problem with fetching weight data:', error);
            });
    }

    //image stuff
    fetch('https://1mkbfmthe9.execute-api.us-east-2.amazonaws.com/getLatestImage')
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        })
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            img.src = imageUrl;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

    displayWeightData();
});
