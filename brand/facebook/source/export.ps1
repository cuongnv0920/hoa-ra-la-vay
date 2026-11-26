# Render the artboards in .\project to PNG (headless Edge/Chrome) into the parent folder.
# Keep this file ASCII-only: Windows PowerShell 5.1 misreads UTF-8 without BOM.
$ErrorActionPreference = 'Stop'
$out = Split-Path -Parent $PSScriptRoot
$tmp = Join-Path $env:TEMP 'hrlv-facebook-render'
New-Item -ItemType Directory -Force $tmp | Out-Null
$browser = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw 'Edge/Chrome not found' }
$utf8 = New-Object System.Text.UTF8Encoding($false)

function Save-Shot($html, $png, $w, $h) {
  Remove-Item $png -ErrorAction Ignore
  $url = ([Uri]$html).AbsoluteUri
  $a = "--headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --user-data-dir=`"$tmp\profile`" --window-size=$w,$h --screenshot=`"$png`" `"$url`""
  Start-Process -FilePath $browser -ArgumentList $a -Wait
  if (-not (Test-Path $png)) { throw "No screenshot: $png" }
}

$boards = @(
  @{ src = 'Main'; name = 'anh-bia-1640x924'; w = 1640; h = 924 },
  @{ src = 'Avatar'; name = 'anh-dai-dien-A-1080'; w = 1080; h = 1080 },
  @{ src = 'AvatarB'; name = 'anh-dai-dien-B-1080'; w = 1080; h = 1080 }
)
foreach ($b in $boards) {
  $source = [IO.File]::ReadAllText("$PSScriptRoot\project\$($b.src).dc.html", $utf8)
  $body = [regex]::Match($source, '(?s)</helmet>(.*)</x-dc>').Groups[1].Value
  $page = "<!doctype html><html lang=`"vi`"><head><meta charset=`"utf-8`"><style>body{margin:0}</style></head><body>$body</body></html>"
  [IO.File]::WriteAllText("$tmp\$($b.src).html", $page, $utf8)
  Save-Shot "$tmp\$($b.src).html" "$out\$($b.name).png" $b.w $b.h
}

# Preview sheet: circle crops at real sizes; cover as computer (16:9) and phone (2.4:1).
$cover = ([Uri]"$out\anh-bia-1640x924.png").AbsoluteUri
$avatarA = ([Uri]"$out\anh-dai-dien-A-1080.png").AbsoluteUri
$rows = ''
foreach ($n in 'A', 'B') {
  $u = ([Uri]"$out\anh-dai-dien-$n-1080.png").AbsoluteUri
  $rows += '<div class="r">'
  foreach ($s in 196, 176, 72, 40, 32) { $rows += "<img src=`"$u`" width=$s height=$s style=`"border-radius:50%`">" }
  $rows += '</div>'
}
$sheet = @"
<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:24px;background:#fff;font:14px 'Segoe UI'}.r{display:flex;gap:24px;align-items:center;margin-bottom:20px}img{display:block}p{margin:12px 0 6px}</style>
$rows
<p>M&#225;y t&#237;nh (16:9)</p><img src="$cover" width="820">
<p>&#272;i&#7879;n tho&#7841;i (2.4:1) &#8212; v&#7883; tr&#237; &#7843;nh &#273;&#7841;i di&#7879;n l&#224; &#432;&#7899;c l&#432;&#7907;ng</p>
<div style="position:relative;width:390px;height:210px"><div style="width:390px;height:163px;overflow:hidden"><img src="$cover" width="390" style="margin-top:-28px"></div><div style="position:absolute;left:12px;top:123px;width:96px;height:96px;border-radius:50%;border:4px solid #fff;overflow:hidden"><img src="$avatarA" width="96"></div></div>
"@
[IO.File]::WriteAllText("$tmp\sheet.html", $sheet, $utf8)
Save-Shot "$tmp\sheet.html" "$out\xem-truoc-cat-khung.png" 880 1240
Get-ChildItem $out -Filter *.png | Select-Object Name, Length
