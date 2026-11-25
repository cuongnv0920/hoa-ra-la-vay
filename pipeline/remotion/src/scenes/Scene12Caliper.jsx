import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { BrakeDisc, Label } from '../components/BrakeDisc';
import { FixedCaliper, FloatingCaliper } from '../components/CaliperSection';
import { Subtitle } from '../components/Subtitle';
import { C, FONT } from '../theme';
import { ease, prog, sentenceWindows } from '../timing';

// Cảnh 12 — Trạm 4: kẹp cố định và kẹp trượt (mặt cắt).
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const pulse = (f) => 0.5 + 0.5 * Math.sin(f / 6);

const Panel = ({ x, title, sub, active, children, scale = 1.5, titleO = 1 }) => (
  <g opacity={active} transform={`translate(${x},560)`}>
    <g opacity={titleO}>
    <text y={-380} fill={C.white} fontSize="46" fontWeight="700" fontFamily={FONT} textAnchor="middle">
      {title}
    </text>
    <text y={-338} fill={C.dim} fontSize="28" fontFamily={FONT} textAnchor="middle">
      {sub}
    </text>
    </g>
    <g transform={`scale(${scale})`}>{children}</g>
  </g>
);

const Tag = ({ x, y, text, o, color = C.white, size = 30 }) =>
  o > 0 ? (
    <text x={x} y={y} opacity={o} fill={color} fontSize={size} fontWeight="600" fontFamily={FONT} textAnchor="middle">
      {text}
    </text>
  ) : null;

