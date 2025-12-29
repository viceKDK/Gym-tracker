---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7]
status: complete
inputDocuments:
  - prd.md
  - product-brief-gym-TRAKER.md
  - design-system-gym-TRAKER.md
date: 2025-12-29
author: Vicen
---

# UX Design Specification - gym-TRAKER

**Author:** Vicen
**Date:** 2025-12-29

---

## Executive Summary

### Project Vision
gym-TRAKER es una app móvil personal para trackear progreso de gimnasio de forma visual e intuitiva. No es comercial - es una herramienta personal que debe sentirse acogedora y motivadora, como un diario de entrenamiento digital.

**Core UX Principle:** Máximo 3 taps para empezar a registrar un workout.

### Target User

**Primary Persona: Vicen**
- Usuario único de la app
- Va al gym regularmente (5-6 días/semana)
- Quiere ver su progreso visualmente
- Valora la simplicidad sobre las features
- Usa iPhone, no necesita sync entre dispositivos

**User Context:**
- Usa la app en el gym, después de entrenar
- Tiempo limitado - quiere registrar rápido
- Motivación principal: ver la racha y el progreso

### Key Design Challenges

| Challenge | Impact | Solution Direction |
|-----------|--------|-------------------|
| **Registro rápido** | Si toma mucho tiempo, no se usa | Pre-cargar rutina del día, inputs mínimos |
| **Activity graph como hero** | Es el diferenciador visual | Prominente en home, siempre visible |
| **Balance info vs. simplicidad** | Muchos datos pueden abrumar | Progressive disclosure, datos bajo demanda |

### Design Opportunities

1. **Micro-celebraciones:** PR badges, streak celebrations - motivación emocional
2. **Today-first design:** La vista default siempre es "hoy" - cero navegación para lo común
3. **Visual progress:** Las gráficas cuentan la historia mejor que números

## Core User Experience

### Defining Experience

**Primary Action:** Registrar workout diario
**Frequency:** 5-6 veces por semana
**Context:** En el gym, después de entrenar, tiempo limitado

**Core Loop:**
1. Abrir app → Ver activity graph (motivación inmediata)
2. Tap "Log Workout" → Ver rutina del día pre-cargada
3. Ingresar peso/reps por ejercicio → Ver confirmación
4. Cerrar app → Cuadrito del día se llena en el graph

### Platform Strategy

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Platform | iOS only | Dispositivo personal de Vicen |
| Framework | React Native + Expo | Desarrollo rápido, un solo codebase |
| Orientation | Portrait only | Simplifica UI, uso natural one-handed |
| Connectivity | 100% offline | Sin dependencia de red, datos locales |
| Input | Touch-optimized | Botones grandes, gestos simples |

### Effortless Interactions

**Zero-Thought Actions:**
- Abrir app → Siempre muestra home con activity graph
- Ver qué ejercicios tocan hoy → Automático según día de la semana
- Registrar set → Input numérico simple (peso, reps)
- Ver si fue al gym → Activity graph es visual instantáneo

**Friction Eliminators:**
- Rutina pre-cargada elimina selección de ejercicios
- Inputs numéricos con teclado numérico
- No hay login, no hay sync, no hay espera

### Critical Success Moments

| Moment | What Happens | Success Indicator |
|--------|--------------|-------------------|
| **First Open** | Ve activity graph vacío | Entiende el concepto inmediatamente |
| **First Log** | Registra primer workout | Cuadrito se llena, se siente bien |
| **First Week** | Ve su primera racha | Motivación para continuar |
| **First PR** | Supera peso anterior | Celebración visual, dopamina |
| **First Month** | Ve progreso en gráfica | "Esto está funcionando" |

### Experience Principles

1. **Today-First:** La vista default siempre es "hoy" - lo más común no requiere navegación
2. **Visual Progress:** Mostrar, no contar - gráficas > números
3. **Instant Gratification:** Feedback inmediato al registrar (cuadrito se llena)
4. **Minimal Input:** Solo pedir lo esencial (peso, reps) - nada más
5. **Zero Friction:** Sin auth, sin sync, sin esperas - abrir y usar

## Desired Emotional Response

### Primary Emotional Goals

| Emotion | When | Why It Matters |
|---------|------|----------------|
| **Motivado** | Al ver el activity graph | La racha visual impulsa a continuar |
| **Orgulloso** | Al lograr un PR | Celebración de progreso real |
| **Satisfecho** | Al completar workout | Cuadrito que se llena = dopamina |
| **Acogido** | Durante todo el uso | Se siente como MI app, no genérica |

**NOT:** Presionado, juzgado, abrumado, competitivo

### Emotional Journey Mapping

