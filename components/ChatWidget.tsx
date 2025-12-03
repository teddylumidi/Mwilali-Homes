import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize2, Maximize2, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { chatWithAgent } from '../services/gemini';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am Gemini, your AI real estate assistant. How can I help you find your dream home today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await chatWithAgent(messages, userMsg.text);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-red-500 rotate-90 opacity-0 pointer-events-none' : 'bg-primary hover:bg-gray-800 text-white scale-100'
        }`}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-full sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 transform origin-bottom-right overflow-hidden border border-gray-100 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ height: 'min(600px, 80vh)' }}
      >
        {/* Header */}
        <div className="bg-primary p-4 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-accent/20 p-1.5 rounded-lg">
                <Sparkles size={18} className="text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Gemini Assistant</h3>
              <p className="text-xs text-gray-300">Always online</p>
            </div>
          </div>
          <button onClick={toggleChat} className="text-gray-300 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-accent text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                } ${msg.isError ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
               <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                 <Loader2 size={16} className="animate-spin text-accent" />
                 <span className="text-xs text-gray-500">Thinking...</span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about the market..."
              className="w-full bg-gray-100 text-gray-800 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-2 p-2 bg-primary text-white rounded-full hover:bg-accent disabled:opacity-50 disabled:hover:bg-primary transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};