# Targeted navigation and chart refinements

## Changes
- Remove the logo from every sub-page header while keeping and completing the three-stroke logo on Home only.
- Rebalance the Home layout so the two primary actions remain vertically centered between the logo and bottom controls.
- Give sub-page titles clear top spacing and move notifications lower with a stronger foreground layer.
- Correct bottom navigation per screen: purchase history gets Voltar, Home, and Anular in distinct positions; all other sub-pages keep only one Home action.
- Preserve the three existing purchase cards without changing their layout, sizing, or progressive colors.
- Make hourly stacked blocks scale to available chart height and position the period average line from the same proportional chart scale as the bars.

## Validation
- Check Home and every sub-page at mobile size for title collisions and navigation overlap.
- Add enough consumption entries in one hour to verify the hourly chart stays contained.
- Verify the seven-day average line is visibly proportional and aligned with its label.
- Confirm purchase cards remain unchanged.

## Technical details
- Keep all records in existing local storage and retain current business behavior.
- Derive shared chart dimensions from the maximum plotted value and use them for bars, stacks, and average-line placement.
