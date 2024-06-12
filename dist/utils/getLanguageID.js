"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageId = void 0;
const getLanguageId = (language) => {
    const languageMap = {
        javascript: 63,
        python: 71,
        // Add more languages as needed
    };
    return languageMap[language.toLowerCase()] || 63; // Default to JavaScript
};
exports.getLanguageId = getLanguageId;
//# sourceMappingURL=getLanguageID.js.map