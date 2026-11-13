# Trending 1 (templates-trending-01)

24 beat-synced templates written as JSON specs (`specs/`), plus the two format samples (`beat-photo-dump`,
`month-in-lines`): 26 in all, 12 Free and 14 Pro (the two samples are Free). Ids are `nowframe.template.<slug>`. Every template ships a CC0 song whose tempo it
was written for, so its cuts land on the beat without detection; any other song is re-fitted by the app.

Build: `scripts/content/build-templates.sh templates-trending-01`. Review sheets: `build/template-previews/templates-trending-01/`.
How to write a spec: `docs/templates-authoring.md`.

Direction: "cut on the beat, flat and loud". Most cuts are 0.3 to 1.2 s. Punch-ins, zoom pulses, flashes and shakes
land on the beat or the bar. Whips and zooms come on drops, speed ramps on the hero shots, and the type is big and
kinetic: slammed, typed, word by word, popped, slid. Colour cards and chips use the brand gels, flat with no gradients.
Text stays inside the short-form safe area (out of the top 12% and the bottom 20%). No people, no years, no
currency other than $.

| Id | Format | Canvas | Slots | Length | BPM | Track | Tier | Pitch |
|---|---|---|---|---|---|---|---|---|
| `build-and-drop` | Photo dump | 9:16 | 12 | 8.8 s | 122.7 | Night Sun | Pro | Three mono tease shots and a riser, then a zoom-blur drop into eight full-colour one-beat photos |
| `four-up-dump` | Photo dump (grid) | 9:16 | 13 + card | 10.0 s | 120 | Pixel Party | Free | A title card on the tempo, then three 2 × 2 grids that swap on the bar with a tick and a zoom pulse, one full-screen favorite |
| `split-reveal` | Before / after (split screen) | 9:16 | 10 cells, 6 clips | 11.0 s | 98.5 | Make Funk | Free | Mono before over full-colour after, two side-by-side detail pairs, the after with the before in a corner, then the after alone |
| `day-in-timestamps` | Day in my life | 9:16 | 9 | 11.2 s | 139.9 | Birds | Free | A day told by the clock: typed time chips, short captions, quick double cuts, a held night shot |
| `whip-atlas` | Travel recap | 9:16 | 10 | 12.5 s | 115.3 | Love Love Love | Pro | Every cut is a whip on the beat; each city slams in left or right with its coordinates typed under it |
| `room-reset` | Before / after | 9:16 | 8 | 10.2 s | 93.9 | The Brass Brigade | Free | A washed-out before speeds up into the process, then a flash on the beat into the full-colour after |
| `product-drop` | Product reveal | 9:16 | 8 | 11.3 s | 79.9 | Serial | Pro | Dark teaser close-ups with split hits, an RGB smash into the hero, three feature chips, price and call to action |
| `storytime-beats` | Storytime | 9:16 | 8 + 3 cards | 11.2 s | 85.4 | When I Was Human | Pro | One phrase a beat, slammed over mono footage and flat ink, tungsten and violet cards, then a cliffhanger |
| `twelve-months` | Year recap | 9:16 | 12 | 11.4 s | 137.4 | Dancing Bee | Pro | One clip a month, its name slammed in huge on a flat gel block, whips every quarter |
| `fast-recipe` | Food and recipe | 9:16 | 9 | 10.1 s | 118.3 | Happy Dance | Free | Finished dish as the hook, four one-beat ingredients, three numbered steps, a circle reveal into the plate |
| `night-drive` | City and night | 9:16 | 12 | 11.4 s | 99.8 | Midnight Cruiser | Pro | Neon grade, a speed-ramped opener, zoom-blur street cuts, a slow-motion moment with a typed time |
| `zoomies` | Pet moments | 9:16 | 9 | 8.5 s | 120.2 | Pixel Party | Free | Six punch-in cuts with "zoom" popping left and right, then a freeze-frame that lands the pet's name |
| `passport-stamps` | Travel recap | 9:16 | 11 | 12.3 s | 112.1 | Pequeñas Guitarras | Free | Three stops, each opening on a numbered place chip, three cuts on the beat, a push into the next stop |
| `double-time-dump` | Photo dump | 9:16 | 11 | 8.7 s | 151 | Wolf | Pro | A 150 BPM dump: nine photos in a 1-1-2 beat rhythm, a flash every third cut, a split hit on the bar |
| `pov-caption` | POV / text-led | 9:16 | 6 | 12.0 s | 80.2 | Summer Break | Free | One POV line types in and stays, while four moments each add a tungsten chip on the beat |
| `unboxing-in-five` | Unboxing | 1:1 | 5 + 5 cards | 10.8 s | 122.2 | Funky Pop | Free | Five numbered steps on flat colour cards that slide up over the footage on the beat |
| `month-in-numbers` | Month recap | 9:16 | 9 + card | 11.5 s | 99.2 | Make Funk | Pro | Four huge stats that slam in with a snare and a typed tungsten label, each over two quick clips |
| `suspect-profile` | Pet moments | 9:16 | 11 | 14.8 s | 77 | The Black Cat Mask | Pro | A noir case file on your pet: evidence prints with a shutter, typed fact chips, a freeze-frame "last seen" |
| `city-pulse` | City and night | 9:16 | 12 | 10.4 s | 149.6 | Phonk ish | Pro | High-contrast mono streets, shakes on the bar, then a burst of four one-beat cuts, one word each |
| `run-log` | Fitness / progress | 9:16 | 12 | 13.2 s | 167.6 | Calm Before the Storm | Free | A long run in five miles: typed split chips over two cuts per mile, the total popping in at the finish |
| `morning-session` | Fitness / progress | 9:16 | 11 | 8.6 s | 160.6 | Childs Play | Pro | Kit and equipment at 160 BPM: snap-cut speed ramps, set chips, slammed rep counts, shakes on the cuts |
| `todays-list` | Day in my life | 9:16 | 12 | 12.0 s | 119.8 | After Party | Pro | A checklist that writes itself: each errand skids onto a growing list as its clip plays |
| `week-by-week` | Before / after (progress) | 9:16 | 9 | 10.9 s | 104.3 | Stairwell Harmony | Pro | Five stages from one angle with clock wipes and huge week numbers, a flash into the finished result |
| `cafe-crawl` | Food | 1:1 | 11 | 14.9 s | 125 | Empty Stretch | Pro | Three stops, each with a typed name chip and a huge score that punches in with a hit |

