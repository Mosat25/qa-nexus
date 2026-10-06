$dir = ".\icons"
$output = ".\icons.js"
$jsContent = "const localIcons = {`n"
$files = Get-ChildItem -Path $dir -Filter "*.svg"
foreach ($file in $files) {
    $name = $file.BaseName
    $content = [IO.File]::ReadAllText($file.FullName).Replace("'", "\'").Replace("`r", "").Replace("`n", "")
    $jsContent += "  `"$name`": '$content',`n"
}
$jsContent += "};`n"
[IO.File]::WriteAllText("$pwd\$output", $jsContent)
Write-Host "icons.js generated."
