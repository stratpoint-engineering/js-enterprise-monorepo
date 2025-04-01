import React from 'react';

export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;

  /**
   * Optional card title
   */
  title?: string;

  /**
   * Optional footer content
   */
  footer?: React.ReactNode;

  /**
   * Whether to show a border
   * @default true
   */
  bordered?: boolean;

  /**
   * Whether to add shadow to the card
   * @default false
   */
  shadow?: boolean | 'sm' | 'md' | 'lg';

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Whether to remove default padding
   * @default false
   */
  noPadding?: boolean;
}

/**
 * Card component for containing content
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  footer,
  bordered = true,
  shadow = false,
  className = '',
  noPadding = false,
}) => {
  // Shadow classes
  const shadowClasses = {
    true: 'shadow-md',
    false: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  // Combine all classes
  const cardClasses = [
    'bg-white rounded-lg overflow-hidden',
    bordered ? 'border border-gray-200' : '',
    typeof shadow === 'boolean' ? shadowClasses[shadow ? 'true' : 'false'] : shadowClasses[shadow],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      <div className={noPadding ? '' : 'p-4'}>
        {children}
      </div>
      {footer && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