export const Scene12Caliper = ({ text, frames, audio }) => {
  const f = useCurrentFrame();
  const S = sentenceWindows(text, frames, 4);
  // S: 0 trạm cuối · 1 ôm mép đĩa · 2 hai kiểu · 3 kẹp cố định · 4 kẹp trượt gọn rẻ · 5 piston một bên
  //    6 đẩy má trong / phản lực · 7 ... · 8 một piston hai má · 9 phần lớn xe con
  const fi = (a, d = 10) => interpolate(f, [a, a + d], [0, 1], clamp);

  // Phần 1: đĩa chính diện + kẹp.
  const discO = interpolate(f, [0, 10, S[2].start, S[2].start + 14], [0, 1, 1, 0], clamp);
  const titleO = interpolate(f, [4, 16, S[2].start, S[2].start + 14], [0, 1, 1, 0], clamp);
  const hug = S[1].start <= f && f < S[2].start ? pulse(f) : 0;

  // Phần 2: hai mặt cắt.
  const panels = fi(S[2].start + 6, 16);
  const fixedActive = f < S[4].start ? 1 : 0.35;
  const floatActive = f < S[3].start ? 0.85 : f < S[4].start ? 0.35 : 1;
  const L3 = S[3].end - S[3].start;
  const c = ease(prog(f, S[3].start + 0.15 * L3, S[3].start + 0.45 * L3));
  const fixedGlow = S[3].start <= f && f < S[4].start ? pulse(f) * 0.8 : 0;
  const L6 = S[6].end - S[6].start;
  const a = ease(prog(f, S[6].start + 0.1 * L6, S[6].start + 0.4 * L6));
  const b = ease(prog(f, S[6].start + 0.5 * L6, S[6].start + 0.85 * L6));
  const pistonGlow = S[5].start <= f && f < S[6].start ? pulse(f) : 0;
  const padGlow = f >= S[8].start ? 0.6 + 0.4 * pulse(f) : 0;
  const heat = 0.35 * prog(f, S[8].start, S[9].end);
  const zoom = 1.5 + 0.25 * ease(prog(f, S[8].start, S[8].start + 20));
  const fixedOut = interpolate(f, [S[8].start, S[8].start + 20], [1, 0], clamp);
  const floatX = interpolate(ease(prog(f, S[8].start, S[8].start + 20)), [0, 1], [1440, 960]);

  return (
    <Background>
      <Audio src={staticFile(audio)} />
      <AbsoluteFill style={{ opacity: discO }}>
        <svg width="1920" height="1080">
          <BrakeDisc cx={820} cy={540} R={330} rot={f * 0.4} caliper caliperGlow={hug + (f < S[1].start ? 0.6 * fi(20) : 0)} />
          {hug > 0 && (
            <g>
              <path d="M1250 260 L1110 330" stroke={C.line} strokeWidth="4" />
              <Label x={1260} y={260} size={38}>ôm lấy mép đĩa</Label>
            </g>
          )}
        </svg>
        <div style={{ position: 'absolute', left: 1240, top: 380, opacity: titleO, fontFamily: FONT, color: C.white }}>
          <div style={{ fontSize: 30, color: C.line, fontWeight: 700, letterSpacing: 4 }}>TRẠM 4</div>
          <div style={{ fontSize: 64, fontWeight: 700, marginTop: 6 }}>Cụm kẹp phanh</div>
          <div style={{ fontSize: 34, color: C.dim, marginTop: 8 }}>caliper · nhiều người gọi là “heo phanh”</div>
        </div>
      </AbsoluteFill>

      {panels > 0 && (
        <AbsoluteFill style={{ opacity: panels }}>
          <svg width="1920" height="1080">
            <g opacity={fixedOut}>
              <Panel x={480} title="KẸP CỐ ĐỊNH" sub="fixed caliper" active={fixedActive}>
                <FixedCaliper c={c} pistonGlow={fixedGlow} />
                <Tag x={0} y={170} text="piston ở cả hai bên · ép từ hai phía" o={fi(S[3].start + 0.45 * L3) * (f < S[4].start ? 1 : 0)} color={C.fluid} size={26} />
                <Tag x={0} y={210} text="hay gặp trên xe hiệu suất cao" o={fi(S[3].start + 0.7 * L3) * (f < S[4].start ? 1 : 0)} size={24} />
              </Panel>
            </g>
            <Panel x={floatX} title="KẸP TRƯỢT" sub="floating caliper" active={floatActive} scale={zoom} titleO={fixedOut}>
              <FloatingCaliper a={a} b={b} pistonGlow={pistonGlow} padGlow={padGlow} heat={heat} showForce={f < S[8].start ? 1 : 0} />
              <Tag x={0} y={170} text="gọn · rẻ hơn" o={fi(S[4].start) * (f < S[5].start ? 1 : 0)} size={28} />
              <Tag x={-95} y={170} text="piston chỉ ở một bên" o={fi(S[5].start) * (f < S[6].start ? 1 : 0)} color={C.line} size={26} />
              <Tag x={-80} y={150} text="chốt dẫn hướng" o={fi(S[6].start + 0.5 * L6) * (f < S[8].start ? 1 : 0)} color={C.dim} size={20} />
            </Panel>
            {f >= S[8].start && (
              <g opacity={fi(S[8].start + 14)}>
                <Label x={960} y={230} size={56} weight={700} anchor="middle">Một piston, hai má phanh</Label>
                <Label x={560} y={482} size={34} anchor="end" color={C.line}>1 piston</Label>
                <path d="M572 430 Q700 400 800 450" stroke={C.line} strokeWidth="3" fill="none" />
                <Label x={1240} y={482} size={34} color={C.heat}>2 má phanh</Label>
                <path d="M1230 472 L1012 472 M1230 466 Q1080 330 916 400" stroke={C.heat} strokeWidth="3" fill="none" />
              </g>
            )}
            {f >= S[9].start && (
              <g opacity={fi(S[9].start)}>
                <rect x={760} y={840} width={400} height={56} rx="28" fill="none" stroke={C.line} strokeWidth="3" />
                <Label x={960} y={878} size={28} anchor="middle" color={C.line}>phổ biến trên phần lớn xe con</Label>
              </g>
            )}
            <text x={60} y={60} fill={C.dim} fontSize="22" fontFamily={FONT} opacity={0.8}>
              mặt cắt minh họa · trái: phía trong xe · phải: phía bánh xe
            </text>
          </svg>
        </AbsoluteFill>
      )}
      <Subtitle windows={S} />
    </Background>
  );
};
