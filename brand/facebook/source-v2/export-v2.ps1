# Render the v2 artboards in .\project to PNG (headless Edge/Chrome) into the parent folder.
# Never overwrites the v1 files. Keep this file ASCII-only (Windows PowerShell 5.1).
$ErrorActionPreference = 'Stop'
$out = Split-Path -Parent $PSScriptRoot
$tmp = Join-Path $env:TEMP 'hrlv-facebook-render-v2'
New-Item -ItemType Directory -Force $tmp | Out-Null
$browser = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw 'Edge/Chrome not found' }
$utf8 = New-Object System.Text.UTF8Encoding($false)
$font = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;900&display=block">'

function Save-Shot($html, $png, $w, $h) {
  Remove-Item $png -ErrorAction Ignore
  $url = ([Uri]$html).AbsoluteUri
  $a = "--headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=10000 --user-data-dir=`"$tmp\profile`" --window-size=$w,$h --screenshot=`"$png`" `"$url`""
  Start-Process -FilePath $browser -ArgumentList $a -Wait
  if (-not (Test-Path $png)) { throw "No screenshot: $png" }
}

$boards = @(
  @{ src = 'Main'; name = 'anh-bia-v2'; w = 1640; h = 924 },
  @{ src = 'AvatarA'; name = 'anh-dai-dien-v2'; w = 1080; h = 1080 }
)
foreach ($b in $boards) {
  $source = [IO.File]::ReadAllText("$PSScriptRoot\project\$($b.src).dc.html", $utf8)
  $body = [regex]::Match($source, '(?s)</helmet>(.*)</x-dc>').Groups[1].Value
  $page = "<!doctype html><html lang=`"vi`"><head><meta charset=`"utf-8`">$font<style>body{margin:0}</style></head><body>$body</body></html>"
  [IO.File]::WriteAllText("$tmp\$($b.src).html", $page, $utf8)
  Save-Shot "$tmp\$($b.src).html" "$out\$($b.name).png" $b.w $b.h
}

$cover = ([Uri]"$out\anh-bia-v2.png").AbsoluteUri
$avMain = ([Uri]"$out\anh-dai-dien-v2.png").AbsoluteUri
$css = "<style>body{margin:0;padding:24px;background:#fff;font:15px 'Segoe UI',sans-serif;color:#1c1e21}p{margin:14px 0 8px;font-weight:600}img{display:block}.av{position:absolute;border-radius:50%;border:4px solid #fff;overflow:hidden;background:#fff}</style>"

# 1) Computer: full cover with the visible band marked, then the ~820x312 crop with the profile picture.
$desk = @"
<!doctype html><meta charset="utf-8">$css
<p>1. &#7842;nh g&#7889;c 1640&#215;924 &#8212; khung n&#233;t &#273;&#7913;t = ph&#7847;n m&#225;y t&#237;nh hi&#7875;n th&#7883; (~820&#215;312, d&#7843;i gi&#7919;a y 150&#8211;774)</p>
<div style="position:relative;width:820px;height:462px">
<img src="$cover" width="820" height="462">
<div style="position:absolute;left:0;top:0;width:820px;height:75px;background:rgba(255,255,255,.55)"></div>
<div style="position:absolute;left:0;top:387px;width:820px;height:75px;background:rgba(255,255,255,.55)"></div>
<div style="position:absolute;left:0;top:75px;width:816px;height:308px;border:2px dashed #FF4D1A"></div>
<div style="position:absolute;left:24px;top:311px;width:164px;height:164px;border:2px dashed #FFD23F;border-radius:50%"></div></div>
<p>2. M&#225;y t&#237;nh &#8212; v&#7883; tr&#237; &#7843;nh &#273;&#7841;i di&#7879;n l&#224; &#432;&#7899;c l&#432;&#7907;ng</p>
<div style="position:relative;width:820px;height:400px">
<div style="width:820px;height:312px;overflow:hidden"><img src="$cover" width="820" style="margin-top:-75px"></div>
<div class="av" style="left:24px;top:236px;width:160px;height:160px"><img src="$avMain" width="160"></div>
</div>
"@
[IO.File]::WriteAllText("$tmp\desk.html", $desk, $utf8)
Save-Shot "$tmp\desk.html" "$out\xem-truoc-v2-may-tinh.png" 868 1000

# 2) Phone: whole 16:9 cover shown at 390 wide, profile picture overlapping bottom-left.
$phone = @"
<!doctype html><meta charset="utf-8">$css
<p>&#272;i&#7879;n tho&#7841;i (16:9, r&#7897;ng 390) &#8212; v&#7883; tr&#237; &#7843;nh &#273;&#7841;i di&#7879;n l&#224; &#432;&#7899;c l&#432;&#7907;ng</p>
<div style="width:390px;padding:0 0 70px;border:1px solid #ddd;border-radius:12px;overflow:hidden">
<div style="position:relative;width:390px;height:219px">
<img src="$cover" width="390" height="219">
<div class="av" style="left:14px;top:160px;width:112px;height:112px"><img src="$avMain" width="112"></div>
</div>
</div>
"@
[IO.File]::WriteAllText("$tmp\phone.html", $phone, $utf8)
Save-Shot "$tmp\phone.html" "$out\xem-truoc-v2-dien-thoai.png" 440 400

# 3) Profile picture options cut to a circle at real display sizes, light and dark backgrounds.
$rows = ''
foreach ($pair in @(,@('v2', $avMain))) {
  $rows += "<p>&#7842;nh &#273;&#7841;i di&#7879;n $($pair[0])</p>"
  foreach ($bg in '#ffffff', '#18191a') {
    $rows += "<div style=`"display:flex;gap:24px;align-items:center;padding:14px;background:$bg;width:600px`">"
    foreach ($s in 196, 128, 72, 40, 32) { $rows += "<img src=`"$($pair[1])`" width=$s height=$s style=`"border-radius:50%`">" }
    $rows += '</div>'
  }
}
$sheet = "<!doctype html><meta charset=`"utf-8`">$css$rows"
[IO.File]::WriteAllText("$tmp\sheet.html", $sheet, $utf8)
Save-Shot "$tmp\sheet.html" "$out\xem-truoc-v2-dai-dien.png" 680 1100

Get-ChildItem $out -Filter *.png | Select-Object Name, Length
