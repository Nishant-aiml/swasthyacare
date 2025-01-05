# Get all files in the ui directory
$files = Get-ChildItem -Path "src/components/ui" -File

foreach ($file in $files) {
    $newName = $file.Name.Substring(0,1).ToUpper() + $file.Name.Substring(1)
    if ($file.Name -ne $newName) {
        Write-Host "Renaming $($file.Name) to $newName"
        Rename-Item -Path $file.FullName -NewName $newName -Force
    }
}

# Update imports in all TypeScript files
$tsFiles = Get-ChildItem -Path "src" -Recurse -Include "*.ts","*.tsx"
foreach ($file in $tsFiles) {
    $content = Get-Content $file.FullName -Raw
    $modified = $false
    
    # Fix common UI component imports
    $components = @("accordion", "alertdialog", "avatar", "button", "card", "dialog", "progress", "switch", "textarea")
    foreach ($component in $components) {
        $upperComponent = $component.Substring(0,1).ToUpper() + $component.Substring(1)
        if ($content -match "@/components/ui/$component") {
            $content = $content -replace "@/components/ui/$component", "@/components/ui/$upperComponent"
            $modified = $true
        }
    }
    
    if ($modified) {
        Write-Host "Updating imports in $($file.Name)"
        Set-Content -Path $file.FullName -Value $content
    }
}
