/**
 * Hauptlogik für die Produktübersicht (index.html)
 */
document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.getElementById("product-grid");

    // Produkte laden (nutzt automatisch die API oder die Fallback-Mockdaten)
    const products = await fetchProducts();

    if (!products || products.length === 0) {
        productGrid.innerHTML = `<p class="text-gray-500 col-span-full text-center py-10">Aktuell sind keine Produkte verfügbar.</p>`;
        return;
    }

    // Grid leeren
    productGrid.innerHTML = "";

    // Für jedes Produkt eine Karte erstellen
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between";

        card.innerHTML = `
            <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">${escapeHtml(product.name)}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${escapeHtml(product.description || "Keine Beschreibung verfügbar.")}</p>
            </div>
            <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span class="text-lg font-bold text-blue-600">${Number(product.price).toFixed(2)} €</span>
                <a href="detail.html?id=${product.id}" class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                    Details
                </a>
            </div>
        `;

        productGrid.appendChild(card);
    });
});

/**
 * Kleine Hilfsfunktion zur Vermeidung von XSS (Sicherheit)
 * @param {string} str 
 * @returns {string}
 */
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}