import { Composition, Still } from 'remotion';
import { Cover005, Cover007, Cover008, Cover009, Cover011 } from './cover/covers';
import { TL as TL_008, Video008 } from './v008/Video008';
import { Sample008A, Sample008B, SAMPLE008A_FRAMES, SAMPLE008B_FRAMES } from './v008/Sample008';
import { Sample009A, SAMPLE009A_FRAMES } from './v009/Sample009';
import { Sample011A, SAMPLE011A_FRAMES } from './v011/Sample011';
import { TL as TL_011, TL34 as TL_011_34, TL35 as TL_011_35, Video011, Video011V34, Video011V35 } from './v011/Video011';
import { TL as TL_009, Video009 } from './v009/Video009';
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
import { TL as TL_005, Video005 } from './v005/Video005';
import { Sample005, SAMPLE005_FRAMES } from './v005/Sample005';
import { Sample007, SAMPLE007_FRAMES } from './v007/Sample007';
import { TL as TL_007, Video007 } from './v007/Video007';

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
    <Composition id="Video005" component={Video005} durationInFrames={TL_005.total} fps={FPS} width={VW} height={VH} />
    <Composition id="Video005Dang" component={Video005} durationInFrames={TL_005.total} fps={FPS} width={VW} height={VH} defaultProps={{ episode: '' }} />
    <Composition id="Sample005" component={Sample005} durationInFrames={SAMPLE005_FRAMES} fps={FPS} width={VW} height={VH} defaultProps={{ showSafe: false }} />
    <Composition id="Video007" component={Video007} durationInFrames={TL_007.total} fps={FPS} width={VW} height={VH} />
    <Composition id="Video007Dang" component={Video007} durationInFrames={TL_007.total} fps={FPS} width={VW} height={VH} defaultProps={{ episode: '' }} />
    <Composition id="Sample007"component={Sample007} durationInFrames={SAMPLE007_FRAMES} fps={FPS} width={VW} height={VH} defaultProps={{ showSafe: false, thetaOverride: null }} />
    <Composition id="Video008" component={Video008} durationInFrames={TL_008.total} fps={FPS} width={VW} height={VH} />
    <Composition id="Video008Dang" component={Video008} durationInFrames={TL_008.total} fps={FPS} width={VW} height={VH} defaultProps={{ episode: '' }} />
    <Composition id="Sample008A" component={Sample008A} durationInFrames={SAMPLE008A_FRAMES} fps={FPS} width={VW} height={VH} defaultProps={{ showSafe: false }} />
    <Composition id="Sample008B" component={Sample008B} durationInFrames={SAMPLE008B_FRAMES} fps={FPS} width={VW} height={VH} defaultProps={{ showSafe: false }} />
    <Composition id="Sample009A" component={Sample009A} durationInFrames={SAMPLE009A_FRAMES} fps={FPS} width={VW} height={VH} defaultProps={{ showSafe: false }} />
    <Composition id="Sample011A" component={Sample011A} durationInFrames={SAMPLE011A_FRAMES} fps={FPS} width={VW} height={VH} defaultProps={{ showSafe: false, voice: true }} />
    <Composition id="Video011" component={Video011} durationInFrames={TL_011.total} fps={FPS} width={VW} height={VH} />
    <Composition id="Video011Dang" component={Video011} durationInFrames={TL_011.total} fps={FPS} width={VW} height={VH} defaultProps={{ episode: '' }} />
    <Composition id="Video011V34" component={Video011V34} durationInFrames={TL_011_34.total} fps={FPS} width={VW} height={VH} />
    <Composition id="Video011V35" component={Video011V35} durationInFrames={TL_011_35.total} fps={FPS} width={VW} height={VH} />
    <Composition id="Video011V35Dang" component={Video011V35} durationInFrames={TL_011_35.total} fps={FPS} width={VW} height={VH} defaultProps={{ episode: '' }} />
    <Composition id="Video009" component={Video009} durationInFrames={TL_009.total} fps={FPS} width={VW} height={VH} />
    <Composition id="Video009Dang" component={Video009} durationInFrames={TL_009.total} fps={FPS} width={VW} height={VH} defaultProps={{ episode: '' }} />
    <Still id="Cover005" component={Cover005} width={VW} height={VH} defaultProps={{ showSafe: false }} />
    <Still id="Cover007" component={Cover007} width={VW} height={VH} defaultProps={{ showSafe: false }} />
    <Still id="Cover008" component={Cover008} width={VW} height={VH} defaultProps={{ showSafe: false }} />
    <Still id="Cover009" component={Cover009} width={VW} height={VH} defaultProps={{ showSafe: false }} />
    <Still id="Cover011" component={Cover011} width={VW} height={VH} defaultProps={{ showSafe: false }} />
  </>
);
