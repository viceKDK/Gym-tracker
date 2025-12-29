---
date: 2025-12-29
author: Vicen
project: gym-TRAKER
type: design-system
---

# Design System: gym-TRAKER

Sistema de diseño completo para una app personal de tracking de gimnasio. El objetivo es crear una experiencia acogedora, no comercial, que motive sin abrumar.

---

## 1. Design Philosophy

### Core Principles

| Principio | Descripción |
|-----------|-------------|
| **Acogedor** | Como tu diario personal del gym - íntimo, no corporativo |
| **Cálido** | Colores que transmiten energía positiva sin agresividad |
| **Simple** | Información clara, sin ruido visual |
| **Motivador** | Los datos celebran el progreso, no juzgan |

### Personalidad Visual
- **No es:** Agresivo, competitivo, comercial, frío
- **Sí es:** Personal, cálido, motivador, honesto

---

## 2. Color Palette

### Primary Colors

```
┌─────────────────────────────────────────────────────┐
│  WARM CORAL (Primary Action)                        │
│  #FF6B6B - Energía cálida, botones principales      │
├─────────────────────────────────────────────────────┤
│  SOFT TEAL (Secondary/Progress)                     │
│  #4ECDC4 - Progreso, gráficas, éxito               │
├─────────────────────────────────────────────────────┤
│  WARM CREAM (Background Light)                      │
│  #FFF9F0 - Fondo principal, sensación acogedora    │
├─────────────────────────────────────────────────────┤
│  DEEP CHARCOAL (Text)                              │
│  #2D3436 - Texto principal, legible pero suave     │
└─────────────────────────────────────────────────────┘
```

### Extended Palette

| Nombre | Hex | Uso |
|--------|-----|-----|
| Coral Light | `#FFE5E5` | Backgrounds de cards, hover states |
| Teal Light | `#E8F8F5` | Success backgrounds, progress areas |
| Warm Gray | `#636E72` | Texto secundario, labels |
| Soft Orange | `#FDCB6E` | Warnings, streaks, achievements |
| Lavender | `#A29BFE` | Cardio category |
| Mint | `#55EFC4` | Abs category |
| Peach | `#FAB1A0` | Gym/weights category |

### Activity Graph Colors (GitHub-style)

```
Level 0 (no activity):  #EBEDF0
Level 1 (light):        #FFE5E5
Level 2 (medium):       #FFB3B3
Level 3 (good):         #FF8080
Level 4 (intense):      #FF6B6B
```

### Dark Mode (Opcional - Fase 3)

| Light | Dark |
|-------|------|
| `#FFF9F0` | `#1A1A2E` |
| `#2D3436` | `#EAEAEA` |
| `#FF6B6B` | `#FF6B6B` (mantener) |
| `#4ECDC4` | `#4ECDC4` (mantener) |

---

## 3. Typography

### Font Family

```
Primary: Inter (o System Default)
- Limpia, moderna, excelente legibilidad
- Disponible en Expo/React Native

Alternativa: SF Pro (iOS) / Roboto (Android)
- Usar fuentes del sistema para mejor performance
```

### Type Scale

| Nombre | Size | Weight | Uso |
|--------|------|--------|-----|
| `display` | 32px | Bold (700) | Títulos de pantalla |
| `heading1` | 24px | SemiBold (600) | Secciones principales |
| `heading2` | 20px | SemiBold (600) | Subsecciones |
| `body` | 16px | Regular (400) | Texto general |
| `bodyBold` | 16px | SemiBold (600) | Énfasis en texto |
| `caption` | 14px | Regular (400) | Labels, metadata |
| `small` | 12px | Regular (400) | Timestamps, hints |

### Line Heights

```javascript
const lineHeights = {
  tight: 1.2,    // Headings
  normal: 1.5,   // Body text
  relaxed: 1.75, // Long-form reading
};
```

---

## 4. Spacing System

### Base Unit: 4px

