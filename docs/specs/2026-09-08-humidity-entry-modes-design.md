# Humidity entry modes — landed

Phase 3.6 items 1 and 2 of [docs/rewrite-plan.md](../rewrite-plan.md), decided 2026-09-08. The code is the source of truth; this note only records where that landing lives.

- `src/core/entryModes.ts` holds the humidity modes and their conversions.
- `src/core/libraryInputs.ts` resolves an entry through `resolveQuantities`.
- `src/ui/inputs/InputPanel.svelte` renders the humidity mode row.

`hasHumidityGroup` and `hasTemperatureGroup` live in `src/core/modelDeclaration.ts`. `InputSlot.setHumidityMode` lives in `src/state/session.svelte.ts`. The SI pressure display unit is the `pressure` pair in `src/core/units.ts`.

Atmospheric pressure stays at the library default until "Set pressure" brings `environment`.
