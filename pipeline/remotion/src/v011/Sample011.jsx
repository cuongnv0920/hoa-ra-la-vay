// KHUNG MẪU video 011 — để duyệt hình biến tần, chưa phải bản dựng đủ.
// Sample011A = cảnh 6b (4 shot 6b.1–6b.4): biến tần đổi điện hai chiều, rồi máy tính chỉnh mức hãm.
// Giọng: audio/eleven_v4/scene-07.mp3 (cần --public-dir=projects/011-phanh-tai-sinh/assets). Chưa có hiệu ứng âm thanh.
// Mọi mốc hình lấy từ at6b('cụm lời đọc') để đổi giọng thì hình vẫn khớp.
import { Audio, Easing, Sequence, interpolate, spring, staticFile, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { C } from '../theme';
import { SAFE, VH, VW, ZONE } from '../vertical/layout';
import { Footnote, Header, Headline, KaraokeSubtitle } from '../vertical/Text';
import { T } from '../v003/parts';
import { Arrow, CarSideX, EV, GOLD } from '../v009/parts';
import { carWheel } from '../v003/parts';
import { Battery, Computer, ControlLine, GEN, Inverter, Motor, Wire } from './parts';
import { K6B } from './cues';
import { FPS, LEAD, S6B } from './timeline';

export const SAMPLE011A_FRAMES = S6B.frames;
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const ease = Easing.inOut(Easing.cubic);

// vị trí hàng chính
const Y = 860;
const CAR = { cx: 540, cy: 1185, w: 460 };
const MOTOR = { cx: 150, r: 80 };
const INV = { cx: 520, w: 240 };
const BAT = { cx: 890, w: 120 };
const AC = { x1: MOTOR.cx + MOTOR.r + 2, x2: INV.cx - INV.w / 2 - 2 };
const DC = { x1: INV.cx + INV.w / 2 + 2, x2: BAT.cx - BAT.w / 2 - 2 };

const Safe = () => (
  <g fill="none" stroke="#FF3DF0" strokeWidth="3" strokeDasharray="14 10">
    <rect x={SAFE.side} y={ZONE.visual[0]} width={VW - 2 * SAFE.side} height={ZONE.visual[1] - ZONE.visual[0]} />
    <rect x={VW - SAFE.right} y={SAFE.rightFromY} width={SAFE.right} height={VH - SAFE.rightFromY} />
    <rect x={0} y={VH - SAFE.bottom} width={VW} height={SAFE.bottom} />
  </g>
);

const hSize = (h) => (h.length > 32 ? 46 : h.length > 28 ? 54 : h.length > 24 ? 60 : h.length > 19 ? 68 : h.length > 14 ? 78 : 92);
const headParts = (s) => {
  const i = s.headline.indexOf(s.mark[0]);
  return [{ t: s.headline.slice(0, i) }, { t: s.mark[0], c: s.mark[1] }, { t: s.headline.slice(i + s.mark[0].length) }];
};

// mốc (frame từ đầu cảnh): cues.js
const K = K6B;
// mũi tên lực hãm lớn nhất khi nói "mạnh", nhỏ lại ở "nhẹ"
const FADE = 8;

// góc quay mô-tơ: nhanh dần từ lúc sóng ra khỏi biến tần, giữ chiều quay suốt (bánh vẫn lăn cùng chiều)
const motorAngle = (f, K) => {
  let a = 0;
  for (let i = 0; i < f; i++) a += 2 + 10 * interpolate(i, [K.acOn, K.acOn + 40], [0, 1], clamp);
  return a;
};

// Hình của cảnh 6b (frame f tính từ đầu cảnh). Dùng cho khung mẫu và bản dựng đủ.
export const Scene6bArt = ({ f, K = K6B }) => {
  const fps = FPS;
  // ---- biến tần ----
  const invP = f < K.inv ? 0 : spring({ frame: f - K.inv, fps, config: { damping: 16, mass: 0.7 } });
  const qMark = interpolate(f, [K.inv - 2, K.inv + 8], [1, 0], clamp);
  const pulse = Math.max(
    interpolate(f, [K.acOn, K.acOn + 10, K.acOn + 30], [0, 1, 0], clamp),
    interpolate(f, [K.acBack, K.acBack + 10, K.acBack + 30], [0, 1, 0], clamp),
    interpolate(f, [K.dcBack - 6, K.dcBack + 6, K.dcBack + 26], [0, 1, 0], clamp)
  );

  // ---- dây một chiều (bên pin) ----
  const dcReveal = interpolate(f, [K.dcOn, K.dcOn + 18], [0, 1], { ...clamp, easing: ease });
  const dcFwd = f >= K.dcBack; // sau lượt phanh: hạt chạy từ biến tần về pin
  const dcAmount = dcFwd
    ? interpolate(f, [K.dcBack, K.dcBack + FADE, K.comp - 6, K.comp + 6], [0, 1, 1, 0.0], clamp)
    : interpolate(f, [K.dcOn, K.dcOn + FADE, K.brake, K.brake + FADE], [0, 1, 1, 0], clamp);

  // ---- dây xoay chiều (bên mô-tơ) ----
  const acReveal = interpolate(f, [K.acOn - 4, K.acOn + 18], [0, 1], { ...clamp, easing: ease });
  const acBackFlow = f >= K.acBack;
  const acAmount = acBackFlow
    ? interpolate(f, [K.acBack, K.acBack + FADE, K.dcBack + 20, K.dcBack + 34], [0, 1, 1, 0], clamp)
    : interpolate(f, [K.acOn, K.acOn + FADE, K.brake, K.brake + FADE], [0, 1, 1, 0], clamp);

  const flow = f * 0.018;
  // ---- mô-tơ và pin ----
  const mode = interpolate(f, [K.brake, K.brake + 12], [0, 1], clamp);
  const level = 2 + interpolate(f, [K.charge, K.charge + 26], [0, 0.85], { ...clamp, easing: ease });
  const motorIn = interpolate(f, [0, 10], [0, 1], clamp);

  // ---- máy tính và lực hãm (6b.4) ----
  const compP = f < K.comp ? 0 : spring({ frame: f - K.comp, fps, config: { damping: 16, mass: 0.7 } });
  const carO = interpolate(f, [K.comp + 6, K.comp + 22], [0, 1], clamp);
  // mốc luôn tăng dần, kể cả khi "mạnh" và "nhẹ" được đọc sát nhau (bản 3.5 cách nhau khoảng 10 khung hình)
  const bp = [K.comp + 16, K.strong - 3, K.strong + 4, K.soft - 1, K.soft + 14].reduce((acc, x) => [...acc, Math.max(x, (acc[acc.length - 1] ?? -1e9) + 1)], []);
  const brakeLen = interpolate(f, bp, [0, 30, 200, 200, 70], { ...clamp, easing: ease });
  const wf = carWheel(CAR.cx, CAR.cy, CAR.w, 1);

  return (
    <g>
        {/* khoảng trống "?" ở cuối cảnh 6a, biến mất khi biến tần xuất hiện */}
        <g opacity={qMark}>
          <line x1={AC.x1} y1={Y} x2={DC.x2} y2={Y} stroke={C.white} strokeOpacity={0.25} strokeWidth={5} strokeDasharray="10 12" />
          <T x={INV.cx} y={Y + 26} s={90} c={GOLD} w={800}>
            ?
          </T>
        </g>

        <Wire {...AC} y={Y} kind="ac" from="right" reveal={acReveal} dir={acBackFlow ? 1 : -1} flow={flow} amount={acAmount} dim={f >= K.comp ? 0.55 : 1} />
        <Wire {...DC} y={Y} kind="dc" from="right" reveal={dcReveal} dir={dcFwd ? 1 : -1} flow={flow} amount={dcAmount} loss={dcFwd ? 0.6 : 0} dim={f >= K.comp ? 0.55 : 1} />
        {/* đường một chiều lúc đầu vẽ từ pin: dùng from="left" khi dir ngược lại không cần; reveal theo phía pin */}

        <Motor cx={MOTOR.cx} cy={Y} r={MOTOR.r} angle={motorAngle(f, K)} mode={mode} o={motorIn} />
        <Battery cx={BAT.cx} cy={Y} level={level} o={motorIn} />
        <Inverter cx={INV.cx} cy={Y} p={invP} pulse={pulse} />

        {/* máy tính điều khiển biến tần */}
        <ControlLine x={INV.cx} y1={694} y2={754} o={Math.min(1, compP * 2)} dash={f * 0.6} />
        <Computer cx={INV.cx} cy={630} p={compP} />

        {/* lực hãm ở bánh xe, nhìn ngang */}
        <g opacity={carO}>
          <CarSideX cx={CAR.cx} cy={CAR.cy} w={CAR.w} color={EV} roll={-f * 3} />
          <Arrow x1={wf.x + 4} y1={wf.y + wf.r + 28} x2={wf.x + 4 - brakeLen} y2={wf.y + wf.r + 28} w={6 + brakeLen / 16} c={C.white} o={brakeLen > 2 ? 1 : 0} />
          <T x={CAR.cx} y={wf.y + wf.r + 82} s={26} c={C.dim}>
            lực hãm ở bánh xe
          </T>
          <Arrow x1={800} y1={CAR.cy + 30} x2={918} y2={CAR.cy + 30} w={5} c={C.dim} />
          <T x={859} y={CAR.cy + 4} s={24} c={C.dim}>
            xe chạy
          </T>
        </g>
    </g>
  );
};

export const Sample011A = ({ showSafe = false, frameOverride = null, voice = true }) => {
  const cf = useCurrentFrame();
  const f = frameOverride ?? cf;
  return (
    <Background>
      <Header series="Hóa Ra Là Vậy" episode="KHUNG MẪU · chưa duyệt" />
      <svg width={VW} height={VH} style={{ position: 'absolute' }}>
        <Scene6bArt f={f} />
        {showSafe && <Safe />}
      </svg>

      {S6B.shots.map((s) => (
        <Sequence key={s.id} from={s.from} durationInFrames={s.dur} layout="none">
          <Headline parts={headParts(s)} size={hSize(s.headline)} />
        </Sequence>
      ))}
      <KaraokeSubtitle chunks={S6B.chunks} />
      <Footnote text="Biến tần đổi điện hai chiều · hình minh họa giản lược" />
      {voice && (
        <Sequence from={LEAD}>
          <Audio src={staticFile(S6B.audio)} />
        </Sequence>
      )}
    </Background>
  );
};
