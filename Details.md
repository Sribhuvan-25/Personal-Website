# Automated AI-Generated Tech Blog – Full Implementation Plan

## Task

Build a **nightly, fully‑automated tech‑news blog** for your React + Tailwind personal site (hosted on Vercel).  
Posts are AI‑generated, include a hero image, carry auto‑generated tags, and publish every evening at **8 PM Eastern** via a GitHub Actions cron job.

---

## Goals

1. **Zero‑cost stack** (free models & services).
2. **Multi‑agent workflow** for clarity and future swaps.
3. **File‑based storage** (Markdown + images) to keep the site static; DB can be added later.
4. **Medium‑style, 5‑min read** posts (≈900 words) that are factually grounded.
5. Seamless **frontend integration**: `/blog` list page, tag filters, individual post routes.

---

## High‑Level Design

```
Scheduler (GitHub Actions cron)
          │
          ▼
Extractor → Summariser → Writer → Reviewer → Image/Tagger
          │                                   │
          └──────────────Publisher (Markdown + image)───┐
                                                        ▼
                                              Push to Git → Vercel build → Live site
```

*Agents implemented with LangChain **or** CrewAI pattern; Writer/Reviewer use free Llama‑3 endpoints.*

---

## Step‑by‑Step Implementation

### 0  Repository Scaffold  

| Path | Purpose |
|------|---------|
| `agents/` | Python code for all agents |
| `content/posts/` | Markdown blog posts |
| `public/blog_img/` | Hero images |
| `vite.config.js` | add MDX plugin |
| `src/routes/Blog.jsx` | blog index page |
| `src/routes/Post.jsx` | single post page |
| `src/components/TagFilter.jsx` | tag UI |

Commit initial skeleton:

```bash
git add . && git commit -m "scaffold: AI blog pipeline + frontend shells"
```

---

### 1  Secrets

| Secret | Why |
|--------|-----|
| `TOGETHER_API_KEY` | free Llama‑3 inference |
| `UNSPLASH_ACCESS_KEY` | hero image API |
| `GITHUB_TOKEN` | auto‑generated, for Git push |
| *(opt)* `NEWSAPI_KEY` | if using NewsAPI instead of pure RSS |

Add under **Repo → Settings → Secrets → Actions**.

---

### 2  Python Environment

Create `requirements.txt`:

```text
feedparser==6.0.11
newspaper3k==0.2.8
transformers==4.41.0
accelerate==0.29.3
langchain==0.2.0
crewai==0.0.17
rake-nltk==1.0.6
python-frontmatter==1.0.0
requests==2.32.2
pillow==10.3.0
gitpython==3.1.43
```

Local test:

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python agents/pipeline.py --dry_run
```

---

### 3  Agent Modules

| File | Key points |
|------|------------|
| `extractor.py` | Parse RSS feeds with **feedparser**, pull full text via **newspaper3k**. |
| `summariser.py` | Use `facebook/bart-large-cnn` pipeline to condense each article to a bullet. |
| `writer.py` | Call Together AI Llama‑3 (8‑B) with a prompt expanding the outline to ~900 words. |
| `reviewer.py` | Second Llama‑3 pass: grammar, tighten length <1000 words, keep Markdown. |
| `image_tag.py` | • Unsplash random search → download image<br>• RAKE keyword extraction → 3‑5 tags; map to canonical list. |
| `utils.py` | helper funcs (slugify, Git commit, etc.). |

---

### 4  Pipeline Orchestrator (`agents/pipeline.py`)

```python
def main():
    art = extractor.collect_articles()
    outline, bullets = summariser.outline(art)
    raw = writer.draft(outline)
    final = reviewer.review(raw)

    slug = "-".join(final.split()[0:6]).lower()
    img_path, credit, link = image_tag.fetch_image(bullets[0], slug)
    tags = image_tag.extract_tags(final)

    write_markdown(final, slug, img_path, credit, link, tags)
    update_index(slug, tags)
    commit_and_push()
```

`write_markdown` produces:

```yaml
---
title: "AI Chip Beats Benchmark X"
date: "2025-05-22"
tags: ["AI","Hardware"]
hero: "/blog_img/ai-chip.jpg"
image_credit: "John Doe (Unsplash)"
---
<Markdown body>
```

---

### 5  GitHub Actions Scheduler (`.github/workflows/blog.yml`)

```yaml
on:
  schedule:
    - cron: '0 0 * * *'   # 8 PM EDT
    - cron: '0 1 * * *'   # 8 PM EST

jobs:
  nightly-blog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.11' }
      - run: pip install -r requirements.txt
      - env:
          TOGETHER_API_KEY: ${{ secrets.TOGETHER_API_KEY }}
          UNSPLASH_ACCESS_KEY: ${{ secrets.UNSPLASH_ACCESS_KEY }}
        run: python agents/pipeline.py
```

Push triggers Vercel’s CI → site redeploy.

---

### 6  Frontend Changes

1. **Install MDX & Front‑Matter**  
   ```bash
   npm i -D @mdx-js/rollup vite-plugin-mdx front-matter
   ```

2. **`vite.config.js`**  
   ```js
   import mdx from 'vite-plugin-mdx';
   ...
   plugins: [react(), mdx({ remarkPlugins: [require('remark-frontmatter')] })]
   ```

3. **Blog list (`Blog.jsx`)**  
   ```jsx
   import posts from '../../content/index.json';
   ...
   <Link to={`/blog/${p.slug}`}>{p.title}</Link>
   ```

4. **Single post (`Post.jsx`)** loads raw markdown via dynamic import, parses front‑matter, renders body with a simple `ReactMarkdown`/`MDX` component.

5. **TagFilter.jsx** – extracts unique tags from `index.json`, toggles filter state.

6. **Add route in `App.jsx`**  
   ```jsx
   <Route path="/blog" element={<Blog/>}/>
   <Route path="/blog/:slug" element={<Post/>}/>
   ```

7. **Tailwind Typography plugin** for `prose` class styling.

---

### 7  Dry‑Run Checklist

- `python agents/pipeline.py --dry_run` → generates `.md` + image.  
- `npm run dev` → new blog visible locally.  
- Manual commit → Vercel preview OK.  
- Merge to `main`; wait for first 00 UTC run.

---

### 8  Future DB Migration (Placeholder)

1. Create `posts` table in Supabase with fields matching front‑matter.  
2. In `pipeline.py`, after writing file, insert DB row (via REST or Supabase Python client).  
3. Replace `index.json` with client‑side fetch from Supabase REST.

---

## Done

Follow each numbered block in order; when block 7 passes, the nightly cron will handle everything automatically.

