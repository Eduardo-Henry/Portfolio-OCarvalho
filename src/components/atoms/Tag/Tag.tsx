import React from 'react';

interface TagProps {
  label: string;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, className }) => {
  return <span className={`tag ${className || ''}`}>{label}</span>;
};
