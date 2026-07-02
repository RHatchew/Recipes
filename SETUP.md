# Our Recipe Library — Setup

This folder is a complete web app. Host it once, add it to everyone's iPhone home screen, and it behaves like a real app: its own icon, full screen, works offline, and lets you add recipes that sync to the family.

## What's in here

- `index.html` — the app
- `recipes.json` — your recipe data (all 14 recipes are already in here)
- `manifest.webmanifest`, `sw.js` — make it installable and work offline
- `icon-180.png`, `icon-192.png`, `icon-512.png` — the home screen icon
- `SETUP.md` — this file

Keep all of these together in the same folder.

---

## Step 1 — Put it online with GitHub Pages (about 10 minutes, free)

1. Go to github.com and sign in (or create a free account).
2. Click the **+** in the top right, then **New repository**.
3. Name it something simple like `recipes`. Set it to **Public**. Click **Create repository**.
4. On the new repo page, click **uploading an existing file**.
5. Drag in every file from this folder (index.html, recipes.json, both webmanifest and sw.js, and all three icon PNGs). Do not put them in a subfolder; they go at the top level of the repo.
6. Click **Commit changes**.
7. Go to the repo's **Settings** tab, then **Pages** in the left sidebar.
8. Under "Build and deployment," set **Source** to **Deploy from a branch**, branch **main**, folder **/ (root)**. Click **Save**.
9. Wait about a minute, then refresh. GitHub shows your live address, something like:
   `https://YOURNAME.github.io/recipes/`

Open that link on your computer to confirm the library loads.

---

## Step 2 — Add it to each iPhone home screen

On each family member's phone:

1. Open the address from Step 1 in **Safari** (this only works in Safari, not Chrome, on iPhone).
2. Tap the **Share** button (the square with the up arrow).
3. Scroll down and tap **Add to Home Screen**.
4. Name it "Recipes" and tap **Add**.

It now has the fork-and-knife icon and opens full screen. Once opened, it keeps working even with no signal.

That is all the family needs. For them it is a clean, read-only library with search. Only your phone gets the editing setup below.

---

## Step 3 — Turn on Editor mode (your phone only)

You can add recipes two ways. The smooth way commits straight to GitHub from your phone and syncs to everyone. If you would rather not deal with a token, skip to "The no-token way" at the bottom.

### Create a GitHub access token (one time)

1. On github.com, click your avatar (top right), then **Settings**.
2. Bottom of the left sidebar: **Developer settings**.
3. **Personal access tokens** then **Fine-grained tokens**, then **Generate new token**.
4. Give it a name like "recipe app," and an expiration (a year is fine; you will just make a new one when it lapses).
5. Under **Repository access**, choose **Only select repositories** and pick your `recipes` repo.
6. Under **Permissions**, open **Repository permissions**, find **Contents**, and set it to **Read and write**. Leave everything else alone.
7. Click **Generate token** and copy the value (it starts with `github_pat_`). You only see it once.

### Connect the app

1. Open the app on your phone, tap the gear (top right).
2. Switch **Editor mode** on.
3. Fill in your GitHub username, the repo name (`recipes`), leave branch as `main`, and paste the token.
4. Tap **Test connection**. You want the green "Connected" message.
5. Tap **Save settings**.

The token is stored only on your phone, in this app. It can only touch this one repo, so even in the worst case the only thing at risk is your recipe list. If you ever want to revoke it, delete it back on the GitHub tokens page.

---

## Adding and editing recipes

With Editor mode on, you get a **+ Add a recipe** button on the main screen and an **Edit** button on each recipe. Fill in the form, tap **Save recipe**, and the app commits the change to GitHub.

One honest caveat: after you save, GitHub Pages takes about a minute to rebuild. The family sees the new recipe the next time they open or pull-to-refresh the app, not instantly. For recipes that is fine.

Tip: add "(GF)" right next to any ingredient that needs the gluten-free version, the same way the rest of the library does. That keeps the flags inline instead of in a separate callout.

---

## The no-token way (if you skip Step 3's token)

If Editor mode is on but you have not connected GitHub, saving a recipe instead **downloads an updated `recipes.json`**. To sync it: go to your repo on github.com, open `recipes.json`, click the pencil to edit, delete the contents, paste in the new file's contents, and commit. More clicks, but no token to manage.

---

## Backups and moving the data

Your recipes live in `recipes.json` in the repo, and GitHub keeps the full history of every change, so you can roll back a bad edit from the repo's commit history. You can also tap the gear then **Export recipes.json** anytime to save a copy.

---

## Netlify instead of GitHub Pages (optional)

If you ever prefer Netlify: drag this folder onto app.netlify.com/drop to host it instantly. The catch is that the in-app "save to GitHub" still needs the GitHub repo, so GitHub Pages is the simpler all-in-one path and the one I would stick with.
