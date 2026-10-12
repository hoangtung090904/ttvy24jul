# ==========================================================================
# 🌸 Mini Local Web Server & QR Code Display for Happy Birthday Cẩm Lình
# 👨‍💻 DEVELOPED BY: HoangTung24Jul
# 🔒 COPYRIGHT (C) 2026 HoangTung24Jul. ALL RIGHTS RESERVED.
# ==========================================================================
$ip = "192.168.1.116"
$activeIp = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" } | Select-Object -First 1).IPAddress
if ($activeIp) { $ip = $activeIp }

$port = 8080
$url = "http://$ip`:$port/"
$qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=" + [System.Uri]::EscapeDataString($url)

$baseDir = $PSScriptRoot
if (-not $baseDir) { $baseDir = "D:\tung\Happy Brithday" }

# Tạo trang hiển thị mã QR
$qrPageContent = @"
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Mã QR Xem Trang Sinh Nhật Cẩm Lình</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #FFE4E1, #FFC0CB);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            color: #542B38;
            text-align: center;
        }
        .card {
            background: white;
            padding: 30px;
            border-radius: 25px;
            box-shadow: 0 15px 35px rgba(255, 141, 161, 0.35);
            max-width: 420px;
        }
        h1 { font-size: 1.5rem; margin-bottom: 8px; color: #FF6584; }
        p { font-size: 0.95rem; color: #666; margin-bottom: 20px; }
        .qr-wrap {
            padding: 15px;
            background: #FFF5F7;
            border-radius: 20px;
            display: inline-block;
            border: 3px dashed #FFB6C1;
        }
        img { width: 280px; height: 280px; display: block; border-radius: 12px; }
        .link-text {
            margin-top: 15px;
            font-weight: bold;
            font-size: 1rem;
            color: #C2185B;
            word-break: break-all;
        }
        .tip {
            margin-top: 15px;
            font-size: 0.85rem;
            color: #888;
            background: #FCE4EC;
            padding: 10px;
            border-radius: 12px;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>🌸 Quét QR Để Xem Bất Ngờ! 🌸</h1>
        <p>Mở camera hoặc Zalo trên điện thoại (kết nối cùng Wi-Fi) và quét mã bên dưới:</p>
        <div class="qr-wrap">
            <img src="$qrUrl" alt="QR Code">
        </div>
        <div class="link-text">
            <a href="$url" target="_blank" style="color: #FF5E7E; text-decoration: none;">$url</a>
        </div>
        <div class="tip">
            💡 <strong>Lưu ý:</strong> Điện thoại cần kết nối chung mạng Wi-Fi với máy tính này để xem được nhé!
        </div>
    </div>
</body>
</html>
"@

$qrPagePath = Join-Path $baseDir "qr_code.html"
[System.IO.File]::WriteAllText($qrPagePath, $qrPageContent, [System.Text.Encoding]::UTF8)

# Mở trình duyệt hiển thị mã QR
Start-Process "http://localhost:$port/qr_code.html"

# Bắt đầu HttpListener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://*:$port/")
try {
    $listener.Start()
    Write-Host "===========================================================" -ForegroundColor Green
    Write-Host " SERVER ĐANG CHẠY TẠI: $url" -ForegroundColor Cyan
    Write-Host " HÃY QUÉT MÃ QR TRÊN MÀN HÌNH HOẶC TRUY CẬP ĐỊA CHỈ TRÊN!" -ForegroundColor Yellow
    Write-Host " Nhấn Ctrl + C để dừng server." -ForegroundColor Gray
    Write-Host "===========================================================" -ForegroundColor Green

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath.TrimStart('/')
        if (-not $path -or $path -eq "") { $path = "index.html" }
        $filePath = Join-Path $baseDir $path

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".png"  { "image/png" }
                ".gif"  { "image/gif" }
                ".svg"  { "image/svg+xml" }
                ".m4a"  { "audio/mp4" }
                ".mp3"  { "audio/mpeg" }
                default { "application/octet-stream" }
            }
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
} catch {
    Write-Host "Lỗi khởi động HttpListener (Có thể cần quyền Run as Administrator hoặc port $port đang bận): $_" -ForegroundColor Red
} finally {
    $listener.Stop()
}
