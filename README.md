# OSE Vidensbank

Vidensbank for Odense Sport & Event A/S (OSE) - dokumentation af arbejdsgange og processer.

## Om projektet

Dette repository indeholder dokumentation af arbejdsgange og processer for OSE som grundlag for implementering af nyt PMS og POS. Vidensbanken samler viden fra alle afdelinger og sikrer, at systemvalg og konfiguration bygger på en grundig forståelse af de eksisterende processer.

## Dokumentation

Dokumentationen publiceres automatisk:

👉 **https://ose.muneris.dk**

## Scope

### I scope
- **Hotel Odense** (Best Western Plus) - nyt PMS og POS
- **Odense Congress Center** - konference, messe, event
- **F&B-afdelingen** - restaurant, bar, catering

### Uden for scope
- Hotel Odeon (Strawberry/Mews)
- Stella Maris

## Afdelinger

| Afdeling | Beskrivelse |
|----------|-------------|
| Konference | Møder, kurser, konferencer |
| Messe | Udstillinger, messer |
| Event | Koncerter, shows, sportsevents |
| Hotel Odense | Hotellets drift og reception |
| F&B | Food & Beverage, restaurant, catering |
| Økonomi | Fakturering, rapportering |

## Tidslinje

| Tidspunkt | Milepæl |
|-----------|---------|
| Dec 2025 - Q1 2026 | Procesanalyse |
| Q2 2026 | Systemvalg og beslutningsgrundlag |
| Okt 2026 | Opstart konfiguration |
| Jan 2027 | Go-live |
| Efterår 2027 | Nye værelser åbner (380 stk.) |

## Struktur

```
/
├── docs/                  # Kildefiler (publiceres)
│   ├── index.md           # Forside
│   ├── konference/        # Konferenceafdelingen
│   ├── messe/             # Messeafdelingen
│   ├── event/             # Eventafdelingen
│   ├── hotel-odense/      # Hotel Odense
│   ├── fb/                # Food & Beverage
│   └── oekonomi/          # Økonomiafdelingen
├── working/               # Arbejdsdokumenter (publiceres ikke)
├── overrides/             # MkDocs tema-tilpasninger
├── mkdocs.yml             # MkDocs konfiguration
└── .github/workflows/     # Automatisk deploy
```

## Projektparter

| Part | Rolle | Ansvar |
|------|-------|--------|
| Muneris | Konsulent | POS/F&B, procesanalyse, vidensbank |
| HotelToolz | Konsulent | PMS |
| OSE/OCC | Kunde | Styregruppe, ressourcer |

## Feedback

Brugere kan indsende feedback direkte via vidensbanken. Feedback gemmes i `working/feedback/` og behandles løbende.
