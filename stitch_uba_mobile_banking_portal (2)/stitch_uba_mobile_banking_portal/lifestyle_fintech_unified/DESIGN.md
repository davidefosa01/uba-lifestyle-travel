---
name: Lifestyle & Fintech Unified
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#5d3f3c'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#926f6b'
  outline-variant: '#e6bdb8'
  surface-tint: '#c00014'
  primary: '#ae0011'
  on-primary: '#ffffff'
  primary-container: '#d71920'
  on-primary-container: '#ffece9'
  inverse-primary: '#ffb4ab'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e4e2e1'
  on-secondary-container: '#656464'
  tertiary: '#525556'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b6d6e'
  on-tertiary-container: '#eff0f1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000d'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e3e2e2'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  flexpay-badge:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '800'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-margin-mb: 20px
  container-margin-dt: 80px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 64px
---

## Brand & Style

This design system establishes a premium, high-trust visual language that bridges the gap between secure banking and aspirational travel experiences. The brand personality is **Professional, Curated, and Effortless**. It targets high-net-worth and emerging middle-class users who demand the reliability of a tier-one bank with the seamless usability of modern travel marketplaces.

The design style is **Corporate Minimalism** with a **Tactile Edge**. It utilizes expansive white space and a rigid grid to signal "Banking-grade trust," while incorporating subtle depth and high-quality photography to provide the "Airbnb simplicity." The "FlexPay" sub-brand utilizes the primary red to highlight financial flexibility without compromising the premium feel.

## Colors

The palette is derived directly from the UBA brand identity to maintain institutional trust, but applied with greater restraint to suit a lifestyle marketplace.

- **Primary Red (#D71920):** Reserved for high-intent actions, "FlexPay" branding, and critical status indicators. Use it sparingly as a high-contrast accent.
- **Deep Slate (#333333):** Used for primary text, iconography, and structured borders. It provides a more sophisticated alternative to pure black.
- **Surface & Soft Grey:** A tiered system of neutrals (from #FFFFFF to #F8F9FA) creates the "Airbnb" clean-room effect, allowing travel imagery to be the focal point.
- **Status Colors:** Use standard semantic greens and ambers, but desaturate them to match the professional tone of the primary red.

## Typography

The typography strategy uses a "Dual-Engine" approach. **Montserrat** is used for headlines to convey confidence and modern structural integrity. **Inter** is used for all functional body copy, data points, and UI labels to ensure "Banking-grade" legibility and a systematic feel.

- **Scale:** Use a tight typographic scale for data-heavy fintech views, but switch to generous leading and larger sizes for editorial travel descriptions.
- **Hierarchy:** Maintain a clear contrast between the bold Montserrat headings and the neutral Inter body text to help users scan complex travel itineraries quickly.
- **FlexPay Branding:** The FlexPay feature uses Montserrat in All-Caps Bold at small sizes to function as a distinctive "Trust Seal."

## Layout & Spacing

This design system utilizes a **Fixed-Fluid Hybrid Grid**. On mobile, it follows a 4-column structure with 20px margins. On desktop, it transitions to a 12-column centered grid (max-width 1280px).

- **The 4px Baseline:** All spatial decisions are increments of 4px.
- **Generous Gutters:** To achieve the "Airbnb simplicity," vertical spacing between sections (Section Gaps) should be significantly larger than standard enterprise apps (64px+) to create a sense of luxury and breathing room.
- **Fintech Density:** Within card components (e.g., booking details or payment plans), spacing shifts to a tighter 8px/16px rhythm to maintain functional efficiency.

## Elevation & Depth

The system uses **Tonal Layering** supplemented by **Ambient Shadows** to create a structured hierarchy without visual clutter.

- **Surface Tiers:** Backgrounds use #FFFFFF. Primary cards and containers use #FFFFFF with a very subtle 1px border (#EEEEEE).
- **Shadow Profile:** Shadows should be "soft-touch"—using the primary secondary color (#333333) at 4-6% opacity with high blur radii (16px to 32px) and no horizontal offset. This creates a "hovering" effect rather than a "stacked" effect.
- **FlexPay Elevation:** Components related to FlexPay utilize a slightly higher elevation or a subtle red-tinted glow to distinguish financial services from static content.

## Shapes

The shape language is **Refined Geometry**. 

- **Primary Radius:** 8px (0.5rem) is the standard for cards, input fields, and standard buttons. This balances the friendliness of travel apps with the precision of banking.
- **Large Radius:** 16px (1rem) is used for large promotional banners and high-level containers to soften the layout.
- **FlexPay Icons:** Circular containers (pill-shaped) are reserved for "FlexPay" badges and status chips to make them pop against the predominantly rectangular grid.

## Components

### Buttons
- **Primary:** Solid #D71920 with white Montserrat text. High-contrast, used for "Book Now" or "Pay."
- **Secondary:** Transparent with a 1.5px #333333 border. Used for "View Details" or "Filters."
- **FlexPay Action:** A unique gradient or primary-tinted button with the FlexPay logo integrated.

### Input Fields
- Understated design: 1px border (#E0E0E0) that thickens and turns #333333 on focus. Labels are Inter Medium, 12px, positioned consistently above the field.

### Cards
- **Marketplace Cards:** High-quality image (aspect ratio 4:3) with 0px top radius and 8px bottom radius.
- **Fintech/Payment Cards:** White background, 8px radius, subtle shadow, featuring a clear "FlexPay" installment breakdown at the footer.

### Chips & Badges
- **Status Badges:** Small, caps-heavy text in Inter. Backgrounds are very light tints of the status color (e.g., 10% opacity).
- **FlexPay Badge:** A pill-shaped badge with a #D71920 background and white Montserrat bold text.

### Navigation
- **Mobile Tab Bar:** Clean white background, thin top border (#EEEEEE), active state indicated by Primary Red icons and labels.
- **Desktop Header:** Minimalist, high-set, with a clear separation between the "Marketplace" search and "User Profile/Wallet."