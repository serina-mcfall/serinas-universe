# Images Folder

Drop any images you want to use in the World Bible here.

## How it works

Anything in `public/images/` is served at `/images/` when the dev server is running.

For example, if you drop a file called `shan-ru.jpg` here, it will be available in the browser at:
- `http://localhost:3000/images/shan-ru.jpg`

## How to reference images in the Bible

Once an image is in this folder, it can be referenced from React components or image-enabled sections like:
- `<img src="/images/shan-ru.jpg" />`

## Organization suggestions

You can create subfolders to keep things tidy:
- `public/images/characters/` — character portraits
- `public/images/locations/` — places and landscapes
- `public/images/aesthetic/` — mood references
- `public/images/maps/` — maps and diagrams
- `public/images/fashion/` — clothing references

## Important notes

- These images get pushed to GitHub with the rest of the project
- They persist across devices and browsers (unlike the Mood Board which uses localStorage)
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`
- Very large files (over a few MB each) will bloat the repo — consider resizing first
