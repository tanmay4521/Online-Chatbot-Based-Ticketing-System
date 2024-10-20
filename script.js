// Open/Close Chatbot
const chatbotBox = document.getElementById('chatbot-box');
const openChatbotBtn = document.getElementById('open-chatbot');
const closeChatbotBtn = document.getElementById('close-chatbot');
const chatbotContent = document.getElementById('chatbot-content');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSendBtn = document.getElementById('chatbot-send');

// Open chatbot on button click
openChatbotBtn.addEventListener('click', () => {
    chatbotBox.style.display = 'flex';  // Show the chatbot
});

// Close chatbot on button click
closeChatbotBtn.addEventListener('click', () => {
    chatbotBox.style.display = 'none';  // Hide the chatbot
});

// Chatbot logic for ticket booking
chatbotSendBtn.addEventListener('click', () => {
    const userMessage = chatbotInput.value;

    if (userMessage.trim() !== '') {
        // Add user message to chatbot content
        const userMsgElement = document.createElement('p');
        userMsgElement.textContent = 'You: ' + userMessage;
        chatbotContent.appendChild(userMsgElement);

        // Simulate TicketBot response
        const botResponse = document.createElement('p');
        if (userMessage.toLowerCase().includes('ticket')) {
            botResponse.textContent = 'TicketBot: How many tickets would you like to book?';
        } else if (userMessage.toLowerCase().includes('1')) {
            botResponse.textContent = 'TicketBot: Booking 1 tickets. Please proceed to payment.';
        } else if (userMessage.toLowerCase().includes('2')) {
            botResponse.textContent = 'TicketBot: Booking 2 tickets. Please proceed to payment.';
        } else if (userMessage.toLowerCase().includes('3')) {
            botResponse.textContent = 'TicketBot: Booking 3 tickets. Please proceed to payment.';
        } else if (userMessage.toLowerCase().includes('4')) {
            botResponse.textContent = 'TicketBot: Booking 4 tickets. Please proceed to payment.';
        } else if (userMessage.toLowerCase().includes('5')) {
            botResponse.textContent = 'TicketBot: Booking 5 tickets. Please proceed to payment.';
        } else if (userMessage.toLowerCase().includes('6')) {
            botResponse.textContent = 'TicketBot: Booking 6 tickets. Please proceed to payment.';
        } else if (userMessage.toLowerCase().includes('7')) {
            botResponse.textContent = 'TicketBot: Booking 7 tickets. Please proceed to payment.';
        } else if (userMessage.toLowerCase().includes('8')) {
            botResponse.textContent = 'TicketBot: Booking 8 tickets. Please proceed to payment.';
        } else if (userMessage.toLowerCase().includes('9')) {
            botResponse.textContent = 'TicketBot: Booking 9 tickets. Please proceed to payment.';
        } else {
            botResponse.textContent = 'TicketBot: I can help with ticket booking and museum information. How can I assist you today?';
        }

        chatbotContent.appendChild(botResponse);
        chatbotContent.scrollTop = chatbotContent.scrollHeight;
        chatbotInput.value = ''; // Clear input field
    }
});
