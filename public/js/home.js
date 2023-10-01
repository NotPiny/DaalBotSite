function onButtonClick(button) {
    switch (button) {
        case 'Github':
            window.location.href = 'https://github.com/NotPiny/DaalBot'
    }
}

// Update text in invite section to show the amount of servers the bot is in rounded down to the nearest 10
function updateInviteText() {
    fetch('https://api.daalbot.xyz/get/general/serverAmount')
        .then(response => response.text())
        .then(data => {
            document.getElementById('rounded-server-amount').innerText = `${Math.floor(data / 10) * 10}`; // Round down to nearest 10 and set the span's text to that
        })
}

updateInviteText(); // Update the invite text on page load