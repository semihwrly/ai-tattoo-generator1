const tattoos = [
    // ... eski dövmelerin burada kalacak ...
    
    // YENİ TASARIMLARINI BURAYA EKLE:
    {
        id: 5, // ID'yi her zaman bir arttır
        title: "Kendi Tasarımının Adı",
        artist: "@SeninKullanıcıAdın",
        price: 50,
        category: "minimalist", // minimalist, geometrik veya cyberpunk
        image: "images1.png" // İnternetten bir link veya proje klasöründeki resmin yolu
    },
    {
        id: 6,
        title: "İkinci Tasarımın",
        artist: "@SeninKullanıcıAdın",
        price: 75,
        category: "geometrik",
        image: "resim_linkin_2.png"
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
/* ==========================================
   5. DETAY SAYFASI DİNAMİK VERİ YÜKLEME
   URL'deki ?id=X parametresine göre dövme bilgilerini getirir.
   ========================================== */
function loadTattooDetail() {
    // 1. URL'deki parametreleri analiz et (Örn: ?id=2 içindeki 2'yi al)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    // Eğer bir ID parametresi yoksa bu fonksiyonu çalıştırma (index.html sayfasındaysak burası çalışmaz)
    if (!idParam) return;

    // 2. Havuzumuzdaki dövmeler arasından URL'deki ID ile eşleşen dövmeyi bul
    // idParam string olarak geldiği için parseInt ile sayıya çeviriyoruz
    const selectedTattoo = tattoos.find(t => t.id === parseInt(idParam));

    // 3. Eğer dövme bulunduysa HTML elementlerini doldur
    if (selectedTattoo) {
        document.getElementById("detail-image").src = selectedTattoo.image;
        document.getElementById("detail-image").alt = selectedTattoo.title;
        document.getElementById("detail-title").innerText = selectedTattoo.title;
        document.getElementById("detail-price").innerText = `$${selectedTattoo.price}`;
        document.getElementById("detail-category").innerText = selectedTattoo.category;
        document.getElementById("detail-artist").innerText = selectedTattoo.artist;
        
        // Sayfa başlığını da dövme adı yapalım şık dursun
        document.title = `InkMarket | ${selectedTattoo.title}`;
    } else {
        // Eğer havuzda olmayan bir ID girildiyse hata mesajı göster
        document.getElementById("detail-title").innerText = "Tasarım Bulunamadı";
    }
}

// 4. Sayfa yüklendiğinde çalışacak olan mevcut olay dinleyicimize bu fonksiyonu da ekliyoruz
document.addEventListener("DOMContentLoaded", () => {
    loadTattooDetail();
});
