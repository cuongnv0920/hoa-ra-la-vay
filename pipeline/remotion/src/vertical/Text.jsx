import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, FONT } from '../theme';
import { M, ZONE } from './layout';

// Tiêu đề lớn: một từ khóa tô màu. parts: [{t: 'chữ', c?: màu}]
export const Headline = ({ parts, from = 0, size = 92 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - from, fps, config: { damping: 14, mass: 0.6 } });
  if (f < from) return null;
  return (
    <AbsoluteFill style={{ top: ZONE.headline[0], height: ZONE.headline[1] - ZONE.headline[0], justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          transform: `scale(${0.85 + 0.15 * s})`,
          opacity: s,
          fontFamily: FONT,
          fontSize: size,
          fontWeight: 800,
          color: C.white,
          textAlign: 'center',
          lineHeight: 1.1,
          padding: '0 70px',
        }}
      >
        {parts.map((p, i) => (
          <span key={i} style={{ color: p.c || C.white }}>
            {p.t}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Phụ đề tô màu từng chữ. words: [{w, start, end}] theo frame; hiển thị theo cụm (câu).
export const KaraokeSubtitle = ({ chunks }) => {
  const f = useCurrentFrame();
  const cur = chunks.find((c) => f >= c.start && f < c.end);
  if (!cur) return null;
  const o = interpolate(f, [cur.start, cur.start + 4], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ top: ZONE.subtitle[0], height: ZONE.subtitle[1] - ZONE.subtitle[0], justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          opacity: o,
          maxWidth: 1080 - 2 * 70,
          padding: '14px 26px',
          borderRadius: 14,
          background: 'rgba(5,9,18,0.72)',
          fontFamily: FONT,
          fontSize: 52,
          fontWeight: 700,
          lineHeight: 1.25,
          textAlign: 'center',
        }}
      >
        {cur.words.map((w, i) => {
          const done = f >= w.end;
          const now = f >= w.start && f < w.end;
          return (
            <span key={i} style={{ color: now ? M.karaoke : done ? C.white : 'rgba(242,245,250,0.45)' }}>
              {w.w}
              {i < cur.words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Chia lời đọc thành cụm theo câu, mỗi chữ chiếm thời gian tỉ lệ số ký tự (ước tính khi chưa có timestamps).
export function estimateChunks(text, totalFrames, lead = 4, maxWords = 7) {
  // Câu dài được chia đều thành các cụm ≤ maxWords chữ → phụ đề tối đa 2 dòng
  const sentences = [];
  for (const s of text.match(/[^.?!]+[.?!]+/g) || [text]) {
    const ws = s.trim().split(/\s+/).filter((w) => w !== '...');
    const n = Math.ceil(ws.length / maxWords);
    const per = Math.ceil(ws.length / n);
    for (let i = 0; i < n; i++) sentences.push(ws.slice(i * per, (i + 1) * per).join(' '));
  }
  const all = [];
  sentences.forEach((s, si) => s.trim().split(/\s+/).forEach((w) => all.push({ w, si })));
  const weight = (w) => w.length + 2;
  const sum = all.reduce((a, x) => a + weight(x.w), 0);
  let acc = lead;
  all.forEach((x) => {
    x.start = Math.round(acc);
    acc += (weight(x.w) / sum) * (totalFrames - lead);
    x.end = Math.round(acc);
  });
  return sentences.map((_, si) => {
    const words = all.filter((x) => x.si === si);
    return { words, start: words[0].start, end: words[words.length - 1].end };
  });
}

export const Footnote = ({ text }) => (
  <AbsoluteFill style={{ top: ZONE.footnote[0], height: ZONE.footnote[1] - ZONE.footnote[0], justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ fontFamily: FONT, fontSize: 26, color: C.dim }}>{text}</div>
  </AbsoluteFill>
);

export const Header = ({ series, episode }) => (
  <AbsoluteFill style={{ top: 0, height: 140, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '0 60px' }}>
    <div style={{ fontFamily: FONT, fontSize: 34, fontWeight: 800, color: C.white, letterSpacing: 2 }}>{series}</div>
    <div style={{ fontFamily: FONT, fontSize: 26, color: C.dim, marginRight: 80 }}>{episode}</div>
  </AbsoluteFill>
);
