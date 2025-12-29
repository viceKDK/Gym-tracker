---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: []
date: 2025-12-29
author: Vicen
status: complete
---

# Product Brief: gym-TRAKER

## 1. Vision & Purpose

### Product Vision
Una aplicación móvil personal para trackear el progreso en el gimnasio de forma visual e intuitiva. No es comercial - es una herramienta personal que debe sentirse acogedora y motivadora.

### Problem Statement
Necesito una forma simple y visual de:
- Ver mi consistencia de asistencia al gym
- Registrar mis workouts diarios
- Comparar mi progreso a lo largo del tiempo
- Mantener organizadas mis rutinas semanales

### Target User
**Usuario único:** Vicen (uso personal)

### Success Metrics
- Registro consistente de workouts
- Visualización clara del progreso
- Motivación a través de datos visuales

---

## 2. Core Features

### 2.1 Dashboard Principal
- Vista rápida del estado actual
- Acceso directo a registrar workout del día

### 2.2 GitHub-Style Activity Graph
- Calendario tipo heatmap mostrando días de asistencia al gym
- Visualización anual con intensidad de color según actividad
- Similar al contribution graph de GitHub

### 2.3 Gestión de Ejercicios
- **Agregar ejercicios** personalizados
- **Categorías:**
  - Gym (pesas/máquinas)
  - Cardio
  - Abdominales
- Detalles por ejercicio: series, repeticiones, peso

### 2.4 Rutina Semanal
- Planificador de rutina por día de la semana
- Vista semanal con ejercicios asignados
- Flexibilidad para modificar

### 2.5 Registro de Workouts
- Registrar workout diario
- Seleccionar ejercicios de la rutina o añadir ad-hoc
- Guardar: peso, series, repeticiones, notas

### 2.6 Gráficas de Progreso
- **Progreso por ejercicio:** evolución de peso/reps
- **Comparativas temporales:**
  - Semana vs semana
  - Mes vs mes
  - Año vs año
- Gráficas de línea para tendencias
- Estadísticas resumen

---

## 3. Technical Specifications

### Stack Tecnológico
| Componente | Tecnología |
|------------|------------|
| Framework | React Native |
| Build Tool | Expo |
| Storage | Local (AsyncStorage / SQLite) |
| Charts | react-native-chart-kit o victory-native |

### Platform
- **Primary:** Mobile (iOS/Android via Expo)
- **Data:** 100% local, sin backend ni cloud

### Key Technical Decisions
- **Offline-first:** Todo funciona sin internet
- **Local storage:** Datos guardados en el dispositivo
- **No authentication:** App personal, sin login
- **Export capability:** (futuro) Exportar datos como backup

---

## 4. User Experience Goals

### Design Philosophy
- **Acogedor:** Se siente como tu espacio personal
- **No comercial:** Sin ads, sin upsells, sin distracciones
- **Motivador:** Los datos te impulsan a seguir
- **Simple:** Hacer las cosas comunes muy fácil

### Key UX Principles
1. **Registro rápido:** Máximo 3 taps para empezar a registrar
2. **Visual-first:** Gráficas prominentes, números secundarios
3. **Consistencia:** Misma estructura en toda la app
4. **Feedback positivo:** Celebrar rachas y logros

---

## 5. Information Architecture

```
gym-TRAKER/
├── Home (Dashboard)
│   ├── Activity Graph (GitHub-style)
│   ├── Quick Stats
│   └── Start Today's Workout
├── Workout
│   ├── Today's Session
│   ├── History
│   └── Log New
├── Routines
│   ├── Weekly Plan
│   └── Edit Routine
├── Exercises
│   ├── Gym
│   ├── Cardio
│   └── Abs
├── Progress
│   ├── By Exercise
│   ├── Weekly Compare
│   ├── Monthly Compare
│   └── Yearly Compare
└── Settings
    ├── Preferences
    └── Data Management
```

---

## 6. MVP Scope

### Phase 1 - Core (MVP)
- [ ] Activity graph (GitHub-style)
- [ ] Exercise management (CRUD)
- [ ] Weekly routine setup
- [ ] Daily workout logging
- [ ] Basic progress chart per exercise

### Phase 2 - Analytics
- [ ] Week vs week comparison
- [ ] Month vs month comparison
- [ ] Year vs year comparison
- [ ] Advanced statistics

### Phase 3 - Polish
- [ ] Data export/backup
- [ ] Widgets (opcional)
- [ ] Dark/Light theme

---

## 7. Out of Scope

- Cloud sync
- Social features
- Monetization
- Multi-user support
- Web version
- Workout suggestions/AI
- Integration con wearables

---

## 8. Risks & Considerations

| Risk | Mitigation |
|------|------------|
| Data loss | Implementar export/backup |
| Complejidad de gráficas | Usar librerías probadas |
| Performance con muchos datos | SQLite over AsyncStorage |

---

## 9. Definition of Done

El producto está completo cuando:
1. Puedo ver mi calendar de asistencia al gym
2. Puedo registrar mis workouts diarios fácilmente
3. Puedo ver gráficas de mi progreso por ejercicio
4. Puedo comparar mi rendimiento entre períodos
5. La app se siente acogedora y personal
