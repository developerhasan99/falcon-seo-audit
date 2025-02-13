import { Info, Check, X, Square } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SEOMetaDescriptionMeter = ({ description }) => {
    const [charCount, setCharCount] = useState(0);
    const [status, setStatus] = useState('not-available');

    // Constants for Google SERP meta description limits
    const MIN_CHARS = 120;
    const MAX_CHARS = 158;

    // Function to check for common meta description issues
    const checkDescriptionIssues = (text) => {
        if (!text) return ['No meta description provided'];

        const issues = [];

        // Check for length issues
        if (text.length < MIN_CHARS) {
            issues.push('Description is too short');
        }
        if (text.length > MAX_CHARS) {
            issues.push('Description exceeds recommended length');
        }

        // Check for common content issues
        if (text.includes('http://') || text.includes('https://')) {
            issues.push('Contains URLs');
        }
        if (text.match(/[A-Z]{4,}/)) {
            issues.push('Contains all caps words');
        }
        if (text.match(/(.)\1{3,}/)) {
            issues.push('Contains repeated characters');
        }
        if (/^\s*[.,!?;:]/.test(text)) {
            issues.push('Starts with punctuation');
        }
        if (text.split(' ').some(word => word.length > 15)) {
            issues.push('Contains very long words');
        }

        return issues;
    };

    useEffect(() => {
        if (!description) {
            setStatus('not-available');
            setCharCount(0);
            return;
        }

        const count = description.length;
        const issues = checkDescriptionIssues(description);

        setCharCount(count);

        if (issues.length > 0 && issues[0] === 'No meta description provided') {
            setStatus('not-available');
        } else if (count < MIN_CHARS) {
            setStatus('too-short');
        } else if (count > MAX_CHARS) {
            setStatus('too-long');
        } else if (issues.length > 0) {
            setStatus('has-issues');
        } else {
            setStatus('good');
        }
    }, [description]);

    // Calculate progress percentage
    const getProgress = () => {
        return Math.min((charCount / MAX_CHARS) * 100, 100);
    };

    // Get status color and message
    const getStatusInfo = () => {
        const issues = checkDescriptionIssues(description);

        switch (status) {
            case 'too-short':
                return {
                    color: 'text-orange-500',
                    barColor: 'bg-orange-500',
                    message: `The meta description is too short (minimum ${MIN_CHARS} characters recommended).`,
                    icon: Square,
                    issues
                };
            case 'good':
                return {
                    color: 'text-green-500',
                    barColor: 'bg-green-500',
                    message: 'The meta description length is optimal!',
                    icon: Check,
                    issues
                };
            case 'too-long':
                return {
                    color: 'text-orange-500',
                    barColor: 'bg-orange-500',
                    message: `The meta description is too long (maximum ${MAX_CHARS} characters recommended).`,
                    icon: Square,
                    issues
                };
            case 'has-issues':
                return {
                    color: 'text-yellow-500',
                    barColor: 'bg-yellow-500',
                    message: 'The meta description has some issues that could be improved.',
                    icon: Square,
                    issues
                };
            case 'not-available':
                return {
                    color: 'text-red-500',
                    barColor: 'bg-red-500',
                    message: 'No meta description available. Please add a description to improve SEO.',
                    icon: X,
                    issues: ['No meta description provided']
                };
            default:
                return {
                    color: 'text-gray-500',
                    barColor: 'bg-gray-500',
                    message: 'Unable to determine description status.',
                    icon: Info,
                    issues: []
                };
        }
    };

    const statusInfo = getStatusInfo();

    return (
        <div className="grid grid-cols-4 gap-8 px-6 py-4 border-t border-solid items-baseline">
            <div className="flex gap-4 items-center">
                <statusInfo.icon className={`flex-shrink-0 size-5 ${statusInfo.color}`} />
                <div className="text-base font-semibold">
                    Meta Description
                </div>
            </div>
            <div className="col-span-3">
                <p className="text-base font-semibold">
                    {description || 'No description provided'}
                </p>

                <div className="mt-2 space-y-2">
                    {/* Progress Bar and Character Count */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Characters</span>
                            <span className={`text-sm font-medium ${statusInfo.color}`}>
                                {charCount} / {MAX_CHARS}
                            </span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${statusInfo.barColor} transition-all duration-300`}
                                style={{ width: `${getProgress()}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>{MIN_CHARS} chars</span>
                            <span>{MAX_CHARS} chars</span>
                        </div>
                    </div>

                    {/* Issues List */}
                    {statusInfo.issues.length > 0 && (
                        <div className="mt-2 space-y-1">
                            {statusInfo.issues.map((issue, index) => (
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
                                    Learn more from <a className="hover:underline newtab" target="_blank" href="https://developers.google.com/search/docs/appearance/snippet/" rel="noopener noreferrer">Google</a>.
                                </span>
                            )}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SEOMetaDescriptionMeter;