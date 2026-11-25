import { AbsoluteFill, interpolate, Series, useCurrentFrame } from 'remotion';
import script from '../../../projects/002-phanh-dia/script/script.json';
import { Background } from './components/Background';
import { Scene01Hook } from './scenes/Scene01Hook';
import { Scene12Caliper } from './scenes/Scene12Caliper';
import { C, FONT, FPS } from './theme';

// Demo video 002: Cảnh 1 + Cảnh 12. Audio tạo trên web ElevenLabs (gói free),
// thời lượng đo bằng ffprobe; đổi khi tạo lại audio.
export const AUDIO = {
  1: { file: 'audio/web-v4/scene-01.mp3', seconds: 23.07 },
  12: { file: 'audio/web-v4/scene-12.mp3', seconds: 29.65 },
};
const frames = (n) => Math.ceil(AUDIO[n].seconds * FPS) + 8;
const INTRO = 75;
const GAP = 24;
const END = 150;
export const DEMO_FRAMES = INTRO + frames(1) + GAP + frames(12) + END;

const scene = (n) => script.scenes.find((s) => s.scene === n);

const Card = ({ lines, frames: dur }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 12, dur - 12, dur], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <Background>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: o, fontFamily: FONT, color: C.white, textAlign: 'center' }}>
        {lines.map(([t, s, col], i) => (
          <div key={i} style={{ fontSize: s, fontWeight: i === 0 ? 700 : 400, color: col || (i === 0 ? C.white : C.dim), marginTop: i ? 14 : 0 }}>
            {t}
          </div>
        ))}
      </AbsoluteFill>
    </Background>
  );
};

export const Demo002 = () => (
  <Series>
    <Series.Sequence durationInFrames={INTRO}>
      <Card frames={INTRO} lines={[['PHANH ĐĨA', 96], ['Bản demo · Cảnh 1 và Cảnh 12', 36, C.line]]} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={frames(1)}>
      <Scene01Hook text={scene(1).voiceover} frames={frames(1)} audio={AUDIO[1].file} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={GAP}>
      <Background />
    </Series.Sequence>
    <Series.Sequence durationInFrames={frames(12)}>
      <Scene12Caliper text={scene(12).voiceover} frames={frames(12)} audio={AUDIO[12].file} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={END}>
      <Card
        frames={END}
        lines={[
          ['Bản demo — chưa hoàn chỉnh', 60],
          ['Giọng đọc: Tung Dang · ElevenLabs (gói miễn phí, chỉ dùng thử, không thương mại)', 30],
          ['Hình: animation lập trình (Remotion) · không dùng ảnh/clip AI', 30],
        ]}
      />
    </Series.Sequence>
  </Series>
);
