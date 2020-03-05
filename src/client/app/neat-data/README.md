# Rough Notes for NEAT DATA UI

Goal is to create responsive layout for neat-data view. The approach is to place within `NeatDataPageComponent` three different layouts; we choose one based on the logic in `get-device.ts`.

To make this work, we need to have a clear sense of the different components involved, and how they respond to css wrappers.

- `NeatDataTitleComponent`: expander component (will simply assume 100% width and height of container)

- `NeatDataTableComponent`: `width: 100%`, `height: auto` depending on entries in table.
