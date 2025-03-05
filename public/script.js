document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector("form[action='register1.jsp']");
    const loginForm = document.querySelector("form[action='login.jsp']");

    // Handle Registration Form
    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const formData = new FormData(registerForm);
            const userData = Object.fromEntries(formData);
            
            try {
                const response = await fetch("/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                });

                const result = await response.json();
                alert(result.message);
            } catch (error) {
                console.error("❌ Registration Error:", error);
                alert("An error occurred. Please try again.");
            }
        });
    }

    // Handle Login Form
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const formData = new FormData(loginForm);
            const userData = Object.fromEntries(formData);
            
            try {
                const response = await fetch("/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                });

                const result = await response.json();

                if (result.success) {
                    alert("✅ Login successful!");
                    window.location.href = result.redirect; // Redirect to index.html
                } else {
                    alert("❌ Login failed: " + result.message);
                }
            } catch (error) {
                console.error("❌ Login Error:", error);
                alert("An error occurred. Please try again.");
            }
        });
    }
});

        
// Select DOM elements
const chatbotBox = document.getElementById('chatbot-box');
const openChatbotBtn = document.getElementById('open-chatbot');
const closeChatbotBtn = document.getElementById('close-chatbot');
const chatbotContent = document.getElementById('chatbot-content');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSendBtn = document.getElementById('chatbot-send');

// Sample ticket data with show timings and price in INR
let ticketsData = {
    'VIP': { showTimes: ['10:00 AM', '2:00 PM', '6:00 PM'], priceINR: 1500 },
    'Standard': { showTimes: ['11:00 AM', '3:00 PM', '7:00 PM'], priceINR: 1000 },
    'Economy': { showTimes: ['12:00 PM', '4:00 PM', '8:00 PM'], priceINR: 500 },
    'Premium': { showTimes: ['1:00 PM', '5:00 PM', '9:00 PM'], priceINR: 2000 },
    'Student': { showTimes: ['9:00 AM', '1:00 PM', '5:00 PM'], priceINR: 400 },
    'Family': { showTimes: ['10:00 AM', '3:00 PM', '7:00 PM'], priceINR: 3000 }
};

// Variable to store ticket selection and user data
let selectedTicketType = null; // Store selected ticket type
let availableTimes = []; // Store available times for selected ticket type
let selectedTime = null; // Store selected time slot
let totalPriceINR = 0; // Store total price in INR
let selectedTicketCount = 0; // Store number of tickets selected

// Flag to prevent double responses
let isBotResponding = false;

// Open chatbot on button click
openChatbotBtn.addEventListener('click', () => {
    chatbotBox.style.display = 'flex';  // Show the chatbot
    addBotMessage('TicketBot: Hello! How can I assist you today? You can book tickets, ask about showtimes, or other queries.');
});

// Close chatbot on button click
closeChatbotBtn.addEventListener('click', () => {
    chatbotBox.style.display = 'none';  // Hide the chatbot
});

// Function to add bot messages with typing effect
function addBotMessage(message) {
    const botResponse = document.createElement('p');
    botResponse.textContent = message;
    chatbotContent.appendChild(botResponse);
    chatbotContent.scrollTop = chatbotContent.scrollHeight;
}

// Function to add button-based interaction for ticket types (VIP, Economy, etc.)
function addTicketTypeButtons() {
    setTimeout(() => {
        const ticketTypes = Object.keys(ticketsData);
        ticketTypes.forEach(ticketType => {
            const button = document.createElement('button');
            button.textContent = ticketType;
            button.classList.add('chatbot-button');
            button.addEventListener('click', () => handleTicketTypeSelection(ticketType));
            chatbotContent.appendChild(button);
        });
        chatbotContent.scrollTop = chatbotContent.scrollHeight;
    }, 1000); // Delay of 1 second to show the buttons after the message
}

// Function to handle ticket type selection
function handleTicketTypeSelection(ticketType) {
    selectedTicketType = ticketType;
    const ticketDetails = ticketsData[selectedTicketType];
    availableTimes = ticketDetails.showTimes;

    addBotMessage(`TicketBot: You've selected ${selectedTicketType} tickets. Available show timings: ${availableTimes.join(', ')}. How many tickets would you like to book?`);

    // Ask the user for the number of tickets
    addTicketCountButtons();
}

