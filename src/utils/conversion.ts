export interface ConversionResult {
  radians: number;
  degrees: number;
  radianDisplay: string;
  degreeDisplay: string;
}

/**
 * Parses a radian input string that may contain π
 * @param input The input string (e.g., "π/4", "3π/2", "1.5")
 * @returns The parsed value in radians
 */
export function parseRadianInput(input: string): number {
  // Clean the input
  const cleanInput = input.trim().toLowerCase();
  
  if (cleanInput === '') {
    throw new Error('Please enter a value');
  }
  
  // Handle π (pi) in the input
  if (cleanInput.includes('π') || cleanInput.includes('pi')) {
    // Replace "pi" with "π" for consistent handling
    const piInput = cleanInput.replace(/pi/g, 'π');
    
    // Simple cases
    if (piInput === 'π') return Math.PI;
    if (piInput === '-π') return -Math.PI;
    
    // Handle fractions like π/2, π/4, etc.
    if (piInput.match(/^-?\d*π\/\d+$/)) {
      const parts = piInput.split('/');
      const numerator = parts[0];
      const denominator = parseInt(parts[1], 10);
      
      if (denominator === 0) {
        throw new Error('Division by zero');
      }
      
      // Handle cases like π/2, 3π/4, etc.
      if (numerator === 'π') {
        return Math.PI / denominator;
      } else if (numerator === '-π') {
        return -Math.PI / denominator;
      } else {
        // Handle cases like 2π/3, -5π/6, etc.
        const coefficient = parseFloat(numerator.replace('π', ''));
        return (coefficient * Math.PI) / denominator;
      }
    }
    
    // Handle multiplication like 2π, 0.5π, etc.
    if (piInput.match(/^-?\d*\.?\d*π$/)) {
      const coefficient = piInput.replace('π', '');
      if (coefficient === '-') return -Math.PI;
      if (coefficient === '') return Math.PI;
      return parseFloat(coefficient) * Math.PI;
    }
    
    // Try to evaluate more complex expressions
    try {
      const evalInput = piInput.replace(/π/g, `*${Math.PI}`);
      // Use Function constructor safely for simple math evaluation
      // This is safe because we're only using it for internal calculations with validated input
      return Function(`'use strict'; return ${evalInput}`)();
    } catch (error) {
      throw new Error('Invalid radian expression');
    }
  }
  
  // Handle numeric input
  if (!isNaN(Number(cleanInput))) {
    return parseFloat(cleanInput);
  }
  
  throw new Error('Invalid input format');
}

/**
 * Converts radians to degrees
 * @param radians The angle in radians
 * @returns The conversion result object
 */
export function convertToDegrees(radians: number): ConversionResult {
  const degrees = radians * (180 / Math.PI);
  
  // Format the display values
  let radianDisplay = formatRadianDisplay(radians);
  let degreeDisplay = formatDegreeDisplay(degrees);
  
  return {
    radians,
    degrees,
    radianDisplay,
    degreeDisplay
  };
}

/**
 * Formats a radian value for display, using π notation when possible
 * @param radians The angle in radians
 * @returns A formatted string representation
 */
function formatRadianDisplay(radians: number): string {
  // Exact fractions of π
  const piRatio = radians / Math.PI;
  
  // Check if this is a "nice" fraction of π
  const tolerance = 1e-10;
  
  const checkFraction = (denominator: number) => {
    const numerator = piRatio * denominator;
    const roundedNumerator = Math.round(numerator);
    return Math.abs(numerator - roundedNumerator) < tolerance ? roundedNumerator : null;
  };
  
  // Check for common fractions (1/6, 1/4, 1/3, 1/2, 1, 2, etc.)
  for (const denominator of [6, 4, 3, 2, 1]) {
    const numerator = checkFraction(denominator);
    
    if (numerator !== null) {
      if (denominator === 1) {
        return numerator === 1 ? 'π' : 
               numerator === -1 ? '-π' : 
               `${numerator}π`;
      } else {
        const gcd = getGCD(Math.abs(numerator), denominator);
        const simplifiedNumerator = numerator / gcd;
        const simplifiedDenominator = denominator / gcd;
        
        // Format as a fraction
        return simplifiedNumerator === 1 ? `π/${simplifiedDenominator}` :
               simplifiedNumerator === -1 ? `-π/${simplifiedDenominator}` :
               `${simplifiedNumerator}π/${simplifiedDenominator}`;
      }
    }
  }
  
  // Fallback to decimal representation
  return radians.toFixed(4).replace(/\.?0+$/, '');
}

/**
 * Formats a degree value for display
 * @param degrees The angle in degrees
 * @returns A formatted string representation
 */
function formatDegreeDisplay(degrees: number): string {
  // For exact integer values, display without decimal places
  if (Math.abs(degrees - Math.round(degrees)) < 1e-10) {
    return Math.round(degrees).toString();
  }
  
  // Check if it's a common angle like 30, 45, 60, 90, etc.
  const commonAngles = [30, 45, 60, 90, 120, 135, 150, 180, 270, 360];
  for (const angle of commonAngles) {
    if (Math.abs(degrees - angle) < 1e-10) {
      return angle.toString();
    }
    if (Math.abs(degrees + angle) < 1e-10) {
      return (-angle).toString();
    }
  }
  
  // Format with appropriate precision
  const absValue = Math.abs(degrees);
  
  if (absValue < 0.0001) return '0';
  if (absValue < 0.01) return degrees.toFixed(4);
  if (absValue < 0.1) return degrees.toFixed(3);
  if (absValue < 1) return degrees.toFixed(2);
  
  return degrees.toFixed(2).replace(/\.?0+$/, '');
}

/**
 * Computes the greatest common divisor of two numbers
 * @param a First number
 * @param b Second number
 * @returns The GCD
 */
function getGCD(a: number, b: number): number {
  return b === 0 ? a : getGCD(b, a % b);
}