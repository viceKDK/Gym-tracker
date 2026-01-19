@echo off
echo 🚀 Iniciando Gym Tracker...

if not exist "node_modules\" (
    echo 📦 node_modules no encontrado. Instalando dependencias...
    call npm install
) else (
    echo ✅ Dependencias ya instaladas
)

echo 🏃 Arrancando la aplicación...
call npm start
