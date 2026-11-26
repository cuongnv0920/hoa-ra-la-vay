// 37 shot của video 005, theo assets/storyboard.md. Mỗi shot nhận: f (frame trong shot), p (0..1), d (độ dài), at(cụm).
import { interpolate, interpolateColors } from 'remotion';
import { C } from '../theme';
import { ease, prog } from '../timing';
import { T } from '../v003/parts';
import { EngineBlock } from '../vertical/EngineBlock';
import { JOIN, M, SNAP, TOGGLE } from './cues';
import { EngineSection, GDI, Injector, INTAKE_SEAT, NOZZLE_GDI, NOZZLE_PFI, PFI } from './EngineSection';
import { AirArrows, appear, Card, crownAt, cycle, GdiSpray, GOLD, HPPump, Hourglass, InjectorTip, lerp, LoadDial, Mixing, PfiSpray, rnd, Soot, Tag, Thermo, view, Zoom } from './fx';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const SOOT_GREY = '#8b8f98';

// Kỳ nạp quét một lần trong shot: pít-tông đi xuống, xu-páp nạp mở.
const intake = (p, a = 20, b = 150) => {
  const theta = lerp(a, b, ease(p));
  return { theta, intakeLift: 38 * Math.sin((Math.PI * theta) / 180), crown: crownAt(theta) };
};

const pfiTag = (o = 1) => <Tag x={420} y={586} to={[236, 582]} text="kim gián tiếp" c={PFI} o={o} />;
const gdiTag = (text = 'kim trực tiếp', o = 1) => <Tag x={190} y={950} to={[252, 806]} text={text} c={GDI} o={o} />;

const Arrow = ({ x, y1, y2, c = C.white }) => {
  const s = y2 > y1 ? 1 : -1;
  return <path d={`M ${x} ${y1} L ${x} ${y2} M ${x - 24} ${y2 - 28 * s} L ${x} ${y2} L ${x + 24} ${y2 - 28 * s}`} fill="none" stroke={c} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />;
};

// Mặt cắt thu nhỏ đặt tại (x, y)
const Mini = ({ x, y, s, children }) => <g transform={`translate(${x},${y}) scale(${s}) translate(-540,-935)`}>{children}</g>;

// ---------- Cảnh 1 ----------
const s11 = ({ f, p }) => {
  const k = appear(f, Math.round(0.3 * 150), 20);
  const c = cycle(300 + f * 6);
  return (
    <g>
      {k < 1 && (
        <g opacity={1 - k}>
          <EngineBlock cx={540} cy={940} s={1 + 0.35 * p * 2} t={f} label={false} />
        </g>
      )}
      <g opacity={k}>
        <EngineSection {...c} pfi={false} gdi={false} chamber={c.ph >= 360 && c.ph < 480 ? interpolateColors(c.ph, [360, 480], ['#ff6a2a', '#12335a']) : '#12335a'} />
        <Tag x={850} y={1010} to={[700, 980]} text="xi-lanh" />
      </g>
    </g>
  );
};

const s12 = ({ f, at }) => {
  const k = appear(f, M.inj12(), SNAP);
  const c = cycle(f * 6);
  return (
    <g>
      <EngineSection {...c} pfi={false} gdi={false} />
      <Injector x={NOZZLE_PFI.x - 60 * (1 - k)} y={NOZZLE_PFI.y - 66 * (1 - k)} angle={NOZZLE_PFI.angle} color="#e8edf5" o={k} />
      <Tag x={420} y={586} to={[236, 582]} text="kim phun" o={appear(f, at('một kim phun'), 8)} />
    </g>
  );
};

const s13 = ({ f, at }) => {
  const a = appear(f, M.inj13a(), SNAP);
  const b = appear(f, M.inj13b(at), SNAP);
  const c = cycle(f * 6);
  return (
    <g>
      <EngineSection {...c} pfi={false} gdi={false} />
      <Injector x={NOZZLE_PFI.x - 50 * (1 - a)} y={NOZZLE_PFI.y - 55 * (1 - a)} angle={NOZZLE_PFI.angle} color={PFI} o={a} />
      <Injector x={NOZZLE_GDI.x - 90 * (1 - b)} y={NOZZLE_GDI.y - 30 * (1 - b)} angle={NOZZLE_GDI.angle} color={GDI} o={b} />
      <Tag x={440} y={586} to={[236, 582]} text="vào đường dẫn khí" c={PFI} o={a} />
      <Tag x={220} y={950} to={[252, 806]} text="thẳng vào xi-lanh" c={GDI} s={30} o={b} />
    </g>
  );
};

