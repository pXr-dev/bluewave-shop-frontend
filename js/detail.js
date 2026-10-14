/**
 * Logik für die Produktdetailseite (detail.html)
 */
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("product-detail-container");

    // 1. URL-Parameter auslesen (z. B. detail.html?id=2)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        container.innerHTML = `<p class="text-red-500 text-center py-6">Keine Produkt-ID angegeben.</p>`;
        return;
    }

    // 2. Produktdaten laden (nutzt unseren API-Client / Fallback)
    const product = await fetchProductById(productId);

    if (!product) {
        container.innerHTML = `<p class="text-gray-500 text-center py-6">Produkt konnte nicht gefunden werden.</p>`;
        return;
    }

    // 3. Details in das HTML rendern (inkl. Lagerbestand)
    container.innerHTML = `
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-6 mb-6">
            <div>
                <span class="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">Produkt-ID: ${product.id}</span>
                <h2 class="text-3xl font-extrabold text-gray-900 mt-3">${escapeHtml(product.name)}</h2>
            </div>
            <div class="mt-4 md:mt-0 text-right">
                <span class="text-3xl font-bold text-blue-600">${Number(product.price).toFixed(2)} €</span>
            </div>
        </div>

        <div class="space-y-6">
            <div>
                <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Beschreibung</h3>
                <p class="text-gray-700 leading-relaxed">${escapeHtml(product.description || "Keine Beschreibung vorhanden.")}</p>
            </div>

            <div>
                <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Lagerbestand</h3>
                <p class="text-gray-800 font-semibold flex items-center gap-2">
                    <span class="inline-block w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}"></span>
                    ${product.stock} Stück auf Lager
                </p>
            </div>
        </div>
    `;
});

/**
 * Ruft ein einzelnes Produkt anhand der ID ab (unterstützt auch Mockdaten)
 * @param {string|number} id 
 * @returns {Promise<Object|null>}
 */
async function fetchProductById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}/`);
        if (!response.ok) throw new Error("Fehler beim Laden des Produkts");
        return await response.json();
    } catch (error) {
        console.warn("Backend-Detail-Abruf fehlgeschlagen. Suche in Mockdaten.");
        // Fallback: Suchen in unseren bekannten Mockdaten
        const products = await fetchProducts();
        return products.find(p => p.id == id) || null;
    }
}

/**
 * XSS-Schutz Hilfsfunktion
 */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}