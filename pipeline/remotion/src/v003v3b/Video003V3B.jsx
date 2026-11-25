// DEMO bản nháp 3, bản hình chỉnh lần 2 — chưa fact-check, chưa qua Cổng #1, không dùng để đăng.
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { C } from '../theme';
import { ease, prog } from '../timing';
import { M, VH, VW } from '../vertical/layout';
import { Footnote, Header, Headline, KaraokeSubtitle } from '../vertical/Text';
import { CoinMeter } from '../v003v3/coins';
import { S1, S2, S3, S4, S5, S6, S7, S8 } from './scenes';
import { TL } from '../v003v3/timeline';

export { TL };
const SCENES = { 1: S1, 2: S2, 3: S3, 4: S4, 5: S5, 6: S6, 7: S7, 8: S8 };
// scene-04.mp3 gốc có tiếng "xịt" bị cắt cụt ở 0,1 s cuối (nghe ở 1:03). Bản -sua chỉ làm tắt đoạn đuôi im lặng,
// giữ nguyên thời lượng nên phụ đề không đổi:
//   ffmpeg -i scene-04.mp3 -af "afade=t=out:st=14.75:d=0.15" -b:a 128k scene-04-sua.mp3
const AUDIO_FIX = { 4: 'audio/v3-v4/scene-04-sua.mp3' };
const hSize = (h) => (h.length > 22 ? 58 : h.length > 18 ? 66 : h.length > 13 ? 76 : 92);
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const ten = (fn) => Array.from({ length: 10 }, (_, i) => fn(i));

// Chuyển mềm khi đổi giữa phần xe xăng và xe điện (cảnh 4→5 và 7→8): hình cũ trượt ra trái và mờ dần,
// hình mới trượt vào từ phải; nền đổi màu bắc qua ranh giới.
const MIX = 15; // frame mỗi phía
const SOFT_IN = [5, 8];
const SOFT_OUT = [4, 7];
function soft(sc, f) {
  const i = SOFT_IN.includes(sc.scene) ? ease(prog(f, sc.start, sc.start + MIX)) : 1;
  const o = SOFT_OUT.includes(sc.scene) ? ease(prog(f, sc.start + sc.frames - MIX, sc.start + sc.frames - 1)) : 0;
  return { opacity: i * (1 - o), x: 120 * (1 - i) - 120 * o };
}

// Trạng thái đồng hồ 10 đồng theo lời đọc (ẩn ở các cảnh xe điện 5–7).
function meter(f) {
  const { T, at, scenes } = TL;
  const s5 = scenes[4].start;
  const s8 = scenes[7].start;
  const o = f < s5 ? interpolate(f, [s5 - MIX, s5 - 1], [1, 0], clamp) : interpolate(f, [s8, s8 + MIX], [0, 1], clamp);
  const two = { caption: 'khoảng 2 tới bánh xe', color: '#FFD23F' };
  const split = (rest) => ten((i) => (i < 2 ? 'glow' : rest(i)));

  if (f >= s8) {
    if (f >= T('8.3').a) return { o, ...two, states: split(() => 'heat') };
    if (f >= T('8.2').a) return { o, ...two, states: split(() => 'dim') };
    return { o, caption: '', states: ten(() => 'on') };
  }
  if (f < T('1.2').a) {
    const n = Math.floor(interpolate(f, [4, T('1.2').a - 6], [0, 10], clamp));
    return { o, caption: '', states: ten((i) => (i < n ? 'on' : 'none')) };
  }
  if (f < T('1.3').a) return { o, caption: '', states: ten(() => 'on') };
  if (f < T('2.1').a) return { o, ...two, states: split(() => 'dim') };
  if (f < T('3.1').a) {
    // phần lớn phần mất đi nằm ở động cơ, dưới dạng nhiệt
    const heated = f >= at(2, 'Nhiều nhiệt thoát');
    return { o, caption: 'phần lớn mất ở động cơ', color: M.heat, states: split(() => (heated ? 'heat' : 'dim')) };
  }
  if (f < T('3.4').a) return { o, caption: 'còn hao ở đâu nữa?', color: C.white, states: split((i) => (i < 8 ? 'heat' : 'dim')) };
  return { o, ...two, states: split((i) => (i < 8 ? 'heat' : 'dim')) };
}

export const Video003V3B = () => {
  const f = useCurrentFrame();
  const m = meter(f);
  const s5 = TL.scenes[4].start;
  const s8 = TL.scenes[7].start;
  const evBg = interpolate(f, [s5 - MIX, s5 + MIX, s8 - MIX, s8 + MIX], [0, 1, 1, 0], clamp);
  const sceneNo = TL.scenes.filter((s) => f >= s.start).length;
  return (
    <Background>
      <AbsoluteFill style={{ backgroundColor: '#08182A', opacity: 0.8 * evBg }} />
      <Header series="Xăng hay Điện" episode="DEMO v3 · chưa duyệt" />
      <svg width={VW} height={VH} style={{ position: 'absolute' }}>
        {TL.scenes.map((sc) => {
          const S = SCENES[sc.scene];
          const t = soft(sc, f);
          return (
            <g key={sc.scene} opacity={t.opacity} transform={`translate(${t.x},0)`}>
              <Sequence from={sc.start} durationInFrames={sc.frames} layout="none">
                <S shots={sc.shots} />
              </Sequence>
            </g>
          );
        })}
        <CoinMeter states={m.states} caption={m.caption} captionColor={m.color} o={m.o} />
      </svg>
      {TL.scenes.map((sc) => {
        const t = soft(sc, f);
        return (
          <AbsoluteFill key={'h' + sc.scene} style={{ opacity: t.opacity, transform: `translateX(${t.x}px)` }}>
            {sc.shots.map((sh) => (
              <Sequence key={sh.id} from={sc.start + sh.start} durationInFrames={sh.dur} layout="none">
                <Headline parts={[{ t: sh.headline }]} size={hSize(sh.headline)} />
              </Sequence>
            ))}
          </AbsoluteFill>
        );
      })}
      {TL.scenes.map((sc) => (
        <Sequence key={'a' + sc.scene} from={sc.start + sc.audioFrom} durationInFrames={sc.frames - sc.audioFrom}>
          <Audio src={staticFile(AUDIO_FIX[sc.scene] || sc.audio)} />
        </Sequence>
      ))}
      {TL.scenes.map((sc) => (
        <Sequence key={'sub' + sc.scene} from={sc.start} durationInFrames={sc.frames}>
          <KaraokeSubtitle chunks={sc.chunks} />
        </Sequence>
      ))}
      {(sceneNo <= 4 || sceneNo === 8) && (
        <AbsoluteFill style={{ opacity: m.o }}>
          <Footnote text="Ước tính trung bình — DOE/EPA Mỹ" />
        </AbsoluteFill>
      )}
    </Background>
  );
};
