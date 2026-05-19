# Travel Distribution Calendar — Claude Working Notes

## Workflow
After **every set of code changes**, always:
1. `git add .`
2. `git commit -m "description"`
3. `git push`
4. `vercel --prod --yes`

Or run `./deploy.sh "commit message"` which does all four steps.

## Repo
- GitHub: https://github.com/marieduetto123/travelcore-rm-hub
- Vercel: https://travelcore-rm-hub.vercel.app
- Working dir: /Users/marie/Tour-Operator-Final-1

## Project structure (Vite + React + Tailwind)

```
src/
  app/                    # Root application shell
    App.tsx
  components/
    ui/                   # Shared UI primitives
      Icon.tsx
    calendar/             # Calendar feature components
      CalendarApp.tsx
      index.ts            # Public exports
  context/
    CalendarContext.tsx   # Calendar state provider
  data/                   # Static data & config
    calendarData.ts
    filterOptions.ts
    heatmapTypes.ts
  lib/calendar/           # Calendar business logic
    metrics.ts
    heatmap.ts
  styles/                 # Global & feature CSS
    index.css             # Tailwind entry
    calendar.css          # Calendar-specific styles
  main.tsx
  vite-env.d.ts
legacy/                   # Original vanilla HTML/CSS/JS app
```

Import alias: `@/` → `src/` (configured in `vite.config.ts` and `tsconfig.json`).

## Commands
- `npm run dev` — http://localhost:3000
- `npm run build` — outputs `dist/`

## Vercel project ID
`prj_NsOYsSZ4pDONmV2BgnB6DrJPhlGR`
