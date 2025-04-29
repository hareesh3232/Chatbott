async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    addMessage(userInput, 'user');
    document.getElementById("user-input").value = "";

    addMessage("Typing...", 'bot');

    try {
        const response = await fetch('/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        removeTypingMessage();
        addMessage(data.reply, 'bot');
    } catch (error) {
        removeTypingMessage();
        addMessage("Sorry, error occurred. Try later.", 'bot');
    }
}

function addMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", `${sender}-message`);
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingMessage() {
    const chatBox = document.getElementById("chat-box");
    const typingMessages = document.querySelectorAll(".bot-message");
    if (typingMessages.length > 0) {
        typingMessages[typingMessages.length - 1].remove();
    }
}