```
Abrir App → "¿Cómo voy?" (Curiosidad)
    ↓
Ver Activity Graph → "Bien, mi racha sigue" (Satisfacción)
    ↓
Tap Log Workout → "Ya sé qué toca hoy" (Confianza)
    ↓
Registrar Sets → "Rápido y fácil" (Eficiencia)
    ↓
Ver PR Badge → "¡Sí! Nuevo récord" (Orgullo/Celebración)
    ↓
Cerrar App → "Otro día más" (Logro)
```

### Micro-Emotions

| State Wanted | State to Avoid | UX Implication |
|--------------|----------------|----------------|
| Confianza | Confusión | UI clara, sin ambigüedad |
| Logro | Presión | Celebrar, no juzgar días perdidos |
| Control | Abrumado | Progressive disclosure |
| Propiedad | Genérico | Colores cálidos, personalización implícita |

### Design Implications

**Para crear "Acogedor":**
- Paleta cálida (coral, cream) - ya definida en Design System
- Bordes redondeados, sombras suaves
- Sin lenguaje agresivo ("CRUSH YOUR GOALS" ❌)
- Micro-animaciones gentiles

**Para crear "Motivación":**
- Activity graph prominente - es el hero
- Streak counter visible
- PR badges con celebración sutil
- Progreso visual > números

**Para crear "Sin presión":**
- Días sin gym son neutros, no rojos
- No hay "objetivos fallidos"
- No hay notificaciones push de culpa
- Es un diario, no un coach

### Emotional Design Principles

1. **Celebrate, Don't Judge:** Los días vacíos son neutros, los días llenos celebran
2. **Warm Over Cold:** Colores cálidos, copy amigable, nada corporativo
3. **Progress Over Perfection:** Mostrar cuánto has avanzado, no cuánto falta
4. **Personal Over Generic:** Se siente TU app desde el primer momento
5. **Calm Confidence:** Sabes exactamente qué hacer sin pensar

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

#### GitHub (Contribution Graph)
**What they do well:**
- Heatmap visual muestra consistencia de un vistazo
- Verde más intenso = más actividad (no binario)
- Vista anual da perspectiva de largo plazo
- Motivación pasiva - no te empuja, pero quieres llenar cuadritos

**Aplicación a gym-TRAKER:**
- Activity graph como hero del home screen
- Escala de color por intensidad de workout
- Vista mensual/anual para motivación

#### Duolingo (Gamification Gentil)
**What they do well:**
- Streak count prominente pero no agresivo
- Celebraciones pequeñas frecuentes
- "Freeze" para días perdidos (sin culpa)
- Owl amigable, no coach dictador

**Aplicación a gym-TRAKER:**
- Streak counter visible pero sin alarmas
- Micro-celebraciones al completar workout
- Días vacíos neutros, no penalizados

#### Strong App (Workout Logging)
**What they do well:**
- Lista de ejercicios limpia por sesión
- Input numérico rápido (peso/reps)
- Historial por ejercicio accesible
- Templates/rutinas pre-cargadas

**Aplicación a gym-TRAKER:**
- Rutina del día pre-cargada
- Inputs numéricos simples
- Historial por ejercicio

### Transferable UX Patterns

| Pattern | Source | Application |
|---------|--------|-------------|
| **Heatmap Calendar** | GitHub | Activity graph en home |
| **Streak Counter** | Duolingo | Badge visible con días consecutivos |
| **Pre-loaded Routine** | Strong | Ejercicios del día ya seleccionados |
| **Quick Numeric Input** | Strong | Teclado numérico para peso/reps |
| **Progress Lines** | Apple Fitness | Gráfica de evolución por ejercicio |

### Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | Alternative |
|--------------|--------------|-------------|
| **Red/Shame Colors** | Días perdidos se sienten como fracaso | Usar gris neutro |
| **Push Notifications** | "No has ido al gym" = culpa | Sin notificaciones |
| **Objetivos Diarios** | Fallar objetivos desmotiva | Solo tracking, sin metas impuestas |
| **Social Comparison** | Comparar con otros = presión | App 100% personal |
| **Complex Stats First** | Abruma al usuario | Progressive disclosure |

### Design Inspiration Strategy

**ADOPT (usar directamente):**
- GitHub heatmap calendar layout
- Duolingo streak celebration style
- Strong's quick numeric inputs

**ADAPT (modificar para el contexto):**
- Duolingo gamification → más sutil, menos cartoon
- Strong's exercise list → con categorías (Gym/Cardio/Abs)

**AVOID (no usar):**
- Fitness app "coach" aggressive language
- Social features de cualquier tipo
- Complex onboarding flows

