$lines = Get-Content -Path "C:\Users\taste\.gemini\antigravity\scratch\quiz-app\study.html"
$idx = 0
$openRecall = $false
$count = 0
for ($i=0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -like '*id="recall-view"*') {
        $idx = $i
        $openRecall = $true
    }
    if ($openRecall) {
        if ($lines[$i] -like '*</section>*') {
            Write-Output "Closing section found at line: $($i + 1)"
            $idx_end = $i
            break
        }
    }
}
for ($i = $idx_end - 20; $i -lt $idx_end + 10; $i++) {
    if ($i -lt $lines.Count) {
        Write-Output "$($i + 1): $($lines[$i])"
    }
}