// Function to add button-based interaction for ticket count
function addTicketCountButtons() {
    setTimeout(() => {
        // Offer ticket count options from 1 to 5 for simplicity
        for (let i = 1; i <= 5; i++) {
            const button = document.createElement('button');
            button.textContent = `${i} ${i === 1 ? 'ticket' : 'tickets'}`;
            button.classList.add('chatbot-button');
            button.addEventListener('click', () => handleTicketCountSelection(i));
            chatbotContent.appendChild(button);
        }
        chatbotContent.scrollTop = chatbotContent.scrollHeight;
    }, 1000); // Delay of 1 second to show the buttons after the message
}

// Function to handle the number of tickets selected
function handleTicketCountSelection(count) {
    selectedTicketCount = count;
    const ticketDetails = ticketsData[selectedTicketType];
    availableTimes = ticketDetails.showTimes;

    addBotMessage(`TicketBot: You've selected ${selectedTicketCount} ${selectedTicketCount === 1 ? 'ticket' : 'tickets'}. Available show timings: ${availableTimes.join(', ')}. Please choose a time slot.`);
    addShowTimeButtons(availableTimes); // Add buttons for the available show timings
}

// Function to add button-based interaction for show timings
function addShowTimeButtons(times) {
    setTimeout(() => {
        times.forEach(time => {
            const button = document.createElement('button');
            button.textContent = time;
            button.classList.add('chatbot-button');
            button.addEventListener('click', () => handleTimeSelection(time));
            chatbotContent.appendChild(button);
        });
        chatbotContent.scrollTop = chatbotContent.scrollHeight;
    }, 1000); // Delay of 1 second to show the buttons after the message
}

// Function to handle the selected show time
function handleTimeSelection(time) {
    selectedTime = time;
    const ticketPriceINR = ticketsData[selectedTicketType].priceINR;
    totalPriceINR = ticketPriceINR * selectedTicketCount; // Multiply price by the number of tickets

    addBotMessage(`TicketBot: You've selected the ${selectedTime} time slot for ${selectedTicketCount} ticket(s). The total price is ₹${totalPriceINR}.`);
    addBotMessage('TicketBot: Please proceed to payment.');

    // Add the payment button
    const paymentButton = document.createElement('button');
    paymentButton.textContent = 'Proceed to Payment';
    paymentButton.classList.add('chatbot-button');
    paymentButton.addEventListener('click', initiatePayment);
    chatbotContent.appendChild(paymentButton);
    chatbotContent.scrollTop = chatbotContent.scrollHeight;
}

// Chatbot logic for ticket booking
chatbotSendBtn.addEventListener('click', () => {
    const userMessage = chatbotInput.value;

    if (userMessage.trim() !== '' && !isBotResponding) { // Prevent double response
        isBotResponding = true; // Set the flag to true to prevent further responses

        // Add user message to chatbot content
        const userMsgElement = document.createElement('p');
        userMsgElement.textContent = 'You: ' + userMessage;
        chatbotContent.appendChild(userMsgElement);

        // Simulate TicketBot response
        const botResponse = document.createElement('p');
        const lowerCaseMessage = userMessage.toLowerCase();

        // Handle ticket-related questions
        if (lowerCaseMessage.includes('ticket')) {
            botResponse.textContent = 'TicketBot: What type of ticket would you like to book? You can say "VIP", "Standard", "Economy", etc.';
            addBotMessage(botResponse.textContent); // Add bot's response
            addTicketTypeButtons(); // Add buttons for the available ticket types
        } else if (lowerCaseMessage.includes('show times') || lowerCaseMessage.includes('show timings')) {
            // Respond with the available showtimes in a table format
            botResponse.textContent = 'TicketBot: Here are the show timings for each ticket type:';
            addBotMessage(botResponse.textContent);
            addShowTimesTable(); // Add the table of showtimes
        } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            botResponse.textContent = 'TicketBot: Hello! How can I assist you with booking tickets or museum information today?';
            addBotMessage(botResponse.textContent); // Add bot's response
        } else if (lowerCaseMessage.includes('museum')) {
            // Respond with general information about the museum
            botResponse.textContent = "TicketBot: Welcome to the Museum of Art and Gallery! How can I assist you today? You can book tickets, ask about our exhibits, or inquire about showtimes.";
            addBotMessage(botResponse.textContent);
        }else if(lowerCaseMessage.includes('show prices')|| lowerCaseMessage.includes('prices of show'))
        {
            botResponse.textContent ='TicketBot:Here are the tickets Prices for all types'
            addBotMessage(botResponse.textContent);
            addShowPrices();
        } else {
            botResponse.textContent = 'TicketBot: I am sorry, I did not understand that. Please try asking about ticket bookings or showtimes.';
            addBotMessage(botResponse.textContent); // Add bot's response
        }

        chatbotInput.value = ''; // Clear the input field
        isBotResponding = false; // Reset the flag to allow the next response
    }
});

