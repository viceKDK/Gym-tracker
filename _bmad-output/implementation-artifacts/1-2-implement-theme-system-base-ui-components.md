# Story 1.2: Implement Theme System & Base UI Components

Status: review

## Story

As a **user**,
I want **the app to have a warm, cohesive visual design**,
So that **it feels welcoming and personal, not like a generic fitness app**.

## Acceptance Criteria

**Given** the theme file exists at src/theme/index.ts
**When** a component imports the theme
**Then** it has access to colors (primary: #FF6B6B, secondary: #4ECDC4, background: #FFF9F0, surface: #FFFFFF, text: #2D3436, textSecondary: #636E72, border: #DFE6E9, error: #E74C3C, success: #27AE60, activityLevels array)
**And** spacing values (xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48)
**And** borderRadius values (sm: 4, md: 8, lg: 12, xl: 16, full: 9999)
**And** typography definitions (h1, h2, h3, body, caption)

**Given** ThemeContext is implemented
**When** a component uses useTheme() hook
**Then** it receives the theme object with all defined values

**Given** the base UI components are created
**When** Button component is rendered with variant "primary"
**Then** it displays with coral background (#FF6B6B), white text, 12px border radius, and minimum 44x44 touch target

**Given** the Card component is rendered
**When** it contains child content
**Then** it displays with white background, 16px border radius, 16px padding, and subtle shadow

**Given** the NumericInput component is rendered
**When** the user taps on it
**Then** a numeric keyboard appears for input

## Tasks / Subtasks

- [x] Task 1: Create Theme System (AC: #1)
  - [x] Create src/theme/index.ts with complete theme object
  - [x] Define colors object with all specified values
  - [x] Define spacing scale
  - [x] Define borderRadius scale
  - [x] Define typography definitions
  - [x] Export TypeScript types for theme

- [x] Task 2: Implement ThemeContext and useTheme Hook (AC: #2)
  - [x] Create src/contexts/ThemeContext.tsx
  - [x] Create ThemeProvider component
  - [x] Create useTheme() custom hook
  - [x] Export from src/contexts/index.ts

- [x] Task 3: Create Button Component (AC: #3)
  - [x] Create src/components/ui/Button.tsx
  - [x] Implement primary variant with coral background
  - [x] Implement secondary variant with teal background
  - [x] Ensure minimum 44x44 touch target (NFR11)
  - [x] Add loading state support

- [x] Task 4: Create Card Component (AC: #4)
  - [x] Create src/components/ui/Card.tsx
  - [x] Implement white background with 16px border radius
  - [x] Add subtle shadow
  - [x] Support children prop

- [x] Task 5: Create NumericInput Component (AC: #5)
  - [x] Create src/components/ui/NumericInput.tsx
  - [x] Configure numeric keyboard type
  - [x] Support label and placeholder props
  - [x] Style with theme values

- [x] Task 6: Verify and Export Components
  - [x] Create src/components/ui/index.ts barrel export
  - [x] Run TypeScript compilation check
  - [x] Verify all components render correctly

## Dev Notes

### Design System Source

**Color Palette (from UX Design Specification):**
- Primary: Coral #FF6B6B - Main actions, active states
- Secondary: Teal #4ECDC4 - Secondary actions, accents
- Background: Cream #FFF9F0 - App background
- Surface: White #FFFFFF - Cards, modals
- Text: Dark Gray #2D3436 - Primary text
- TextSecondary: Medium Gray #636E72 - Secondary text
- Border: Light Gray #DFE6E9 - Dividers, borders
- Error: Red #E74C3C - Error states
- Success: Green #27AE60 - Success states

**Activity Levels (for activity graph):**
- Level 0: #EBEDF0 (neutral gray - no activity)
- Level 1: #FFE5E5 (lightest coral)
- Level 2: #FFB3B3
- Level 3: #FF8080
- Level 4: #FF6B6B (full coral - high activity)

**Spacing Scale:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px

**Border Radius:**
- sm: 4px
- md: 8px
- lg: 12px (buttons)
- xl: 16px (cards)
- full: 9999px (pills, circles)

**Typography:**
- h1: 28px, bold
- h2: 24px, bold
- h3: 20px, semibold
- body: 16px, regular
- caption: 14px, regular

[Source: architecture.md - Section "Design System", UX Design Specification]

### NFR Compliance

- NFR11: Touch targets minimum 44x44 points - Button must enforce this
- NFR12: Text readable (minimum 14pt body text) - Typography ensures this

### References

- [Source: architecture.md#Design System] - Complete design token definitions
- [Source: ux-design-specification.md] - Visual design requirements
- [Source: epics.md#Story 1.2] - Story definition

## Dev Agent Record

### Agent Model Used

claude-opus-4-5-20251101

### Completion Notes List

- Theme system created: [x]
- ThemeContext implemented: [x]
- Button component created: [x]
- Card component created: [x]
- NumericInput component created: [x]
- TypeScript compiles: [x]

### File List

**Created:**
- src/theme/index.ts - Complete design system with colors, spacing, typography, shadows
- src/contexts/ThemeContext.tsx - ThemeProvider and useTheme hook
- src/contexts/index.ts - Barrel export for contexts
- src/components/ui/Button.tsx - Button with primary/secondary/outline/ghost variants
- src/components/ui/Card.tsx - Card with elevated/outlined/filled variants
- src/components/ui/NumericInput.tsx - Numeric input with decimal-pad keyboard
- src/components/ui/index.ts - Barrel export for UI components

### Implementation Notes

- All color values match UX Design Specification exactly
- Button enforces minimum 44x44 touch target per NFR11
- Typography ensures minimum 14pt body text per NFR12
- Card supports both static display and pressable interaction
- NumericInput filters input to allow only numeric values
- Added shadows object for consistent elevation styles
- All components use useTheme() hook for consistent styling
