import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { BrakeDisc, Label } from '../components/BrakeDisc';
import { Speedometer } from '../components/Speedometer';
import { Subtitle } from '../components/Subtitle';
import { C, FONT } from '../theme';
import { ease, prog, sentenceWindows } from '../timing';

// Cảnh 1 — Hook: 100 km/h → 0, động năng thành nhiệt.
// Thay AI-VIDEO 1.1 bằng đường phố vẽ nét blueprint (bản demo không tốn credits).
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };

const Road = ({ f, t0, t1, brake, carScale }) => {
  // Quãng đường tích lũy: tốc độ không đổi rồi giảm tuyến tính (giảm tốc đều) về 0.
  const T = t1 - t0;
  const d = f < t0 ? f : f < t1 ? t0 + (f - t0) - (f - t0) ** 2 / (2 * T) : t0 + T / 2;
  const hy = 400;
  const dashes = [];
  for (let i = 0; i < 14; i++) {
    const u = (i / 14 + d * 0.012) % 1;
    const u2 = Math.min(1, u + 0.035);
    const y1 = hy + (1080 - hy) * u * u;
    const y2 = hy + (1080 - hy) * u2 * u2;
    const w1 = 2 + 14 * u;
    dashes.push(<line key={i} x1={960} y1={y1} x2={960} y2={y2} stroke={C.white} strokeOpacity={0.15 + 0.5 * u} strokeWidth={w1} />);
  }
  const cw = 380 * carScale;
  const ch = 190 * carScale;
  const cx = 960;
  const cy = 560 + 40 * (carScale - 1);
  const lit = brake;
  return (
    <svg width="1920" height="1080" style={{ position: 'absolute' }}>
      <defs>
        <filter id="tl" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <line x1="0" y1={hy} x2="1920" y2={hy} stroke={C.line} strokeOpacity="0.25" strokeWidth="2" />
      <path d={`M120 1080 L930 ${hy} M1800 1080 L990 ${hy}`} stroke={C.line} strokeOpacity="0.6" strokeWidth="4" fill="none" />
      {dashes}
      {/* đuôi xe phía trước, nét blueprint */}
      <g>
        <rect x={cx - cw / 2} y={cy - ch} width={cw} height={ch} rx={22 * carScale} fill={C.navy} stroke={C.line} strokeWidth="4" />
        <path
          d={`M${cx - cw * 0.38} ${cy - ch} L${cx - cw * 0.3} ${cy - ch * 1.55} L${cx + cw * 0.3} ${cy - ch * 1.55} L${cx + cw * 0.38} ${cy - ch} Z`}
          fill={C.navy}
          stroke={C.line}
          strokeWidth="4"
        />
        <rect x={cx - cw * 0.2} y={cy - ch * 0.55} width={cw * 0.4} height={ch * 0.22} fill="none" stroke={C.line} strokeOpacity="0.5" strokeWidth="3" />
        {[-1, 1].map((s) => (
          <g key={s}>
            {lit > 0 && <rect x={cx + s * cw * 0.36 - cw * 0.09} y={cy - ch * 0.82} width={cw * 0.18} height={ch * 0.22} fill={C.red} opacity={lit} filter="url(#tl)" />}
            <rect
              x={cx + s * cw * 0.36 - cw * 0.09}
              y={cy - ch * 0.82}
              width={cw * 0.18}
              height={ch * 0.22}
              rx="6"
              fill={lit > 0 ? C.red : '#3a0b0b'}
              fillOpacity={0.35 + 0.65 * lit}
              stroke={C.red}
              strokeWidth="2"
            />
          </g>
        ))}
        <rect x={cx - cw * 0.1} y={cy - ch * 1.45} width={cw * 0.2} height={ch * 0.06} fill={C.red} opacity={lit} />
      </g>
    </svg>
  );
};