const s14 = ({ f }) => (
  <g>
    <EngineSection theta={90} intakeLift={0} pfiOn gdiOn />
    {pfiTag()}
    {gdiTag()}
    <T x={850} y={1150} s={190 + 16 * Math.sin(f / 5)} c={GOLD} w={800}>
      ?
    </T>
  </g>
);

// ---------- Cảnh 2: phun gián tiếp ----------
const s21 = ({ f }) => (
  <g>
    <Zoom cx={330} cy={730} s={1.55}>
      <EngineSection theta={90} intakeLift={0} gdi={false}>
        <PfiSpray f={f} open={false} n={50} o={appear(f, M.spray21(), 4)} />
      </EngineSection>
      <AirArrows f={f} />
      <AirArrows f={f + 17} x={200} y={690} />
    </Zoom>
    <Tag x={760} y={690} to={view(330, 730, 1.55)(270, 622)} text="phun gián tiếp" c={PFI} />
    <Tag x={260} y={1120} to={view(330, 730, 1.55)(190, 690)} text="đường nạp" />
  </g>
);

const s22 = ({ f }) => {
  const v = view(440, 790, 2);
  return (
    <g>
      <Zoom cx={440} cy={790} s={2}>
        <EngineSection theta={0} gdi={false}>
          <PfiSpray f={f} open={false} />
        </EngineSection>
        <circle cx={INTAKE_SEAT.x} cy={INTAKE_SEAT.y} r={70 + 5 * Math.sin(f / 4)} fill="none" stroke={GOLD} strokeWidth="4" />
      </Zoom>
      <Tag x={780} y={760} to={v(468, 822)} text="xu-páp nạp" c={GOLD} />
      <Tag x={780} y={830} text="đang đóng" s={28} />
    </g>
  );
};

// Đúng khung mẫu đã duyệt (shot 2.3)
const s23 = ({ f, p }) => {
  const i = intake(p, 25, 145);
  const lift = 38 * Math.sin(Math.PI * Math.min(1, 0.15 + 0.7 * ease(p)));
  return (
    <g>
      <EngineSection theta={i.theta} intakeLift={lift}>
        <PfiSpray f={f} crown={i.crown} />
      </EngineSection>
      <AirArrows f={f} />
      <Arrow x={790} y1={960} y2={1070} />
      {pfiTag()}
      <Tag x={720} y={590} to={[452, 786]} text="xu-páp nạp: mở" />
      {gdiTag()}
      <Tag x={190} y={1004} text="đang nghỉ" c={GDI} s={26} />
      <Tag x={830} y={1120} text="kỳ nạp" s={30} />
    </g>
  );
};

const s24 = ({ p }) => {
  const theta = lerp(180, 300, ease(p));
  return (
    <g>
      <EngineSection theta={theta}>
        <Mixing f={p * 90} crown={crownAt(theta)} even={ease(prog(p, 0, 0.8))} />
      </EngineSection>
      <Hourglass x={850} y={1080} left={1 - 0.5 * p} label="thời gian" />
      <Tag x={720} y={590} to={[560, 900]} text="xăng hòa với gió" c={PFI} />
      <Tag x={190} y={1004} text="trước khi cháy" s={28} />
    </g>
  );
};

// ---------- Cảnh 3: phun trực tiếp ----------
const s31 = ({ f, p, at }) => {
  const on = appear(f, M.spray31(), 4);
  const i = intake(p);
  return (
    <g>
      <EngineSection theta={i.theta} intakeLift={i.intakeLift} pfiOn={false} gdiOn>
        <GdiSpray f={f} crown={i.crown} o={on} />
      </EngineSection>
      <AirArrows f={f} />
      {gdiTag('phun trực tiếp')}
      <Tag x={220} y={1030} text="áp suất rất cao" c={GDI} s={30} o={appear(f, at('với áp suất'))} />
      <Tag x={830} y={1120} text="kỳ nạp" s={30} />
    </g>
  );
};

