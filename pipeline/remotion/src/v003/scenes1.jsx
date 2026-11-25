// Cảnh 1–3: hook, năng lượng trong 1 triệu, nghi phạm #1 động cơ.
import { useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { ease, prog } from '../timing';
import { EngineBlock } from '../vertical/EngineBlock';
import { M } from '../vertical/layout';
import { BILL_H, BILL_W, BILL_Y, billX } from '../vertical/MoneyMeter';
import { Bill, Chip, Stamp, SuspectCard, T } from './parts';
import { shotAt } from './timeline';

const fadeWin = (f, s, k = 8) => Math.min(prog(f, s.a, s.a + k), 1 - prog(f, s.b - k, s.b));

// 10 tờ trong vùng hình: 2 hàng × 5
const gridPos = (i) => ({ x: 540 + ((i % 5) - 2) * 150, y: 880 + Math.floor(i / 5) * 110 });

export const Scene1 = ({ shots }) => {
  const f = useCurrentFrame();
  const s1 = shotAt(shots, '1.1', f);
  const s2 = shotAt(shots, '1.2', f);
  const s3 = shotAt(shots, '1.3', f);
  const s4 = shotAt(shots, '1.4', f);
  return (
    <g>
      {/* 1.1 vòi bơm + tiền chảy vào */}
      {s1.on && (
        <g opacity={fadeWin(f, s1)}>
          <path d="M300 760 L520 760 Q560 760 560 800 L560 900 L620 900" fill="none" stroke={C.line} strokeWidth="26" strokeLinecap="round" />
          <rect x={210} y={700} width={120} height={150} rx={16} fill="#101c33" stroke={C.line} strokeWidth="5" />
          <path d="M600 880 L700 930" stroke={C.steel} strokeWidth="22" strokeLinecap="round" />
          <rect x={660} y={960} width={260} height={220} rx={22} fill="#101c33" stroke={C.line} strokeWidth="5" />
          <T x={790} y={1085} s={34} c={C.dim}>
            bình xăng
          </T>
          {Array.from({ length: 10 }, (_, i) => {
            const p = prog(f, s1.a + i * (s1.dur / 12), s1.a + i * (s1.dur / 12) + 14);
            if (p <= 0 || p >= 1) return null;
            return <Bill key={i} x={270 + 450 * p} y={620 + 340 * p * p} rot={30 * p} s={1.2 - 0.5 * p} />;
          })}
        </g>
      )}
      {/* 1.2–1.3 hai hàng tiền */}
      {(s2.on || s3.on) && (
        <g opacity={s2.on ? prog(f, s2.a, s2.a + 8) : 1}>
          {Array.from({ length: 10 }, (_, i) => {
            const dim = s3.on && i >= 2 ? 0.18 + 0.82 * (1 - prog(f, s3.a, s3.a + 10)) : 1;
            const glow = s3.on && i < 2;
            const { x, y } = gridPos(i);
            return (
              <g key={i}>
                {glow && <rect x={x - 60} y={y - 38} width={120} height={76} rx={14} fill={M.bill} opacity={0.35} />}
                <Bill x={x} y={y} s={1.6} o={dim} />
              </g>
            );
          })}
          {s2.on && <T x={540} y={1210} s={150} c={C.line} w={800} o={0.6 + 0.4 * Math.sin(f / 4)}>?</T>}
          {s3.on && (
            <T x={540} y={1210} s={44} c={M.bill}>
              2 tờ đẩy xe đi · 8 tờ ???
            </T>
          )}
        </g>
      )}
      {/* 1.4 con dấu */}
      {s4.on && (
        <g>
          <Stamp x={540} y={900} text="800.000 đ ĐI ĐÂU?" sub="đi tìm thủ phạm" p={prog(f, s4.a, s4.b)} />
          <g transform={`translate(${380 + 300 * s4.p}, 1150)`}>
            <circle r={60} fill="none" stroke={C.line} strokeWidth="10" />
            <line x1={42} y1={42} x2={95} y2={95} stroke={C.line} strokeWidth="14" strokeLinecap="round" />
          </g>
        </g>
      )}
    </g>
  );
};

export const Scene2 = ({ shots }) => {
  const f = useCurrentFrame();
  const s1 = shotAt(shots, '2.1', f);
  const s2 = shotAt(shots, '2.2', f);
  const liters = 52.4 * ease(prog(f, s1.a + 4, s1.b - 6));
  const kwh = 450 * ease(prog(f, s2.a + 6, s2.b - 8));
  const morph = ease(prog(f, s2.a, s2.a + 14));
  return (
    <g>
      {/* can xăng */}
      <g opacity={1 - morph}>
        <path d="M380 700 L640 700 L700 760 L700 1180 L380 1180 Z" fill="#101c33" stroke={C.line} strokeWidth="6" strokeLinejoin="round" />
        <rect x={420} y={650} width={110} height={50} rx={10} fill="none" stroke={C.line} strokeWidth="6" />
        <clipPath id="canClip">
          <path d="M386 706 L637 706 L694 763 L694 1174 L386 1174 Z" />
        </clipPath>
        <rect x={380} y={1180 - 470 * (liters / 52.4)} width={330} height={470} fill={C.fluid} opacity="0.85" clipPath="url(#canClip)" />
        <T x={540} y={1010} s={110} c={C.white} w={800}>{`${liters.toFixed(0)} L`}</T>
      </g>
      <Chip x={540} y={1265} text="E10 RON95 · 19.100 đ/L · vùng 1 · Petrolimex 19/11/2026" s={24} c={C.fluid} o={s1.on ? prog(f, s1.a + 6, s1.a + 14) : 0} />
      {/* cột pin */}
      <g opacity={morph}>
        <rect x={410} y={680} width={260} height={500} rx={30} fill="#08182A" stroke={M.ev} strokeWidth="6" />
        <rect x={490} y={650} width={100} height={36} rx={8} fill={M.ev} />
        <rect x={426} y={1164 - 468 * (kwh / 450)} width={228} height={468 * (kwh / 450)} rx={18} fill={M.ev} opacity="0.75" />
        <T x={540} y={950} s={100} c={C.white} w={800}>{`${kwh.toFixed(0)}`}</T>
        <T x={540} y={1010} s={40} c={C.white}>
          kWh
        </T>
        <Chip x={540} y={1265} text="1 kWh = 1 số điện" s={30} c={M.ev} o={prog(f, s2.a + 20, s2.a + 30)} />
      </g>
    </g>
  );
};

const LOST = [9, 8, 7, 6, 5, 4, 3];
export const ENGINE3 = { cx: 510, cy: 940 };
export const fly3 = (f, s32a, i) => prog(f, s32a + 10 + i * 5, s32a + 36 + i * 5);

export const Scene3 = ({ shots }) => {
  const f = useCurrentFrame();
  const s1 = shotAt(shots, '3.1', f);
  const s2 = shotAt(shots, '3.2', f);
  const s3 = shotAt(shots, '3.3', f);
  const cardO = s1.on ? fadeWin(f, s1) : 0;
  const engO = prog(f, s2.a - 6, s2.a + 8);
  const heat = ease(prog(f, s3.a, s3.a + 40));
  return (
    <g>
      <SuspectCard n={1} title="Nằm dưới nắp ca-pô" o={cardO}>
        <circle cx={0} cy={-40} r={110} fill="none" stroke={C.line} strokeWidth="6" />
        <T x={0} y={8} s={140} c={C.line} w={800}>
          ?
        </T>
      </SuspectCard>
      <g opacity={engO}>
        <EngineBlock cx={ENGINE3.cx} cy={ENGINE3.cy} heat={heat} shimmer={prog(f, s3.a + 10, s3.a + 40)} t={f} />
      </g>
      {LOST.map((slot, i) => {
        const p = fly3(f, s2.a, i);
        if (p <= 0 || p >= 1) return null;
        const e = ease(p);
        const x0 = billX(slot) + BILL_W / 2;
        const y0 = BILL_Y + BILL_H / 2;
        const x = x0 + (ENGINE3.cx - x0) * e;
        const y = y0 + (ENGINE3.cy - y0) * e - 260 * Math.sin(Math.PI * e);
        return <Bill key={slot} x={x} y={y} rot={(i % 2 ? 1 : -1) * 200 * e} s={1.4 - 0.9 * e} o={1 - 0.6 * e} color={M.heat} />;
      })}
    </g>
  );
};
