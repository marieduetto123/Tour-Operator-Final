> Last updated: 2026-05-07 · Nyle Collins (nyle.collins@duettoresearch.com)

# /designer-dev-setup — Duetto Local Environment Setup

Part of a 3-command set: `/designer-dev-setup` (this file) → `/designer-prototype` (optional) → `/designer-pr`.

You are helping a Duetto product designer set up and run the local development environment. This covers both one-time machine setup and the daily startup sequence needed to run the app at `http://localhost:3000/ui/`.

Use plain language. Explain what each step does before running it. Pause at every 👤 step and wait for the user to confirm before continuing. Never enter passwords or tokens — always prompt the user to type these themselves.

---

## On first message

Do not begin running commands. Ask:

> "Are you setting up for the first time, or is your machine already set up and you just need to get the environment running for today?"

- **First time** → ask the pre-flight questions below, then skip phases already done
- **Daily startup** → jump straight to the Daily Startup Sequence at the bottom

---

## Pre-flight Questions (first-time only)

Work through these before doing anything. Skip phases where the answer is already yes.

1. `brew --version` — do you get a version number?
2. `java --version` — does it show OpenJDK 17?
3. `git config --global user.name` — does it show your name?
4. Do you have a GitHub account at github.com using your `@duettoresearch.com` email, with access to the `duettoresearch` org approved?
5. Does `~/dev/duetto-frontend` exist? Does `~/dev/duetto` exist? Does `~/dev/devtools` exist?
6. `docker --version` — do you get a version number?
7. `volta --version` — do you get a version number?
8. `cat ~/.npmrc` — does it reference `duetto.jfrog.io`?
9. Have you ever successfully seen the app at `http://localhost:3000/ui/`?

---

## Phase 1 — Core CLI Tools