const cooling = (k) => interpolateColors(k, [0, 1], ['#6b3320', '#0f4a7a']);

const s32 = ({ f, p, at }) => {
  const i = intake(p, 90, 160);
  return (
    <g>
      <EngineSection theta={i.theta} intakeLift={i.intakeLift} pfiOn={false} gdiOn chamber={cooling(ease(prog(p, 0.1, 0.8)))}>
        <GdiSpray f={f} crown={i.crown} fade={ease(prog(p, 0, 0.5))} />
      </EngineSection>
      <Tag x={720} y={590} to={[560, 900]} text="bay hơi, lấy bớt nhiệt" c={PFI} />
      <g opacity={appear(f, at('Giống như cồn'))}>
        <Card x={210} y={1130} w={300} h={190} c={C.white}>
          <path d="M -90 28 Q -30 -7 50 18 Q 100 28 100 43 L -90 50 Z" fill="#c99a7a" />
          <path d="M 0 -50 Q 22 -16 0 -6 Q -22 -16 0 -50 Z" fill={PFI} />
          <T x={0} y={-62} s={28}>
            cồn bay hơi
          </T>
          <T x={0} y={80} s={28}>
            thấy mát
          </T>
        </Card>
      </g>
    </g>
  );
};

const s33 = ({ f, p }) => (
  <g>
    <EngineSection theta={165} intakeLift={6} pfiOn={false} chamber="#0f4a7a">
      <Mixing f={f} crown={crownAt(165)} color="#8fd8ff" r={6} />
    </EngineSection>
    <Thermo x={850} y={1060} v={lerp(0.85, 0.4, ease(p))} />
    <Tag x={720} y={590} text="khí mát hơn" c={PFI} />
    <Tag x={200} y={1100} text="kích nổ" c={C.heat} s={40} o={1 - 0.75 * ease(p)} />
    <Tag x={200} y={1170} text="khó xảy ra hơn" s={28} o={appear(f, 30)} />
  </g>
);

// Kích nổ: hai xu-páp đóng, pít-tông sát đỉnh; màng lửa lan từ bugi, phần khí chưa cháy ở xa tự bùng.
const s34 = ({ f, d, at }) => {
  const knock = M.knock34(at, d);
  const r = interpolate(f, [8, knock, d], [0, 112, 150], clamp);
  const b = appear(f, knock, 6);
  const shake = f >= knock && f < knock + 14 ? 5 * Math.sin(f * 2.6) : 0;
  const crown = crownAt(0);
  const v = view(540, 835, 2.5);
  const endGas = [[690, 858], [388, 858]];
  return (
    <g>
      <g transform={`translate(${shake},0)`}>
        <Zoom cx={540} cy={835} s={2.5}>
          <EngineSection theta={0} pfi={false} chamber="#12335a">
            <clipPath id="room005">
              <path d={`M 360 ${crown} L 360 860 L 540 780 L 720 860 L 720 ${crown} Z`} />
            </clipPath>
            <g clipPath="url(#room005)">
              {f >= 8 && <circle cx={540} cy={808} r={r} fill="#ff8a2a" opacity="0.85" stroke="#FFD23F" strokeWidth="5" />}
              {endGas.map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r={30 * (1 - b) + 4} fill={PFI} opacity={0.5 * (1 - b)} />
                  {b > 0 && <circle cx={x} cy={y} r={34 * b * (1 + 0.12 * Math.sin(f + i))} fill="#ff2a2a" stroke="#FFD23F" strokeWidth="4" />}
                  {b > 0 && <circle cx={x} cy={y} r={((f - knock) * 5 + i * 14) % 90} fill="none" stroke={C.white} strokeWidth="2.5" opacity="0.7" />}
                </g>
              ))}
            </g>
          </EngineSection>
          {f >= 4 && f < 22 && <circle cx={540} cy={806} r={8 + 3 * Math.sin(f)} fill="#FFD23F" />}
        </Zoom>
      </g>
      <Tag x={820} y={650} to={v(540, 800)} text="bugi đánh lửa" />
      <Tag x={300} y={1130} to={v(500, 860)} text="màng lửa đang lan" c={GOLD} o={appear(f, 12) * (1 - b)} />
      <Tag x={620} y={1210} to={v(690, 862)} text="phần chưa cháy tự bùng" c={C.heat} o={b} />
      <Tag x={220} y={650} text="hai van đóng" s={28} />
      <Tag x={820} y={1270} text="quay chậm" s={26} />
    </g>
  );
};

