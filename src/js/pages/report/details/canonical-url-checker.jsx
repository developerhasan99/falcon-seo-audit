import { Info, Check, X, Square } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const CanonicalURLChecker = ({ url, pageUrl }) => {
    const [status, setStatus] = useState('not-available');
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        if (!url) {
            setStatus('not-available');
            setIssues(['No canonical URL provided']);
            return;
        }

        const newIssues = [];
        let parsedURL;

        try {
            parsedURL = new URL(url);
            if (!['http:', 'https:'].includes(parsedURL.protocol)) {
                newIssues.push('Canonical URL must use http or https protocol');
            }
        } catch (error) {
            newIssues.push('Invalid canonical URL format');
        }

        if (pageUrl !== url) {
            newIssues.push(`Canonical URL does not match the current page URL: ${pageUrl}`);
            setStatus('warning');
        } else if (newIssues.length === 0) {
            setStatus('good');
        } else {
            setStatus('error');
        }

        setIssues(newIssues);
    }, [url, pageUrl]);

    const getStatusInfo = () => {
        switch (status) {
            case 'good':
                return { color: 'text-green-500', barColor: 'bg-green-500', message: 'Valid canonical URL.', icon: Check };
            case 'warning':
                return { color: 'text-orange-500', barColor: 'bg-orange-500', message: 'Canonical URL does not match the current page URL.', icon: Square };
            case 'error':
                return { color: 'text-red-500', barColor: 'bg-red-500', message: 'Invalid canonical URL.', icon: X };
            case 'not-available':
            default:
                return { color: 'text-red-500', barColor: 'bg-red-500', message: 'Use canonical URLs on your pages to avoid duplicate content issues and improve your website\'s search engine ranking.', icon: X };
        }
    };

    const statusInfo = getStatusInfo();

    return (
        <div className="grid grid-cols-4 gap-8 px-6 py-4 border-t border-solid items-baseline">
            <div className="flex gap-4 items-center">
                <statusInfo.icon className={`flex-shrink-0 size-5 ${statusInfo.color}`} />
                <div className="text-base font-semibold">Canonical URL</div>
            </div>
            <div className="col-span-3">
                <p className="text-base font-semibold">{url || 'No canonical URL provided'}</p>
                {issues.length > 0 && (
                    <div className="mt-2">
                        {issues.map((issue, index) => (
                            <div key={index} className="relative pl-3 text-sm">
                                <span className={`absolute top-1.5 left-0 block size-2 rounded-full ${statusInfo.barColor}`} />
                                <span>{issue}</span>
                            </div>
                        ))}
                    </div>
                )}
                <p className="text-base relative pl-6 mt-2">
                    <Info size={16} className="absolute top-1 left-0" />
                    <span>{statusInfo.message} Learn more from <a className='hover:underline newtab' href="https://developers.google.com/search/docs/crawling-indexing/canonicalization/" target="_blank" rel="noopener noreferrer">Google</a>.</span>
                </p>
            </div>
        </div>
    );
};

export default CanonicalURLChecker;
