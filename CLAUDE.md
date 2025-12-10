# OSE Vidensbank

## Om projektet

Dette er en vidensbank for Odense Sport & Event (OS&E) projektet. Formålet er at dokumentere arbejdsgange og processer som grundlag for implementering af nyt PMS og POS.

Vidensbanken publiceres til: https://ose.muneris.dk

## Projektparter

| Part | Rolle | Ansvar |
|------|-------|--------|
| Muneris | Konsulent | POS/F&B, procesanalyse, tovholder på vidensbank |
| HotelToolz | Konsulent | PMS |
| Oracle | Leverandør | Licenser |
| OCC/OS&E | Kunde | Styregruppe, ressourcer |

## Kontaktpersoner

- **Kristine Weigand** - HotelToolz
- **Martin Bundgaard** - Muneris
- **Lone Palm** - OCC
- **Tom Cludts** - OCC (Revenue Manager)

## Scope

### I scope
- Hotel Odense (Best Western Plus) - nyt PMS og POS
- Odense Congress Center - konference, messe, event
- F&B-afdelingen

### Uden for scope
- Hotel Odeon (Strawberry/Mews)
- Stella Maris (Picasso-kontrakt til 2028)

## Repo-struktur

```
/
├── docs/                  # Kildefiler til MkDocs (publiceres)
│   ├── index.md           # Forside
│   ├── konference/        # Konferenceafdelingen
│   ├── messe/             # Messeafdelingen
│   ├── event/             # Eventafdelingen
│   ├── hotel-odense/      # Hotel Odense (Best Western Plus)
│   ├── fb/                # Food & Beverage
│   └── oekonomi/          # Økonomiafdelingen
├── working/               # Arbejdsdokumenter (publiceres IKKE)
│   ├── transcripts/       # Mødetransskriptioner
│   ├── interviews/        # Interview-noter
│   └── meeting-notes/     # Mødereferater
├── mkdocs.yml             # MkDocs konfiguration
├── CLAUDE.md              # Denne fil (ignoreres af git)
└── .github/workflows/     # Automatisk deploy
```

## MkDocs

Sitet bygges med MkDocs og Material-temaet. GitHub Actions bygger og deployer automatisk ved push til main.

### Lokal preview (valgfrit)
```bash
pip install mkdocs-material
mkdocs serve
```

### Navigation
Navigationen defineres i `mkdocs.yml` under `nav:`. Når nye sider tilføjes, skal de også tilføjes her.

### Nye dokumenter
- Dokumenter der skal publiceres: Opret i `docs/` mappen
- Arbejdsdokumenter: Opret i `working/` mappen
- Filnavne: Brug `index.md` for hovedsiden i en mappe, ellers beskrivende navne med bindestreg

## Arbejdsmetode

Dokumenterne opdateres løbende baseret på:
- Mødereferater
- Transskriptioner fra interviews
- Observationer fra besøg

### Workflow
1. Arbejdsdokumenter (transcripts, noter) placeres i `working/`
2. Uddrag relevant information og opdater dokumenter i `docs/`
3. Commit og push - GitHub Actions deployer automatisk
4. Hver proces dokumenteres i den afdeling der ejer den

### Når du opdaterer dokumentation
- Læs eksisterende indhold først
- Bevar struktur og overskrifter
- Tilføj kilde nederst (f.eks. "Møde 26. november 2025")
- Marker usikker information med "afventer bekræftelse" eller lignende

## Vigtige begreber

| Begreb | Forklaring |
|--------|------------|
| OS&E | Odense Sport & Event A/S - koncernen |
| OCC | Odense Congress Center |
| Picasso | Nuværende PMS-system (booking, køresedler) |
| Mews | PMS på Hotel Odeon (Strawberry-franchise) |
| Projektmanual | Word-dokument der beskriver et arrangement (bruges af messe) |
| Køreseddel | Operationel instruks til personale |

## Tidslinje

| Tidspunkt | Milepæl |
|-----------|---------|
| Dec 2025 - Q1 2026 | Procesanalyse |
| Q2 2026 | Systemvalg og beslutningsgrundlag |
| Okt 2026 | Opstart konfiguration |
| Jan 2027 | Go-live |
| Efterår 2027 | Nye værelser åbner (380 stk.) |