const s35 = ({ f, p }) => {
  const theta = lerp(180, 352, ease(prog(p, 0, 0.85)));
  const k = ease(prog(p, 0, 0.85));
  return (
    <g>
      <EngineSection theta={theta} pfi={false} chamber={interpolateColors(k, [0, 1], ['#0f4a7a', '#3d7fb8'])}>
        <Mixing f={f} crown={crownAt(theta)} color="#bfe9ff" r={6} />
      </EngineSection>
      <Arrow x={800} y1={1150} y2={1000} c={GOLD} />
      <Tag x={720} y={590} text="nén mạnh hơn" />
      <Tag x={800} y={1200} text="hiệu quả hơn" c={GOLD} s={30} o={appear(f, 30)} />
    </g>
  );
};

// ---------- Cảnh 4: cái giá của phun trực tiếp (chỉ có kim trực tiếp) ----------
const s41 = ({ f, p }) => {
  const i = intake(p, 60, 130);
  return (
    <g>
      <EngineSection theta={i.theta} intakeLift={i.intakeLift} pfi={false} gdiOn>
        <GdiSpray f={f} crown={i.crown} />
      </EngineSection>
      <Hourglass x={850} y={1080} left={0.18 * (1 - p)} label="ít thời gian" />
      {gdiTag('phun trực tiếp')}
    </g>
  );
};

const Splats = ({ crown, o = 1, color = GDI }) => (
  <g opacity={o}>
    {[450, 505, 575].map((x, i) => (
      <ellipse key={x} cx={x} cy={crown + 3} rx={26 - i * 3} ry={9} fill={color} stroke={C.white} strokeWidth="2" />
    ))}
    {[920, 965].map((y) => (
      <ellipse key={y} cx={715} cy={Math.min(y, crown - 14)} rx={8} ry={20} fill={color} stroke={C.white} strokeWidth="2" />
    ))}
  </g>
);

const s42 = ({ f, p, at }) => {
  const i = intake(p, 45, 80);
  const hit = appear(f, M.splat42(at), 14);
  return (
    <g>
      <EngineSection theta={i.theta} intakeLift={i.intakeLift} pfi={false} gdiOn pistonGlow={1 - 0.5 * hit}>
        <GdiSpray f={f} crown={i.crown} n={110} />
        <Splats crown={i.crown} o={hit} />
      </EngineSection>
      <Tag x={830} y={1130} to={[690, i.crown + 50]} text="pít-tông" c={GOLD} />
      <Tag x={720} y={590} to={[712, 930]} text="xăng chạm thành" c={GDI} o={hit} />
    </g>
  );
};

const s43 = ({ f, p }) => {
  const theta = lerp(20, 75, ease(p));
  const crown = crownAt(theta);
  const burn = ease(prog(p, 0, 0.35));
  return (
    <g>
      <EngineSection theta={theta} pfi={false} chamber={interpolateColors(ease(prog(p, 0, 0.5)), [0, 0.5, 1], ['#12335a', '#b8501f', '#3a2a33'])}>
        <Splats crown={crown} color={interpolateColors(burn, [0, 1], [GDI, '#3b342e'])} />
        <Soot f={f} count={26 * ease(prog(p, 0.2, 0.9))} x={540} y={(crown + 850) / 2} w={300} h={Math.max(20, crown - 870)} />
      </EngineSection>
      <Tag x={720} y={590} to={[575, crown + 3]} text="cháy không hết" />
      <Tag x={850} y={1120} text="hạt muội" c={SOOT_GREY} o={appear(f, 24)} />
    </g>
  );
};

const intakeZoom = (children, extra) => (
  <g>
    <Zoom cx={440} cy={790} s={2}>
      <EngineSection theta={90} {...extra} />
      {children}
    </Zoom>
  </g>
);

