# Humidity entry modes — landed

Phase 3.6 items 1 and 2 of [docs/rewrite-plan.md](../rewrite-plan.md), decided 2026-09-08. The code is the source of truth; this note only records where that landing lives.

- `src/core/entryModes.ts` holds the humidity modes and their conversions.
- `src/core/libraryInputs.ts` resolves an entry through `resolveQuantities`.
- `src/ui/inputs/InputPanel.svelte` chooses the mode with `EntryGroupMenuButton`.

`hasHumidityGroup` and `hasTemperatureGroup` live in `src/core/modelDeclaration.ts`. `Session.setHumidityMode` lives in `src/state/session.svelte.ts`. Humidity conversions read the session's atmospheric pressure. The SI display unit for vapour pressure is the `pressure` pair in `src/core/units.ts`.
