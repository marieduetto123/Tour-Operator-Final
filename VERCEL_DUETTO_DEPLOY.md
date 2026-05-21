# Vercel Deploy Setup — Duetto Team

Instructions for deploying the **TravelCore RM Hub** static HTML prototype (`travelcore-rm-hub.html`) under the **Duetto** Vercel team, on a URL separate from the production MFE.

---

## Overview

| Project | Production URL | Purpose |
|---------|----------------|---------|
| [blast-mfe-tour-operator](https://vercel.com/duetto/blast-mfe-tour-operator) | https://blast-mfe-tour-operator-duetto.vercel.app | **Monorepo MFE** (Vite + pnpm) |
| tour-operator-final (personal) | https://tour-operator-final.vercel.app | **This HTML prototype** (current deploy target) |

This repo is **static HTML** — it is **not** the Blast monorepo app. Do not deploy it to `blast-mfe-tour-operator` production without team approval.

---

## Why not `blast-mfe-tour-operator` directly?

The Duetto project `blast-mfe-tour-operator` is configured for a monorepo build:

| Setting | Value |
|---------|--------|
| Root Directory | `apps/tour-operator` |
| Build Command | `cd ../.. && pnpm install --frozen-lockfile && pnpm --filter @duetto/tour-operator run build` |
| Output Directory | `dist` |
| Framework | Vite |

This prototype repo has no `apps/tour-operator` folder. A CLI deploy fails with:

> The provided path `apps/tour-operator` does not exist

Deploying here with `--prod` would **replace** the live MFE at https://blast-mfe-tour-operator-duetto.vercel.app.

---

## Recommended setup

### Step 1 — Ask a Duetto admin to create a project

Someone with **admin access** on the [duetto team](https://vercel.com/duetto) should create a new project, e.g.:

**`tour-operator-hub-prototype`**

Use these settings for a **static HTML** deploy:

| Setting | Value |
|---------|--------|
| Framework | Other / None |
| Root Directory | `.` (repo root) |
| Build Command | *(empty)* |
| Output Directory | `.` |
| Install Command | *(empty)* |

The existing `vercel.json` rewrites are compatible:

```json
{
  "rewrites": [
    { "source": "/rate-management", "destination": "/rate-management.html" },
    { "source": "/calendar",        "destination": "/travelcore-rm-hub.html" },
    { "source": "/",                "destination": "/travelcore-rm-hub.html" }
  ]
}
```

**Note:** The account `mariedare-1502` can access the Duetto team but **cannot create new projects** without admin permission.

---

### Step 2 — Link your local folder to the new Duetto project

Once the admin creates the project:

```bash
cd /Users/marie/Desktop/Tour-Operator-Final-1

# Switch to Duetto team + new project
vercel link --scope duetto --project tour-operator-hub-prototype
```

Choose **Duetto** when prompted for scope.

This updates `.vercel/project.json` in the repo (gitignored).

---

### Step 3 — Preview deploy (safe test)

```bash
vercel deploy
```

You will get a preview URL like:

```
https://tour-operator-hub-prototype-xxxxx-duetto.vercel.app/travelcore-rm-hub.html
```

Verify the app before promoting to production.

---

### Step 4 — Production deploy

When the preview looks correct:

```bash
vercel deploy --prod
```

Default production URL will be something like:

```
https://tour-operator-hub-prototype-duetto.vercel.app
```

App entry point:

```
https://tour-operator-hub-prototype-duetto.vercel.app/travelcore-rm-hub.html
```

---

### Step 5 — Custom URL (optional)

In **Vercel → tour-operator-hub-prototype → Settings → Domains**, add a custom domain, e.g.:

- `tour-operator-preview.duettoresearch.com`

Follow Vercel’s DNS instructions (typically a CNAME to Vercel). This gives a stable Duetto-branded URL separate from the default `*.vercel.app` names.

---

### Step 6 — Connect Git (optional, for branch deploys)

In the new Vercel project:

1. Go to **Connect Git Repository**
2. Select `marieduetto123/Tour-Operator-Final`
3. Set the production branch (e.g. `main`)
4. Enable preview deployments for feature branches (e.g. `Weekly-updates`)

Each push to a branch will auto-deploy with its own preview URL.

**GitHub repo:** https://github.com/marieduetto123/Tour-Operator-Final

---

### Step 7 — Password protection (optional)

In **Settings → Deployment Protection → Password Protection**:

- Enable for **Preview** and/or **Production**
- Set a shared password

Documentation: [Vercel Password Protection](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection)

**Requirements:** Pro plan (paid add-on) or Enterprise on the Duetto team.

**Related protection types:**

| Type | Behavior |
|------|----------|
| **Vercel Authentication** | Only team members can access (common on previews; shows login, not password) |
| **Password Protection** | Anyone with the password can access |
| **Trusted IPs** | Restrict by IP address |

---

## If you must use `blast-mfe-tour-operator`

Only if the goal is to **replace the MFE** with this HTML app (coordinate with the team first):

1. Duetto admin changes **Root Directory** from `apps/tour-operator` → `.`
2. Clears build command / sets output to `.`
3. Locally: `vercel link --scope duetto --project blast-mfe-tour-operator`
4. Run `vercel deploy --prod`

This overwrites https://blast-mfe-tour-operator-duetto.vercel.app with the static hub.

---

## Message for Duetto admin (copy/paste)

> Please create a Vercel project under **duetto** named **tour-operator-hub-prototype** for a static HTML deploy (no build, root `.`, output `.`). Connect it to GitHub repo **marieduetto123/Tour-Operator-Final** and grant **mariedare-1502** deploy access. Optional: add custom domain **tour-operator-preview.duettoresearch.com**.

---

## Current local setup

- **CLI account:** `mariedare-1502`
- **Duetto team access:** Yes
- **Duetto project create permission:** No (admin required)
- **Local `.vercel` link:** `tour-operator-final` (personal project)

To restore the personal project link after testing Duetto:

```bash
vercel link --scope mariedare-1502s-projects --project tour-operator-final
```

---

## Quick reference — URLs

| Environment | URL |
|-------------|-----|
| Personal production | https://tour-operator-final.vercel.app/travelcore-rm-hub.html |
| Duetto MFE (do not overwrite) | https://blast-mfe-tour-operator-duetto.vercel.app |
| New prototype (after setup) | `https://tour-operator-hub-prototype-duetto.vercel.app/travelcore-rm-hub.html` |

---

## Deploy script (personal project)

The repo includes `deploy.sh` for the **personal** project workflow:

```bash
./deploy.sh "commit message"
```

This runs `git add`, `commit`, `push`, and `vercel --prod --yes` against the currently linked Vercel project. Re-link before running if targeting Duetto instead.

---

*Last updated: May 2026*
