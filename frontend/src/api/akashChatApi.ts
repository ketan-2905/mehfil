import axios from 'axios';

const akashChatApi = axios.create({
  baseURL: 'https://api.akashchat.ai/v1',
  headers: {
    'Authorization': `Bearer sk-aXXoK39qs2BruSRqiFjdoQ`,
    'Content-Type': 'application/json'
  }
});

export const getChatResponse = async (message: string) => {
  try {
    const response = await akashChatApi.post('/chat', {
      message,
      context: "You are a helpful assistant for Mehfil, a venue and event booking platform. Help users with venue bookings, event tickets, payments, and general inquiries. Contact email is bhatthritik17@gmail.com and phone is 989221596."
    });
    return response.data.response;
  } catch (error) {
    console.error('AkashChat API Error:', error);
    return "I'm having trouble connecting right now. Please contact us at 989221596 or bhatthritik17@gmail.com";
  }
};