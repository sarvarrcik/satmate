import React, { useMemo } from 'react';
import katex from 'katex';

interface MathTextProps {
  children: string;
  className?: string;
  displayMode?: boolean;
}

export const MathText: React.FC<MathTextProps> = ({ children, className = '', displayMode = false }) => {
  const renderedContent = useMemo(() => {
    if (!children) return '';

    // If displayMode is directly set on the component
    if (displayMode) {
      try {
        return katex.renderToString(children, {
          displayMode: true,
          throwOnError: false,
        });
      } catch {
        return children;
      }
    }

    // Split text by $$...$$ for display equations and $...$ for inline equations
    const regex = /(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g;
    const parts = children.split(regex);

    const htmlParts = parts.map((part) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2);
        try {
          return katex.renderToString(math, {
            displayMode: true,
            throwOnError: false,
          });
        } catch {
          return part;
        }
      } else if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1);
        try {
          return katex.renderToString(math, {
            displayMode: false,
            throwOnError: false,
          });
        } catch {
          return part;
        }
      }
      // Escape HTML for plain text and preserve newlines
      return part
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br/>');
    });

    return htmlParts.join('');
  }, [children, displayMode]);

  return (
    <span
      className={`inline-block leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
};
