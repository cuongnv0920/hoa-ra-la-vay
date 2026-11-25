import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import script from '../../../../projects/003-tien-xang-di-dau/script/script.json';
import { Background } from '../components/Background';
import { C, FONT } from '../theme';
import { ease, prog } from '../timing';
import { EngineBlock } from './EngineBlock';
import { M, SAFE, VH, VW } from './layout';
import { BILL_H, BILL_W, BILL_Y, billX, MoneyMeter } from './MoneyMeter';
import { estimateChunks, Footnote, Header, Headline, KaraokeSubtitle } from './Text';

// KHUNG MẪU — Cảnh 3 video 003 (shot 3.1 → 3.3), 8 giây. Dùng để duyệt bố cục và đồng hồ tiền.
export const SAMPLE_FRAMES = 240;
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const S31 = 0;
const S32 = 90;
const S33 = 165;
const LOST = [9, 8, 7, 6, 5, 4, 3]; // 7 tờ mất vào động cơ, bay từ phải sang trái; 3 tờ đầu còn lại (2 tờ tới bánh xe + 1 tờ cho nghi phạm #2/#3)
const ENGINE = { cx: 510, cy: 940 };

const SuspectCard = ({ o }) => (
  <g opacity={o} transform="translate(540, 960)">
    <rect x={-330} y={-280} width={660} height={520} rx={28} fill="rgba(5,9,18,0.8)" stroke={C.heat} strokeWidth="4" />
    <rect x={-330} y={-280} width={660} height={80} rx={28} fill={C.heat} />
    <text y={-226} fill={C.navy} fontSize="44" fontWeight="800" fontFamily={FONT} textAnchor="middle" letterSpacing="4">
      HỒ SƠ NGHI PHẠM
    </text>
    <circle cx={0} cy={-40} r={110} fill="none" stroke={C.line} strokeWidth="6" />
    <text y={-5} fill={C.line} fontSize="140" fontWeight="800" fontFamily={FONT} textAnchor="middle">
      ?
    </text>
    <text y={150} fill={C.white} fontSize="40" fontWeight="700" fontFamily={FONT} textAnchor="middle">
      Nằm dưới nắp ca-pô
    </text>
  </g>
);

export const Sample003 = ({ showSafe = false }) => {
  const f = useCurrentFrame();
  const sc = script.scenes.find((s) => s.scene === 3);
  const chunks = estimateChunks(sc.voiceover, SAMPLE_FRAMES);

  const fly = (i) => prog(f, S32 + 12 + i * 5, S32 + 12 + i * 5 + 26); // tờ thứ i bay vào máy
  const amount = 1e6 - 1e5 * LOST.reduce((a, _, i) => a + ease(fly(i)), 0);
  const bills = Array.from({ length: 10 }, (_, i) => {
    const li = LOST.indexOf(i);
    if (li < 0) return { state: 'keep', drop: 0 };
    const p = fly(li);
    return p > 0 ? { state: 'heat', drop: Math.min(1, p * 1.4) } : { state: 'keep', drop: 0 };
  });
  const cardO = interpolate(f, [S31 + 4, S31 + 14, S32 - 8, S32], [0, 1, 1, 0], clamp);
  const engO = interpolate(f, [S32 - 6, S32 + 8], [0, 1], clamp);
  const heat = ease(prog(f, S33, S33 + 45));
  const waves = prog(f, S33 + 10, S33 + 40);

  return (
    <Background>
      <Header series="XĂNG hay ĐIỆN?" episode="Tập 1" />
      <svg width={VW} height={VH} style={{ position: 'absolute' }}>
        <MoneyMeter amount={amount} bills={bills} />
        <SuspectCard o={cardO} />
        <g opacity={engO}>
          <EngineBlock cx={ENGINE.cx} cy={ENGINE.cy} s={1} heat={heat} shimmer={waves} t={f} />
        </g>
        {/* tờ tiền bay từ đồng hồ vào động cơ */}
        {LOST.map((slot, i) => {
          const p = fly(i);
          if (p <= 0 || p >= 1) return null;
          const e = ease(p);
          const x0 = billX(slot) + BILL_W / 2;
          const y0 = BILL_Y + BILL_H / 2;
          const x = x0 + (ENGINE.cx - x0) * e;
          const y = y0 + (ENGINE.cy - y0) * e - 260 * Math.sin(Math.PI * e);
          const r = (i % 2 ? 1 : -1) * 200 * e;
          return (
            <g key={slot} transform={`translate(${x},${y}) rotate(${r}) scale(${1.4 - 0.9 * e})`} opacity={1 - 0.6 * e}>
              <rect x={-BILL_W / 2} y={-BILL_H / 2} width={BILL_W} height={BILL_H} rx={7} fill={M.heat} />
              <text y={8} fill={C.navy} fontSize="22" fontWeight="800" fontFamily={FONT} textAnchor="middle">
                100K
              </text>
            </g>
          );
        })}
        {showSafe && (
          <g>
            <rect x={0} y={VH - SAFE.bottom} width={VW} height={SAFE.bottom} fill="#ff00aa" opacity="0.22" />
            <rect x={VW - SAFE.right} y={SAFE.rightFromY} width={SAFE.right} height={VH - SAFE.rightFromY - SAFE.bottom} fill="#ff00aa" opacity="0.22" />
            <text x={60} y={VH - SAFE.bottom + 50} fill="#ff66cc" fontSize="30" fontFamily={FONT}>
              vùng nút Reels/Shorts — không đặt chữ
            </text>
          </g>
        )}
      </svg>
      {f < S32 && <Headline from={S31 + 2} parts={[{ t: 'NGHI PHẠM ' }, { t: '#1', c: C.heat }]} />}
      {f >= S32 && f < S33 && <Headline from={S32} parts={[{ t: 'ĐỘNG CƠ', c: C.heat }]} size={110} />}
      {f >= S33 && <Headline from={S33} parts={[{ t: '~700.000 đ → ' }, { t: 'NHIỆT', c: C.heat }]} size={84} />}
      <KaraokeSubtitle chunks={chunks} />
      <Footnote text="ước tính trung bình — DOE/EPA Mỹ" />
    </Background>
  );
};
