# neonverket-web

Sajten för Neonverket – 80-talsrock från Norrtälje.

Ren HTML/CSS/JS. Ingen build, inga beroenden, inget ramverk.
Allt som publiceras ligger i `public/`.

```
public/          ← det som hamnar på Netlify
  index.html     ← hela sajten, all text ligger här
  styles.css     ← neonpaletten och layouten
  script.js      ← nav, scroll-in-effekter, FAQ
  assets/        ← logga (webp + png), OG-bild, favicon
docker-compose.yml
Dockerfile.dev   ← dev-server med live reload
netlify.toml     ← publish-mapp, cache och headers
```

## Dev

```sh
docker compose up          # http://localhost:8080
```

Live reload är på – spara `index.html`, `styles.css` eller `script.js`
så laddar webbläsaren om sig själv.

```sh
docker compose down        # stäng ner
docker compose up --build  # om Dockerfile.dev ändrats
```

Behöver du inte Docker just då räcker det med:

```sh
cd public && python3 -m http.server 8080
```

(ingen live reload, men startar direkt)

## Deploy till Netlify

`netlify.toml` sköter konfigurationen – ingen build körs, `public/` publiceras
som den är.

**Via GitHub (rekommenderat)** – varje push till `main` deployar automatiskt:

```sh
gh repo create neonverket-web --private --source=. --push
```

Gå sedan till Netlify → *Add new site* → *Import an existing project* → välj repot.
Netlify läser `netlify.toml` och behöver inga inställningar.

**Direkt från terminalen** – om du hellre vill skippa GitHub:

```sh
npx netlify-cli deploy --prod
```

## Innan den går live

- [ ] Byt `boka@neonverket.se` och telefonnumret i `public/index.html` (sök på `TODO Simon`)
- [ ] Döp om Spotify-spellistan till Neonverket – spelaren visar annars "Bilelectric Boyz"
- [ ] Siffrorna under "Neonverket i siffror" är påhittade, justera dem
- [ ] Ev. bandmedlemmar och en bild från ett gig

## Loggan

Genererad från `~/Desktop/BilelectricBoys/Loggor/neonverket-transparent-4k.png`
med `sips` + `cwebp`. Originalet ligger kvar där.
