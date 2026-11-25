// Cảnh 9–11: cùng 100 km, "nhưng khoan" điện than, kết.
import { useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { ease, prog } from '../timing';
import { M, vnd } from '../vertical/layout';
import { Bill, Chip, Stamp, T } from './parts';
import { shotAt } from './timeline';

const Sedan = ({ x, y, c }) => (
  <g transform={`translate(${x},${y})`}>
    <path d="M-80 20 L-74 -6 Q-60 -18 -30 -20 L-14 -44 L34 -44 L52 -20 Q78 -16 80 4 L80 20 Z" fill="#101c33" stroke={c} strokeWidth="4" />
    <circle cx={-46} cy={22} r={14} fill={C.navy} stroke={c} strokeWidth="4" />
    <circle cx={46} cy={22} r={14} fill={C.navy} stroke={c} strokeWidth="4" />
  </g>
);
const Suv = ({ x, y, c }) => (
  <g transform={`translate(${x},${y})`}>
    <path d="M-80 20 L-80 -10 Q-72 -26 -48 -28 L-34 -54 L46 -54 L64 -28 Q80 -24 80 0 L80 20 Z" fill="#08182A" stroke={c} strokeWidth="4" />
    <circle cx={-46} cy={22} r={16} fill={C.navy} stroke={c} strokeWidth="4" />
    <circle cx={46} cy={22} r={16} fill={C.navy} stroke={c} strokeWidth="4" />
  </g>
);

// cột năng lượng; lo/hi để vẽ dải (vùng sọc) khi số liệu là khoảng
const Column = ({ x, base, lo, hi = lo, max, color, label, unit, p }) => {
  const h = 460;
  const hl = (h * lo * p) / max;
  const hh = (h * hi * p) / max;
  return (
    <g>
      <rect x={x - 80} y={base - h} width={160} height={h} rx={14} fill="none" stroke={C.white} strokeOpacity="0.15" strokeWidth="3" />
      <rect x={x - 74} y={base - hl} width={148} height={hl} rx={10} fill={color} opacity="0.85" />
      {hi > lo && <rect x={x - 74} y={base - hh} width={148} height={hh - hl} fill={color} opacity="0.35" />}
      <T x={x} y={base - hh - 24} s={50} c={C.white} w={800}>
        {label}
      </T>
      <T x={x} y={base + 44} s={28} c={C.dim} w={400}>
        {unit}
      </T>
    </g>
  );
};

export const Scene9 = ({ shots }) => {
  const f = useCurrentFrame();
  const s1 = shotAt(shots, '9.1', f);
  const s2 = shotAt(shots, '9.2', f);
  const s3 = shotAt(shots, '9.3', f);
  const s4 = shotAt(shots, '9.4', f);
  const km = 100 * ease(prog(f, s1.a + 4, s1.b - 4));
  const pe = ease(prog(f, s2.a + 4, s2.a + 30));
  const pm = ease(prog(f, s3.a + 4, s3.b - 6));
  return (
    <g>
      {s1.on && (
        <g opacity={prog(f, s1.a, s1.a + 8)}>
          {[330, 750].map((x) => (
            <g key={x}>
              <rect x={x - 110} y={620} width={220} height={640} rx={16} fill="#0d1628" stroke={C.white} strokeOpacity="0.15" />
              <line x1={x} y1={640} x2={x} y2={1240} stroke={C.white} strokeOpacity="0.35" strokeWidth="6" strokeDasharray="30 30" strokeDashoffset={-f * 6} />
            </g>
          ))}
          <g transform={`rotate(-90 330 ${1180 - 520 * (km / 100)})`}>
            <Sedan x={330} y={1180 - 520 * (km / 100)} c={C.heat} />
          </g>
          <g transform={`rotate(-90 750 ${1180 - 520 * (km / 100)})`}>
            <Suv x={750} y={1180 - 520 * (km / 100)} c={M.ev} />
          </g>
          <T x={540} y={1300} s={60} c={C.white} w={800}>{`${Math.round(km)} km`}</T>
        </g>
      )}
      {s2.on && (
        <g opacity={prog(f, s2.a, s2.a + 8)}>
          <Column x={330} base={1180} lo={49} max={55} color={C.heat} label="~50" unit="kWh năng lượng xăng" p={pe} />
          <Column x={750} base={1180} lo={16} hi={20} max={55} color={M.ev} label="16–20" unit="kWh điện" p={pe} />
          <T x={540} y={1290} s={22} c={C.dim} w={400}>
            Vios 1.5 (5,7 L/100 km) · VF 6 (15,64 kWh công bố VN – 19,5 ADAC) · khác phân khúc, minh họa
          </T>
        </g>
      )}
      {s3.on && (
        <g opacity={prog(f, s3.a, s3.a + 8)}>
          {[
            { x: 300, label: 'XĂNG', c: C.heat, v: '~110.000 đ', o: pm },
            { x: 780, label: 'SẠC TRẠM', c: M.ev, v: '60–75 nghìn đ', o: prog(pm, 0.3, 0.6) },
          ].map((m) => (
            <g key={m.x}>
              <rect x={m.x - 220} y={700} width={440} height={330} rx={24} fill="rgba(5,9,18,0.8)" stroke={m.c} strokeWidth="4" />
              <T x={m.x} y={770} s={36} c={m.c} w={800} ls={2}>
                {m.label}
              </T>
              <T x={m.x} y={900} s={m.v.length > 11 ? 50 : 60} c={C.white} w={800} o={Math.min(1, m.o * 3)}>
                {m.v}
              </T>
              <T x={m.x} y={980} s={28} c={C.dim} w={400}>
                / 100 km
              </T>
            </g>
          ))}
          <T x={540} y={1110} s={24} c={C.dim} w={400}>
            xăng 19.100 đ/L (Petrolimex, 19/11/2026)
          </T>
          <T x={540} y={1150} s={24} c={C.dim} w={400}>
            V-Green 3.858 đ/kWh, đã gồm VAT
          </T>
        </g>
      )}
      {s4.on && (
        <g opacity={prog(f, s4.a, s4.a + 8)}>
          {[1901, 2289, 2894, 3456, 3844].map((v, i) => (
            <g key={i}>
              <rect x={170 + i * 150} y={1200 - (i + 1) * 100} width={140} height={(i + 1) * 100} fill={i >= 3 ? C.heat : M.ev} opacity={0.25 + i * 0.12} />
              <T x={240 + i * 150} y={1190 - (i + 1) * 100 - 14} s={28} c={C.white}>
                {v.toLocaleString('vi-VN').replace(',', '.')}
              </T>
              <T x={240 + i * 150} y={1240} s={24} c={C.dim} w={400}>{`bậc ${i + 1}`}</T>
            </g>
          ))}
          {/* kim công tơ leo bậc khi cộng thêm điện sạc xe */}
          {(() => {
            const idx = 2 + 2 * ease(prog(f, s4.a + 10, s4.b - 10));
            return <circle cx={240 + 150 * idx} cy={1200 - (idx + 1) * 100 - 70} r={20} fill="#FFD23F" />;
          })()}
          <T x={540} y={1290} s={22} c={C.dim} w={400}>
            đ/kWh, chưa VAT · từ 1/11/2026 · sạc xe thêm vài trăm kWh/tháng có thể đẩy lên bậc cao
          </T>
          <T x={880} y={700} s={120} c="#FFD23F" w={800}>
            ?
          </T>
        </g>
      )}
    </g>
  );
};

export const Scene10 = ({ shots }) => {
  const f = useCurrentFrame();
  const s1 = shotAt(shots, '10.1', f);
  const s2 = shotAt(shots, '10.2', f);
  const s3 = shotAt(shots, '10.3', f);
  const s4 = shotAt(shots, '10.4', f);
  const slices = [
    { k: 'than', v: 45, c: '#7a7f8c', lab: 'than ~45–48%' },
    { k: 'thủy điện', v: 33, c: M.ev, lab: 'thủy điện ~33%' },
    { k: 'tái tạo', v: 13, c: M.bill, lab: 'tái tạo ~13%' },
    { k: 'khí', v: 6, c: M.accessory, lab: 'khí ~6%' },
    { k: 'khác', v: 3, c: '#3a4458', lab: '' },
  ];
  let acc = 0;
  const pd = ease(prog(f, s2.a + 4, s2.a + 30));
  return (
    <g>
      {s1.on && (
        <g>
          <Stamp x={540} y={880} text="ĐIỆN TỪ ĐÂU RA?" p={prog(f, s1.a, s1.b)} c="#FFD23F" />
          <path d={`M540 1250 L540 ${1250 - 220 * s1.p}`} stroke={M.ev} strokeWidth="14" strokeLinecap="round" />
          <rect x={500} y={1250} width={80} height={60} rx={10} fill={M.ev} />
        </g>
      )}
      {s2.on && (
        <g opacity={prog(f, s2.a, s2.a + 8)}>
          {slices.map((s, i) => {
            const a0 = (acc / 100) * 2 * Math.PI * pd - Math.PI / 2;
            acc += s.v;
            const a1 = (acc / 100) * 2 * Math.PI * pd - Math.PI / 2;
            const r = 240;
            const large = a1 - a0 > Math.PI ? 1 : 0;
            const p = (a) => `${540 + r * Math.cos(a)} ${900 + r * Math.sin(a)}`;
            return <path key={i} d={`M${p(a0)} A${r} ${r} 0 ${large} 1 ${p(a1)}`} fill="none" stroke={s.c} strokeWidth="90" />;
          })}
          <T x={540} y={920} s={44} c={C.white} w={800}>
            2025
          </T>
          {slices
            .filter((s) => s.lab)
            .map((s, i) => (
              <g key={i}>
                <rect x={190 + (i % 2) * 360} y={1196 + Math.floor(i / 2) * 50} width={26} height={26} fill={s.c} />
                <T x={230 + (i % 2) * 360} y={1218 + Math.floor(i / 2) * 50} s={28} c={C.white} w={500} a="start">
                  {s.lab}
                </T>
              </g>
            ))}
          <T x={540} y={1320} s={22} c={C.dim} w={400}>
            sản lượng điện 2025 · EVN; nguồn khác ghi than ~48%
          </T>
        </g>
      )}
      {s3.on && (
        <g opacity={prog(f, s3.a, s3.a + 8)}>
          <rect x={300} y={960} width={480} height={240} fill="#101c33" stroke={C.steel} strokeWidth="5" />
          <rect x={360} y={700} width={70} height={260} fill="#101c33" stroke={C.steel} strokeWidth="5" />
          <path d="M560 960 Q590 820 560 700 L720 700 Q690 820 720 960 Z" fill="#101c33" stroke={C.steel} strokeWidth="5" />
          {[0, 1, 2].map((i) => {
            const p = (f * 0.03 + i / 3) % 1;
            return <circle key={i} cx={395 + 10 * Math.sin(f / 6 + i)} cy={690 - 120 * p} r={20 + 30 * p} fill={C.heat} opacity={0.6 * (1 - p)} />;
          })}
          {[0, 1, 2].map((i) => {
            const p = (f * 0.025 + i / 3) % 1;
            return <circle key={'t' + i} cx={640 + 14 * Math.sin(f / 7 + i)} cy={690 - 130 * p} r={30 + 40 * p} fill={C.heat} opacity={0.45 * (1 - p)} />;
          })}
          <T x={540} y={1260} s={32} c={C.dim} w={500}>
            nhà máy nhiệt điện · minh họa
          </T>
        </g>
      )}
      {s4.on && (
        <g opacity={prog(f, s4.a, s4.a + 8)}>
          <T x={540} y={1060} s={340} c="#FFD23F" w={800}>
            ?
          </T>
          <Chip x={540} y={1240} text="TẬP SAU" c="#FFD23F" s={44} />
        </g>
      )}
    </g>
  );
};

export const Scene11 = ({ shots }) => {
  const f = useCurrentFrame();
  const s1 = shotAt(shots, '11.1', f);
  const s2 = shotAt(shots, '11.2', f);
  const lines = [
    ['1.000.000 đ xăng → ~200.000 đ tới bánh xe', M.bill],
    ['~700.000 đ thành nhiệt trong máy', C.heat],
    ['Xe điện: ~2/3–3/4 tới bánh xe + phanh tái sinh', M.ev],
  ];
  return (
    <g>
      <g opacity={prog(f, s1.a, s1.a + 8)}>
        <rect x={90} y={620} width={900} height={420} rx={26} fill="rgba(5,9,18,0.85)" stroke={C.line} strokeOpacity="0.5" strokeWidth="3" />
        {lines.map(([t, c], i) => (
          <T key={i} x={540} y={720 + i * 110} s={34} c={c} o={prog(f, s1.a + 6 + i * 8, s1.a + 14 + i * 8)}>
            {t}
          </T>
        ))}
        <T x={540} y={1010} s={22} c={C.dim} w={400}>
          ước tính trung bình — DOE/EPA Mỹ
        </T>
      </g>
      <g opacity={s2.after ? 1 : 0}>
        {[0, 1, 2, 3].map((i) => {
          const p = prog(f, s2.a + i * 6, s2.b + 20);
          return <Bill key={i} x={300 + i * 160 + 30 * Math.sin(f / 8 + i)} y={1250 - 760 * p} s={1.3} rot={20 * Math.sin(f / 10 + i)} o={1 - p} color={C.heat} />;
        })}
        <Chip x={540} y={1180} text="Theo dõi kênh để xem tập sau" c={C.line} s={32} o={prog(f, s2.a + 10, s2.a + 20)} />
      </g>
    </g>
  );
};
