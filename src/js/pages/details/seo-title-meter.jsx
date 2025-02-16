import { Info, Check, X, Square } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SEOTitleMeter = ({ title }) => {
  const [pixelWidth, setPixelWidth] = useState(0);
  const [status, setStatus] = useState('not-available');

  // Constants for Google SERP title limits
  const MIN_PIXELS = 285;
  const MAX_PIXELS = 575;

  // Function to calculate pixel width
  const calculatePixelWidth = (text) => {
    if (!text) return 0;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '20px Arial';
    return context.measureText(text).width;
  };

  useEffect(() => {
    if (!title) {
      setStatus('not-available');
      setPixelWidth(0);
      return;
    }

    const width = calculatePixelWidth(title);
    setPixelWidth(width);

    if (width < MIN_PIXELS) {
      setStatus('too-short');
    } else if (width > MAX_PIXELS) {
      setStatus('too-long');
    } else {
      setStatus('good');
    }
  }, [title]);

  // Calculate progress percentage
  const getProgress = () => {
    return Math.min((pixelWidth / MAX_PIXELS) * 100, 100);
  };

  // Get status color and message
  const getStatusInfo = () => {
    switch (status) {
      case 'too-short':
        return {
          color: 'text-orange-500',
          barColor: 'bg-orange-500',
          message: 'The title is too short, you can add more content to improve the title length.',
          icon: Square
        };
      case 'good':
        return {
          color: 'text-green-500',
          barColor: 'bg-green-500',
          message: 'The title length is good, keep it up!',
          icon: Check
        };
      case 'too-long':
        return {
          color: 'text-orange-500',
          barColor: 'bg-orange-500',
          message: 'The title is too long, this can show ellipsis in Google SERP. Consider shortening it.',
          icon: Square
        };
      case 'not-available':
        return {
          color: 'text-red-500',
          barColor: 'bg-red-500',
          message: 'No title available. Please add a title to optimize for search engines.',
          icon: X
        };
      default:
        return {
          color: 'text-gray-500',
          barColor: 'bg-gray-500',
          message: 'Unable to determine title status.',
          icon: Info
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="grid grid-cols-4 gap-8 px-6 py-4 border-t border-solid items-baseline">
      <div className="flex gap-4 items-center">
        <statusInfo.icon className={`flex-shrink-0 size-5 ${statusInfo.color}`} />
        <div className="text-base font-semibold">
          Title
        </div>
      </div>
      <div className="col-span-3">
        <p className="text-base font-semibold">
          {title || 'No title provided'}
        </p>

        <div className="mt-2 space-y-2">
          {/* Progress Bar and Pixel Count */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Title Width</span>
              <span className={`text-sm font-medium ${statusInfo.color}`}>
                {Math.round(pixelWidth)} pixels
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${statusInfo.barColor} transition-all duration-300`}
                style={{ width: `${getProgress()}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{MIN_PIXELS}px</span>
              <span>{MAX_PIXELS}px</span>
            </div>
          </div>

          {/* Status Message */}
          <p className="text-base relative pl-6">
            <Info size={16} className="absolute top-1 left-0" />
            <span>
              {statusInfo.message} {status !== 'not-available' && (
                <span>
                  Learn more from <a className="hover:underline newtab" target="_blank" href="https://developers.google.com/search/docs/appearance/title-link/" rel="noopener noreferrer">Google</a>.
                </span>
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SEOTitleMeter;