import React, { useState } from 'react';
import './ChatbotWidget.css';
import { getChatResponse } from '../../api/akashChatApi';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Mehfil Assistant. How can I help you today?", isBot: true },
    { text: "You can ask me about:\n• Venue bookings\n• Event tickets\n• Payments\n• Contact information", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResponse = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('ticket') || lowercaseQuery.includes('book ticket')) {
      return "To book event tickets:\n1. Go to Events page\n2. OR Login as Audience\n3. Browse available events\n4. Select your preferred event\n5. Choose seats and complete payment\n\nNeed help? Contact: 989221596";
    }
    
    if (lowercaseQuery.includes('book') || lowercaseQuery.includes('reservation')) {
      return "To book a venue:\n1. Browse our venues\n2. Select date and time\n3. Make payment\n\nNeed help? Contact us at:\nPhone: 989221596\nEmail: bhatthritik17@gmail.com";
    }
    
    if (lowercaseQuery.includes('cancel') || lowercaseQuery.includes('refund')) {
      return "Cancellation Policy:\n• Within 48 hours: Full refund\n• Within 24 hours: 50% refund\n\nFor assistance, contact:\nPhone: 989221596\nEmail: bhatthritik17@gmail.com";
    }
    
    if (lowercaseQuery.includes('payment') || lowercaseQuery.includes('pay')) {
      return "We accept:\n• Credit/Debit Cards\n• UPI\n• Net Banking\n\nPayment issues? Email: bhatthritik17@gmail.com";
    }
    
    if (lowercaseQuery.includes('venue')) {
      return "Our venues are perfect for:\n• Weddings\n• Corporate Events\n• Birthday Parties\n• Cultural Programs\n\nFor specific venue details, call: 989221596";
    }

    if (lowercaseQuery.includes('price') || lowercaseQuery.includes('cost')) {
      return "Venue pricing varies by:\n• Location\n• Event type\n• Duration\n• Guest count\n\nFor detailed quotes, contact: 989221596";
    }

    if (lowercaseQuery.includes('contact') || lowercaseQuery.includes('help')) {
      return "Contact Information:\nHelpline: 989221596\nEmail: bhatthritik17@gmail.com\nWorking hours: 9 AM - 6 PM";
    }

    if (lowercaseQuery.includes('capacity') || lowercaseQuery.includes('people')) {
      return "Venue Capacities:\n• Small (50-100 guests)\n• Medium (100-300 guests)\n• Large (300-1000 guests)\n\nFor specific venue capacity, call: 989221596";
    }

    return "I can help you with bookings, payments, and general inquiries. For immediate assistance, call 989221596 or email bhatthritik17@gmail.com";
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = { text: inputText, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    const response = handleResponse(inputText);
    setMessages(prev => [...prev, { text: response, isBot: true }]);
    setIsLoading(false);
  };

  return (
    <div className="chatbot-widget">
      {!isOpen ? (
        <button className="chat-toggle-button" onClick={() => setIsOpen(true)}>
          💬 Need Help?
        </button>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <span>Mehfil Assistant</span>
            <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                Typing...
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button onClick={sendMessage} disabled={isLoading}>
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;