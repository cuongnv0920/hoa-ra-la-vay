// Ảnh bìa Reels dùng chung cho mọi video (brand/README.md: "1 vật thể/chi tiết lớn của chủ đề
// + 3–5 chữ tiếng Việt, độ tương phản cao"). Ảnh tĩnh 1080×1920, xuất bằng `npx remotion still`.
//
// Bố cục:
// - Tên kênh nhỏ ở trên (y ≈ 150).
// - Nhãn chủ đề (chip màu) + tiêu đề 2 dòng rất to (y 430–760).
// - Vật thể lớn, màu đặc, có quầng sáng phía sau (y 800–1450).
// - Mọi thứ quan trọng nằm trong ô vuông giữa (y 420–1500), vì có nơi Facebook cắt ảnh bìa thành ô vuông;
//   dưới y 1500 để trống (vùng chữ và nút của Reels).
import { AbsoluteFill } from 'remotion';
import { C, FONT } from '../theme';

export const COVER_SQUARE = { y0: 420, y1: 1500 };

const Title = ({ lines, size = 132, y = 560, gap = 1.08 }) => (
  <g>
    {lines.map((parts, i) => (
      <text
        key={i}
        x={540}
        y={y + i * size * gap}
        fontSize={size}
        fontWeight={900}
        fontFamily={FONT}
        textAnchor="middle"
        fill={C.white}
        stroke="#000"
        strokeOpacity={0.35}
        strokeWidth={6}
        paintOrder="stroke"
        letterSpacing={-1}
      >
        {(Array.isArray(parts) ? parts : [[parts]]).map(([t, c], j) => (
          <tspan key={j} fill={c || C.white}>
            {t}
          </tspan>
        ))}
      </text>
    ))}
  </g>
);

const Chips = ({ items, y = 440 }) => {
  const w = items.map((it) => it.t.length * 27 + 56);
  const gap = 22;
  const total = w.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  let x = 540 - total / 2;
  return (
    <g>
      {items.map((it, i) => {
        const x0 = x;
        x += w[i] + gap;
        return (
          <g key={i}>
            <rect x={x0} y={y - 46} width={w[i]} height={64} rx={32} fill={it.c} />
            <text x={x0 + w[i] / 2} y={y} fontSize={40} fontWeight={800} fontFamily={FONT} textAnchor="middle" fill={C.navy} letterSpacing={2}>
              {it.t}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export const Cover = ({ chips = [], title, titleSize, titleY, glow = '#19B5FF', glowY = 1120, children, showSafe = false }) => (
  <AbsoluteFill style={{ background: C.navy }}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs>
        <radialGradient id="cover-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glow} stopOpacity={0.42} />
          <stop offset="55%" stopColor={glow} stopOpacity={0.12} />
          <stop offset="100%" stopColor={glow} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="cover-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E1830" />
          <stop offset="100%" stopColor="#070C17" />
        </linearGradient>
      </defs>
      <rect width={1080} height={1920} fill="url(#cover-bg)" />
      <ellipse cx={540} cy={glowY} rx={620} ry={520} fill="url(#cover-glow)" />
      {/* lưới blueprint mờ, giữ chất "bản vẽ kỹ thuật" của kênh */}
      <g opacity={0.07} stroke={C.line} strokeWidth={2}>
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`v${i}`} x1={i * 96 + 12} y1={0} x2={i * 96 + 12} y2={1920} />
        ))}
        {Array.from({ length: 21 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 96} x2={1080} y2={i * 96} />
        ))}
      </g>
      <text x={540} y={170} fontSize={44} fontWeight={800} fontFamily={FONT} textAnchor="middle" fill={C.white} opacity={0.85} letterSpacing={3}>
        HÓA RA LÀ VẬY
      </text>
      <rect x={470} y={196} width={140} height={6} rx={3} fill="#FFD23F" />
      {chips.length > 0 && <Chips items={chips} />}
      <Title lines={title} size={titleSize} y={titleY} />
      {children}
      {showSafe && (
        <g fill="none" stroke="#ff2a6d" strokeWidth={4} strokeDasharray="20 14">
          <rect x={0} y={COVER_SQUARE.y0} width={1080} height={COVER_SQUARE.y1 - COVER_SQUARE.y0} />
        </g>
      )}
    </svg>
  </AbsoluteFill>
);
