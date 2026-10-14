/**
 * Zentraler API-Client für Bluewave Electronics
 */
const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Standard Django URL

// Echte Mockdaten basierend auf den Backend-Screenshots des Django-Teams
const MOCK_PRODUCTS = [
    { id: 1, name: "LED Display Blau", description: "Hochauflösendes LED-Display für Elektronik-Prototypen.", price: 7.99, stock: 100 },
    { id: 2, name: "Drucktaster LED Blau", description: "Robuster Drucktaster mit blauer LED-Beleuchtung.", price: 6.95, stock: 1000 },
    { id: 3, name: "Drucktaster LED Gelb", description: "Robuster Drucktaster mit gelber LED-Beleuchtung.", price: 6.99, stock: 655 },
    { id: 4, name: "Drucktaster LED Grün", description: "Robuster Drucktaster mit grüner LED-Beleuchtung.", price: 6.99, stock: 80 },
    { id: 5, name: "Drucktaster LED Rot", description: "Robuster Drucktaster mit roter LED-Beleuchtung.", price: 6.99, stock: 215 }
];

/**
 * Ruft alle Produkte ab (mit automatischem Fallback auf Mockdaten).
 * @returns {Promise<Array>} Liste der Produkte
 */
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products/`);
        if (!response.ok) throw new Error("Backend nicht erreichbar");
        return await response.json();
    } catch (error) {
        console.warn("Verbindung zum Backend fehlgeschlagen. Verwende Mockdaten.", error);
        return MOCK_PRODUCTS; // Retten den Tag!
    }
}

/**
 * Sendet ein neues Produkt an das Backend oder simuliert es lokal.
 * @param {Object} productData - { name, price }
 * @returns {Promise<Object>} Das erstellte Produkt
 */
async function createProduct(productData) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });
        if (!response.ok) throw new Error("Fehler beim Speichern");
        return await response.json();
    } catch (error) {
        console.warn("Backend-POST fehlgeschlagen. Simuliere erfolgreiches Speichern.");
        // Simuliertes Objekt zurückgeben
        return { id: Date.now(), ...productData, description: "Neu erstellt (Mock)", stock: 1 };
    }
}