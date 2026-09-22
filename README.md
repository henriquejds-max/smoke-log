# Smoke Log

Create a production-ready, mobile-first PWA for iPhone called "Waste Management" for tobacco expense and consumption tracking. All data must persist locally via localStorage.

Visual Aesthetics & Layout:

- Background: Soft, classic light gray (#F4F4F6).

- Typography: Refined editorial pairing using "Playfair Display" for titles and main numeric values, and a clean sans-serif like "Inter" for tables and small controls. Cards have subtle, soft shadows and rounded corners.

- Header: Centered minimalist Wayne-Enterprises stylized "W" logo made of 3 stylized black cigarettes. Positioned as in the original layout, but prominently sized (larger than default). DO NOT display any text title like "Waste Management" on the home screen—ONLY the "W" logo.

Main Screen ("Página Inicial"):

- Centered prominent action buttons: "Registar Compra" (classic muted terracotta red) and "Registar Consumo" (classic muted sage green).

- Bottom navigation area (with safe padding pb-10 for mobile screens):

  * Bottom-left: subtle pill button "CONSULTAR".

  * Bottom-right: pure text option in bold dark red reading "Reverter" (NO button border, pill, or background).

- Clicking "Reverter" opens a prompt modal with two options:

  1. Left: "Remover Último". Immediately removes the most recent consumption record from localStorage, triggers device haptic feedback (navigator.vibrate(50)), and shows a 3-second temporary confirmation notification with a top-right 'X' to dismiss manually.

  2. Right: "Ver Registos". Navigates to the consumption log view.

"Ver Registos" View (Consumption Log):

- Displays a table of individual consumption records: columns for "Dia e Hora", "Maço Registado", "Valor do Maço", "Custo Unitário", and an individual 'X' action per row.

- Each logged cigarette automatically snapshots the current active pack details (defaulting to Marlboro Classic 6.20€ / 0.310€ if no purchases exist yet).

- Progressive pagination controls: starts at 10 records. An "Expandir" button steps up the limit (10 -> 20 -> 50 -> 100). A reverse button steps down (100 -> 50 -> 20 -> 10). "Expandir" is hidden when at 100; reverse button is hidden when at 10.

- Multi-select checkboxes next to rows with a batch action button: "Eliminar selecionados".

- Clicking an individual 'X': opens a confirmation dialog ("Anular Registo" / "Cancelar"). When confirmed, deletes the entry, updates state, and shows a 3-second confirmation toast with an 'X' to close.

- Centered discrete "Home" button at the bottom.

"Registar Compra" Screen:

- Displays 3 pack selection cards with progressive shades of sober muted red from lighter to darker according to price:

  1. "Marlboro Classic" (6.20 €, 20 cig, 0.310 €/cig) - light muted terracotta red.

  2. "Marlboro Box 22" (6.30 €, 22 cig, 0.286 €/cig) - medium muted red.

  3. "Marlboro Box 26" (7.00 €, 26 cig, 0.269 €/cig) - darker muted wine/bordô red.

- Pack titles must be significantly larger and visually prominent at the top of each card.

- In "Consultar Histórico":

  * Bottom navigation features a centered "Home" button.

  * To the left of Home, add an "Anular" button. Clicking "Anular" reveals a small red 'X' next to the value of each purchase row.

  * Clicking this 'X' opens confirmation ("Confirmar" / "Cancelar") to delete that purchase, recalculates all totals, and displays a 3-second dismissible confirmation toast.

"Consultar" Screen & Charts:

- Header label: selecting preset filters (Hoje, 7 dias, 14 dias, 30 dias, 3 meses) or Calendar displays the period name (e.g., "Últimos 7 dias") with the exact date interval underneath (e.g., "16/09/2026 - 22/09/2026") instead of only today's date.

- Chronology: charts must be ordered strictly chronologically from the oldest date on the left to the most recent/today on the right.

- Daily View ("Hoje" - hourly): hourly vertical bars must NOT be a solid block. Render discrete stacked rectangular segments for each cigarette consumed in that hour (e.g., 4 cigarettes = 4 individual stacked blocks). Display the total number of cigarettes above each bar.

- Period Views (7 days, 14 days, 30 days, 3 months): standard vertical bars with total cigarette counts above each bar, plus a horizontal dashed reference line indicating the average for that period with its numeric value.

- Centered discrete "Home" button at the bottom.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/accfcd43-65e1-4010-9172-4a2ec1ea9d17).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