// Add functionality for the Enter key (same as clicking the send button)
chatbotInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action of Enter (e.g., submitting a form)
        chatbotSendBtn.click(); // Trigger the send button click event
    }
});

// Function to generate showtimes table
function addShowTimesTable() {
    const table = document.createElement('table');
    table.innerHTML = `
        <tr><th>Ticket Type</th><th>Show Time 1</th><th>Show Time 2</th><th>Show Time 3</th></tr>
        ${Object.keys(ticketsData).map(ticketType => {
            const showTimes = ticketsData[ticketType].showTimes.join('</td><td>');
            return `<tr><td>${ticketType}</td><td>${showTimes}</td></tr>`;
        }).join('')}
    `;
    chatbotContent.appendChild(table);
}
// Function to generate Show Price table
function addShowPrices() {
    const table = document.createElement('table');
    table.innerHTML = `
        <tr><th>Ticket Type</th><th>Price (INR)</th></tr>
        ${Object.keys(ticketsData).map(ticketType => {
            const ticketPrice = ticketsData[ticketType].priceINR;
            return `<tr><td>${ticketType}</td><td>₹${ticketPrice}</td></tr>`;
        }).join('')}
    `;
    chatbotContent.appendChild(table);
}

// Function to initiate Razorpay payment
function initiatePayment() {
    const options = {
        "key": "rzp_test_okKGrXQGy8uz1P",
        "amount": totalPriceINR * 100, 
        "currency": "INR",
        "name": "Museum Ticket Booking",
        "description": "Book your tickets now!",
        "image": "https://yourwebsite.com/logo.png", 
        "handler": function (response) {
            alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
            generateTicketPDF();  
        },
        "prefill": {
            "name": "Tanmay Nagawade",
            "email": "nagawadetanmay67@gmail.com",
            "contact": "7397987460"
        },
        "notes": {
            "address": "Hello World"
        },
        "theme": {
            "color": "#F37254"
        }
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
}

// Function to generate ticket PDF using jsPDF
function generateTicketPDF() {
    const { jsPDF } = window.jspdf;

    // Create a new PDF document
    const doc = new jsPDF();

    // Add title (header) for the ticket
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Museum of Art and Gallery', 60, 20);

    // Ticket layout design
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.rect(10, 25, 190, 120);  // Draw ticket box

    // Define the data for the table
    const ticketDetails = [
        { label: 'Ticket Type', value: selectedTicketType },
        { label: 'Number of Tickets', value: selectedTicketCount },
        { label: 'Show Time', value: selectedTime },
        { label: 'Total Price', value: `${totalPriceINR}` },
        { label: 'Name', value: 'Tanmay Nagawade' },
        { label: 'Email', value: 'nagawadetanmay67@gmail.com' }
    ];

    // Create table data for jsPDF autoTable plugin
    const tableData = ticketDetails.map(detail => [detail.label, detail.value]);

    // Add the table using jsPDF autoTable plugin
    doc.autoTable({
        startY: 30,  // Positioning the table from Y axis after title
        head: [['Field', 'Details']], // Table headers
        body: tableData, // The data for the table
        theme: 'grid',  // Apply grid style to the table
        margin: { top: 10 }, // Add margin between content and table
        styles: { 
            fontSize: 12, 
            font: 'helvetica',
            halign: 'center' 
        },
        headStyles: {
            fillColor: [128, 128, 128],  // Red color for header
            textColor: [255, 255, 255]  // White text for header
        },
        bodyStyles: {
            fillColor: [255, 255, 255],  // Light gray color for body
        }
    });

    // Add footer or additional information if necessary
    doc.setFontSize(10);
    doc.text('Thank you for booking with us. Enjoy your visit!', 20, doc.lastAutoTable.finalY + 10);

    // Save the PDF with the ticket details
    doc.save(`Ticket_${selectedTicketType}_${selectedTicketCount}_${selectedTime}.pdf`);
}