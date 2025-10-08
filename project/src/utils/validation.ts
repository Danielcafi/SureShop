// Input validation and sanitization utilities

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please enter a valid email address');
  } else if (email.length > 254) {
    errors.push('Email is too long');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('Password must contain at least one special character (@$!%*?&)');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateName = (name: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!name) {
    errors.push('Name is required');
  } else if (name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (name.length > 50) {
    errors.push('Name is too long');
  } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validatePhone = (phone: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!phone) {
    errors.push('Phone number is required');
  } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''))) {
    errors.push('Please enter a valid phone number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateAddress = (address: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!address) {
    errors.push('Address is required');
  } else if (address.length < 5) {
    errors.push('Address must be at least 5 characters long');
  } else if (address.length > 200) {
    errors.push('Address is too long');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateCreditCard = (cardNumber: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!cardNumber) {
    errors.push('Card number is required');
  } else {
    // Remove spaces and dashes
    const cleanNumber = cardNumber.replace(/[\s\-]/g, '');
    
    if (!/^\d{13,19}$/.test(cleanNumber)) {
      errors.push('Card number must be 13-19 digits');
    } else if (!luhnCheck(cleanNumber)) {
      errors.push('Invalid card number');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateCVV = (cvv: string, cardType?: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!cvv) {
    errors.push('CVV is required');
  } else {
    const expectedLength = cardType === 'amex' ? 4 : 3;
    if (!/^\d{3,4}$/.test(cvv)) {
      errors.push(`CVV must be ${expectedLength} digits`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateExpiryDate = (month: string, year: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!month || !year) {
    errors.push('Expiry date is required');
  } else {
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (monthNum < 1 || monthNum > 12) {
      errors.push('Invalid month');
    } else if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      errors.push('Card has expired');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Luhn algorithm for credit card validation
const luhnCheck = (cardNumber: string): boolean => {
  let sum = 0;
  let isEven = false;
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

// Sanitization functions
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

export const sanitizeHTML = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const validateAndSanitizeInput = (input: string, type: 'email' | 'name' | 'text'): { isValid: boolean; sanitized: string; errors: string[] } => {
  const sanitized = sanitizeString(input);
  let validation: ValidationResult;
  
  switch (type) {
    case 'email':
      validation = validateEmail(sanitized);
      break;
    case 'name':
      validation = validateName(sanitized);
      break;
    default:
      validation = { isValid: sanitized.length > 0, errors: [] };
  }
  
  return {
    isValid: validation.isValid,
    sanitized,
    errors: validation.errors
  };
};