export const Scene01Hook = ({ text, frames, audio }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const S = sentenceWindows(text, frames, 4);
  // S: 0 chạy 100 · 1 đèn phanh · 2 đạp phanh · 3 ba giây · 4 ... · 5 đi đâu · 6 không mất · 7 nhiệt · 8 hai lít · 9 bộ phanh
  const brakeOn = prog(f, S[1].start + 0.25 * (S[1].end - S[1].start), S[1].start + 0.25 * (S[1].end - S[1].start) + 6);
  const t0 = S[2].start + 6;
  const t1 = S[3].end - 6;
  const speed = 100 * (1 - prog(f, t0, t1));
  const carScale = 1 + 0.25 * ease(prog(f, S[1].start, t1));
  const roadOut = interpolate(f, [S[5].start - 12, S[5].start + 6], [1, 0], clamp);
  const discIn = interpolate(f, [S[5].start - 6, S[5].start + 12], [0, 1], clamp);
  const heat = 0.82 * ease(prog(f, S[7].start, S[8].end));
  const zoomOut = ease(prog(f, S[9].start, S[9].start + 1.6 * fps));
  const R = 300 * (1 - 0.42 * zoomOut);
  const rot = f * 0.6;
  const card = interpolate(f, [S[8].start, S[8].start + 10], [0, 1], clamp);
  const fact = interpolate(f, [S[3].start + 6, S[3].start + 16, S[5].start - 12, S[5].start], [0, 1, 1, 0], clamp);
  const brakeLabel = interpolate(f, [S[9].start + 1.6 * fps, S[9].start + 1.6 * fps + 10], [0, 1], clamp);

  return (
    <Background>
      <Audio src={staticFile(audio)} />
      <AbsoluteFill style={{ opacity: roadOut }}>
        <Road f={f} t0={t0} t1={t1} brake={brakeOn} carScale={carScale} />
        <svg width="1920" height="1080" style={{ position: 'absolute' }}>
          <Speedometer speed={speed} cx={1640} cy={300} r={150} />
        </svg>
        <div style={{ position: 'absolute', left: 80, top: 80, opacity: fact, fontFamily: FONT, color: C.white }}>
          <div style={{ fontSize: 56, fontWeight: 700 }}>100 → 0 km/h · khoảng 3 giây</div>
          <div style={{ fontSize: 26, color: C.dim, marginTop: 8 }}>
            ước tính: xe 1,5 tấn, giảm tốc 0,9 g, chưa tính thời gian phản xạ
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: discIn }}>
        <svg width="1920" height="1080">
          <BrakeDisc cx={960 - 260 * card * (1 - zoomOut)} cy={500} R={R} heat={heat} rot={rot} caliper wheel={zoomOut} />
          {card > 0 && zoomOut < 1 && (
            <g opacity={card * (1 - zoomOut)} transform={`translate(${1060 - 120 * (1 - card)},0)`}>
              {/* cốc nước minh họa */}
              <path d="M40 330 L60 640 L240 640 L260 330" fill="none" stroke={C.line} strokeWidth="5" />
              <rect x="56" y="420" width="188" height="216" fill={C.line} opacity="0.25" />
              {[0, 1, 2, 3, 4].map((i) => (
                <circle key={i} cx={90 + i * 32} cy={600 - ((f * 3 + i * 37) % 170)} r={6 + (i % 2) * 3} fill="none" stroke={C.white} strokeOpacity="0.7" strokeWidth="2" />
              ))}
              <Label x={300} y={450} size={76} weight={700}>≈ 1,7 lít nước</Label>
              <Label x={300} y={510} size={34} color={C.dim} weight={400}>đun sôi từ 20 °C</Label>
              <Label x={300} y={560} size={26} color={C.dim} weight={400}>ước tính, nếu toàn bộ động năng thành nhiệt</Label>
            </g>
          )}
          {brakeLabel > 0 && (
            <g opacity={brakeLabel}>
              <path d={`M1300 230 L${960 + 0.95 * R} ${500 - 0.55 * R}`} stroke={C.heat} strokeWidth="4" />
              <circle cx={960 + 0.95 * R} cy={500 - 0.55 * R} r="8" fill={C.heat} />
              <Label x={1310} y={222} size={44} weight={700}>bộ phanh</Label>
              <Label x={1310} y={262} size={28} color={C.dim} weight={400}>nằm ngay sau vành bánh xe</Label>
            </g>
          )}
        </svg>
      </AbsoluteFill>
      <Subtitle windows={S} />
    </Background>
  );
};
