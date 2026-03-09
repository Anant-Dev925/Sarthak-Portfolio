import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronRight, User, CheckCircle } from 'lucide-react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: Option[];
  isCustomInput?: boolean;
}

interface Option {
  label: string;
  value: string;
  nextStep: string;
}

interface ConversationFlow {
  [key: string]: {
    message: string;
    options?: Option[];
    isCustomInput?: boolean;
    inputPlaceholder?: string;
    isFinal?: boolean;
    nextStep?: string;
  };
}

const conversationFlow: ConversationFlow = {
  welcome: {
    message: "Hello! I'm Sarthak's virtual assistant. How can I help you today?",
    options: [
      { label: "I'm interested in hiring for a project", value: 'hire', nextStep: 'project_type' },
      { label: "I have a question about services", value: 'services', nextStep: 'service_question' },
      { label: "I want to discuss a collaboration", value: 'collaborate', nextStep: 'collaboration_type' },
      { label: "I need a quotation", value: 'quote', nextStep: 'quote_details' },
      { label: "Other query", value: 'other', nextStep: 'custom_query' },
    ],
  },
  project_type: {
    message: "Great! What type of project are you looking to hire for?",
    options: [
      { label: "Project Planning & Scheduling (Primavera P6)", value: 'planning', nextStep: 'project_location' },
      { label: "Road/Highway Design (Civil 3D)", value: 'road_design', nextStep: 'project_location' },
      { label: "Structural Design & Analysis", value: 'structural', nextStep: 'project_location' },
      { label: "Site Supervision & Management", value: 'site_mgmt', nextStep: 'project_location' },
      { label: "Full Project Management", value: 'full_mgmt', nextStep: 'project_location' },
    ],
  },
  project_location: {
    message: "Where is your project located?",
    options: [
      { label: "Dubai, UAE", value: 'dubai', nextStep: 'project_timeline' },
      { label: "Abu Dhabi, UAE", value: 'abudhabi', nextStep: 'project_timeline' },
      { label: "Other UAE Emirates", value: 'other_uae', nextStep: 'project_timeline' },
      { label: "India", value: 'india', nextStep: 'project_timeline' },
      { label: "Other Location", value: 'other_loc', nextStep: 'project_timeline' },
    ],
  },
  project_timeline: {
    message: "What is your expected project timeline?",
    options: [
      { label: "Less than 3 months", value: 'short', nextStep: 'project_budget' },
      { label: "3-6 months", value: 'medium', nextStep: 'project_budget' },
      { label: "6-12 months", value: 'long', nextStep: 'project_budget' },
      { label: "More than 1 year", value: 'extended', nextStep: 'project_budget' },
      { label: "Not sure yet", value: 'flexible', nextStep: 'project_budget' },
    ],
  },
  project_budget: {
    message: "What is your approximate budget range?",
    options: [
      { label: "Under $10,000", value: 'budget_low', nextStep: 'contact_details' },
      { label: "$10,000 - $50,000", value: 'budget_mid', nextStep: 'contact_details' },
      { label: "$50,000 - $100,000", value: 'budget_high', nextStep: 'contact_details' },
      { label: "Above $100,000", value: 'budget_premium', nextStep: 'contact_details' },
      { label: "Prefer to discuss", value: 'budget_discuss', nextStep: 'contact_details' },
    ],
  },
  service_question: {
    message: "What would you like to know about my services?",
    options: [
      { label: "Primavera P6 Scheduling & Planning", value: 'p6_info', nextStep: 'p6_details' },
      { label: "Civil 3D Road Design", value: 'civil3d_info', nextStep: 'civil3d_details' },
      { label: "Structural Analysis (STAAD.Pro)", value: 'staad_info', nextStep: 'staad_details' },
      { label: "Project Controls & Billing", value: 'controls_info', nextStep: 'controls_details' },
      { label: "Something else", value: 'other_service', nextStep: 'custom_query' },
    ],
  },
  p6_details: {
    message: "I specialize in Primavera P6 for comprehensive project planning including: Baseline schedule development, WBS creation, Resource loading & allocation, Progress monitoring with S-curves, Recovery schedules, and Delay analysis. Would you like to discuss a specific project?",
    options: [
      { label: "Yes, let's discuss", value: 'yes_discuss', nextStep: 'project_type' },
      { label: "I have another question", value: 'another_q', nextStep: 'service_question' },
      { label: "Send me more info via email", value: 'email_info', nextStep: 'contact_details' },
    ],
  },
  civil3d_details: {
    message: "My Civil 3D services include: Road alignment design, Profile and cross-section generation, Corridor modeling, Earthwork volume calculations, Quantity takeoffs, and Drawing preparation. I have experience with both UAE and Indian highway standards.",
    options: [
      { label: "Yes, let's discuss", value: 'yes_discuss', nextStep: 'project_type' },
      { label: "I have another question", value: 'another_q', nextStep: 'service_question' },
      { label: "Send me more info via email", value: 'email_info', nextStep: 'contact_details' },
    ],
  },
  staad_details: {
    message: "I provide structural analysis services using STAAD.Pro including: Building modeling (RCC/Steel), Load analysis (Dead, Live, Wind, Seismic), Foundation design, Retaining wall design, and Design validation as per IS/ACI codes.",
    options: [
      { label: "Yes, let's discuss", value: 'yes_discuss', nextStep: 'project_type' },
      { label: "I have another question", value: 'another_q', nextStep: 'service_question' },
      { label: "Send me more info via email", value: 'email_info', nextStep: 'contact_details' },
    ],
  },
  controls_details: {
    message: "My project controls expertise covers: DPR/MPR preparation, Physical & financial progress tracking, BOQ reconciliation, IPC and stage payment processing, Variation evaluation and claims, and Contract management.",
    options: [
      { label: "Yes, let's discuss", value: 'yes_discuss', nextStep: 'project_type' },
      { label: "I have another question", value: 'another_q', nextStep: 'service_question' },
      { label: "Send me more info via email", value: 'email_info', nextStep: 'contact_details' },
    ],
  },
  collaboration_type: {
    message: "What type of collaboration are you interested in?",
    options: [
      { label: "Freelance/Contract Work", value: 'freelance', nextStep: 'collaboration_details' },
      { label: "Full-time Position", value: 'fulltime', nextStep: 'collaboration_details' },
      { label: "Partnership Opportunity", value: 'partnership', nextStep: 'collaboration_details' },
      { label: "Consulting Engagement", value: 'consulting', nextStep: 'collaboration_details' },
    ],
  },
  collaboration_details: {
    message: "That sounds interesting! Could you tell me more about the opportunity?",
    isCustomInput: true,
    inputPlaceholder: "Describe the collaboration opportunity...",
    nextStep: 'contact_details',
  },
  quote_details: {
    message: "I'd be happy to provide a quotation. What services do you need a quote for?",
    options: [
      { label: "Project Planning & Scheduling", value: 'quote_planning', nextStep: 'quote_scope' },
      { label: "Road/Highway Design", value: 'quote_road', nextStep: 'quote_scope' },
      { label: "Structural Design", value: 'quote_structural', nextStep: 'quote_scope' },
      { label: "Multiple Services", value: 'quote_multiple', nextStep: 'quote_scope' },
    ],
  },
  quote_scope: {
    message: "Please provide more details about the scope of work:",
    isCustomInput: true,
    inputPlaceholder: "Describe project scope, timeline, and any specific requirements...",
    nextStep: 'contact_details',
  },
  custom_query: {
    message: "Please tell me more about your query:",
    isCustomInput: true,
    inputPlaceholder: "Type your question or message here...",
    nextStep: 'contact_details',
  },
  contact_details: {
    message: "Thank you for the information! To proceed, I'll need your contact details.",
    options: [
      { label: "Continue to provide details", value: 'provide_contact', nextStep: 'user_name' },
    ],
  },
  user_name: {
    message: "Please enter your name:",
    isCustomInput: true,
    inputPlaceholder: "Your full name...",
    nextStep: 'user_email',
  },
  user_email: {
    message: "Please enter your email address:",
    isCustomInput: true,
    inputPlaceholder: "your.email@company.com",
    nextStep: 'user_company',
  },
  user_company: {
    message: "What company/organization are you representing? (Optional)",
    isCustomInput: true,
    inputPlaceholder: "Company name (press skip if not applicable)...",
    nextStep: 'user_phone',
  },
  user_phone: {
    message: "Please enter your phone number with country code:",
    isCustomInput: true,
    inputPlaceholder: "+971 XX XXX XXXX or +91 XXXXX XXXXX",
    nextStep: 'final_summary',
  },
  final_summary: {
    message: "Perfect! Let me prepare a summary of your query for Sarthak.",
    isFinal: true,
    nextStep: 'generate_email',
  },
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [customInput, setCustomInput] = useState('');
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    company: string;
    phone: string;
    queryType: string;
    projectType: string;
    location: string;
    timeline: string;
    budget: string;
    customQuery: string;
    conversation: string[];
  }>({
    name: '',
    email: '',
    company: '',
    phone: '',
    queryType: '',
    projectType: '',
    location: '',
    timeline: '',
    budget: '',
    customQuery: '',
    conversation: [],
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage('welcome');
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (step: string) => {
    setIsTyping(true);
    const stepData = conversationFlow[step];
    
    setTimeout(() => {
      setIsTyping(false);
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: stepData.message,
        options: stepData.options,
        isCustomInput: stepData.isCustomInput,
      };
      setMessages(prev => [...prev, newMessage]);
      setCurrentStep(step);

      if (stepData.isFinal) {
        generateEmail();
      }
    }, 600);
  };

  const handleOptionClick = (option: Option) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: option.label,
    };
    setMessages(prev => [...prev, userMessage]);

    // Update user data based on current step
    setUserData(prev => {
      const newData = { ...prev };
      newData.conversation = [...prev.conversation, `${option.label}`];
      
      if (currentStep === 'welcome') {
        newData.queryType = option.label;
      } else if (currentStep === 'project_type') {
        newData.projectType = option.label;
      } else if (currentStep === 'project_location') {
        newData.location = option.label;
      } else if (currentStep === 'project_timeline') {
        newData.timeline = option.label;
      } else if (currentStep === 'project_budget') {
        newData.budget = option.label;
      }
      
      return newData;
    });

    addBotMessage(option.nextStep);
  };

  const handleCustomSubmit = () => {
    if (!customInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: customInput,
    };
    setMessages(prev => [...prev, userMessage]);

    const stepData = conversationFlow[currentStep];
    
    // Update user data
    setUserData(prev => {
      const newData = { ...prev };
      newData.conversation = [...prev.conversation, customInput];
      
      if (currentStep === 'user_name') {
        newData.name = customInput;
      } else if (currentStep === 'user_email') {
        newData.email = customInput;
      } else if (currentStep === 'user_company') {
        newData.company = customInput;
      } else if (currentStep === 'user_phone') {
        newData.phone = customInput;
      } else if (['custom_query', 'collaboration_details', 'quote_scope'].includes(currentStep)) {
        newData.customQuery = customInput;
      }
      
      return newData;
    });

    setCustomInput('');
    
    // Skip company if user types "skip"
    if (currentStep === 'user_company' && customInput.toLowerCase() === 'skip') {
      addBotMessage('user_phone');
    } else {
      addBotMessage(stepData.nextStep as string);
    }
  };

  const generateEmail = () => {
    const subject = encodeURIComponent(`Project Inquiry from ${userData.name} - ${userData.queryType || 'General Query'}`);
    
    const body = encodeURIComponent(`Dear Sarthak,

I hope this email finds you well. I came across your portfolio and would like to discuss a potential opportunity.

QUERY SUMMARY:
================
Name: ${userData.name}
Email: ${userData.email}
${userData.company ? `Company: ${userData.company}` : ''}
Phone: ${userData.phone}

PROJECT DETAILS:
================
Query Type: ${userData.queryType || 'General Inquiry'}
${userData.projectType ? `Project Type: ${userData.projectType}` : ''}
${userData.location ? `Location: ${userData.location}` : ''}
${userData.timeline ? `Timeline: ${userData.timeline}` : ''}
${userData.budget ? `Budget Range: ${userData.budget}` : ''}

${userData.customQuery ? `ADDITIONAL DETAILS:\n================\n${userData.customQuery}\n` : ''}

I would appreciate the opportunity to discuss this further with you. Please let me know your availability for a call or meeting.

Looking forward to hearing from you.

Best regards,
${userData.name}`);

    const mailtoLink = `mailto:kalsotrasarthak@gmail.com?subject=${subject}&body=${body}`;
    
    // Add final message
    const finalMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: `Thank you ${userData.name}! I've prepared your inquiry. Click the button below to send it via email, or you can copy the details and contact me directly.`,
    };
    setMessages(prev => [...prev, finalMessage]);

    // Store the mailto link for the button
    setTimeout(() => {
      window.open(mailtoLink, '_blank');
    }, 500);
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep('welcome');
    setUserData({
      name: '',
      email: '',
      company: '',
      phone: '',
      queryType: '',
      projectType: '',
      location: '',
      timeline: '',
      budget: '',
      customQuery: '',
      conversation: [],
    });
    setCustomInput('');
    addBotMessage('welcome');
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          isOpen 
            ? 'bg-[#D4A056] rotate-90' 
            : 'bg-[#D4A056] hover:bg-[#E8C880] hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[#0F172A]" />
        ) : (
          <MessageCircle className="w-6 h-6 text-[#0F172A]" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-[#0F172A] rounded-2xl shadow-2xl border border-[#D4A056]/30 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1E293B] to-[#0F172A] p-4 border-b border-[#D4A056]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4A056]/20 flex items-center justify-center">
                <User className="w-5 h-5 text-[#D4A056]" />
              </div>
              <div>
                <h3 className="text-white font-medium">Sarthak's Assistant</h3>
                <p className="text-xs text-[#94A3B8] flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Online now
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-[#0F172A]">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${message.type === 'user' ? 'bg-[#D4A056] text-[#0F172A]' : 'bg-[#1E293B] text-white'} rounded-2xl px-4 py-3 text-sm`}>
                  {message.content}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#1E293B] rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#D4A056] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#D4A056] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#D4A056] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Options */}
            {messages.length > 0 && !isTyping && messages[messages.length - 1].type === 'bot' && messages[messages.length - 1].options && (
              <div className="flex flex-wrap gap-2 mt-2">
                {messages[messages.length - 1].options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    className="px-3 py-2 bg-[#1E293B] hover:bg-[#D4A056]/20 border border-[#D4A056]/30 hover:border-[#D4A056] rounded-lg text-xs text-[#94A3B8] hover:text-white transition-all text-left flex items-center gap-2"
                  >
                    {option.label}
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Custom Input */}
            {messages.length > 0 && !isTyping && messages[messages.length - 1].isCustomInput && (
              <div className="mt-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCustomSubmit()}
                    placeholder={messages[messages.length - 1].options ? undefined : conversationFlow[currentStep]?.inputPlaceholder}
                    className="flex-1 px-3 py-2 bg-[#1E293B] border border-[#D4A056]/30 rounded-lg text-white text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#D4A056]"
                  />
                  <button
                    onClick={handleCustomSubmit}
                    disabled={!customInput.trim()}
                    className="px-3 py-2 bg-[#D4A056] hover:bg-[#E8C880] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4 text-[#0F172A]" />
                  </button>
                </div>
              </div>
            )}

            {/* Reset Button (shown after email is generated) */}
            {messages.length > 0 && messages[messages.length - 1].content.includes('prepared your inquiry') && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={resetChat}
                  className="px-4 py-2 bg-[#1E293B] hover:bg-[#D4A056]/20 border border-[#D4A056]/30 rounded-lg text-xs text-[#94A3B8] hover:text-white transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Start New Conversation
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="bg-[#1E293B] p-3 border-t border-[#D4A056]/20">
            <p className="text-xs text-[#64748B] text-center">
              Responses are typically within 24 hours
            </p>
          </div>
        </div>
      )}
    </>
  );
}
