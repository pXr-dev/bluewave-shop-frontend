/**
 * Logik für die Admin-Verwaltungsseite (admin.html)
 */
document.addEventListener("DOMContentLoaded", () => {
    loadAdminProducts();

    const form = document.getElementById("create-product-form");
    form.addEventListener("submit", handleCreateProduct);
});

/**
 * Lädt alle Produkte in die Admin-Tabelle/Liste ein.
 */
async function loadAdminProducts() {
    const listContainer = document.getElementById("admin-product-list");
    const products = await fetchProducts();

    if (!products || products.length === 0) {
        listContainer.innerHTML = `<p class="text-gray-500 text-center py-4">Keine Produkte vorhanden.</p>`;
        return;
    }

    listContainer.innerHTML = "";

    products.forEach(product => {
        const item = document.createElement("div");
        item.className = "flex items-center justify-between border-b border-gray-100 py-3";

        item.innerHTML = `
            <div>
                <h4 class="font-semibold text-gray-800">${escapeHtml(product.name)}</h4>
                <p class="text-sm text-blue-600 font-medium">${Number(product.price).toFixed(2)} €</p>
            </div>
            <button onclick="deleteProductItem(${product.id})" class="px-3 py-1 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition">
                Löschen
            </button>
        `;

        listContainer.appendChild(item);
    });
}

/**
 * Verarbeitet das Absenden des Formulars zum Anlegen eines neuen Produkts.
 * @param {Event} event - Das Submit-Ereignis des Formulars
 */
async function handleCreateProduct(event) {
    event.preventDefault();

    const nameInput = document.getElementById("product-name");
    const priceInput = document.getElementById("product-price");

    const newProductData = {
        name: nameInput.value.trim(),
        price: parseFloat(priceInput.value)
    };

    // Sende Name und Preis an das Backend (gemäß Vorgabe)[cite: 2]
    const result = await createProduct(newProductData);

    if (result) {
        alert("Produkt erfolgreich erstellt!");
        nameInput.value = "";
        priceInput.value = "";
        loadAdminProducts(); // Liste aktualisieren
    }
}

/**
 * Löscht ein Produkt über die API oder simuliert es lokal.
 * @param {number|string} id - Die ID des zu löschenden Produkts
 */
async function deleteProductItem(id) {
    if (!confirm("Möchten Sie dieses Produkt wirklich löschen?")) return;

    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}/`, {
            method: 'DELETE',
        });

        if (!response.ok && response.status !== 204) {
            throw new Error("Fehler beim Löschen");
        }

        alert("Produkt erfolgreich gelöscht.");
        loadAdminProducts();
    } catch (error) {
        console.warn("Backend-DELETE fehlgeschlagen. Lösche aus lokalem Speicher.");

        // Lokale Mockdaten filtern
        let currentProducts = getLocalMockProducts(); // oder direkt aus dem Array
        // Falls getLocalMockProducts in admin.js nicht direkt sichtbar ist, holen wir es aus dem localStorage:
        const saved = JSON.parse(localStorage.getItem("bluewave_mock_products") || "[]");
        const filtered = saved.filter(p => p.id != id);
        localStorage.setItem("bluewave_mock_products", JSON.stringify(filtered));

        alert("Produkt wurde (im Prototypen-Modus) entfernt.");
        loadAdminProducts();
    }
}

/**
 * XSS-Schutz Hilfsfunktion
 * @param {string} str - Zu bereinigender String
 * @returns {string} - Bereinigter String
 */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}