const PortAir = ({ f }) => (
  <g>
    {Array.from({ length: 16 }, (_, i) => {
      const p = (f * 0.016 + i / 16) % 1;
      const x = p < 0.75 ? 250 + (p / 0.75) * 205 : 455 + (p - 0.75) * 260;
      const y = p < 0.75 ? 668 + Math.pow(p / 0.75, 2) * 145 + (rnd(i, 1) - 0.5) * 40 : 813 + (p - 0.75) * 250;
      return <path key={i} d="M -9 -6 L 0 0 L -9 6" transform={`translate(${x},${y}) rotate(${30 * p + 8})`} fill="none" stroke={C.white} strokeWidth="3.5" strokeLinecap="round" opacity={0.8 * Math.sin(Math.PI * p)} />;
    })}
  </g>
);

const s44 = ({ f }) => (
  <g>
    {intakeZoom(<PortAir f={f} />, { intakeLift: 36, pfi: false })}
    <Tag x={780} y={700} text="chỉ có không khí" />
    <Tag x={780} y={770} text="không có xăng rửa" c={GDI} s={28} o={appear(f, 30)} />
    <Tag x={290} y={1200} to={view(440, 790, 2)(448, 826)} text="xu-páp nạp" />
  </g>
);

// Hạt từ hơi dầu và khí thải hồi theo đường nạp tới lưng xu-páp
const CrudFlow = ({ f }) => (
  <g>
    {Array.from({ length: 22 }, (_, i) => {
      const p = (f * 0.012 + i / 22) % 1;
      const x = 270 + p * (160 + 30 * rnd(i, 2));
      const y = 670 + p * p * 120 + (rnd(i, 1) - 0.5) * 36;
      return <circle key={i} cx={x} cy={y} r={3 + 3 * rnd(i, 3)} fill={i % 2 ? '#9c8a70' : SOOT_GREY} opacity={0.95 - 0.5 * p} />;
    })}
  </g>
);

const s45 = ({ f, p }) => (
  <g>
    {intakeZoom(<CrudFlow f={f} />, { pfi: false, deposit: ease(prog(p, 0, 0.9)) })}
    <Tag x={760} y={690} text="hơi dầu + khí thải" />
    <Tag x={780} y={900} to={view(440, 790, 2)(440, 790)} text="cặn bám dần" c="#c9b391" />
    <Tag x={260} y={1200} text="theo thời gian" s={28} />
  </g>
);

const s46 = ({ f }) => {
  const k = appear(f, 6, 40);
  return (
    <g>
      {[
        [-1, PFI, 'gián tiếp', NOZZLE_PFI],
        [1, GDI, 'trực tiếp', NOZZLE_GDI],
      ].map(([side, c, name]) => (
        <Card key={name} x={540 + side * lerp(250, 185, k)} y={880} w={340} h={380} c={c}>
          <g transform="translate(0,20) rotate(60)">
            <Injector x={80} y={0} angle={0} color={c} len={170} />
          </g>
          <T x={0} y={160} s={36} c={c}>
            {name}
          </T>
        </Card>
      ))}
      <T x={540} y={1230} s={170 + 14 * Math.sin(f / 5)} c={GOLD} w={800}>
        ?
      </T>
    </g>
  );
};

// ---------- Cảnh 5: ví dụ Audi ----------
const s51 = ({ f, at }) => (
  <g opacity={appear(f, 0, 14)}>
    <Card x={540} y={930} w={860} h={400} c={C.white}>
      <T x={0} y={-90} s={34} c={C.dim} w={400}>
        ví dụ trong video này
      </T>
      <T x={0} y={0} s={62} w={800}>
        Audi EA888 thế hệ 3
      </T>
      <T x={0} y={74} s={40} c={GOLD}>
        bản có phun kép
      </T>
      <g opacity={appear(f, at('ở bản có hai kim'))}>
        <circle cx={-50} cy={138} r={20} fill={PFI} />
        <circle cx={50} cy={138} r={20} fill={GDI} />
      </g>
    </Card>
  </g>
);

