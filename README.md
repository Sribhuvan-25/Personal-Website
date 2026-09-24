# sribhuvanreddyyellu.com

Static single-page site — "Morning Light".

Plain HTML/CSS with a small IntersectionObserver script; Vite is used only to
bundle and emit `dist/`. No framework.

```
index.html      markup and copy
src/styles.css  design tokens and layout
src/reveal.js   fade-up on scroll
public/         favicon
```

    npm install
    npm run dev      # local
    npm run build    # -> dist/
