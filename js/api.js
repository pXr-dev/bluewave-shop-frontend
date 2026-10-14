/**
 * Zentraler API-Client für Bluewave Electronics
 */
const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Standard Django URL

// Initialer Mockdaten-Fallback (wird im localStorage gespeichert, falls nicht vorhanden)
const INITIAL_MOCK_PRODUCTS = [
    { id: 1, name: "LED Display Blau", description: "Hochauflösendes LED-Display für Elektronik-Prototypen.", price: 7.99, stock: 100 },
    { id: 2, name: "Drucktaster LED Blau", description: "Robuster Drucktaster mit blauer LED-Beleuchtung.", price: 6.95, stock: 1000 },
    { id: 3, name: "Drucktaster LED Gelb", description: "Robuster Drucktaster mit gelber LED-Beleuchtung.", price: 6.99, stock: 655 },
    { id: 4, name: "Drucktaster LED Grün", description: "Robuster Drucktaster mit grüner LED-Beleuchtung.", price: 6.99, stock: 80 },
    { id: 5, name: "Drucktaster LED Rot", description: "Robuster Drucktaster mit roter LED-Beleuchtung.", price: 6.99, stock: 215 }
];

/**
 * Hilfsfunktion: Holt Produkte aus dem localStorage oder initialisiert sie.
 */
function getLocalMockProducts() {
    const saved = localStorage.getItem("bluewave_mock_products");
    if (!saved) {
        localStorage.setItem("bluewave_mock_products", JSON.stringify(INITIAL_MOCK_PRODUCTS));
        return INITIAL_MOCK_PRODUCTS;
    }
    return JSON.parse(saved);
}

/**
 * Ruft alle Produkte ab (mit automatischem Fallback auf lokale Mockdaten).
 * @returns {Promise<Array>} Liste der Produkte
 */
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products/`);
        if (!response.ok) throw new Error("Backend nicht erreichbar");
        return await response.json();
    } catch (error) {
        // Fallback auf persistente Mockdaten im localStorage
        return getLocalMockProducts();
    }
}

/**
 * Sendet ein neues Produkt an das Backend oder speichert es im LocalStorage.
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
        console.warn("Backend-POST fehlgeschlagen. Speichere im lokalen Prototypen-Modus.");
        
        // Aktuelle Mockdaten aus dem LocalStorage laden
        const currentProducts = getLocalMockProducts();
        
        // Neue ID generieren (höchste ID + 1)
        const newId = currentProducts.length > 0 ? Math.max(...currentProducts.map(p => p.id)) + 1 : 1;
        
        const newProduct = {
            id: newId,
            name: productData.name,
            price: Number(productData.price),
            description: "Neu erstelltes Produkt im Prototypen-Modus.",
            stock: 50 // Standardbestand für Mock-Produkte
        };

        // Hinzufügen und im LocalStorage speichern
        currentProducts.push(newProduct);
        localStorage.setItem("bluewave_mock_products", JSON.stringify(currentProducts));

        return newProduct;
    }
}