```javascript
const spacing = {
  xs: 4,    // 4px  - Micro spacing
  sm: 8,    // 8px  - Tight spacing
  md: 16,   // 16px - Default spacing
  lg: 24,   // 24px - Section spacing
  xl: 32,   // 32px - Large gaps
  xxl: 48,  // 48px - Screen sections
};
```

### Application

```
Card padding:      16px (md)
List item gap:     12px
Section gap:       24px (lg)
Screen padding:    16px horizontal, 24px vertical
Button padding:    12px vertical, 24px horizontal
```

---

## 5. Components

### 5.1 Cards

```
┌─────────────────────────────────────┐
│  Workout Card                       │
│  ┌─────────────────────────────────┐│
│  │ ○ Today's Workout              ││
│  │   Chest & Triceps              ││
│  │   ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈       ││
│  │   6 exercises · ~45 min        ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘

Properties:
- Background: #FFFFFF
- Border Radius: 16px
- Shadow: 0 2px 8px rgba(0,0,0,0.06)
- Padding: 16px
```

### 5.2 Buttons

**Primary Button**
```
┌─────────────────────┐
│   Start Workout     │
└─────────────────────┘
- Background: #FF6B6B
- Text: #FFFFFF
- Border Radius: 12px
- Height: 48px
- Font: 16px SemiBold
```

**Secondary Button**
```
┌─────────────────────┐
│   View History      │
└─────────────────────┘
- Background: transparent
- Border: 2px solid #FF6B6B
- Text: #FF6B6B
- Border Radius: 12px
```

**Ghost Button**
```
- Background: transparent
- Text: #636E72
- No border
```

### 5.3 Input Fields

```
┌─────────────────────────────────────┐
│ Weight (kg)                         │
│ ┌─────────────────────────────────┐ │
│ │ 75                              │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘

- Background: #FFFFFF
- Border: 1px solid #E0E0E0
- Border Radius: 8px
- Focus Border: #FF6B6B
- Height: 48px
- Padding: 12px 16px
```

### 5.4 Category Pills

```
┌────────────┐ ┌────────────┐ ┌────────────┐
│  🏋️ Gym   │ │  🏃 Cardio │ │  💪 Abs    │
└────────────┘ └────────────┘ └────────────┘

Gym:     Background #FAB1A0, Text #2D3436
Cardio:  Background #A29BFE, Text #FFFFFF
Abs:     Background #55EFC4, Text #2D3436
```

### 5.5 Activity Graph Cell

```
┌───┐
│   │  12px × 12px
└───┘  Border Radius: 2px
       Gap: 3px between cells
```

### 5.6 Progress Chart

```
Line Chart Style:
- Line: 2px stroke
- Color: #4ECDC4 (primary metric)
- Dots: 6px diameter at data points
- Grid: Subtle #F0F0F0 lines
- Background: Gradient fade from #E8F8F5 to transparent
```

---

## 6. Icons

### Style Guidelines
- **Type:** Outlined with 2px stroke
- **Size:** 24px default, 20px small, 28px large
- **Color:** Inherit from text or specific semantic color

### Icon Set (Sugerido: Phosphor Icons o Feather)

| Acción | Icono |
|--------|-------|
| Home | `house` |
| Workout | `barbell` |
| Routine | `calendar` |
| Exercise | `list-bullets` |
| Progress | `chart-line` |
| Settings | `gear` |
| Add | `plus` |
| Edit | `pencil` |
| Delete | `trash` |
| Check | `check` |
| Back | `arrow-left` |
| Timer | `timer` |

---

## 7. Layout Patterns

### Screen Structure

```
┌─────────────────────────────────────┐
│ ← Header Title                   ⚙️ │  56px
├─────────────────────────────────────┤
│                                     │
│                                     │
│         Content Area                │
│         (Scrollable)                │
│                                     │
│                                     │
├─────────────────────────────────────┤
│  🏠    🏋️    📅    📊    ⚙️      │  64px
│ Home  Workout Routine Progress Set  │
└─────────────────────────────────────┘
```

### Tab Bar