// Cơ cấu nạp chạy với kim gián tiếp (Cảnh 5)
const portRun = ({ f, p, children, soot = 0, dial = 0.3 }) => {
  const i = intake(p, 30, 140);
  return (
    <g>
      <EngineSection theta={i.theta} intakeLift={i.intakeLift} gdiOn={false}>
        <PfiSpray f={f} crown={i.crown} />
        {soot > 0 && <Soot f={f} count={soot} x={540} y={(i.crown + 860) / 2} w={300} h={Math.max(30, i.crown - 880)} />}
      </EngineSection>
      <AirArrows f={f} />
      {dial !== null && <LoadDial cx={830} cy={1180} v={dial} />}
      {children}
    </g>
  );
};

const s52 = ({ f, p, at }) =>
  portRun({
    f,
    p,
    dial: lerp(0.15, 0.42, ease(prog(p, 0.2, 0.9))),
    children: (
      <g>
        <Tag x={200} y={1100} text="máy đã ấm" c={C.heat} />
        <Tag x={200} y={1170} text="ga nhẹ hoặc vừa" s={28} o={appear(f, at('bạn đi ga'))} />
        {pfiTag(appear(f, at('Lúc này kim gián tiếp')))}
        {gdiTag('kim trực tiếp: nghỉ')}
      </g>
    ),
  });

const s53 = ({ f, p, d }) => (
  <g>
    <EngineSection theta={230} gdiOn={false}>
      <Mixing f={f} crown={crownAt(230)} r={5} />
      <Soot f={f} count={interpolate(f, [8, d - 10], [24, 7], clamp)} x={540} y={(crownAt(230) + 850) / 2} w={290} h={Math.max(30, crownAt(230) - 875)} />
    </EngineSection>
    <Tag x={720} y={590} text="trộn đều hơn" c={PFI} />
    <Tag x={810} y={1120} text="ít hạt muội hơn" c={SOOT_GREY} o={appear(f, Math.round(p * 0 + 20))} />
  </g>
);

const s54 = ({ f }) => <HPPump f={f} effort={1} />;
const s55 = ({ f, p }) => (
  <g>
    <HPPump f={f} effort={lerp(1, 0.2, ease(prog(p, 0.1, 0.7)))} />
    <Tag x={700} y={590} text="đang dùng kim gián tiếp" c={PFI} s={30} />
    <Tag x={760} y={690} text="đỡ tốn sức máy" c={GOLD} o={appear(f, 30)} />
  </g>
);

const s56 = ({ f, p }) => (
  <g>
    {intakeZoom(null, { intakeLift: 36, gdi: false, deposit: lerp(1, 0.45, ease(prog(p, 0.15, 0.95))), children: <PfiSpray f={f * 1.4} n={90} /> })}
    <Tag x={760} y={690} text="xăng đi qua xu-páp" c={PFI} />
    <Tag x={760} y={900} text="rửa bớt cặn" c="#c9b391" o={appear(f, 24)} />
  </g>
);

const s57 = ({ f, at }) => (
  <g>
    <g opacity={appear(f, at('vừa đỡ tốn xăng'))}>
      <Card x={540} y={780} w={700} h={170} c={PFI}>
        <T x={0} y={22} s={60} w={800}>
          đỡ tốn xăng
        </T>
      </Card>
    </g>
    <g opacity={appear(f, at('vừa giảm hạt muội'))}>
      <Card x={540} y={1000} w={700} h={170} c={SOOT_GREY}>
        <T x={0} y={22} s={60} w={800}>
          giảm hạt muội
        </T>
      </Card>
    </g>
    <T x={540} y={1180} s={34} c={C.dim} w={400}>
      theo Audi
    </T>
  </g>
);

const s58 = ({ f }) => {
  const k = appear(f, 4, 14);
  return (
    <g opacity={k}>
      <g transform={`translate(540,900) rotate(-4) scale(${1.25 - 0.25 * k})`}>
        <rect x={-390} y={-190} width={780} height={380} rx={24} fill="rgba(5,9,18,0.7)" stroke={C.heat} strokeWidth="10" />
        <T x={0} y={-80} s={52} c={C.heat} w={800}>
          CHÂU ÂU
        </T>
        <T x={0} y={20} s={62} w={800}>
          giới hạn SỐ hạt
        </T>
        <T x={0} y={110} s={36} c={C.dim} w={400}>
          xe phun trực tiếp
        </T>
      </g>
    </g>
  );
};

