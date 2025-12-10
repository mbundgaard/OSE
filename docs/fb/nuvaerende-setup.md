---
tags:
  - F&B
  - restaurant
  - POS
  - EventPOS
  - Picasso
---

# Nuværende setup

Denne side beskriver F&B-afdelingens nuværende systemer og tekniske begrænsninger.

## Restaurant Odense

Restauranten fungerer som flerbrugsfacilitet:

| Funktion | Beskrivelse |
|----------|-------------|
| Morgenmad | Morgenmadsrestaurant for hotelgæster |
| À la carte | Almen restaurant for eksterne gæster |
| Konference | Frokost og forplejning til konferencegæster |

**Kapacitet:** 225 pladser (udvides ved næste udbygning af hotellet)

## Systemer

### Picasso POS-modul

Picasso er primært et PMS (hotel booking), men har også et POS-modul som bruges til restaurantsalg.

**Anvendelse:**

- Daglig restaurantdrift
- Morgenmad, à la carte, konferenceforplejning

**Begrænsninger:**

- Stationære PC'er - kræver at gæster går til kassen for betaling
- Ingen mobile enheder til bordservering
- Ingen mulighed for at sende ordrer digitalt til køkken/bar

### EventPOS

Separat POS-system til salg ved arrangementer, messer og events.

| Enhed | Antal |
|-------|-------|
| Faste enheder | ca. 15 |
| Lejeenheder | Efter behov |

**Anvendelse:**

- Pølseboder og streetfood-stande
- Barsalg ved events
- Garderobe (med betaling)
- Diverse pop-up salgssteder

**Begrænsninger:**

- Ikke integreret med Picasso
- Kan ikke poste til hotelværelser
- Separat rapportering og økonomiflow

## Integrationer

```
┌─────────────┐     ┌─────────────┐
│  Picasso   │     │  EventPOS  │
│  POS-modul │     │            │
└──────┬──────┘     └──────┬──────┘
       │                  │
       │ Integreret       │ IKKE integreret
       ▼                  ▼
┌─────────────┐     ┌─────────────┐
│  Picasso   │     │  Separat   │
│  PMS       │     │  økonomi   │
└─────────────┘     └─────────────┘
```

**Konsekvenser af manglende integration:**

- Hotelgæster kan ikke sætte EventPOS-køb på værelset
- Økonomiafdelingen håndterer to separate datastrømme
- Ingen konsolideret overblik over samlet F&B-omsætning

