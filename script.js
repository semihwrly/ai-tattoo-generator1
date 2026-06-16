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
