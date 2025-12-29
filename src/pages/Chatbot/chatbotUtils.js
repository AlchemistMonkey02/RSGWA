/**
 * Chatbot Utility Functions
 * 
 * This file contains utility functions for the chatbot module.
 * Can be extended to read from Excel/CSV files in the future.
 */

/**
 * Load knowledge base from JSON (can be extended to Excel/CSV)
 * @param {string} source - 'json' | 'excel' | 'csv'
 * @returns {Promise<Array>} Knowledge base data
 */
export const loadKnowledgeBase = async (source = 'json') => {
  try {
    if (source === 'json') {
      // Currently using JSON, can be replaced with Excel/CSV loader
      const knowledgeBase = await import('./chatbotKnowledgeBase.json');
      return knowledgeBase.default || knowledgeBase;
    }
    
    // Future: Excel/CSV loading
    if (source === 'excel') {
      // TODO: Implement Excel reading using xlsx library
      // const XLSX = require('xlsx');
      // const workbook = XLSX.readFile('./chatbotKnowledgeBase.xlsx');
      // return parseExcelData(workbook);
      throw new Error('Excel loading not yet implemented');
    }
    
    if (source === 'csv') {
      // TODO: Implement CSV reading
      // const csvData = await fetch('./chatbotKnowledgeBase.csv').then(r => r.text());
      // return parseCSVData(csvData);
      throw new Error('CSV loading not yet implemented');
    }
    
    return [];
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return [];
  }
};

/**
 * Search knowledge base for matching answers
 * @param {string} query - User query
 * @param {Array} knowledgeBase - Knowledge base data
 * @returns {Object|null} Matching answer or null
 */
export const searchKnowledgeBase = (query, knowledgeBase) => {
  const queryLower = query.toLowerCase();
  
  // Exact match
  const exactMatch = knowledgeBase.find(item => 
    item.question.toLowerCase() === queryLower
  );
  if (exactMatch) return exactMatch;
  
  // Keyword match
  const keywordMatch = knowledgeBase.find(item => {
    const keywords = item.keywords || [];
    return keywords.some(keyword => 
      queryLower.includes(keyword.toLowerCase())
    );
  });
  if (keywordMatch) return keywordMatch;
  
  // Partial match
  const partialMatch = knowledgeBase.find(item => 
    queryLower.includes(item.question.toLowerCase()) ||
    item.question.toLowerCase().includes(queryLower)
  );
  if (partialMatch) return partialMatch;
  
  return null;
};

/**
 * Format answer with markdown-like formatting
 * @param {string} text - Raw text
 * @returns {string} Formatted HTML
 */
export const formatAnswer = (text) => {
  return text
    .replace(/\n/g, '<br/>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/✔/g, '<span style="color: #10b981;">✓</span>')
    .replace(/⚠/g, '<span style="color: #f59e0b;">⚠</span>')
    .replace(/❌/g, '<span style="color: #ef4444;">✗</span>');
};

/**
 * Extract intent from user query
 * @param {string} query - User query
 * @returns {string} Detected intent
 */
export const extractIntent = (query) => {
  const queryLower = query.toLowerCase();
  
  const intentKeywords = {
    noc: ['noc', 'permission', 'apply', 'borewell', 'groundwater', 'abstraction'],
    eligibility: ['eligibility', 'required', 'need', 'must', 'mandatory'],
    status: ['status', 'track', 'check', 'application', 'where'],
    rig: ['rig', 'drilling', 'machine', 'equipment'],
    meter: ['meter', 'flow', 'water meter', 'measurement'],
    payment: ['payment', 'fee', 'charge', 'cost', 'price', 'amount'],
    compliance: ['compliance', 'monitoring', 'renewal', 'renew', 'obligation'],
    expert: ['expert', 'help', 'support', 'contact', 'talk']
  };
  
  for (const [intent, keywords] of Object.entries(intentKeywords)) {
    if (keywords.some(keyword => queryLower.includes(keyword))) {
      return intent;
    }
  }
  
  return 'general';
};

/**
 * Validate workflow data
 * @param {string} workflow - Workflow type
 * @param {Object} data - Workflow data
 * @returns {Object} Validation result
 */
export const validateWorkflowData = (workflow, data) => {
  const validations = {
    noc: {
      required: ['purpose', 'location'],
      optional: ['waterRequirement', 'documents']
    },
    eligibility: {
      required: ['location'],
      optional: ['purpose']
    },
    status: {
      required: ['applicationId'],
      optional: ['mobileNumber']
    }
  };
  
  const validation = validations[workflow];
  if (!validation) {
    return { valid: false, errors: ['Unknown workflow'] };
  }
  
  const errors = [];
  validation.required.forEach(field => {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export default {
  loadKnowledgeBase,
  searchKnowledgeBase,
  formatAnswer,
  extractIntent,
  validateWorkflowData
};

