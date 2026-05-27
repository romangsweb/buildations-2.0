import React from 'react'

interface LogoProps {
  variant?: 'color' | 'monochrome'
  showText?: boolean
  className?: string
  style?: React.CSSProperties
  height?: number | string
  width?: number | string
  isDarkTheme?: boolean // Force dark theme styling (e.g. white instead of black for front elements)
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'color',
  showText = false,
  className = '',
  style,
  height,
  width,
  isDarkTheme = true, // By default Buildations is a dark-themed site
}) => {
  // Theme-sensitive colors for the front elements (b square and s circle)
  const frontBgColor = isDarkTheme ? '#FFFFFF' : '#000000'
  const frontTextColor = isDarkTheme ? '#000000' : '#FFFFFF'
  
  // Outer circular badge colors
  const circleOuterColor = variant === 'color' 
    ? (isDarkTheme ? '#FFFFFF' : '#000000')
    : '#7A7A7A'
  const circleInnerColor = '#FFFFFF' // Always white as in the reference image
  const circleTextColor = '#000000' // Always black for contrast against the white inner circle

  // Text color below the logo
  const textColor = variant === 'color'
    ? (isDarkTheme ? '#FFFFFF' : '#000000')
    : '#7A7A7A'

  // Dimensions
  const viewWidth = 96
  const viewHeight = showText ? 94 : 60
  
  // Render the stacked squares
  const renderSquares = () => {
    if (variant === 'color') {
      return (
        <>
          {/* 1st (deepest): Blue */}
          <rect x="0" y="0" width="40" height="40" rx="3" fill="#006CFF" />
          {/* 2nd: Cyan */}
          <rect x="4" y="4" width="40" height="40" rx="3" fill="#00B5E2" />
          {/* 3rd: Green */}
          <rect x="8" y="8" width="40" height="40" rx="3" fill="#00D27F" />
          {/* 4th: Light Green */}
          <rect x="12" y="12" width="40" height="40" rx="3" fill="#75E600" />
          {/* 5th: Yellow */}
          <rect x="16" y="16" width="40" height="40" rx="3" fill="#FFD200" />
        </>
      )
    } else {
      return (
        <>
          {/* Monochrome shades of gray shifting down-right */}
          <rect x="0" y="0" width="40" height="40" rx="3" fill="#333333" />
          <rect x="4" y="4" width="40" height="40" rx="3" fill="#4F4F4F" />
          <rect x="8" y="8" width="40" height="40" rx="3" fill="#7A7A7A" />
          <rect x="12" y="12" width="40" height="40" rx="3" fill="#A0A0A0" />
          <rect x="16" y="16" width="40" height="40" rx="3" fill="#D3D3D3" />
        </>
      )
    }
  }

  return (
    <svg
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      width={width || (showText ? 'auto' : '38px')}
      height={height || (showText ? '60px' : '24px')}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', overflow: 'visible', ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {/* Render stacked layers */}
        {renderSquares()}
        
        {/* 6th layer (front): Square with "b" */}
        <rect
          x="20"
          y="20"
          width="40"
          height="40"
          rx="3"
          fill={variant === 'color' ? frontBgColor : '#7A7A7A'}
        />
        <text
          x="40"
          y="48"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="26"
          fontWeight="800"
          fill={variant === 'color' ? frontTextColor : '#FFFFFF'}
          textAnchor="middle"
        >
          b
        </text>

        {/* Circular Badge "s" on the right */}
        {/* Background gap mask around circle for crisp separation */}
        <circle
          cx="76"
          cy="40"
          r="21"
          fill={isDarkTheme ? '#0A0A0A' : '#FFFFFF'}
        />
        
        {/* Outer Circle */}
        <circle
          cx="76"
          cy="40"
          r="18"
          fill={circleOuterColor}
        />
        {/* Inner Circle (White) */}
        <circle
          cx="76"
          cy="40"
          r="12"
          fill={circleInnerColor}
        />
        {/* Inner Letter "s" */}
        <text
          x="76"
          y="46"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="17"
          fontWeight="800"
          fill={circleTextColor}
          textAnchor="middle"
        >
          s
        </text>

        {/* Optional text "buildations.com" below */}
        {showText && (
          <text
            x="48"
            y="84"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="11"
            fontWeight="800"
            fill={textColor}
            textAnchor="middle"
            letterSpacing="0.02em"
          >
            buildations.com
          </text>
        )}
      </g>
    </svg>
  )
}
