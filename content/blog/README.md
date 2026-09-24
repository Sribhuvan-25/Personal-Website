# Writing posts

One markdown file per post, in this folder. The filename becomes the URL:
`my-post.md` publishes at `/writing/my-post/`.

Start each file with a block like this:

    ---
    title: Keeping the exam window shut
    date: 2026-09-20
    summary: One line, shown in the index.
    ---

Then write the body as normal markdown. Supported: headings, lists,
links, images, bold, italic, inline code, fenced code blocks,
blockquotes and horizontal rules.

Fields:

- `title` and `date` (YYYY-MM-DD) are used for the index, sorted newest first.
- `summary` is optional, shown under the title in the index.
- `draft: true` keeps a post out of the build.
- `slug` overrides the URL if you want it to differ from the filename.

Publish with a commit. `npm run build` regenerates the pages, and Vercel
runs that on push.
