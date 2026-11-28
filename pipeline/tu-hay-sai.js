// Sổ từ giọng đọc hay sai (brand/tu-hay-sai.json) và trang nghe từng câu. Dùng bởi pipeline/giong.js.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SO = path.join(ROOT, 'brand', 'tu-hay-sai.json');

const tach = (s) => s.normalize('NFC').toLowerCase().replace(/\([^)]*\)/g, ' ').split(/[^\p{L}\p{N}]+/u).filter(Boolean);
const boDau = (w) => w.normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd');
const docSo = () => (fs.existsSync(SO) ? JSON.parse(fs.readFileSync(SO, 'utf8')) : { ghi_chu: 'Từ giọng đọc từng sai, do người nghe báo. Cập nhật bằng: node pipeline/giong.js nhap <file> --model <model>', tu: [] });

// So cụm "nghe thành" với câu gốc, tìm các chữ bị đọc lệch. Trả về [] nếu không ghép được chắc chắn (số, chữ viết tắt).
function ghep(cau, nghe) {
  const a = tach(cau);
  const b = tach(nghe);
  if (!b.length || b.length > a.length) return [];
  let tot = null;
  for (let i = 0; i + b.length <= a.length; i++) {
    const diem = b.reduce((d, w, k) => d + (w === a[i + k] ? 3 : boDau(w) === boDau(a[i + k]) ? 2 : w[0] === a[i + k][0] ? 1 : 0), 0);
    if (!tot || diem > tot.diem) tot = { i, diem };
  }
  if (tot.diem < b.length * 1.2) return [];
  return b.map((w, k) => ({ tu: a[tot.i + k], nghe: w })).filter((x) => x.tu !== x.nghe);
}

// Nạp danh sách lỗi chép từ trang nghe: Video 003, cảnh 2, câu 1: "câu" → nghe thành: ...
function nhap(file, model) {
  const so = docSo();
  let moi = 0;
  const boQua = [];
  const dong = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter((l) => l.trim().startsWith('Video'));
  for (const l of dong) {
    const m = l.match(/^\s*Video (\d+), cảnh (\d+), câu (\d+): "(.*)"(?: → nghe thành: (.*))?$/);
    const cap = m && m[5] ? ghep(m[4], m[5]) : [];
    if (!cap.length) { boQua.push(l.trim()); continue; }
    const nguon = `${m[1]} ${m[2]}.${m[3]} ${model}`;
    for (const { tu, nghe } of cap) {
      let e = so.tu.find((x) => x.tu === tu);
      if (!e) { e = { tu, nghe: [], nguon: [] }; so.tu.push(e); moi++; }
      if (!e.nghe.includes(nghe)) e.nghe.push(nghe);
      if (!e.nguon.includes(nguon)) e.nguon.push(nguon);
    }
  }
  so.tu.sort((x, y) => y.nguon.length - x.nguon.length || x.tu.localeCompare(y.tu, 'vi'));
  const body = so.tu.map((e) => '    ' + JSON.stringify(e)).join(',\n');
  fs.writeFileSync(SO, `{\n  "ghi_chu": ${JSON.stringify(so.ghi_chu)},\n  "tu": [\n${body}\n  ]\n}\n`);
  console.log(`${dong.length} dòng lỗi → thêm ${moi} từ mới, sổ có ${so.tu.length} từ.`);
  if (boQua.length) console.log(`Không tách được từ (xem tay, thường là số hoặc chữ viết tắt):\n  ${boQua.join('\n  ')}`);
}

// Từ trong sổ có mặt trong câu.
const canChuY = (cau, so = docSo()) => { const w = new Set(tach(cau)); return so.tu.filter((e) => w.has(e.tu)).map((e) => e.tu); };

