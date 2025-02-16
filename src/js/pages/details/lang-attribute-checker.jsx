import { Info, Check, X, Square } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SEOLanguageChecker = ({ lang }) => {
    const [status, setStatus] = useState('not-available');
    const [issues, setIssues] = useState([]);

    // Common language codes and their full names
    const COMMON_LANGUAGES = {
        'en': 'English',
        'en-US': 'English (United States)',
        'en-GB': 'English (United Kingdom)',
        'es': 'Spanish',
        'fr': 'French',
        'de': 'German',
        'it': 'Italian',
        'pt': 'Portuguese',
        'nl': 'Dutch',
        'ru': 'Russian',
        'ja': 'Japanese',
        'ko': 'Korean',
        'zh': 'Chinese',
        'zh-CN': 'Chinese (Simplified)',
        'zh-TW': 'Chinese (Traditional)',
        'ar': 'Arabic',
        'hi': 'Hindi',
        'th': 'Thai',
        'vi': 'Vietnamese'
    };

    useEffect(() => {
        if (!lang) {
            setStatus('not-available');
            setIssues(['No language attribute provided']);
            return;
        }

        const newIssues = [];

        // Check if it's a commonly used language code
        const isCommonLanguage = Object.keys(COMMON_LANGUAGES).includes(lang);
        if (!isCommonLanguage) {
            newIssues.push('Uncommon or potentially incorrect language code');
        }

        const langCode = lang.trim().toLowerCase();

        // Check if it's a valid language code format
        const isValidFormat = /^[a-z]{2,3}(-[a-z]{2,4})?$/i.test(langCode);
        if (!isValidFormat) {
            newIssues.push('Invalid language code format');
        }

        // Check for generic language code without region specificity
        if (langCode === 'en' || langCode === 'zh') {
            newIssues.push('Consider using a region-specific language code for better precision');
        }

        setIssues(newIssues);

        // Set status based on issues
        if (newIssues.length === 0) {
            setStatus('good');
        } else if (newIssues.includes('Invalid language code format')) {
            setStatus('error');
        } else {
            setStatus('warning');
        }
    }, [lang]);

    const getStatusInfo = () => {
        switch (status) {
            case 'good':
                return {
                    color: 'text-green-500',
                    barColor: 'bg-green-500',
                    message: 'Valid language attribute configuration.',
                    icon: Check
                };
            case 'warning':
                return {
                    color: 'text-yellow-500',
                    barColor: 'bg-yellow-500',
                    message: 'Language attribute could be improved.',
                    icon: Square
                };
            case 'error':
                return {
                    color: 'text-red-500',
                    barColor: 'bg-red-500',
                    message: 'Invalid language attribute configuration.',
                    icon: X
                };
            case 'not-available':
                return {
                    color: 'text-red-500',
                    barColor: 'bg-red-500',
                    message: 'No language attribute found. This affects accessibility and SEO.',
                    icon: X
                };
            default:
                return {
                    color: 'text-gray-500',
                    barColor: 'bg-gray-500',
                    message: 'Unable to determine language attribute status.',
                    icon: Info
                };
        }
    };

    const getLanguageName = (code) => {
        if (!code) return '';
        const normalizedCode = code.trim().toLowerCase();
        return COMMON_LANGUAGES[normalizedCode] || code;
    };

    const statusInfo = getStatusInfo();

    return (
        <div className="grid grid-cols-4 gap-8 px-6 py-4 border-t border-solid items-baseline">
            <div className="flex gap-4 items-center">
                <statusInfo.icon className={`flex-shrink-0 size-5 ${statusInfo.color}`} />
                <div className="text-base font-semibold">
                    Language Attribute
                </div>
            </div>
            <div className="col-span-3">
                {/* Language Display */}
                <div className="flex items-center gap-3">
                    <p className="text-base font-semibold">
                        {lang || 'No language attribute provided'}
                    </p>
                    {lang && (
                        <span className={`px-2 py-1 rounded-full text-sm
              ${status === 'good' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {getLanguageName(lang)}
                        </span>
                    )}
                </div>

                <div className="mt-2 space-y-2">
                    {/* Issues List */}
                    {issues.length > 0 && (
                        <div className="mt-2 space-y-1">
                            {issues.map((issue, index) => (
                                <div key={index} className="relative pl-3 text-sm">
                                    <span className={`absolute top-1.5 left-0 block size-2 rounded-full ${statusInfo.barColor}`} />
                                    <span>{issue}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Status Message */}
                    <p className="text-base relative pl-6">
                        <Info size={16} className="absolute top-1 left-0" />
                        <span>
                            {statusInfo.message} {status !== 'not-available' && (
                                <span>
                                    Learn more from <a className="hover:underline newtab" target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang" rel="noopener noreferrer">MDN</a>.
                                </span>
                            )}
                        </span>
                    </p>

                    {/* Best Practices */}
                    {status !== 'not-available' && status !== 'good' && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-md">
                            <h4 className="font-medium mb-2">Best Practices:</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• Use region-specific codes when applicable (e.g., 'en-US' instead of 'en')</li>
                                <li>• Follow ISO 639-1 language codes for consistency</li>
                                <li>• Ensure the language code matches the page's primary content</li>
                                <li>• Use proper capitalization (e.g., 'en-US' not 'en-us')</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SEOLanguageChecker;