# Bluewave Electronics - Frontend Prototyp

Ein sauberer, modularer und responsiver Frontend-Prototyp für **Bluewave Electronics**, entwickelt mit HTML5, Tailwind CSS und Vanilla JavaScript. Das Projekt kommuniziert mit einem Django REST Framework Backend und bietet ein robustes Fallback-System für den Offline-/Prototypen-Modus.

---

## 🚀 Features & Meilensteine

- **Meilenstein 1: Architektur & API-Client**
  - Zentraler API-Client (`js/api.js`) für REST-Anfragen.
  - Automatisches Fallback-System: Versucht, Daten mit einem echten Backend zu synchronisieren, wechselt bei Nichterreichbarkeit aber nahtlos auf persistente Mockdaten (`localStorage`).
- **Meilenstein 2: Hauptseite & Produktübersicht (`index.html`)**
  - Modernes, minimalistisches Design mit viel Whitespace (Tailwind CSS).
  - Dynamisches Rendern der Produktkarten basierend auf den Backend-Spezifikationen (LED Displays & Drucktaster in verschiedenen Farben).
- **Meilenstein 3: Produktdetailseite (`detail.html`)**
  - Dynamisches Auslesen der Produkt-ID über URL-Parameter (`?id=...`).
  - Detaillierte Ansicht von Preis, Beschreibung und aktuellem Lagerbestand.
- **Meilenstein 4: Admin-Verwaltungsseite (`admin.html`)**
  - CRUD-Funktionen: Hinzufügen neuer Produkte (POST-Simulation) und Löschen von Datensätzen.
  - Vollständige JS Docs Dokumentation und XSS-Schutz.

---

## 📂 Projektstruktur

```text
bluewave-shop-frontend/
│
├── index.html        # Startseite & Produktübersicht
├── detail.html       # Produktdetailseite
├── admin.html        # Admin-Verwaltungsseite (CRUD)
│
├── css/
│   └── style.css     # Optionale eigene Stile (ergänzend zu Tailwind)
│
├── js/
│   ├── api.js        # Zentraler API-Client & Mockdaten-Logik
│   ├── main.js       # Logik für die Startseite
│   ├── detail.js     # Logik für die Detailseite
│   └── admin.js      # Logik für die Admin-Verwaltung
│
└── README.md         # Projektdokumentation
