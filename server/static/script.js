// script.js
document.addEventListener('DOMContentLoaded', () => {
    const messages = [
        "Nobody expects the Spanish Inquisition!",
        "But here they are.",
        "You may have got a bit lost there.",
        "Let's get you back to another page now."
    ];

    let messageIndex = 0;
    const messageElement = document.querySelector('p');
    
    function updateMessage() {
        messageElement.textContent = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length;
    }

    setInterval(updateMessage, 3000); // Change message every 3 seconds
});