// Trang nghe từng câu: out/ra-giong-<video>-<thư mục giọng>.html
function trang({ projectDir, scenes, catDir, sentencesOf }) {
  const video = path.basename(path.resolve(projectDir)).slice(0, 3);
  const ten = `ra-giong-${video}-${path.basename(path.dirname(path.resolve(catDir)))}`;
  const outDir = path.join(ROOT, 'out');
  const so = docSo();
  const rows = [];
  for (const s of scenes) {
    const base = path.join(path.resolve(catDir), `scene-${String(s.scene).padStart(2, '0')}`);
    const al = JSON.parse(fs.readFileSync(base + '.alignment.json', 'utf8'));
    const src = path.relative(outDir, base + '.mp3').split(path.sep).join('/');
    sentencesOf(al).forEach((c, i) => rows.push({ c: s.scene, n: i + 1, text: c.text, a: c.t0, b: c.t1, f: src, w: canChuY(c.text, so) }));
  }
  const chuY = rows.filter((r) => r.w.length).length;
  const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rà giọng ${video}</title>
<style>body{font:16px/1.5 system-ui,sans-serif;max-width:900px;margin:0 auto;padding:16px;color:#111;background:#fff}
.r{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:6px;border-bottom:1px solid #ddd}.r .t{flex:1;min-width:240px}.r.sai{background:#ffe3dc}.r.on{outline:2px solid #2563eb}
.w{background:#fff1a8;border-radius:4px;padding:0 4px;font-size:13px}input[type=text]{width:200px}button{font:inherit;padding:2px 10px}#bar{position:sticky;top:0;background:#fff;padding:8px 0;border-bottom:2px solid #111}textarea{width:100%;height:140px}</style></head><body>
<h1>Video ${video}: nghe từng câu</h1>
<div id="bar"><b id="dem"></b> · <button id="loc">Chỉ câu có từ hay sai (${chuY})</button> <button id="chep">Chép danh sách lỗi</button></div>
<p>Bấm ▶ để nghe, ghi chữ nghe được vào ô. Nhãn vàng là từ từng đọc sai: nghe kỹ các câu đó, nhưng vẫn nghe hết cả bài.</p><div id="ds"></div><h2>Danh sách lỗi</h2><textarea id="out" readonly></textarea>
<script>
const video=${JSON.stringify(video)},store=${JSON.stringify(ten)},rows=${JSON.stringify(rows).replace(/</g, '\\u003c')};
let st={};try{st=JSON.parse(localStorage.getItem(store)||'{}')}catch(e){}
const au=new Audio();let stop=0,cur,chiLoc=false;
au.ontimeupdate=()=>{if(au.currentTime>=stop)au.pause()};
const key=r=>r.c+'|'+r.n+'|'+r.text;
function report(){const l=rows.filter(r=>st[key(r)]&&st[key(r)].sai).map(r=>'Video '+video+', cảnh '+r.c+', câu '+r.n+': "'+r.text+'"'+(st[key(r)].nghe?' → nghe thành: '+st[key(r)].nghe:''));
document.getElementById('out').value=l.join('\\n');document.getElementById('dem').textContent=l.length+' câu sai / '+rows.length+' câu';try{localStorage.setItem(store,JSON.stringify(st))}catch(e){}}
const ds=document.getElementById('ds');
rows.forEach(r=>{const d=document.createElement('div');d.className='r';const s=st[key(r)]||(st[key(r)]={});r.el=d;
const p=document.createElement('button');p.textContent='▶';p.onclick=()=>{if(cur)cur.classList.remove('on');cur=d;d.classList.add('on');au.src=r.f;au.onloadedmetadata=()=>{au.currentTime=Math.max(0,r.a-0.08);stop=r.b+0.15;au.play()}};
const t=document.createElement('span');t.className='t';t.textContent=r.c+'.'+r.n+'  '+r.text+' ';r.w.forEach(w=>{const m=document.createElement('span');m.className='w';m.textContent=w;t.append(m,' ')});
const c=document.createElement('input');c.type='checkbox';c.checked=!!s.sai;const lb=document.createElement('label');lb.append(c,' sai');
const g=document.createElement('input');g.type='text';g.placeholder='nghe thành…';g.value=s.nghe||'';
c.onchange=()=>{s.sai=c.checked;d.classList.toggle('sai',c.checked);report()};g.oninput=()=>{s.nghe=g.value;if(g.value&&!c.checked){c.checked=true;c.onchange()}else report()};
d.classList.toggle('sai',!!s.sai);d.append(p,t,lb,g);ds.appendChild(d)});
document.getElementById('loc').onclick=()=>{chiLoc=!chiLoc;rows.forEach(r=>r.el.style.display=chiLoc&&!r.w.length?'none':'')};
document.getElementById('chep').onclick=()=>{const o=document.getElementById('out');o.select();navigator.clipboard?navigator.clipboard.writeText(o.value):document.execCommand('copy')};
report();
</script></body></html>`;
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, ten + '.html'), html);
  console.log(`Trang nghe: out/${ten}.html (${rows.length} câu, ${chuY} câu có từ hay sai)`);
}

module.exports = { nhap, ghep, canChuY, trang };
