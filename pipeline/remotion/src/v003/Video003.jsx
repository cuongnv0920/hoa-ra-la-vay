import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { C } from '../theme';
import { ease, prog } from '../timing';
import { M, VH, VW } from '../vertical/layout';
import { MoneyMeter } from '../vertical/MoneyMeter';
import { estimateChunks, Footnote, Header, Headline, KaraokeSubtitle } from '../vertical/Text';
import { fly3, Scene1, Scene2, Scene3 } from './scenes1';
import { Scene4, Scene5 } from './scenes2';
import { Scene6, Scene7, Scene8 } from './scenes3';
import { Scene9, Scene10, Scene11 } from './scenes4';
import { AUDIO, buildTimeline } from './timeline';

const SCENES = { 1: Scene1, 2: Scene2, 3: Scene3, 4: Scene4, 5: Scene5, 6: Scene6, 7: Scene7, 8: Scene8, 9: Scene9, 10: Scene10, 11: Scene11 };
export const TL = buildTimeline(AUDIO);

// Từ khóa tô màu trong tiêu đề lớn
const KEY = [
  ['NHIỆT', C.heat], ['ĐỘNG CƠ', C.heat], ['ỐNG XẢ', C.heat], ['KÉT NƯỚC', C.heat], ['ĐI ĐÂU?', C.heat], ['#1', C.heat],
  ['PHỤ TẢI', M.accessory], ['TRUYỀN ĐỘNG', M.drivetrain], ['XE ĐIỆN', M.ev], ['Phanh tái sinh', M.ev], ['2/3–3/4', M.ev],
  ['~200.000 đ', M.bill], ['~20%', M.bill], ['40%?', '#FFD23F'], ['NHƯNG KHOAN', '#FFD23F'], ['than', '#9AA6B8'], ['5 đồng → 1 đồng', '#FFD23F'],
  ['≈ 450 số điện', M.ev], ['~52 lít', C.fluid], ['16–20', M.ev], ['60–75k', M.ev], ['tùy bậc điện', '#FFD23F'], ['Sạch hơn?', '#FFD23F'],
];
const parts = (h) => {
  for (const [k, c] of KEY) {
    const i = h.indexOf(k);
    if (i >= 0) return [{ t: h.slice(0, i) }, { t: k, c }, { t: h.slice(i + k.length) }].filter((p) => p.t);
  }
  return [{ t: h }];
};
const hSize = (h) => (h.length > 18 ? 60 : h.length > 13 ? 76 : 96);

const LOST3 = [9, 8, 7, 6, 5, 4, 3];
function meter(f) {
  const T = TL.T;
  const ev = f >= T('8.1').a && f < T('9.1').a;
  const hidden = f >= T('9.1').a && f < T('11.1').a;
  if (ev) {
    const p = ease(prog(f, T('8.3').a + 10, T('8.3').a + 40));
    const bills = Array.from({ length: 10 }, (_, i) => (i >= 7 && p > 0 ? { state: 'loss', drop: p } : i === 6 && p > 0 ? { state: 'range', drop: 0 } : { state: 'keep', drop: 0 }));
    return { mode: 'ĐIỆN', o: 1, amount: 1e6, amountText: p > 0.5 ? '650–750 nghìn đ' : null, bills };
  }
  if (f >= T('11.1').a) {
    const bills = Array.from({ length: 10 }, (_, i) => (i < 2 ? { state: 'keep', drop: 0 } : { state: 'heat', drop: 1 }));
    return { mode: 'XĂNG', o: 1, amount: 200000, bills };
  }
  // giai đoạn xăng
  const up = prog(f, 0, T('1.1').b - 10);
  let amount = 1e6 * ease(up);
  const shown = Math.floor(up * 10 + 0.001);
  const dim = f >= T('1.3').a && f < T('2.1').a;
  const bills = Array.from({ length: 10 }, (_, i) => {
    if (i >= shown && up < 1) return { state: 'heat', drop: 1 }; // chưa xuất hiện (ẩn)
    if (dim && i >= 2) return { state: 'dim', drop: 0 };
    return { state: 'keep', drop: 0 };
  });
  // fly3 dùng frame cục bộ của cảnh 3 — khớp với tờ tiền bay trong Scene3
  const sc3 = TL.scenes.find((s) => s.scene === 3);
  LOST3.forEach((slot, i) => {
    const p = fly3(f - sc3.start, T('3.2').a - sc3.start, i);
    if (p > 0) {
      bills[slot] = { state: 'heat', drop: Math.min(1, p * 1.4) };
      amount -= 1e5 * ease(p);
    }
  });
  const a6 = ease(prog(f, T('6.1').a + 20, T('6.1').a + 45));
  const b6 = ease(prog(f, T('6.2').a + 20, T('6.2').a + 45));
  if (a6 > 0) bills[2] = b6 > 0 ? { state: 'drivetrain', drop: 0.5 + 0.5 * b6 } : { state: 'accessory', drop: 0.5 * a6 };
  amount -= 50000 * a6 + 50000 * b6;
  return { mode: 'XĂNG', o: hidden ? 0 : 1, amount, bills };
}

export const Video003 = () => {
  const f = useCurrentFrame();
  const m = meter(f);
  const T = TL.T;
  const evBg = interpolate(f, [T('8.1').a, T('8.1').a + 20, T('9.1').a - 10, T('9.1').a], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <Background>
      {AUDIO.seconds && <Audio src={staticFile(AUDIO.file)} />}
      <AbsoluteFill style={{ backgroundColor: '#08182A', opacity: 0.85 * evBg }} />
      <Header series="XĂNG hay ĐIỆN?" episode="Tập 1" />
      <svg width={VW} height={VH} style={{ position: 'absolute' }}>
        {TL.scenes.map((sc) => {
          const S = SCENES[sc.scene];
          return (
            <Sequence key={sc.scene} from={sc.start} durationInFrames={sc.frames + (sc.scene === 11 ? 45 : 0)} layout="none">
              <S shots={sc.shots} />
            </Sequence>
          );
        })}
        <g opacity={m.o}>
          <MoneyMeter amount={m.amount} amountText={m.amountText} bills={m.bills} mode={m.mode} />
        </g>
      </svg>
      {TL.scenes.map((sc) =>
        sc.shots.map((sh) => (
          <Sequence key={sh.id} from={sc.start + sh.start} durationInFrames={sh.dur} layout="none">
            <Headline parts={parts(sh.headline)} size={hSize(sh.headline)} />
          </Sequence>
        )),
      )}
      {TL.scenes.map((sc) => (
        <Sequence key={'sub' + sc.scene} from={sc.start} durationInFrames={sc.frames}>
          <KaraokeSubtitle chunks={estimateChunks(sc.voiceover, sc.frames, 2)} />
        </Sequence>
      ))}
      {(f < T('9.1').a || f >= T('11.1').a) && <Footnote text="ước tính trung bình — DOE/EPA Mỹ" />}
    </Background>
  );
};