Slots count replaceable clips; title cards are flat colour and fixed. Lengths are at the template's own tempo. BPM is
the tempo the template is written for, measured on its song's excerpt (the beat map), which for several tracks differs
from the tempo in the music manifest.

## In the app
The pack is bundled (`Content/TemplatesTrending01.nowframepack`, `scripts/content/bundle-template-pack.sh templates-trending-01`, rerun after every rebuild): all 26 templates work offline and on first launch, with `preview.mp4` for the first 8 in the pack's order only. The other previews download when a card is on screen (the website copy, `publish-content.sh`), and the poster shows until then. The website copy has the same id: with the same version the bundled one stays and is only used for previews, and with a higher version it replaces the bundled one, so bump `specs/pack.json` `version` for a change. `ContentPacks/trending.json` (the catalog's Trending row) is these 26 in pack order, then six of the original starters; `TemplateGallery.bundledTrendingIDs` is the same list for when there is no catalog.

## Gallery categories
Themes: `photodump`, `vlog`, `travel`, `product`, `text`, `recap`, plus the pack-declared `makeover` (Before and after),
`food`, `pets`, `fitness` and `city` (`specs/pack.json`). Every template is tagged `beatsync`, and several
carry a second known tag (`photodump`, `vlog`, `travel`, `product`, `text`, `recap`).

## Notes for the next pack
- `nowframe.sound.tick` (0.05 s) and `nowframe.sound.click` (0.08 s) work now: the compiler pads a cue shorter than the
  app's 0.1 s segment with silence (`four-up-dump`, `split-reveal`).
- The music manifests' `bpm` is not always the tempo at the excerpt the compiler cuts (`start: "preview"`): Birds,
  Doodles, Happy Dance, Serial, Calm Before the Storm, After Party, Empty Stretch and Phonk ish all fit at a different
  tempo. Write a template at the `trackBPM` its `render.json` reports, not at the manifest's number.
- Title cards keep their seconds in the beat fit unless their section has `stretch: true` (needs app build 9). With a
  song far from the template tempo, a card-heavy template (`storytime-beats`, `unboxing-in-five`) drifts slightly off
  the beat until the next clip re-syncs; adding `stretch` to their card sections would fix that (not done here, the
  designer's call).
- Layouts (`four-up-dump`, `split-reveal`) and stretched cards need app build 9 (the pack's `minAppBuild`): older
  builds would keep a placeholder's crop on a filled cell and not re-time cells.
- A slot `look` is now laid over the template look key by key; `room-reset` and `product-drop` changed slightly
  (their slots gained the template's contrast/clarity) and were re-rendered.
