import { Composition } from 'remotion';
import { DEMO_FRAMES, Demo002 } from './Demo002';
import { FPS, H, W } from './theme';
import { VH, VW } from './vertical/layout';
import { Sample003, SAMPLE_FRAMES } from './vertical/Sample003';
import { TL, Video003 } from './v003/Video003';

export const Root = () => (
  <>
    <Composition id="Demo002" component={Demo002} durationInFrames={DEMO_FRAMES} fps={FPS} width={W} height={H} />
    <Composition id="Sample003" component={Sample003} durationInFrames={SAMPLE_FRAMES} fps={FPS} width={VW} height={VH} defaultProps={{ showSafe: false }} />
    <Composition id="Video003" component={Video003} durationInFrames={TL.total} fps={FPS} width={VW} height={VH} />
  </>
);
