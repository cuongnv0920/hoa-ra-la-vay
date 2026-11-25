// Bản chỉnh 2 của demo v3: vẽ lại cảnh 5, 6 (to hơn, nói rõ là so sánh nguyên lý) và phóng nhẹ vài shot.
// Các cảnh còn lại dùng nguyên hình của v003v3. Vùng hình: y 560–1320; từ y = 900 không đặt chữ quá x = 940.
import { useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { ease, prog } from '../timing';
import { Sedan, Suv } from '../v003/scenes4';
import { CarSide, Chip, T } from '../v003/parts';
import { shotAt } from '../v003/timeline';
import { M } from '../vertical/layout';
import * as base from '../v003v3/scenes';

const GOLD = '#FFD23F';
const GREEN = '#2BB673';
const fadeIn = (f, s, k = 8) => prog(f, s.a, s.a + k);
const useShots = (shots) => {
  const f = useCurrentFrame();
  return [f, ...shots.map((x) => shotAt(shots, x.id, f))];
};

// Phóng hình quanh tâm vùng hình, trôi nhẹ thêm 3% trong suốt shot.
const ZOOM = { '1.1': 1.2, '1.2': 1.07, '1.4': 1.07, '4.1': 1.01, '7.3': 1.1 };
const zoomed = (Scene) => {
  const Zoomed = ({ shots }) => {
    const f = useCurrentFrame();
    const cur = shots.find((x) => f >= x.start && f < x.start + x.dur) || shots[shots.length - 1];
    const k = ZOOM[cur.id] ? ZOOM[cur.id] * (1 + 0.03 * ease(prog(f, cur.start, cur.start + cur.dur))) : 1;
    return (
      <g transform={`translate(540,940) scale(${k}) translate(-540,-940)`}>
        <Scene shots={shots} />
      </g>
    );
  };
  return Zoomed;
};

export const S1 = zoomed(base.S1);
export const S2 = base.S2;
export const S3 = base.S3;
export const S4 = zoomed(base.S4);
export const S7 = zoomed(base.S7);
export const S8 = base.S8;

const Principle = ({ y }) => (
  <g>
    <rect x={130} y={y} width={810} height={124} rx={26} fill="rgba(5,9,18,0.9)" stroke={GOLD} strokeWidth="5" />
    <T x={540} y={y + 54} s={46} c={GOLD} w={800}>
      So sánh nguyên lý
    </T>
    <T x={540} y={y + 104} s={40} c={C.white}>
      không phải số liệu
    </T>
  </g>
);

const Waves = ({ x, y, f, h = 90, n = 3, o = 1 }) => (
  <g opacity={o}>
    {Array.from({ length: n }, (_, i) => {
      const dx = (i - (n - 1) / 2) * 34;
      return <path key={i} d={`M${x + dx} ${y} q 16 ${-h / 6} 0 ${-h / 3} t 0 ${-h / 3} t 0 ${-h / 3}`} fill="none" stroke={M.heat} strokeWidth="8" strokeLinecap="round" strokeDasharray="34 16" strokeDashoffset={f * 3 + i * 20} />;
    })}
  </g>
);

const NODE_Y = [645, 828, 1011, 1194];
const NODE = ['pin', 'bộ điều khiển', 'mô-tơ', 'bánh xe'];
const NX = 330; // tâm cột khối

const Spinner = ({ x, y, deg, c = M.ev }) => (
  <g transform={`translate(${x},${y})`}>
    <circle r={76} fill="#08182A" stroke={c} strokeWidth="9" />
    <g transform={`rotate(${deg})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <line key={a} x1={0} y1={0} x2={0} y2={-60} stroke={c} strokeWidth="9" transform={`rotate(${a})`} />
      ))}
    </g>
  </g>
);

// Một hàng của hình nguyên lý: nguồn → bánh xe, kèm nhiệt thoát ra. Không dùng độ dài/độ dày để biểu diễn lượng.
const Row = ({ y, c, title, from, note, f, deg, waves }) => (
  <g>
    <rect x={130} y={y} width={810} height={282} rx={26} fill="rgba(5,9,18,0.7)" stroke={c} strokeWidth="4" />
    <T x={164} y={y + 52} s={44} c={c} w={800} a="start">
      {title}
    </T>
    <rect x={164} y={y + 94} width={300} height={100} rx={22} fill="#08182A" stroke={c} strokeWidth="5" />
    <T x={314} y={y + 158} s={40}>
      {from}
    </T>
    <line x1={486} y1={y + 144} x2={716} y2={y + 144} stroke={c} strokeWidth="12" strokeDasharray="30 20" strokeDashoffset={-f * 4} />
    <path d={`M708 ${y + 120} L744 ${y + 144} L708 ${y + 168} Z`} fill={c} />
    <Spinner x={840} y={y + 134} deg={deg} c={c} />
    <Waves x={waves === 3 ? 600 : 570} y={y + 116} f={f} h={waves === 3 ? 100 : 60} n={waves} />
    <T x={460} y={y + 252} s={34} c={C.white} w={600}>
      {note}
    </T>
  </g>
);

export const S5 = ({ shots }) => {
  const [f, s1, s2, s3, s4, s5] = useShots(shots);
  const regen = s5.after;
  const deg = regen ? s5.a * 6 + (f - s5.a) * 3 : f * 6; // một chiều quay duy nhất
  const flow = s2.on || s3.on || s5.on;
  return (
    <g>
      {s1.on && (
        <g opacity={fadeIn(f, s1)}>
          <g transform={`translate(540,960) scale(${1 + 0.04 * ease(s1.p)}) translate(-540,-960)`}>
            <CarSide cx={540} cy={1060} w={760} stroke={M.ev} wheelRot={-f * 6} />
            <rect x={360} y={1062} width={360} height={46} rx={10} fill={M.ev} opacity="0.7" />
            <path d="M480 870 q -70 -80 0 -200 q 20 70 60 70 q 40 -60 0 -130 q 110 90 60 260 z" fill="none" stroke={M.heat} strokeWidth="11" />
            <line x1={410} y1={890} x2={680} y2={625} stroke={C.white} strokeWidth="18" strokeLinecap="round" />
            <T x={540} y={1265} s={44} c={M.ev}>
              pin dưới sàn xe
            </T>
          </g>
        </g>
      )}
      {flow && (
        <g opacity={fadeIn(f, s2)}>
          <line x1={NX} y1={NODE_Y[0]} x2={NX} y2={NODE_Y[3]} stroke={M.ev} strokeOpacity="0.3" strokeWidth="22" />
          {Array.from({ length: 9 }, (_, i) => {
            const p = (f * 0.022 + i / 9) % 1;
            const y = regen ? NODE_Y[3] - (NODE_Y[3] - NODE_Y[0]) * p : NODE_Y[0] + (NODE_Y[3] - NODE_Y[0]) * p;
            return <circle key={i} cx={NX} cy={y} r={19} fill={regen ? GREEN : M.ev} />;
          })}
          {NODE.map((n, i) => {
            const lossy = s3.on && (i === 1 || i === 2);
            return (
              <g key={n}>
                <rect x={NX - 200} y={NODE_Y[i] - 56} width={400} height={112} rx={26} fill="#08182A" fillOpacity="0.93" stroke={lossy ? M.heat : M.ev} strokeWidth="6" />
                <T x={NX} y={NODE_Y[i] + 16} s={48}>
                  {n}
                </T>
              </g>
            );
          })}
          {!s3.on && (
            <g>
              <Spinner x={690} y={NODE_Y[2]} deg={deg} />
              <Spinner x={690} y={NODE_Y[3]} deg={deg} c={C.white} />
            </g>
          )}
          {/* Hao hụt ở bộ điều khiển và mô-tơ (S3); chỉ nói "một phần" thành nhiệt, không nêu nguyên nhân hay tỉ lệ */}
          {s3.on && (
            <g opacity={fadeIn(f, s3)}>
              {[1, 2].map((i) => (
                <g key={i}>
                  <Waves x={602} y={NODE_Y[i] + 48} f={f + i * 11} h={96} n={3} />
                  <T x={672} y={NODE_Y[i] - 4} s={36} c={M.heat} a="start">
                    hao hụt,
                  </T>
                  <T x={672} y={NODE_Y[i] + 40} s={36} c={M.heat} a="start">
                    có tỏa nhiệt
                  </T>
                </g>
              ))}
              <T x={560} y={NODE_Y[0] + 13} s={32} c={C.white} w={600} a="start">
                sạc cũng có hao
              </T>
            </g>
          )}
          {regen && (
            <g opacity={fadeIn(f, s5)}>
              <T x={750} y={680} s={44} c={GREEN}>
                phanh:
              </T>
              <T x={750} y={736} s={44} c={GREEN}>
                điện về pin
              </T>
              <T x={740} y={1300} s={32} c={C.white}>
                vẫn quay cùng chiều
              </T>
            </g>
          )}
        </g>
      )}
      {s4.on && (
        <g opacity={fadeIn(f, s4)}>
          <Principle y={574} />
          <Row y={714} c={M.heat} title="xe xăng" from="đốt xăng" note="nhiều nhiệt thoát ra" waves={3} f={f} deg={f * 4} />
          <Row y={1012} c={M.ev} title="xe điện" from="mô-tơ điện" note="không đốt nhiên liệu · vẫn có hao hụt" waves={1} f={f} deg={f * 6} />
        </g>
      )}
    </g>
  );
};

const Dial = ({ x, y, v, c, label, p }) => {
  const a = Math.PI * (1 + v * p);
  return (
    <g>
      <path d={`M${x - 165} ${y} A165 165 0 0 1 ${x + 165} ${y}`} fill="none" stroke={C.white} strokeOpacity="0.2" strokeWidth="32" />
      <line opacity={Math.min(1, p * 5)} x1={x} y1={y} x2={x + 132 * Math.cos(a)} y2={y + 132 * Math.sin(a)} stroke={c} strokeWidth="15" strokeLinecap="round" />
      <circle cx={x} cy={y} r={22} fill={c} />
      <T x={x - 150} y={y + 52} s={32} c={C.white} w={500}>
        thấp
      </T>
      <T x={x + 150} y={y + 52} s={32} c={C.white} w={500}>
        cao
      </T>
      <T x={x} y={y + 74} s={42} c={c} w={800}>
        {label}
      </T>
    </g>
  );
};

export const S6 = ({ shots }) => {
  const [f, s1, s2, s3] = useShots(shots);
  const run = ease(prog(f, s1.a + 6, s1.a + s1.dur * 0.7));
  const dial = ease(prog(f, s1.a + s1.dur * 0.45, s1.b - 6));
  const wob = s2.after ? 0.06 * Math.sin((f - s2.a) / 9) : 0;
  if (s3.after) return <base.S6 shots={shots} />;
  return (
    <g opacity={fadeIn(f, s1)}>
      {[
        { y: 626, Car: Sedan, c: M.heat },
        { y: 774, Car: Suv, c: M.ev },
      ].map(({ y, Car, c }) => (
        <g key={c}>
          <line x1={110} y1={y + 56} x2={970} y2={y + 56} stroke={C.white} strokeOpacity="0.35" strokeWidth="7" strokeDasharray="30 22" />
          <g transform={`translate(${250 + 580 * run},${y}) scale(-1.55,1.55)`}>
            <Car x={0} y={0} c={c} />
          </g>
        </g>
      ))}
      {s2.after ? (
        <Chip x={535} y={880} text="tùy mức tiêu thụ và nơi nạp năng lượng" c={GOLD} s={36} o={fadeIn(f, s2)} />
      ) : (
        <T x={540} y={880} s={38} c={C.white} w={600}>
          chi phí năng lượng · cùng quãng đường
        </T>
      )}
      <Dial x={310} y={1090} v={0.72 + wob} c={M.heat} label="xe xăng" p={dial} />
      <Dial x={730} y={1090} v={0.4 - wob} c={M.ev} label="xe điện" p={dial} />
      <Principle y={1194} />
    </g>
  );
};
