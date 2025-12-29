---
stepsCompleted: [1, 2, 3, 4, 5-skipped, 6-skipped, 7, 8, 9, 10, 11]
status: complete
inputDocuments:
  - product-brief-gym-TRAKER.md
  - design-system-gym-TRAKER.md
workflowType: 'prd'
lastStep: 2
documentCounts:
  briefs: 1
  research: 0
  designSystem: 1
  projectContext: 0
date: 2025-12-29
author: Vicen
---

# Product Requirements Document - gym-TRAKER

**Author:** Vicen
**Date:** 2025-12-29

## Executive Summary

### Vision
gym-TRAKER es una aplicación móvil personal diseñada para trackear el progreso de gimnasio de forma visual e intuitiva. No es un producto comercial - es una herramienta personal que debe sentirse acogedora y motivadora, como un diario de entrenamiento digital.

### Problem Statement
Necesito una forma simple y visual de:
- Ver mi consistencia de asistencia al gimnasio
- Registrar mis workouts diarios sin fricción
- Comparar mi progreso semana a semana, mes a mes, año a año
- Mantener organizadas mis rutinas semanales por categoría (Gym, Cardio, Abdominales)

### Target User
**Usuario único:** Vicen (uso personal exclusivo)

### What Makes This Special

1. **GitHub-Style Activity Graph** - Motivación visual instantánea viendo los días de asistencia como un heatmap de contribuciones
2. **Diseño Acogedor** - Paleta cálida (Coral #FF6B6B, Teal #4ECDC4, Cream #FFF9F0), sin agresividad comercial
3. **Offline-First** - 100% funcional sin internet, datos almacenados localmente en SQLite
4. **Comparativas Temporales** - Ver evolución del progreso en múltiples escalas de tiempo
5. **Simplicidad** - Máximo 3 taps para empezar a registrar un workout

## Project Classification

| Attribute | Value |
|-----------|-------|
| **Technical Type** | mobile_app |
| **Framework** | React Native + Expo |
| **Storage** | SQLite (local) |
| **Domain** | Personal Fitness |
| **Complexity** | Low |
| **Project Context** | Greenfield - nuevo proyecto |

No requiere autenticación, backend, cloud sync, ni compliance regulatorio. Scope intencionalmente limitado para mantener simplicidad.

## Success Criteria

### User Success
- **Registro rápido:** Completar el log de un workout en menos de 1 minuto
- **Motivación visual:** Ver el activity graph y sentir satisfacción por la consistencia
- **Claridad:** Entender mi progreso de un vistazo sin buscar datos
- **Cero fricción:** Abrir la app y empezar a registrar en máximo 3 taps

### Personal Success
- La app se usa consistentemente (no se abandona después de 2 semanas)
- Se siente como MI herramienta, no como una app genérica
- Los datos acumulados tienen valor - puedo ver mi evolución real

### Technical Success
- **Performance:** La app responde instantáneamente aunque tenga 1 año de datos
- **Estabilidad:** No crashes, no pérdida de datos
- **Offline:** Funciona 100% sin conexión a internet
- **Simplicidad:** Codebase mantenible, sin over-engineering

### Measurable Outcomes
| Métrica | Target |
|---------|--------|
| Tiempo para registrar workout | < 60 segundos |
| Taps para empezar a registrar | ≤ 3 |
| Tiempo de carga inicial | < 2 segundos |
| Datos soportados sin degradación | 1+ año de workouts |

## Product Scope

### MVP - Minimum Viable Product
**Must have - sin esto no es funcional:**
- [ ] GitHub-style Activity Graph (heatmap de asistencia)
- [ ] Gestión de ejercicios (CRUD) con 3 categorías: Gym, Cardio, Abs
- [ ] Rutina semanal configurable
- [ ] Logging diario de workouts (peso, series, reps)
- [ ] Gráfica básica de progreso por ejercicio

### Post-MVP
**Mejoras después de tener el core funcionando:**
- [ ] Comparativa semana vs semana
- [ ] Comparativa mes vs mes
- [ ] Comparativa año vs año
- [ ] Estadísticas avanzadas

### Out of Scope (No hacer)
- Export/Backup de datos
- Cloud sync
- Dark/Light theme toggle
- Widgets
- Cualquier feature social
- Autenticación/Login

## User Journeys

### Journey 1: Vicen - Registrando el Workout del Día

Es martes por la tarde. Vicen acaba de terminar su sesión de pecho y tríceps en el gym. Mientras descansa después del último ejercicio, saca el móvil y abre gym-TRAKER.

En la pantalla principal ve inmediatamente su activity graph - 3 días seguidos esta semana, el cuadrito de hoy aún vacío. Toca "Log Workout" y ve su rutina de martes ya pre-cargada: Press banca, Press inclinado, Fondos, Extensiones de tríceps.

Para cada ejercicio, simplemente ingresa el peso y las reps de hoy. El último set de press banca fue 80kg x 8 - un nuevo PR. La app muestra un pequeño destello de celebración.

En menos de 60 segundos, todo está registrado. El cuadrito de hoy en el activity graph ahora brilla en coral. Vicen cierra la app con una sonrisa - otro día más en la racha.

**Capabilities Revealed:**
- Quick workout logging desde rutina pre-cargada
- Activity graph visible en home
- Input rápido de peso/reps
- Feedback visual de PR/logros

---

### Journey 2: Vicen - Buscando Motivación

Es domingo por la mañana. Vicen no tiene muchas ganas de ir al gym. Abre gym-TRAKER solo para "ver cómo va".

El activity graph muestra una racha de 2 semanas casi perfecta - solo un día perdido. Ve la gráfica de progreso de press banca: hace un mes estaba en 70kg, ahora está en 80kg.

La evidencia visual del progreso real le da el empujón que necesitaba. Se pone las zapatillas.

**Capabilities Revealed:**
- Activity graph como motivador visual
- Gráficas de progreso por ejercicio
- Datos históricos accesibles rápidamente

---

### Journey 3: Vicen - Configuración Inicial

Primera vez usando la app. Vicen quiere configurar su rutina semanal.

Primero, añade sus ejercicios favoritos organizados por categoría:
- **Gym:** Press banca, Sentadilla, Peso muerto, Dominadas...
- **Cardio:** Cinta, Bicicleta, Elíptica
- **Abs:** Crunch, Plancha, Russian twist

Luego, configura su rutina semanal:
- Lunes: Pecho + Tríceps
- Martes: Espalda + Bíceps
- Miércoles: Cardio + Abs
- Jueves: Piernas
- Viernes: Hombros + Abs
- Sábado: Descanso
- Domingo: Cardio opcional

La configuración toma unos 10 minutos, pero solo se hace una vez. A partir de ahora, cada día le muestra automáticamente los ejercicios que tocan.

**Capabilities Revealed:**
- CRUD de ejercicios con categorías
- Asignación de ejercicios a días de la semana
- Rutina semanal persistente
- Vista de "hoy" basada en día de la semana

---

### Journey Requirements Summary

| Capability | Journeys |
|------------|----------|
| Activity Graph (home) | 1, 2 |
| Quick Workout Logging | 1 |
| Pre-loaded daily routine | 1, 3 |
| Progress charts per exercise | 2 |
| Exercise CRUD with categories | 3 |
| Weekly routine configuration | 3 |
| Visual feedback (PRs, streaks) | 1 |

## Mobile App Specific Requirements

### Platform Overview
| Attribute | Value |
|-----------|-------|
| **Target Platform** | iOS only |
| **Framework** | React Native + Expo |
| **Distribution** | Personal device (no App Store) |

### Platform Requirements
- **iOS Version:** iOS 15+ (versiones recientes para mejor soporte de Expo)
- **Device:** iPhone personal de Vicen
- **Orientation:** Portrait only (simplifica el desarrollo)

### Offline Mode
- **Strategy:** 100% offline-first
- **Database:** SQLite local via `expo-sqlite`
- **Sync:** No cloud sync - datos solo locales
- **Persistence:** Datos persisten entre sesiones y actualizaciones de app

### Features NOT Needed
- Push notifications - no recordatorios automáticos
- Device features (cámara, GPS, sensores) - no requeridos
- App Store compliance - no publicación
- Background tasks - no procesamiento en segundo plano
- Deep linking - no necesario

### Development Considerations
- **Build:** Expo Development Build o Expo Go para testing
- **Deploy:** Direct install via Expo o TestFlight personal
- **Updates:** Rebuild manual cuando haya cambios

## Project Scoping & Phased Development

### MVP Strategy
**Approach:** Problem-Solving MVP
**Philosophy:** Resolver el problema central (trackear gym) con el mínimo de features necesarias
**Team:** Solo developer (Vicen)
**Timeline:** No deadline - proyecto personal

### MVP Feature Set (Phase 1)

**Core Journeys Supported:**
1. Journey 1: Registro diario de workout
2. Journey 2: Motivación visual
3. Journey 3: Configuración inicial

**Must-Have Capabilities:**
| Feature | Justification |
|---------|---------------|
| Activity Graph | Core motivator - sin esto no hay diferenciación |
| Exercise CRUD | Base de datos de ejercicios personales |
| Weekly Routine | Estructura para el día a día |
| Workout Logging | La acción principal de la app |
| Basic Progress Chart | Ver evolución por ejercicio |

### Post-MVP Features (Phase 2)
- Comparativa semana vs semana
- Comparativa mes vs mes
- Comparativa año vs año
- Estadísticas avanzadas

### Explicitly Out of Scope
- Export/Backup
- Cloud sync
- Theming
- Widgets
- Social
- Auth

### Risk Assessment
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Complejidad de gráficas | Media | Media | Usar librerías probadas (react-native-chart-kit) |
| Performance con muchos datos | Baja | Media | SQLite maneja bien datos locales |
| Abandono del proyecto | Media | Alta | MVP pequeño = terminar rápido |

## Functional Requirements

### Exercise Management
- **FR1:** User can create a new exercise with name and category (Gym/Cardio/Abs)
- **FR2:** User can view all exercises organized by category
- **FR3:** User can edit an existing exercise's name or category
- **FR4:** User can delete an exercise
- **FR5:** User can search/filter exercises by name or category

### Routine Management
- **FR6:** User can assign exercises to specific days of the week
- **FR7:** User can view the weekly routine showing exercises per day
- **FR8:** User can modify which exercises are assigned to each day
- **FR9:** User can see today's scheduled exercises based on current weekday
- **FR10:** User can mark a day as rest day (no exercises)

### Workout Logging
- **FR11:** User can start a workout session for the current day
- **FR12:** User can see pre-loaded exercises from today's routine
- **FR13:** User can log sets for each exercise (weight, reps)
- **FR14:** User can add multiple sets per exercise in a session
- **FR15:** User can add an ad-hoc exercise not in today's routine
- **FR16:** User can complete and save the workout session
- **FR17:** User can view past workout sessions by date
- **FR18:** User can see details of a past workout (exercises, sets, weights, reps)

### Activity Visualization
- **FR19:** User can view a GitHub-style activity graph on the home screen
- **FR20:** Activity graph displays workout days with color intensity based on activity
- **FR21:** User can see the current streak of consecutive workout days
- **FR22:** User can navigate to different time periods on the activity graph

### Progress Tracking
- **FR23:** User can view a progress chart for any exercise
- **FR24:** Progress chart shows weight/reps evolution over time
- **FR25:** User can see their personal record (PR) for each exercise
- **FR26:** User receives visual feedback when achieving a new PR

### Data Persistence
- **FR27:** All data persists locally between app sessions
- **FR28:** Data survives app updates and restarts

## Non-Functional Requirements

### Performance
- **NFR1:** App launch time < 2 seconds
- **NFR2:** Screen transitions < 300ms
- **NFR3:** Workout logging action < 100ms response
- **NFR4:** Activity graph renders < 500ms with 1 year of data
- **NFR5:** Progress charts render < 1 second with full history
- **NFR6:** SQLite queries complete < 100ms for typical operations

### Reliability
- **NFR7:** No data loss under any normal usage scenario
- **NFR8:** App recovers gracefully from crashes without data corruption
- **NFR9:** Data persists correctly across app updates

### Usability
- **NFR10:** All primary actions achievable in ≤ 3 taps
- **NFR11:** Touch targets minimum 44x44 points
- **NFR12:** Text readable without zooming (minimum 14pt body text)

### Storage
- **NFR13:** App functions with device storage < 100MB free
- **NFR14:** Database size < 50MB after 2 years of daily use

