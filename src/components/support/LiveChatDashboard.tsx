import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Phone, Mail, Clock, Package } from "lucide-react";

interface LiveChatDashboardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Conversation {
  id: string;
  customer: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: "active" | "waiting" | "resolved";
}

interface Message {
  id: string;
  sender: "customer" | "agent";
  text: string;
  time: string;
}

const conversations: Conversation[] = [
  { id: "1", customer: "Ahmed Al-Mansouri", lastMessage: "Where is my order?", time: "2 min", unread: 2, status: "active" },
  { id: "2", customer: "Fatima Al-Zahra", lastMessage: "Thank you for your help!", time: "5 min", unread: 0, status: "resolved" },
  { id: "3", customer: "Omar Hassan", lastMessage: "I need to change my address", time: "10 min", unread: 1, status: "waiting" },
  { id: "4", customer: "Sara Al-Rashid", lastMessage: "Can I cancel my order?", time: "15 min", unread: 3, status: "active" },
  { id: "5", customer: "Khalid Al-Sabah", lastMessage: "Payment issue", time: "20 min", unread: 0, status: "waiting" },
];

const initialMessages: Message[] = [
  { id: "1", sender: "customer", text: "Hello, I placed an order 3 days ago and haven't received any updates.", time: "10:30 AM" },
  { id: "2", sender: "agent", text: "Hi Ahmed! I'd be happy to help you track your order. Could you please provide your order number?", time: "10:31 AM" },
  { id: "3", sender: "customer", text: "Yes, it's ORD-2024-1234", time: "10:32 AM" },
  { id: "4", sender: "agent", text: "Thank you! Let me check that for you.", time: "10:32 AM" },
  { id: "5", sender: "customer", text: "Where is my order?", time: "10:35 AM" },
];

export default function LiveChatDashboard({ open, onOpenChange }: LiveChatDashboardProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      sender: "agent",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };

  const getStatusColor = (status: Conversation["status"]) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "waiting": return "bg-yellow-500";
      case "resolved": return "bg-muted";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[80vh] p-0">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-80 border-r flex flex-col">
            <DialogHeader className="p-4 border-b">
              <DialogTitle>Live Conversations</DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex-1">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedConversation.id === conv.id ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {conv.customer.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(conv.status)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conv.customer}</p>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedConversation.customer.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedConversation.customer}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <span className={`h-2 w-2 rounded-full ${getStatusColor(selectedConversation.status)}`} />
                    {selectedConversation.status === "active" ? "Online" : selectedConversation.status === "waiting" ? "Waiting" : "Resolved"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Mark Resolved
                </Button>
                <Button variant="outline" size="sm">
                  Transfer
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "agent" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.sender === "agent"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === "agent" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Customer Info Panel */}
          <div className="w-72 border-l p-4">
            <h3 className="font-semibold mb-4">Customer Details</h3>
            <div className="space-y-4">
              <div className="text-center">
                <Avatar className="h-16 w-16 mx-auto">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {selectedConversation.customer.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <p className="font-medium mt-2">{selectedConversation.customer}</p>
                <Badge variant="outline" className="mt-1">VIP Customer</Badge>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>ahmed@email.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+965 1234 5678</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Customer since 2023</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span>12 orders placed</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Recent Orders</h4>
                <div className="space-y-2">
                  <div className="text-sm p-2 bg-muted rounded">
                    <p className="font-medium">ORD-2024-1234</p>
                    <p className="text-muted-foreground text-xs">Custom T-Shirts • 25.000 KD</p>
                  </div>
                  <div className="text-sm p-2 bg-muted rounded">
                    <p className="font-medium">ORD-2024-1198</p>
                    <p className="text-muted-foreground text-xs">Ceramic Mugs • 15.500 KD</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Quick Responses</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full text-left justify-start text-xs">
                    Order is being processed
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-left justify-start text-xs">
                    Shipment will arrive soon
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-left justify-start text-xs">
                    Refund has been initiated
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
