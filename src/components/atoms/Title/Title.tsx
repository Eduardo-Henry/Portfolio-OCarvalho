import React from 'react';

interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ level = 1, children, className }) => {
  const headingTags = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
  } as const;
  const Tag = headingTags[level];

  return <Tag className={className}>{children}</Tag>;
};
