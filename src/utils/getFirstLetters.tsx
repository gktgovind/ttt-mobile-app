export function getFirstLetters(str:any) {
    if (!str) return '';
  
    return str
      .split('-')
      .map((word:any) => word.charAt(0).toUpperCase())
      .join('');
  }
  