- 🤖 Install Homebrew:
  ```shell
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
  This will ask for the Mac password several times — that's normal.
- 🤖 Open a new Terminal, verify: `brew --version`
- 🤖 Install JDK 17: `brew install --cask temurin@17`
- 🤖 Add to `~/.zshrc`: `export JAVA_HOME=$(/usr/libexec/java_home -v17)`
- 🤖 Install jenv: `brew install jenv`
- 🤖 Verify: `java --version` — expect OpenJDK 17
- 🤖 Install Git: `brew install git`
- 🤖 Set Git identity (ask for full name and Duetto email):
  ```shell
  git config --global user.name "Your Full Name"
  git config --global user.email "firstname.lastname@duettoresearch.com"
  ```

---

## Phase 2 — Working Directories

- 🤖 Create the standard dev folder structure:
  ```shell
  mkdir -p ~/dev/data ~/dev/tools ~/dev/logs ~/dev/dbdump
  ```

---

## Phase 3 — Clone Repositories

⏸️ Requires GitHub org access. If not yet granted, file a ticket at https://duettoresearch.atlassian.net/servicedesk/customer/portal/3 and return once approved.

- 👤 Confirm GitHub org access has been approved
- 🤖 Clone the monolith (backend):
  ```shell
  cd ~/dev && git clone https://github.com/duettoresearch/duetto
  ```
- 🤖 Clone the frontend React app:
  ```shell
  cd ~/dev && git clone https://github.com/duettoresearch/duetto-frontend
  ```
- 🤖 Clone devtools (Docker config for databases):
  ```shell
  cd ~/dev && git clone https://github.com/duettoresearch/devtools
  ```

⚠️ There are two copies of `duetto-frontend` on your machine after this: `~/dev/duetto-frontend` and `~/dev/duetto/duetto-frontend` (inside the monolith). Always use `~/dev/duetto-frontend`.

---

## Phase 4 — Docker Desktop

- 👤 Download and install Docker Desktop from https://www.docker.com/products/docker-desktop/
- 👤 Open it and confirm the Docker whale icon appears in the Mac menu bar
- 🤖 Test the database startup:
  ```shell
  cd ~/dev/devtools/docker-compose && docker compose up -d mongo redis
  ```

---

## Phase 5 — Node via Volta

- 🤖 Install Volta (manages the correct Node version automatically):
  ```shell
  curl https://get.volta.sh | bash
  ```
- 🤖 Add to `~/.zshrc`:
  ```
  export VOLTA_HOME="$HOME/.volta"
  export PATH="$VOLTA_HOME/bin:$PATH"
  ```
- 🤖 Reload shell: `exec "$SHELL"`
- 🤖 Verify from inside the frontend repo (Volta auto-installs the right version):
  ```shell
  cd ~/dev/duetto-frontend && node --version
  ```

---

## Phase 6 — Artifactory

Artifactory is Duetto's internal package registry. npm needs it to install frontend dependencies.

- 👤 Log in to https://duetto.jfrog.io
- 👤 Click profile avatar (top right) → Edit Profile → Authentication Settings → Generate Identity Token. Add a description like "local dev". **Copy it immediately — it cannot be retrieved after closing the window.**
- 🤖 Run the npm auth command (ask the designer for their username and token — do not enter credentials yourself):
  ```shell
  curl -u USERNAME:IDENTITY_TOKEN https://duetto.jfrog.io/duetto/api/npm/auth
  ```
- 🤖 Add the output to `~/.zshrc` (prompt the designer to confirm each value):
  ```shell
  export artifactory_npm_auth=<_auth value from curl output>
  export artifactory_npm_email=<email value from curl output>
  export artifactory_npm_auth_token=<Identity Token>
  ```
- 🤖 Create `~/.npmrc`:
  ```
  email=${artifactory_npm_email}
  registry=https://duetto.jfrog.io/duetto/api/npm/duetto-js
  always-auth=true
  //duetto.jfrog.io/duetto/api/npm/:_authToken=${artifactory_npm_auth_token}
  ```
- 🤖 Create `~/.gradle/gradle.properties` (ask for username and token):
  ```
  dev=/Users/<username>/dev/
  artifactory_url=https://duetto.jfrog.io/duetto
  artifactory_duetto_repo=https://duetto.jfrog.io/duetto/duetto-java
  artifactory_user=<Artifactory username>
  artifactory_password=<Identity Token>
  ```
- 🤖 Reload shell: `exec "$SHELL"`

---

## Phase 7 — Backend First Run (one-time only)

Seeds the local database and creates the test login. Only needed once per machine.

- 🤖 Create the local app config at `~/dev/duetto/tools/src/main/resources/user.properties`:
  ```
  dev.dbname=dev
  dev.testdb=test
  ui.useCompiledResources=false
  redis.group=localhost
  redis.port=6379
  import_user=import_test@duettoresearch.com
  ```
- 👤 Open IntelliJ → File → Open → select the `~/dev/duetto` folder
- 👤 From the Run/Debug Configurations dropdown (top right), run **SchemaBuilder**. Before running, go to Edit Configurations and set Program arguments to: `--adminPwd=test1234 --drop=1`. When prompted `Are you sure you want to continue (type yes6 to continue)?` — type `yes6`. Wait for it to finish.
- 👤 Run **SessionGenerator** from the same dropdown (no extra arguments). Wait for it to finish.

These steps create the `admin@abc.com / test1234` login used for local development.

---

## Phase 8 — Install Frontend Dependencies

- 🤖 Source credentials and install packages:
  ```shell
  source ~/.zshrc && cd ~/dev/duetto-frontend && npm install
  ```
  Warnings about peer dependencies and vulnerabilities are normal — ignore them.

---

## Daily Startup Sequence

Every time you want to run the app locally, work through these steps in order.

**1 — Start the databases**
```shell
cd ~/dev/devtools/docker-compose && docker compose up -d mongo redis
```
Open Docker Desktop first if the whale icon isn't in your menu bar yet.

**2 — Pull latest monolith code**
```shell
cd ~/dev/duetto && git pull
```
Check how far behind it is first — if it's more than a few commits, a pull is especially important to avoid stale backend behaviour.

**3 — Start the backend (IntelliJ)**
Open IntelliJ and run **RunServer** from the Run/Debug Configurations dropdown.
Wait until you see this line in the console:
```
Started ServerConnector@...{HTTP/1.1,(http/1.1)}{0.0.0.0:8080}
```
This typically takes 1–3 minutes. If it fails, run **DbUpgrader** first, then try RunServer again.

**4 — Pull latest frontend code**
```shell
cd ~/dev/duetto-frontend && source ~/.zshrc && git checkout develop && git pull
```

**5 — Install any new packages** (run if you see missing module errors)
```shell
npm install
```

**6 — Update GraphQL types** (run if you see GraphQL errors)
```shell
npm run codegen:ts
```
This pulls the latest schema from the running backend. Fine to skip unless you see errors.

**7 — Start the frontend dev server**
```shell
$HOME/.volta/bin/node src/server/server-dev.js --quiet &
```
⚠️ Do not use `npm start` — it picks up the wrong Node version in background sessions and silently crashes.

Wait for `Compiled successfully.` in the terminal before opening the browser.

**8 — Open the app**
Go to `http://localhost:3000/ui/` and log in with:
- Email: `admin@abc.com`
- Password: `test1234`

These credentials only work against a local backend. They will not work on staging.

---

## Stopping the Environment

- **Frontend:** `pkill -f "server-dev.js"`
- **Databases:** `cd ~/dev/devtools/docker-compose && docker compose stop`
- **Backend:** Stop the RunServer process in IntelliJ (red square button)

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `npm install` fails with auth error | Run `source ~/.zshrc` first to load Artifactory tokens |
| Blank page at `localhost:3000/ui/` | Still compiling — wait for `Compiled successfully.` |
| `RangeError: Maximum call stack size exceeded` in browser | Wrong Node version — use `$HOME/.volta/bin/node`, not `npm start` |
| Login fails at `localhost:3000/ui/` | Backend not running — complete step 2 |
| GraphQL errors in terminal | Run `npm run codegen:ts`, then restart the dev server |
| IntelliJ RunServer fails on startup | Run DbUpgrader first, then RunServer again |
| Two `duetto-frontend` folders exist | Always use `~/dev/duetto-frontend` — ignore `~/dev/duetto/duetto-frontend` |
