/* ==========================================
   1. SAHTE VERİ HAVUZU (MOCK DATA)
   Tüm dövme tasarımlarını tek bir merkezde tutuyoruz.
   ========================================== */
const tattoos = [
    {
        id: 1,
        title: "Minimalist Dalga Formu",
        artist: "@SeraTatt",
        price: 45,
        category: "minimalist",
        image: "https://images.unsplash.com/photo-1560942485-b2a11cc13456?q=80&w=400"
    },
    {
        id: 2,
        title: "Soyut Geometrik Hilal",
        artist: "@AlexLine",
        price: 60,
        category: "geometrik",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=400"
    },
    {
        id: 3,
        title: "Linear Botanik Yaprak",
        artist: "@SeraTatt",
        price: 35,
        category: "minimalist",
        image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=400"
    },
    {
        id: 4,
        title: "Cyber Neon Kask",
        artist: "@NeoInk",
        price: 85,
        category: "cyberpunk",
        image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=400"
    }
];

/* ==========================================
   2. DÖVMELERİ EKRANA BASAN FONKSİYON
   ========================================== */
function displayTattoos(filteredList) {
    const gallery = document.getElementById("tattoo-gallery");
    
    // Eğer index.html sayfasında değilsek (örneğin detay sayfasındaysak) hata vermemesi için kontrol
    if (!gallery) return;

    // Galerinin içini temizle
    gallery.innerHTML = "";

    // Gelen listedeki her dövme için bir HTML kartı oluştur
    filteredList.forEach(tattoo => {
        const cardHTML = `
            <a href="detail.html?id=${tattoo.id}" class="tattoo-card">
                <div class="tattoo-image-wrapper">
                    <img src="${tattoo.image}" alt="${tattoo.title}">
                </div>
                <div class="tattoo-info">
                    <h3 class="tattoo-title">${tattoo.title}</h3>
                    <div class="tattoo-meta">
                        <span>${tattoo.artist}</span>
                        <span style="color: var(--text-main); font-weight: 600;">$${tattoo.price}</span>
                    </div>
                </div>
            </a>
        `;
        // Oluşturulan HTML'i galeri içerisine ekle
        gallery.insertAdjacentHTML("beforeend", cardHTML);
    });
}

/* ==========================================
   3. FİLTRELEME SİSTEMİ
   ========================================== */
function setupFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Aktif butonun stilini güncellemek için diğerlerinden 'active' stilini kaldırıyoruz
            filterButtons.forEach(btn => {
                btn.style.borderColor = "var(--border-color)";
                btn.style.color = "var(--text-muted)";
            });

            // Tıklanan butonu parlak yap
            button.style.borderColor = "var(--text-main)";
            button.style.color = "var(--text-main)";

            const selectedCategory = button.getAttribute("data-category");

            if (selectedCategory === "all") {
                displayTattoos(tattoos); // Hepsini göster
            } else {
                // Seçilen kategoriye uyanları süz
                const filtered = tattoos.filter(t => t.category === selectedCategory);
                displayTattoos(filtered);
            }
        });
    });
}

/* ==========================================
   4. SAYFA YÜKLENDİĞİNDE ÇALIŞACAK KISIM
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    // İlk açılışta tüm dövmeleri listele
    displayTattoos(tattoos);
    // Filtreleme butonlarını dinlemeye başla
    setupFilters();
});
