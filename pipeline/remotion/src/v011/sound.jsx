// Lớp hiệu ứng chuyển động của video 011 (giọng đọc nằm ở Video011.jsx; không dùng nhạc nền, không có âm thanh môi trường).
// File: pipeline/sfx-011.js; sổ nguồn: projects/011-phanh-tai-sinh/assets/audio/NGUON-AM-THANH.md. Cue: cues-list.js.
import { Audio, Sequence, staticFile } from 'remotion';
import { CUES, CUES34, CUES35, MASTER } from './cues-list';

export { CUES, CUES34, CUES35, MASTER };

export const SfxLayer = ({ cues = CUES }) =>
  cues.map((c) => (
    <Sequence key={c.id} from={c.frame} name={'sfx ' + c.id}>
      <Audio src={staticFile(c.file)} volume={c.volume} />
    </Sequence>
  ));
