#!/bin/bash

echo "🚀 Iniciando Gym Tracker..."

# Verificar si existe node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 node_modules no encontrado. Instalando dependencias..."
    npm install
elif [ "package.json" -nt "node_modules" ]; then
    echo "📦 package.json actualizado. Actualizando dependencias..."
    npm install
else
    echo "✅ Dependencias ya instaladas"
fi

# Arrancar la aplicación
echo "🏃 Arrancando la aplicación..."
npm start
