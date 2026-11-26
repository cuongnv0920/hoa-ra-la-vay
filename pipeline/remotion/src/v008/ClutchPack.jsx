// Video 008: cận cảnh ly hợp nhiều đĩa (multi-plate clutch), nhìn ngang, trục nằm ngang.
// - Vỏ trống (drum) nối trục bên trái (từ hộp số) mang các đĩa màu trắng, chìa từ ngoài vào.
// - Moay-ơ (hub) nối trục bên phải (ra cầu sau) mang các đĩa màu hãng, chìa từ trong ra.
// - Hai nhóm đĩa xếp xen kẽ, chồng lên nhau ở vùng giữa: đó là chỗ ma sát.
// - Lực ép đẩy các đĩa sát lại: ép nhẹ thì hai nhóm quay lệch tốc độ, ép chặt thì GẦN NHƯ cùng tốc độ
//   (không vẽ dính cứng tuyệt đối).
// Chuyển động quay biểu diễn bằng hai đĩa tròn nhìn chính diện ở hai đầu trục, có nan chỉ góc quay.
import { C } from '../theme';
import { T } from '../v003/parts';

export const CP = { cx: 540, cy: 920, n: 9, plateW: 14 };

// Tỷ số tốc độ trục ra / trục vào theo lực ép p (0–1). p = 1 → 0,97 ("gần như").
export const outRatio = (p) => 0.97 - 0.72 * (1 - p);

// Góc quay hai trục tới frame f, tích phân theo p(frame).
export const angles = (f, pOf, wIn = 9) => {
  let aOut = 0;
  for (let i = 0; i < f; i++) aOut += wIn * outRatio(pOf(i));
  return { aIn: wIn * f, aOut };
};

const Face = ({ x, y, a, c, label, r = 72 }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#101a2e" stroke={c} strokeWidth={6} />
    {[0, 120, 240].map((k) => {
      const t = ((a + k) * Math.PI) / 180;
      return <line key={k} x1={x} y1={y} x2={x + Math.cos(t) * (r - 12)} y2={y + Math.sin(t) * (r - 12)} stroke={c} strokeWidth={7} strokeLinecap="round" />;
    })}
    <circle cx={x} cy={y} r={10} fill={c} />
    <T x={x} y={y + r + 44} s={30} c={c} w={700}>
      {label}
    </T>
  </g>
);

export const ClutchPack = ({ p = 0.3, aIn = 0, aOut = 0, c = '#FFB000', o = 1, shown = 99, faces = true }) => {
  const { cx, cy, n, plateW } = CP;
  const gap = 10 + 26 * (1 - p); // khe giữa các đĩa
  const pitch = plateW + gap;
  const packW = n * plateW + (n - 1) * gap;
  const x0 = cx - packW / 2 + 30;
  const drumR = 190; // bán kính trong vỏ trống
  const hubR = 70;
  const plates = Array.from({ length: n }, (_, i) => {
    const isIn = i % 2 === 0; // đĩa nối vỏ trống (trục vào)
    const x = x0 + i * pitch;
    return { isIn, x };
  });
  const last = x0 + (n - 1) * pitch + plateW;
  const pistonX = x0 - 28;
  return (
    <g opacity={o}>
      {/* trục vào (trái) và vỏ trống */}
      <rect x={150} y={cy - 16} width={x0 - 150 - 60} height={32} rx={8} fill={C.white} opacity={0.85} />
      <path
        d={`M${x0 - 70} ${cy - 16} L${x0 - 70} ${cy - drumR - 22} L${last + 36} ${cy - drumR - 22} L${last + 36} ${cy - drumR} L${x0 - 48} ${cy - drumR} L${x0 - 48} ${cy + drumR} L${last + 36} ${cy + drumR} L${last + 36} ${cy + drumR + 22} L${x0 - 70} ${cy + drumR + 22} L${x0 - 70} ${cy + 16}`}
        fill={C.white}
        fillOpacity={0.12}
        stroke={C.white}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      {/* moay-ơ và trục ra (phải) */}
      <rect x={x0 - 10} y={cy - hubR} width={last - x0 + 30} height={2 * hubR} rx={10} fill={c} fillOpacity={0.18} stroke={c} strokeWidth={5} />
      <rect x={last + 20} y={cy - 16} width={930 - last - 20} height={32} rx={8} fill={c} opacity={0.9} />
      {/* piston ép */}
      <rect x={pistonX} y={cy - drumR + 8} width={22} height={2 * drumR - 16} rx={6} fill={C.steel} />
      {/* đĩa */}
      {plates.map(({ isIn, x }, i) => {
        const yTop = isIn ? cy - drumR : cy - drumR + 46;
        const yBot = isIn ? cy - hubR - 34 : cy - hubR;
        const col = isIn ? C.white : c;
        return (
          <g key={i} opacity={Math.max(0, Math.min(1, shown - i))}>
            {[1, -1].map((sgn) => (
              <rect
                key={sgn}
                x={x}
                y={sgn > 0 ? yTop : 2 * cy - yBot}
                width={plateW}
                height={yBot - yTop}
                rx={4}
                fill={col}
                opacity={isIn ? 0.95 : 1}
              />
            ))}
          </g>
        );
      })}
      {faces && <Face x={190} y={cy + 300} a={aIn} c={C.white} label="trục từ hộp số" r={64} />}
      {faces && <Face x={890} y={cy + 300} a={aOut} c={c} label="trục ra cầu sau" r={64} />}
    </g>
  );
};
