import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const GuestMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentBubbleIndex, setCurrentBubbleIndex] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      const response = await fetch('/.netlify/functions/get-messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
      // Silently fail for non-ok responses (e.g., database not configured in dev)
    } catch {
      // Silently fail - backend may not be available in development
    }
  };

  // Submit message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Please fill in both name and message");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/.netlify/functions/submit-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
        }),
      });

      if (response.ok) {
        toast.success("Your message has been sent!");
        setName("");
        setMessage("");
        setShowForm(false);
        fetchMessages(); // Refresh messages
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting message:', error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  // Cycle through message bubbles
  useEffect(() => {
    if (messages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBubbleIndex((prev) => (prev + 1) % messages.length);
    }, 4000); // Show each bubble for 4 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  const currentMessage = messages[currentBubbleIndex];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 transform-gpu"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-rose-300" />
            <MessageCircle className="w-6 h-6 text-rose-400" />
            <span className="h-px w-12 bg-rose-300" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-gray-800 mb-4">
            Guest Messages
          </h2>
          <p className="font-body text-gray-600 max-w-2xl mx-auto">
            Share your love and wishes for our special day. Your messages mean the world to us!
          </p>
        </motion.div>

        {/* Message Bubbles Display */}
        <div className="relative h-32 mb-8 flex items-center justify-center">
          <AnimatePresence initial={false}>
            {currentMessage && (
              <motion.div
                key={currentMessage.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute max-w-md transform-gpu"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-rose-200 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-rose-600" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-800 text-sm mb-1">
                          {currentMessage.name}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {currentMessage.message}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Add Message Button */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {showForm ? "Hide Form" : "Leave a Message"}
          </Button>
        </div>

        {/* Message Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border-rose-200 shadow-lg">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                        maxLength={50}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Share your wishes for the couple..."
                        className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-400 min-h-[100px] resize-none"
                        maxLength={300}
                        required
                      />
                      <div className="text-right text-xs text-gray-500 mt-1">
                        {message.length}/300 characters
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message Count */}
        {messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full text-rose-700">
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">
                {messages.length} loving message{messages.length !== 1 ? 's' : ''} from friends and family
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GuestMessages;