## Design System Foundation

### Design System Choice

**Approach:** Custom Design System (ya creado)
**Document:** `design-system-gym-TRAKER.md`

### Rationale for Selection

| Factor | Decision |
|--------|----------|
| Brand Identity | Custom - "acogedor, no comercial" requiere paleta única |
| Platform | React Native - theme object ya definido |
| Complexity | Low - solo 1 usuario, componentes simples |
| Timeline | Personal project - sin presión de tiempo |

### Foundation Summary (from Design System doc)

**Colors:**
- Primary: `#FF6B6B` (Warm Coral)
- Secondary: `#4ECDC4` (Soft Teal)
- Background: `#FFF9F0` (Warm Cream)
- Text: `#2D3436` (Deep Charcoal)

**Activity Graph Levels:**
```
Level 0: #EBEDF0 (no activity)
Level 1: #FFE5E5
Level 2: #FFB3B3
Level 3: #FF8080
Level 4: #FF6B6B (intense)
```

**Typography:** Inter / System Default
**Spacing:** 4-8-16-24-32-48 scale
**Border Radius:** Cards 16px, Buttons 12px, Inputs 8px

### Implementation Approach

1. **Theme Provider:** Usar el theme object definido en design-system-gym-TRAKER.md
2. **Components:** Construir componentes custom siguiendo las specs
3. **No external UI library** - componentes React Native nativos + styled

### Customization Strategy

No se necesita customización adicional - el sistema ya está diseñado específicamente para gym-TRAKER.

## Defining Core Experience

### The Defining Interaction

**One-liner:** "Registrar workout → Ver cuadrito llenarse"

**How users describe it:** "Es como el contribution graph de GitHub pero para el gym - registras tu workout y el cuadrito del día se llena de coral"

**Why it works:** Gamification pasiva. No te presiona, pero quieres llenar cuadritos.

### User Mental Model

**Expectation:** "Abro la app, ya sé qué ejercicios tocan, ingreso números, listo"

**Current Solutions & Pain Points:**
| Current Approach | Pain Point | gym-TRAKER Solution |
|------------------|------------|---------------------|
| Notas en el teléfono | No hay visualización | Activity graph |
| Apps complejas | Demasiadas opciones | Solo lo esencial |
| No trackear | No hay motivación | Racha visual |
| Spreadsheets | Tedioso de mantener | 3 taps para empezar |

### Success Criteria for Core Experience

| Criterio | Target | Cómo lo medimos |
|----------|--------|-----------------|
| Tiempo de registro | < 60 segundos | Desde abrir hasta cerrar |
| Taps para empezar | ≤ 3 | Home → Log → First input |
| Feedback de éxito | Inmediato | Cuadrito se llena al guardar |
| Claridad | 100% | Usuario nunca pregunta "¿y ahora qué?" |

### Pattern Analysis

**Tipo:** Established patterns with unique combination

| Pattern | Source | Our Implementation |
|---------|--------|-------------------|
| Contribution heatmap | GitHub | Activity graph en home |
| Pre-loaded templates | Strong App | Rutina del día pre-cargada |
| Quick numeric input | All fitness apps | Teclado numérico, minimal fields |
| Streak gamification | Duolingo | Counter visible, no agresivo |

**Novel element:** Combinar heatmap + workout logging en una experiencia cálida/personal (no competitiva)

### Experience Mechanics

**1. INITIATION**
```
User opens app
→ Home screen loads instantly
→ Activity graph visible (hero element)
→ "Log Today's Workout" button prominent
→ Today's routine preview visible
```

**2. INTERACTION**
```
User taps "Log Workout"
→ Today's exercises pre-loaded (from weekly routine)
→ For each exercise:
   - Tap exercise row to expand
   - Enter weight (numeric keyboard)
   - Enter reps (numeric keyboard)
   - Add set button for multiple sets
→ Can add ad-hoc exercise if needed
```

**3. FEEDBACK**
```
During logging:
→ Sets logged show checkmark
→ If weight > PR, show subtle highlight

On save:
→ Success animation (brief)
→ Today's square fills with coral
→ Streak counter updates if applicable
→ Optional: PR badge if achieved
```

**4. COMPLETION**
```
User sees:
→ Updated activity graph
→ Confirmation message (subtle)
→ Can review or close app
→ Data persisted locally
```

### Edge Cases & Error Handling

| Scenario | Behavior |
|----------|----------|
| No routine for today | Show "Rest day" or option to log ad-hoc |
| App closes mid-log | Auto-save draft, recover on reopen |
| Zero weight entered | Allow (bodyweight exercises) |
| Duplicate workout same day | Replace or append (user choice) |

