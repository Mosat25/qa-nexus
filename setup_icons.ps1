$iconsToFetch = @('microscope', 'layout-dashboard', 'folder-kanban', 'kanban-square', 'file-check-2', 'bell', 'pie-chart', 'search', 'plus', 'download', 'search-x', 'activity', 'check-circle', 'bug', 'folder', 'users', 'arrow-right', 'zap', 'check-square', 'check-circle-2', 'x-circle', 'clock', 'edit-2', 'trash-2')
$dir = ".\icons"
if (!(Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir }

foreach ($icon in $iconsToFetch) {
    try {
        $url = "https://unpkg.com/lucide-static@latest/icons/$icon.svg"
        $dest = "$dir\$icon.svg"
        Invoke-WebRequest -Uri $url -OutFile $dest
    } catch {
        Write-Host "Failed to download $($icon): $($_.Exception.Message)"
    }
}

$appIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>'

[IO.File]::WriteAllText("$pwd\$dir\app-icon.svg", $appIconSvg)
[IO.File]::WriteAllText("$pwd\$dir\app-icon-16.svg", $appIconSvg.Replace('viewBox="0 0 24 24"', 'width="16" height="16" viewBox="0 0 24 24"'))
[IO.File]::WriteAllText("$pwd\$dir\app-icon-32.svg", $appIconSvg.Replace('viewBox="0 0 24 24"', 'width="32" height="32" viewBox="0 0 24 24"'))
[IO.File]::WriteAllText("$pwd\$dir\app-icon-64.svg", $appIconSvg.Replace('viewBox="0 0 24 24"', 'width="64" height="64" viewBox="0 0 24 24"'))
[IO.File]::WriteAllText("$pwd\$dir\app-icon-192.svg", $appIconSvg.Replace('viewBox="0 0 24 24"', 'width="192" height="192" viewBox="0 0 24 24"'))
[IO.File]::WriteAllText("$pwd\$dir\app-icon-512.svg", $appIconSvg.Replace('viewBox="0 0 24 24"', 'width="512" height="512" viewBox="0 0 24 24"'))

Write-Host "Icons generation finished!"
