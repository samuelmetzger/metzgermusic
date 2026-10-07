# metzgermusic.com

Static site for Samuel Metzger, concert organist. Plain HTML/CSS/JS — no build step. Hosted on GitHub Pages at www.metzgermusic.com (see CNAME).

## Files

- index.html — Home (animated Fisk organ)
- biography.html — Biography
- recordings.html — Recordings
- sheet-music.html — Sheet Music
- organ-concerts.html — Organ Concerts
- contact.html — Contact form (Formspree) and price lists
- 404.html — Not-found page
- recordings--sheet-music.html — old URL, redirects to recordings.html
- styles.css — the one stylesheet (colors and fonts are variables at the top)
- site.js — scroll reveals, image fallback, contact-form submit
- favicon.svg
- images/ — photographs and covers (existing files are reused; fisk-organ.png is the gold line drawing)

## Adding a recording or a publication

Open recordings.html or sheet-music.html and copy one `<article class="item"> … </article>` block. Edit:

- the `<img src="images/…">` cover (square images look best; add the file to images/)
- the `<h2>` title and the `<p class="meta">` line
- the track list — one `<li>` per piece inside `<ol class="tracks">` (use `<i>…</i>` for titles), or `<p class="tunes">` for hymn-tune lists
- the price in `<span class="price">`

Then add a matching line to the price list on contact.html.

## Contact form

The form posts to Formspree (form ID in contact.html). Messages go to the address registered with that form.