// ---------- Cảnh 6: lúc nào dùng kim trực tiếp ----------
const s61 = ({ f }) => (
  <g>
    <g transform="translate(540,900) rotate(20)">
      <Injector x={230 + 6 * Math.sin(f / 8)} y={0} angle={0} color={GDI} len={420} />
    </g>
    <Tag x={540} y={1150} text="kim trực tiếp" c={GDI} s={44} />
    <T x={820} y={800} s={200} c={GOLD} w={800}>
      ?
    </T>
  </g>
);

const diRun = ({ f, p, children, chamber }) => {
  const i = intake(p, 30, 145);
  return (
    <g>
      <EngineSection theta={i.theta} intakeLift={i.intakeLift} pfiOn={false} gdiOn chamber={chamber}>
        <GdiSpray f={f} crown={i.crown} />
      </EngineSection>
      <AirArrows f={f} />
      {children}
    </g>
  );
};
const cases = (a, b, c) => (
  <g>
    <Tag x={220} y={1100} text="khởi động" c={GDI} o={a} />
    <Tag x={220} y={1170} text="máy lạnh" c={PFI} o={b} />
    <Tag x={220} y={1240} text="cần nhiều sức" c={C.heat} o={c} />
  </g>
);

const s62 = ({ f, p, at }) =>
  diRun({
    f,
    p,
    children: (
      <g>
        {cases(appear(f, M.card62(at)), appear(f, at('lúc máy còn lạnh')), 0)}
        {gdiTag()}
      </g>
    ),
  });

const s63 = ({ f, p }) =>
  diRun({
    f,
    p,
    children: (
      <g>
        {cases(0.45, 0.45, appear(f, 8))}
        <LoadDial cx={830} cy={1180} v={lerp(0.35, 0.9, ease(prog(p, 0.1, 0.7)))} />
        {gdiTag()}
      </g>
    ),
  });

const s64 = ({ f, p, at }) =>
  diRun({
    f,
    p,
    chamber: cooling(ease(prog(p, 0.1, 0.7))),
    children: (
      <g>
        <Tag x={720} y={590} to={[560, 900]} text="bay hơi làm mát" c={PFI} />
        <Tag x={230} y={1170} text="giảm nguy cơ kích nổ" c={C.heat} s={30} o={appear(f, at('giảm nguy cơ'))} />
      </g>
    ),
  });

// Phun lại là để NGĂN đóng cặn thêm (S1): không vẽ cặn bong đi.
const CRUD_MAX = 0.65;
const s65 = ({ f, p, at }) => (
  <g>
    <g transform="translate(450,900) scale(1.3) translate(-450,-930)">
      <InjectorTip f={f} crud={ease(prog(f, at('Nếu nghỉ quá lâu'), at('Nếu nghỉ quá lâu') + 70)) * CRUD_MAX} />
    </g>
    <Tag x={540} y={640} text="kim gián tiếp đang làm việc" c={PFI} s={30} />
    <Tag x={310} y={1120} text="kim trực tiếp đang nghỉ" c={GDI} s={30} />
    <Tag x={760} y={1160} to={[665, 955]} text="cặn cứng" c="#c9b391" o={appear(f, at('đầu kim dễ bám'))} />
    <Tag x={760} y={740} text="theo thời gian" s={28} o={p} />
  </g>
);

const s66 = ({ f, at }) => {
  const a = M.flush66(at);
  const on = f >= a && f < a + 40 ? 1 : 0;
  return (
    <g>
      <g transform="translate(450,900) scale(1.3) translate(-450,-930)">
        <InjectorTip f={f} crud={CRUD_MAX} spray={on} />
      </g>
      <Tag x={420} y={1160} text="phun một chút" c={GDI} o={appear(f, a)} />
      <Tag x={540} y={640} text="để hạn chế đóng thêm cặn" s={30} o={appear(f, a + 20)} />
    </g>
  );
};

