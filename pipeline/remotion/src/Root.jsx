import { Composition } from 'remotion';
import { DEMO_FRAMES, Demo002 } from './Demo002';
import { FPS, H, W } from './theme';
import { VH, VW } from './vertical/layout';
import { Sample003, SAMPLE_FRAMES } from './vertical/Sample003';
import { TL, Video003 } from './v003/Video003';
import { TL as TL_V3, Video003V3 } from './v003v3/Video003V3';
import { Video003V3B } from './v003v3b/Video003V3B';
import { Video003V3C } from './v003v3c/Video003V3C';
import { TL as TL_V31 } from './v003v3c/timeline';
import { Video003V3D } from './v003v3d/Video003V3D';
import { TL as TL_V32 } from './v003v3d/timeline';

export const Root = () => (
  <>
    <Composition id="Demo002" component={Demo002} durationInFrames={DEMO_FRAMES} fps={FPS} width={W} height={H} />
    <Composition id="Sample003" component={Sample003} durationInFrames={SAMPLE_FRAMES} fps={FPS} width={VW} height={VH} defaultProps={{ showSafe: false }} />
    <Composition id="Video003" component={Video003} durationInFrames={TL.total} fps={FPS} width={VW} height={VH} />
    <Composition id="Video003V3" component={Video003V3} durationInFrames={TL_V3.total} fps={FPS} width={VW} height={VH} />
    <Composition id="Video003V3B" component={Video003V3B} durationInFrames={TL_V3.total} fps={FPS} width={VW} height={VH} />
    <Composition id="Video003V3C" component={Video003V3C} durationInFrames={TL_V31.total} fps={FPS} width={VW} height={VH} />
    <Composition id="Video003V3D" component={Video003V3D} durationInFrames={TL_V32.total} fps={FPS} width={VW} height={VH} />
    <Composition id="Video003V32Dang" component={Video003V3D} durationInFrames={TL_V32.total} fps={FPS} width={VW} height={VH} defaultProps={{ episode: 'Tập 1' }} />
  </>
);
