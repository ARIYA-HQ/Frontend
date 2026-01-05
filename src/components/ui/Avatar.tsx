import React from 'react';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  alt: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const Avatar = ({ size = 'md', className = '', alt, ...props }: AvatarProps) => {
  return (
    <img
      className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
      alt={alt}
      {...props}
    />
  );
};

export { Avatar };