// ---------- Cảnh 7: kết ----------
const s71 = ({ f, p }) => {
  const i = intake(p, 30, 120);
  return (
    <g>
      <EngineSection theta={i.theta} intakeLift={i.intakeLift} pfiOn gdiOn>
        <PfiSpray f={f} crown={i.crown} n={45} />
        <GdiSpray f={f} crown={i.crown} n={45} />
      </EngineSection>
      {pfiTag()}
      {gdiTag()}
      <Card x={540} y={1215} w={700} h={140} c={C.white}>
        <T x={0} y={-8} s={38} w={800}>
          ví dụ: Toyota 2GR-FSE
        </T>
        <T x={0} y={44} s={30} c={C.dim} w={400}>
          lúc khởi động lạnh: cả hai cùng phun
        </T>
      </Card>
    </g>
  );
};

const s72 = ({ f }) => {
  const c = cycle(f * 7);
  return (
    <g>
      <Mini x={285} y={930} s={0.52}>
        <EngineSection {...c} pfi={false} gdiOn />
      </Mini>
      <Mini x={735} y={930} s={0.52}>
        <EngineSection {...c} pfiOn gdiOn />
      </Mini>
      <Tag x={285} y={1220} text="một kim" c={GDI} />
      <Tag x={735} y={1220} text="hai kim" c={PFI} />
      <Tag x={540} y={640} text="đều chạy được" />
    </g>
  );
};

const s73 = ({ f, at }) => {
  const k = appear(f, M.join73(at), JOIN);
  const g = lerp(110, 0, k);
  return (
    <g>
      <path transform={`translate(${-g},0)`} d="M 150 760 L 540 760 L 540 860 C 640 840 640 1000 540 980 L 540 1100 L 150 1100 Z" fill={PFI} stroke={C.white} strokeWidth="6" />
      <path transform={`translate(${g},0)`} d="M 930 760 L 540 760 L 540 860 C 640 840 640 1000 540 980 L 540 1100 L 930 1100 Z" fill={GDI} stroke={C.white} strokeWidth="6" />
      <T x={340 - g} y={945} s={46} c={C.navy} w={800}>
        gián tiếp
      </T>
      <T x={760 + g} y={945} s={46} c={C.navy} w={800}>
        trực tiếp
      </T>
      <Tag x={540} y={1200} text="bù chỗ yếu cho nhau" c={GOLD} s={36} o={k} />
    </g>
  );
};

const s74 = ({ f, at }) => {
  const left = Math.floor(f / TOGGLE) % 2 === 0;
  return (
    <g>
      <Card x={540} y={720} w={420} h={170} c={C.white}>
        <T x={0} y={18} s={52} w={800}>
          máy tính
        </T>
      </Card>
      <path d="M 450 810 L 280 940" fill="none" stroke={PFI} strokeWidth={left ? 16 : 5} opacity={left ? 1 : 0.35} />
      <path d="M 630 810 L 800 940" fill="none" stroke={GDI} strokeWidth={left ? 5 : 16} opacity={left ? 0.35 : 1} />
      {[
        [280, PFI, 'gián tiếp', left],
        [800, GDI, 'trực tiếp', !left],
      ].map(([x, c, n, on]) => (
        <g key={n} opacity={on ? 1 : 0.4}>
          <g transform={`translate(${x},1030) rotate(90)`}>
            <Injector x={75} y={0} angle={0} color={c} len={160} />
          </g>
          <T x={x} y={1160} s={34} c={c}>
            {n}
          </T>
        </g>
      ))}
      <T x={540} y={1270} s={62} c={GOLD} w={800} o={appear(f, at('đúng lúc'), 12)}>
        Hóa Ra Là Vậy
      </T>
    </g>
  );
};

export const SHOTS = {
  1.1: s11, 1.2: s12, 1.3: s13, 1.4: s14,
  2.1: s21, 2.2: s22, 2.3: s23, 2.4: s24,
  3.1: s31, 3.2: s32, 3.3: s33, 3.4: s34, 3.5: s35,
  4.1: s41, 4.2: s42, 4.3: s43, 4.4: s44, 4.5: s45, 4.6: s46,
  5.1: s51, 5.2: s52, 5.3: s53, 5.4: s54, 5.5: s55, 5.6: s56, 5.7: s57, 5.8: s58,
  6.1: s61, 6.2: s62, 6.3: s63, 6.4: s64, 6.5: s65, 6.6: s66,
  7.1: s71, 7.2: s72, 7.3: s73, 7.4: s74,
};
