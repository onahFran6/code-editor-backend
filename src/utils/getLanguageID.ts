export const getLanguageId = (language: string): number => {
  const languageMap: { [key: string]: number } = {
    javascript: 63,
    python: 71,
    // Add more languages as needed
  };

  return languageMap[language.toLowerCase()] || 63; // Default to JavaScript
};
