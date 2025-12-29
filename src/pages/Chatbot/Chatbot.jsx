import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Send, X, Bot, User, ChevronRight, CheckCircle, AlertCircle, Info, FileText, MapPin, Droplets, Calculator, ShieldCheck, Clock, Building2, Shovel, HardHat, GraduationCap, ExternalLink, Download } from 'lucide-react';
import chatbotKnowledgeBase from './chatbotKnowledgeBase.json';

const Chatbot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentWorkflow, setCurrentWorkflow] = useState(null);
  const [workflowData, setWorkflowData] = useState({});
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Service to route mapping
  const serviceRoutes = {
    'noc': '/noc-portal',
    'rig': '/rig-registration',
    'meter': '/meter-registration-system',
    'drilling': '/borewell-drilling-permission',
    'well-conversion': '/well-conversion',
    'emergency': '/emergency-noc',
    'tanker': '/tanker-transport-noc',
    'violation': '/violation-regularization',
    'renewal': '/renewal',
    'compliance': '/compliance',
    'payment': '/payment',
    'status': '/dashboard'
  };

  // Service-specific document requirements
  const serviceDocuments = {
    'noc': [
      { name: 'Land Ownership / Lease Deed', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Site Plan (KML / Geo-tagged)', required: true, format: 'KML/PDF', maxSize: '10 MB' },
      { name: 'Existing Well Photographs', required: true, format: 'JPG/PNG', maxSize: '2 MB each' },
      { name: 'Water Balance Diagram', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Rainwater Harvesting Plan', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Undertaking Affidavit', required: true, format: 'PDF', maxSize: '2 MB' },
      { name: 'MSME Certificate', required: false, format: 'PDF', maxSize: '2 MB', note: 'If applicable' },
      { name: 'SPCB Consent', required: false, format: 'PDF', maxSize: '5 MB', note: 'If applicable' },
      { name: 'Hydrogeological Report', required: true, format: 'PDF', maxSize: '10 MB' },
      { name: 'Bharat Kosh Receipt', required: false, format: 'PDF', maxSize: '2 MB', note: 'After payment' }
    ],
    'rig': [
      { name: 'Rig Registration Certificate', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Operator License', required: true, format: 'PDF', maxSize: '2 MB' },
      { name: 'Rig Photographs', required: true, format: 'JPG/PNG', maxSize: '2 MB each' },
      { name: 'Insurance Certificate', required: true, format: 'PDF', maxSize: '2 MB' },
      { name: 'Previous Work Certificates', required: false, format: 'PDF', maxSize: '5 MB' }
    ],
    'meter': [
      { name: 'Meter Purchase Invoice', required: true, format: 'PDF', maxSize: '2 MB' },
      { name: 'Meter Calibration Certificate', required: true, format: 'PDF', maxSize: '2 MB' },
      { name: 'Installation Location Photo', required: true, format: 'JPG/PNG', maxSize: '2 MB' },
      { name: 'NOC Reference Number', required: true, format: 'Text', note: 'Link to existing NOC' },
      { name: 'Installation Report', required: true, format: 'PDF', maxSize: '5 MB' }
    ],
    'drilling': [
      { name: 'Land Ownership Proof', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Site Location Map', required: true, format: 'KML/PDF', maxSize: '10 MB' },
      { name: 'Drilling Plan', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Rig Operator License', required: true, format: 'PDF', maxSize: '2 MB' },
      { name: 'Environmental Clearance', required: false, format: 'PDF', maxSize: '5 MB', note: 'If applicable' }
    ],
    'well-conversion': [
      { name: 'Existing Well Certificate', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Conversion Plan', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Site Photographs', required: true, format: 'JPG/PNG', maxSize: '2 MB each' },
      { name: 'Technical Feasibility Report', required: true, format: 'PDF', maxSize: '10 MB' }
    ],
    'emergency': [
      { name: 'Emergency Justification Letter', required: true, format: 'PDF', maxSize: '2 MB' },
      { name: 'Supporting Documents', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Site Location', required: true, format: 'KML/PDF', maxSize: '10 MB' },
      { name: 'Temporary Use Undertaking', required: true, format: 'PDF', maxSize: '2 MB' }
    ],
    'tanker': [
      { name: 'Vehicle Registration Certificate', required: true, format: 'PDF', maxSize: '2 MB' },
      { name: 'Tanker Capacity Certificate', required: true, format: 'PDF', maxSize: '2 MB' },
      { name: 'Route Map', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Source NOC', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Destination Permission', required: true, format: 'PDF', maxSize: '5 MB' }
    ],
    'violation': [
      { name: 'Notice Copy', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Violation Details', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Rectification Plan', required: true, format: 'PDF', maxSize: '10 MB' },
      { name: 'Penalty Payment Receipt', required: true, format: 'PDF', maxSize: '2 MB' },
      { name: 'Compliance Undertaking', required: true, format: 'PDF', maxSize: '2 MB' }
    ],
    'renewal': [
      { name: 'Existing NOC Copy', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Compliance Certificate', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Updated Site Plan', required: false, format: 'PDF', maxSize: '10 MB', note: 'If changed' },
      { name: 'Meter Reading Reports', required: true, format: 'PDF', maxSize: '5 MB' },
      { name: 'Renewal Application Form', required: true, format: 'PDF', maxSize: '2 MB' }
    ]
  };

  // Predefined quick questions
  const quickQuestions = [
    { id: 'noc-apply', text: 'Apply for Groundwater NOC', icon: <FileText size={16} />, workflow: 'noc' },
    { id: 'eligibility', text: 'Check Eligibility before Applying', icon: <CheckCircle size={16} />, workflow: 'eligibility' },
    { id: 'status', text: 'Track Application Status', icon: <Clock size={16} />, workflow: 'status' },
    { id: 'rig-reg', text: 'Rig / Drilling Machine Registration', icon: <Shovel size={16} />, workflow: 'rig' },
    { id: 'meter-reg', text: 'Water Flow Meter Registration', icon: <Droplets size={16} />, workflow: 'meter' },
    { id: 'payment', text: 'Payment & Charges', icon: <Calculator size={16} />, workflow: 'payment' },
    { id: 'compliance', text: 'Compliance & Monitoring', icon: <ShieldCheck size={16} />, workflow: 'compliance' },
    { id: 'expert', text: 'Talk to Groundwater Expert', icon: <Info size={16} />, workflow: 'expert' }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Show welcome message with quick questions
      const welcomeMsg = {
        id: Date.now(),
        type: 'bot',
        text: '👋 Welcome to Rajasthan Groundwater Authority Assistant!\n\nI can help you with:\n• Applying for NOC\n• Checking eligibility\n• Tracking applications\n• Understanding regulations\n• And much more!\n\nHow can I assist you today?',
        quickQuestions: quickQuestions,
        timestamp: new Date()
      };
      setMessages([welcomeMsg]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Intent detection
  const detectIntent = (text) => {
    const lowerText = text.toLowerCase();
    
    // NOC related
    if (lowerText.includes('noc') || lowerText.includes('permission') || lowerText.includes('apply') || lowerText.includes('borewell')) {
      return 'noc';
    }
    // Eligibility
    if (lowerText.includes('eligibility') || lowerText.includes('required') || lowerText.includes('need')) {
      return 'eligibility';
    }
    // Status
    if (lowerText.includes('status') || lowerText.includes('track') || lowerText.includes('check') || lowerText.includes('application')) {
      return 'status';
    }
    // Rig
    if (lowerText.includes('rig') || lowerText.includes('drilling') || lowerText.includes('machine')) {
      return 'rig';
    }
    // Meter
    if (lowerText.includes('meter') || lowerText.includes('flow')) {
      return 'meter';
    }
    // Payment
    if (lowerText.includes('payment') || lowerText.includes('fee') || lowerText.includes('charge') || lowerText.includes('cost')) {
      return 'payment';
    }
    // Compliance
    if (lowerText.includes('compliance') || lowerText.includes('monitoring') || lowerText.includes('renewal')) {
      return 'compliance';
    }
    
    return 'general';
  };

  // Get service link based on intent
  const getServiceLink = (intent) => {
    const linkMap = {
      'noc': { url: '/noc-portal', label: 'Apply for NOC', icon: <FileText size={16} /> },
      'rig': { url: '/rig-registration', label: 'Register Rig', icon: <Shovel size={16} /> },
      'meter': { url: '/meter-registration-system', label: 'Register Meter', icon: <Droplets size={16} /> },
      'drilling': { url: '/borewell-drilling-permission', label: 'Apply for Drilling Permission', icon: <Shovel size={16} /> },
      'well-conversion': { url: '/well-conversion', label: 'Apply for Well Conversion', icon: <Droplets size={16} /> },
      'emergency': { url: '/emergency-noc', label: 'Apply for Emergency NOC', icon: <AlertCircle size={16} /> },
      'tanker': { url: '/tanker-transport-noc', label: 'Apply for Tanker NOC', icon: <Droplets size={16} /> },
      'violation': { url: '/violation-regularization', label: 'Apply for Regularization', icon: <ShieldCheck size={16} /> },
      'renewal': { url: '/renewal', label: 'Apply for Renewal', icon: <Clock size={16} /> },
      'compliance': { url: '/compliance', label: 'View Compliance', icon: <ShieldCheck size={16} /> },
      'payment': { url: '/payment', label: 'Make Payment', icon: <Calculator size={16} /> },
      'status': { url: '/dashboard', label: 'Check Status', icon: <Clock size={16} /> }
    };
    return linkMap[intent] || null;
  };

  // Get documents for a service
  const getServiceDocuments = (serviceType) => {
    return serviceDocuments[serviceType] || [];
  };

  // Format documents list for display
  const formatDocumentsList = (documents) => {
    if (!documents || documents.length === 0) return '';
    
    let docList = '\n\n**📄 Required Documents:**\n\n';
    documents.forEach((doc, index) => {
      const requiredBadge = doc.required ? '✔️ **Required**' : 'ℹ️ Optional';
      const noteText = doc.note ? ` (${doc.note})` : '';
      docList += `${index + 1}. **${doc.name}**\n   ${requiredBadge} | Format: ${doc.format} | Max Size: ${doc.maxSize}${noteText}\n\n`;
    });
    return docList;
  };

  // Find answer from knowledge base
  const findAnswer = (question, intent) => {
    // Search in knowledge base
    const matched = chatbotKnowledgeBase.find(item => {
      const keywords = item.keywords || [];
      const questionLower = question.toLowerCase();
      return keywords.some(keyword => questionLower.includes(keyword.toLowerCase())) ||
             item.intent === intent ||
             item.question.toLowerCase().includes(questionLower) ||
             questionLower.includes(item.question.toLowerCase());
    });

    if (matched) {
      // Get service link
      const serviceLink = getServiceLink(intent);
      // Get documents for this service
      const documents = getServiceDocuments(intent);
      
      let answerText = matched.answer;
      
      // Add documents list if available
      if (documents.length > 0) {
        answerText += formatDocumentsList(documents);
      }
      
      // Add service link
      if (serviceLink) {
        answerText += `\n\n🔗 **Ready to apply?** Click the link below to start your application:`;
      }

      return {
        text: answerText,
        workflow: matched.workflow,
        buttons: matched.buttons || [],
        attachments: matched.attachments || [],
        serviceLink: serviceLink,
        documents: documents
      };
    }

    // Default responses based on intent
    const defaultResponses = {
      noc: {
        text: 'I can help you apply for Groundwater NOC. Would you like to start the application process?',
        link: getServiceLink('noc'),
        documents: getServiceDocuments('noc')
      },
      eligibility: {
        text: 'I can check your eligibility for NOC. Please provide your location details (State, District, Block).',
        link: null,
        documents: []
      },
      status: {
        text: 'To check your application status, please provide your Application ID or registered mobile number.',
        link: getServiceLink('status'),
        documents: []
      },
      rig: {
        text: 'I can help you register your drilling rig. Would you like to start the registration process?',
        link: getServiceLink('rig'),
        documents: getServiceDocuments('rig')
      },
      meter: {
        text: 'I can help you register your water flow meter. Would you like to proceed?',
        link: getServiceLink('meter'),
        documents: getServiceDocuments('meter')
      },
      payment: {
        text: 'I can help you understand the fee structure and make payments. What would you like to know?',
        link: getServiceLink('payment'),
        documents: []
      },
      compliance: {
        text: 'I can help you with compliance requirements and monitoring. What do you need assistance with?',
        link: getServiceLink('compliance'),
        documents: []
      },
      general: {
        text: 'I understand you need help. Could you please provide more details about what you\'re looking for?',
        link: null,
        documents: []
      }
    };

    const response = defaultResponses[intent] || defaultResponses.general;
    let responseText = response.text;
    
    if (response.documents.length > 0) {
      responseText += formatDocumentsList(response.documents);
    }
    
    if (response.link) {
      responseText += `\n\n🔗 **Ready to apply?** Click the link below to start your application:`;
    }

    return {
      text: responseText,
      workflow: intent !== 'general' ? intent : null,
      serviceLink: response.link,
      documents: response.documents
    };
  };

  // Handle workflow initiation
  const handleWorkflowStart = (workflowType) => {
    setCurrentWorkflow(workflowType);
    setWorkflowData({});

    const serviceLink = getServiceLink(workflowType);
    const documents = getServiceDocuments(workflowType);
    
    let workflowText = '';
    let workflowButtons = [];

    const workflowMessages = {
      noc: {
        text: 'Great! Let\'s start your NOC application process.\n\n**Step 1: Purpose of Water Use**\n\nPlease select the purpose:',
        buttons: [
          { text: 'Industrial', value: 'industrial', icon: <Building2 size={16} /> },
          { text: 'Infrastructure / Construction', value: 'infrastructure', icon: <HardHat size={16} /> },
          { text: 'Mining', value: 'mining', icon: <Shovel size={16} /> },
          { text: 'Commercial', value: 'commercial', icon: <GraduationCap size={16} /> },
          { text: 'Drinking Water Supply', value: 'drinking', icon: <Droplets size={16} /> },
          { text: 'Packaged Drinking Water', value: 'packaged', icon: <Droplets size={16} /> }
        ]
      },
      eligibility: {
        text: 'Let me check your eligibility for NOC.\n\nPlease provide:\n1. State\n2. District\n3. Block / Tehsil\n4. Village / Ward\n\nOr type your location details.',
        buttons: []
      },
      status: {
        text: 'To track your application status, please provide:\n\n• Application ID (e.g., RJ-NOC-2024-001)\nOR\n• Registered Mobile Number\n\nType your Application ID or mobile number.',
        buttons: []
      },
      rig: {
        text: 'I can help you register your drilling rig. Please provide:\n\n1. Rig registration number (if any)\n2. Rig type\n3. Operator details\n\nWould you like to start the registration?',
        buttons: [
          { text: 'Start Rig Registration', value: 'start-rig', icon: <Shovel size={16} /> }
        ]
      },
      meter: {
        text: 'I can help you register your water flow meter. Please provide:\n\n1. Meter model and make\n2. Installation location\n3. NOC reference number\n\nWould you like to proceed?',
        buttons: [
          { text: 'Start Meter Registration', value: 'start-meter', icon: <Droplets size={16} /> }
        ]
      },
      payment: {
        text: '**Fee Structure for Groundwater NOC:**\n\n• Processing Fee: ₹500 - ₹5,000 (based on category)\n• Advance Groundwater Charge: As per zone and quantity\n• Penalty (if applicable): As per violation\n\nWould you like to:\n1. Calculate your charges\n2. Make a payment\n3. View payment history',
        buttons: [
          { text: 'Calculate Charges', value: 'calculate', icon: <Calculator size={16} /> },
          { text: 'Make Payment', value: 'pay', icon: <CheckCircle size={16} /> }
        ]
      },
      compliance: {
        text: '**Compliance Requirements:**\n\nAfter NOC approval, you must:\n\n✔ Install Water Flow Meter\n✔ Submit monthly abstraction data\n✔ Annual renewal\n✔ Maintain compliance records\n\nWhat would you like to do?',
        buttons: [
          { text: 'Register Water Meter', value: 'register-meter', icon: <Droplets size={16} /> },
          { text: 'Upload Monthly Data', value: 'upload-data', icon: <FileText size={16} /> },
          { text: 'Apply for Renewal', value: 'renewal', icon: <Clock size={16} /> }
        ]
      }
    };

    const workflowMsg = workflowMessages[workflowType];
    if (workflowMsg) {
      let fullText = workflowMsg.text;
      
      // Add documents if available
      if (documents.length > 0) {
        fullText += formatDocumentsList(documents);
      }
      
      // Add service link
      if (serviceLink) {
        fullText += `\n\n🔗 **Ready to apply?** Click the link below to start your application:`;
      }
      
      addBotMessage(fullText, workflowMsg.buttons, [], serviceLink, documents);
    } else {
      // Fallback for workflows without predefined messages
      let fallbackText = `I can help you with ${workflowType} services.`;
      if (documents.length > 0) {
        fallbackText += formatDocumentsList(documents);
      }
      if (serviceLink) {
        fallbackText += `\n\n🔗 **Ready to apply?** Click the link below:`;
      }
      addBotMessage(fallbackText, [], [], serviceLink, documents);
    }
  };

  // Add bot message
  const addBotMessage = (text, buttons = [], attachments = [], serviceLink = null, documents = []) => {
    const botMessage = {
      id: Date.now(),
      type: 'bot',
      text,
      buttons,
      attachments,
      serviceLink,
      documents,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  // Add user message
  const addUserMessage = (text) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
  };

  // Handle message send
  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    addUserMessage(userText);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const intent = detectIntent(userText);
      const response = findAnswer(userText, intent);

      if (response.workflow && !currentWorkflow) {
        handleWorkflowStart(response.workflow);
      } else {
        addBotMessage(
          response.text, 
          response.buttons, 
          response.attachments,
          response.serviceLink,
          response.documents
        );
      }
    }, 1000);
  };

  // Handle quick question click
  const handleQuickQuestion = (question) => {
    addUserMessage(question.text);
    setIsTyping(true);
    setTimeout(() => {
      handleWorkflowStart(question.workflow);
    }, 500);
  };

  // Handle button click
  const handleButtonClick = (button) => {
    addUserMessage(button.text);
    setIsTyping(true);

    setTimeout(() => {
      // Handle different button actions
      if (button.value === 'industrial' || button.value === 'infrastructure' || button.value === 'mining' || button.value === 'commercial') {
        setWorkflowData({ ...workflowData, purpose: button.value });
        const nocLink = getServiceLink('noc');
        const nocDocs = getServiceDocuments('noc');
        let responseText = `Great! You selected: **${button.text}**\n\n**Step 2: Location & Area Validation**\n\nPlease provide:\n• State\n• District\n• Block / Tehsil\n• Village / Ward\n\nOr type your complete address.`;
        if (nocDocs.length > 0) {
          responseText += formatDocumentsList(nocDocs);
        }
        if (nocLink) {
          responseText += `\n\n🔗 **Ready to apply?** Click the link below to start your NOC application:`;
        }
        addBotMessage(responseText, [], [], nocLink, nocDocs);
      } else if (button.value === 'start-rig' || button.value === 'open-rig') {
        const rigLink = getServiceLink('rig');
        const rigDocs = getServiceDocuments('rig');
        let responseText = 'Redirecting to Rig Registration portal...';
        if (rigDocs.length > 0) {
          responseText += formatDocumentsList(rigDocs);
        }
        if (rigLink) {
          responseText += `\n\n🔗 **Click below to open Rig Registration:**`;
        }
        addBotMessage(responseText, [
          { text: 'Open Rig Registration Portal', value: 'navigate-rig', icon: <ExternalLink size={16} /> }
        ], [], rigLink, rigDocs);
      } else if (button.value === 'navigate-rig') {
        navigate('/rig-registration');
      } else if (button.value === 'start-meter' || button.value === 'open-meter') {
        const meterLink = getServiceLink('meter');
        const meterDocs = getServiceDocuments('meter');
        let responseText = 'Redirecting to Meter Registration portal...';
        if (meterDocs.length > 0) {
          responseText += formatDocumentsList(meterDocs);
        }
        if (meterLink) {
          responseText += `\n\n🔗 **Click below to open Meter Registration:**`;
        }
        addBotMessage(responseText, [
          { text: 'Open Meter Registration Portal', value: 'navigate-meter', icon: <ExternalLink size={16} /> }
        ], [], meterLink, meterDocs);
      } else if (button.value === 'navigate-meter') {
        navigate('/meter-registration-system');
      } else if (button.value === 'start-noc' || button.value === 'check-eligibility') {
        const nocLink = getServiceLink('noc');
        const nocDocs = getServiceDocuments('noc');
        let responseText = 'Great! Let\'s start your NOC application.';
        if (nocDocs.length > 0) {
          responseText += formatDocumentsList(nocDocs);
        }
        if (nocLink) {
          responseText += `\n\n🔗 **Click below to start your NOC application:**`;
        }
        addBotMessage(responseText, [
          { text: 'Apply for NOC Now', value: 'navigate-noc', icon: <ExternalLink size={16} /> }
        ], [], nocLink, nocDocs);
      } else if (button.value === 'navigate-noc') {
        navigate('/noc-portal');
      } else if (button.value === 'calculate') {
        addBotMessage('**Charge Calculator**\n\nPlease provide:\n1. Water requirement (KL/day)\n2. Category (Small/Medium/Large)\n3. Zone classification\n\nOr I can help you calculate based on your NOC application.', []);
      } else if (button.value === 'pay' || button.value === 'open-payment') {
        const paymentLink = getServiceLink('payment');
        addBotMessage('To make a payment, please:\n1. Log in to your account\n2. Go to Payment section\n3. Select your application\n\nWould you like me to redirect you?', [
          { text: 'Go to Payment Portal', value: 'navigate-payment', icon: <ExternalLink size={16} /> }
        ], [], paymentLink, []);
      } else if (button.value === 'navigate-payment') {
        navigate('/payment');
      } else if (button.value === 'register-meter') {
        const meterLink = getServiceLink('meter');
        const meterDocs = getServiceDocuments('meter');
        let responseText = 'To register your water flow meter:';
        if (meterDocs.length > 0) {
          responseText += formatDocumentsList(meterDocs);
        }
        if (meterLink) {
          responseText += `\n\n🔗 **Click below to register your meter:**`;
        }
        addBotMessage(responseText, [
          { text: 'Register Meter Now', value: 'navigate-meter', icon: <ExternalLink size={16} /> }
        ], [], meterLink, meterDocs);
      } else if (button.value === 'renewal') {
        const renewalLink = getServiceLink('renewal');
        const renewalDocs = getServiceDocuments('renewal');
        let responseText = 'To apply for NOC renewal:';
        if (renewalDocs.length > 0) {
          responseText += formatDocumentsList(renewalDocs);
        }
        if (renewalLink) {
          responseText += `\n\n🔗 **Click below to apply for renewal:**`;
        }
        addBotMessage(responseText, [
          { text: 'Apply for Renewal', value: 'navigate-renewal', icon: <ExternalLink size={16} /> }
        ], [], renewalLink, renewalDocs);
      } else if (button.value === 'navigate-renewal') {
        navigate('/renewal');
      } else {
        addBotMessage(`You selected: ${button.text}. How can I help you further?`, []);
      }
    }, 500);
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          className="chatbot-toggle-btn"
          onClick={() => setIsOpen(true)}
          title="Open Chatbot Assistant"
        >
          <MessageCircle size={24} />
          <span className="chatbot-badge">Need Help?</span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <Bot size={20} />
              </div>
              <div>
                <h3>Groundwater Assistant</h3>
                <p>Rajasthan Groundwater Authority</p>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.type}`}>
                <div className="message-avatar">
                  {msg.type === 'bot' ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div className="message-content">
                  <div className="message-text" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  {msg.timestamp && (
                    <span className="message-time">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                  {msg.serviceLink && (
                    <div className="service-link-container">
                      <a 
                        href={msg.serviceLink.url} 
                        className="service-link-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(msg.serviceLink.url);
                        }}
                      >
                        <span className="link-icon">{msg.serviceLink.icon}</span>
                        <span>{msg.serviceLink.label}</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                  {msg.documents && msg.documents.length > 0 && (
                    <div className="documents-list">
                      <div className="documents-header">
                        <FileText size={16} />
                        <strong>Required Documents:</strong>
                      </div>
                      {msg.documents.map((doc, idx) => (
                        <div key={idx} className={`document-item ${doc.required ? 'required' : 'optional'}`}>
                          <div className="doc-info">
                            <span className="doc-number">{idx + 1}.</span>
                            <span className="doc-name">{doc.name}</span>
                            {doc.required ? (
                              <span className="doc-badge required-badge">Required</span>
                            ) : (
                              <span className="doc-badge optional-badge">Optional</span>
                            )}
                          </div>
                          <div className="doc-details">
                            <span className="doc-format">Format: {doc.format}</span>
                            <span className="doc-size">Max: {doc.maxSize}</span>
                            {doc.note && <span className="doc-note">{doc.note}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {msg.buttons && msg.buttons.length > 0 && (
                    <div className="message-buttons">
                      {msg.buttons.map((btn, idx) => (
                        <button
                          key={idx}
                          className="message-btn"
                          onClick={() => handleButtonClick(btn)}
                        >
                          {btn.icon && <span className="btn-icon">{btn.icon}</span>}
                          {btn.text}
                        </button>
                      ))}
                    </div>
                  )}
                  {msg.quickQuestions && (
                    <div className="quick-questions">
                      {msg.quickQuestions.map((q) => (
                        <button
                          key={q.id}
                          className="quick-question-btn"
                          onClick={() => handleQuickQuestion(q)}
                        >
                          {q.icon && <span className="btn-icon">{q.icon}</span>}
                          {q.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot">
                <div className="message-avatar">
                  <Bot size={18} />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="chatbot-send-btn" onClick={handleSend} disabled={!inputValue.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .chatbot-toggle-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        .chatbot-toggle-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
        }
        .chatbot-badge {
          position: absolute;
          bottom: -25px;
          right: 0;
          background: #ef4444;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        .chatbot-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 420px;
          height: 600px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          z-index: 1001;
          overflow: hidden;
        }

        .chatbot-header {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chatbot-header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .chatbot-avatar {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chatbot-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
        }
        .chatbot-header p {
          margin: 2px 0 0;
          font-size: 12px;
          opacity: 0.9;
        }
        .chatbot-close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .chatbot-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          background: #f8fafc;
        }
        .chatbot-messages::-webkit-scrollbar {
          width: 6px;
        }
        .chatbot-messages::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .chatbot-messages::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .chat-message {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chat-message.user {
          flex-direction: row-reverse;
        }
        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .chat-message.bot .message-avatar {
          background: #e0e7ff;
          color: #3b82f6;
        }
        .chat-message.user .message-avatar {
          background: #3b82f6;
          color: white;
        }
        .message-content {
          max-width: 75%;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .chat-message.user .message-content {
          align-items: flex-end;
        }
        .message-text {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.5;
          word-wrap: break-word;
        }
        .chat-message.bot .message-text {
          background: white;
          color: #1e293b;
          border: 1px solid #e2e8f0;
        }
        .chat-message.user .message-text {
          background: #3b82f6;
          color: white;
        }
        .message-time {
          font-size: 11px;
          color: #94a3b8;
          padding: 0 4px;
        }

        .message-buttons, .quick-questions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }
        .message-btn, .quick-question-btn {
          background: white;
          border: 1.5px solid #3b82f6;
          color: #3b82f6;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
          text-align: left;
        }
        .message-btn:hover, .quick-question-btn:hover {
          background: #3b82f6;
          color: white;
          transform: translateX(4px);
        }
        .btn-icon {
          display: flex;
          align-items: center;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
        }
        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: #94a3b8;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }

        .chatbot-input-container {
          padding: 16px;
          background: white;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 10px;
        }
        .chatbot-input {
          flex: 1;
          padding: 12px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 24px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }
        .chatbot-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .chatbot-send-btn {
          width: 44px;
          height: 44px;
          background: #3b82f6;
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .chatbot-send-btn:hover:not(:disabled) {
          background: #2563eb;
          transform: scale(1.05);
        }
        .chatbot-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .service-link-container {
          margin-top: 12px;
        }
        .service-link-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          width: 100%;
        }
        .service-link-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
        .link-icon {
          display: flex;
          align-items: center;
        }

        .documents-list {
          margin-top: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px;
        }
        .documents-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: #0f172a;
          font-size: 13px;
        }
        .document-item {
          padding: 10px;
          background: white;
          border-radius: 8px;
          margin-bottom: 8px;
          border-left: 3px solid #e2e8f0;
        }
        .document-item.required {
          border-left-color: #ef4444;
        }
        .document-item.optional {
          border-left-color: #3b82f6;
        }
        .doc-info {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .doc-number {
          font-weight: 700;
          color: #64748b;
          min-width: 20px;
        }
        .doc-name {
          flex: 1;
          font-weight: 600;
          color: #1e293b;
          font-size: 13px;
        }
        .doc-badge {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .required-badge {
          background: #fee2e2;
          color: #dc2626;
        }
        .optional-badge {
          background: #dbeafe;
          color: #2563eb;
        }
        .doc-details {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 11px;
          color: #64748b;
          margin-left: 28px;
        }
        .doc-format, .doc-size {
          font-weight: 600;
        }
        .doc-note {
          font-style: italic;
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .chatbot-container {
            width: 100%;
            height: 100vh;
            bottom: 0;
            right: 0;
            border-radius: 0;
          }
          .chatbot-toggle-btn {
            bottom: 20px;
            right: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;

