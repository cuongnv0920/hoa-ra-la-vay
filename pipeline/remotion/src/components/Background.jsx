import { AbsoluteFill } from 'remotion';
import { C } from '../theme';

// Nền navy + lưới blueprint + vignette.
export const Background = ({ children }) => (
  <AbsoluteFill style={{ backgroundColor: C.navy }}>
    <svg width="100%" height="100%" style={{ position: 'absolute' }}>
      <defs>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke={C.line} strokeOpacity="0.07" strokeWidth="1" />
        </pattern>
        <radialGradient id="vig" cx="50%" cy="50%" r="75%">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#vig)" />
    </svg>
    {children}
  </AbsoluteFill>
);
