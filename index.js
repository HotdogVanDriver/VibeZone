const axios = require('axios');

const webhookUrl = process.env.WEBHOOK_URL;
const currentDate = new Date();
const daysPassed = Math.ceil((currentDate - new Date('2023-06-08')) / (1000 * 60 * 60 * 24));

const powers = {
  R1: { currentPower: 1000000, dailyIncrease: 100, percentIncrease: 0.04 },
  R2: { currentPower: 2000000, dailyIncrease: 200, percentIncrease: 0.06 },
  R3: { currentPower: 3000000, dailyIncrease: 300, percentIncrease: 0.08 },
  R4: { currentPower: 4000000, dailyIncrease: 400, percentIncrease: 0.10 },
};

for (let rank in powers) {
  let powerData = powers[rank];
  for (let i = 0; i < daysPassed; i++) {
    powerData.currentPower += powerData.dailyIncrease;
    powerData.dailyIncrease = powerData.dailyIncrease * (1 + powerData.percentIncrease);
  }
  powerData.currentPower = Math.round(powerData.currentPower / 100000) * 100000; // Round to the nearest 100,000
  powers[rank] = powerData;
}

let messageContent = "Updated Power Requirements:\n\n"; // Add a header to the message
const message = Object.entries(powers).map(([rank, { currentPower }]) => {
  return `${rank}: ${currentPower.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}).join('\n');
messageContent += message; // Add your table to the message content

axios.post(webhookUrl, { content: messageContent }) // Send the message to the channel
  .then(() => console.log('Message sent successfully'))
  .catch(err => console.error('Failed to send message:', err));
