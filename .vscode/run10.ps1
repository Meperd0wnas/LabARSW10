Write-Host "Lanzando 10 peticiones concurrentes a la Azure Function..."

$jobs = @()

for ($i = 1; $i -le 10; $i++) {
    $jobs += Start-Job -ScriptBlock {
        newman run "$PSScriptRoot\FibonacciCollection.json" --reporters cli
    }
}

Write-Host "Esperando resultados..."

$jobs | Wait-Job | Receive-Job

Write-Host "Prueba completada."
