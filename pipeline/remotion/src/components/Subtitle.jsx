import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, FONT } from '../theme';

// Phụ đề theo câu. windows: kết quả sentenceWindows().
export const Subtitle = ({ windows }) => {
  const f = useCurrentFrame();
  const cur = windows.find((w) => !w.pause && f >= w.start && f < w.end);
  if (!cur) return null;
  const o = interpolate(f, [cur.start, cur.start + 6, cur.end - 4, cur.end], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 56 }}>
      <div
        style={{
          opacity: o,
          maxWidth: 1400,
          padding: '12px 28px',
          borderRadius: 10,
          background: 'rgba(5,9,18,0.72)',
          color: C.white,
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 600,
          lineHeight: 1.3,
          textAlign: 'center',
        }}
      >
        {cur.text}
      </div>
    </AbsoluteFill>
  );
};