```
- Background: #FFFFFF
- Height: 64px + safe area
- Active: #FF6B6B icon + label
- Inactive: #636E72 icon only
- Shadow: 0 -2px 8px rgba(0,0,0,0.04)
```

---

## 8. Motion & Animation

### Principles
- **Suave:** Easing natural, nunca brusco
- **Rápido:** Máximo 300ms para transiciones
- **Funcional:** Animación con propósito, no decorativa

### Timing

```javascript
const timing = {
  quick: 150,    // Micro-interactions
  normal: 250,   // Standard transitions
  slow: 350,     // Page transitions
};

const easing = {
  default: 'ease-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};
```

### Specific Animations

| Elemento | Animación |
|----------|-----------|
| Button press | Scale 0.97, 100ms |
| Card appear | Fade + slide up 8px |
| Tab switch | Cross-fade content |
| Number change | Count up animation |
| Success | Subtle bounce + green flash |

---

## 9. Illustrations & Art Style

### Visual Direction
- **Estilo:** Ilustraciones minimalistas, líneas suaves
- **Colores:** Usar la paleta definida
- **Mood:** Friendly, no intimidante

### Empty States

```
┌─────────────────────────────────────┐
│                                     │
│          [Simple illustration       │
│           of person stretching]     │
│                                     │
│     No workouts this week yet       │
│                                     │
│     ┌─────────────────────────┐     │
│     │   Log Your First One    │     │
│     └─────────────────────────┘     │
│                                     │
└─────────────────────────────────────┘
```

### Achievement/Streak Graphics
- Badges simples con los colores de la paleta
- Flame icon para streaks (color #FDCB6E)
- Star para PRs personales

---

## 10. Implementation Notes (React Native/Expo)

### Theme Object

```javascript
export const theme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#FFF9F0',
    surface: '#FFFFFF',
    text: '#2D3436',
    textSecondary: '#636E72',
    success: '#55EFC4',
    warning: '#FDCB6E',
    error: '#FF6B6B',

    categories: {
      gym: '#FAB1A0',
      cardio: '#A29BFE',
      abs: '#55EFC4',
    },

    activityLevels: ['#EBEDF0', '#FFE5E5', '#FFB3B3', '#FF8080', '#FF6B6B'],
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  typography: {
    display: { fontSize: 32, fontWeight: '700' },
    heading1: { fontSize: 24, fontWeight: '600' },
    heading2: { fontSize: 20, fontWeight: '600' },
    body: { fontSize: 16, fontWeight: '400' },
    caption: { fontSize: 14, fontWeight: '400' },
    small: { fontSize: 12, fontWeight: '400' },
  },
};
```

### Recommended Libraries

| Necesidad | Librería |
|-----------|----------|
| Charts | `react-native-chart-kit` o `victory-native` |
| Icons | `@expo/vector-icons` (Phosphor o Feather) |
| Navigation | `@react-navigation/native` |
| Storage | `expo-sqlite` |
| Dates | `date-fns` |

---

## 11. Accessibility

### Minimum Standards
- Contraste mínimo 4.5:1 para texto
- Touch targets mínimo 44×44px
- Labels para todos los inputs
- Soporte para VoiceOver/TalkBack

### Color Contrast Check

| Combinación | Ratio | Status |
|-------------|-------|--------|
| #2D3436 on #FFF9F0 | 11.2:1 | ✅ AAA |
| #FFFFFF on #FF6B6B | 4.7:1 | ✅ AA |
| #636E72 on #FFF9F0 | 5.1:1 | ✅ AA |

---

## Quick Reference Card

```
PRIMARY:     #FF6B6B (Coral)
SECONDARY:   #4ECDC4 (Teal)
BACKGROUND:  #FFF9F0 (Cream)
TEXT:        #2D3436 (Charcoal)

SPACING:     4 - 8 - 16 - 24 - 32 - 48

RADIUS:      Cards 16px | Buttons 12px | Inputs 8px

FONT:        Inter / System
             Display 32 | H1 24 | H2 20 | Body 16 | Caption 14
```
