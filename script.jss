const tattoos = [
    { id: 1, title: "Tasarım 1", price: 50, category: "minimalist", image: "https://images.unsplash.com/photo-1560942485-b2a11cc13456" },
    { id: 2, title: "Tasarım 2", price: 75, category: "geometrik", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908" }
];

function loadTattoos() {
    const gallery = document.getElementById("tattoo-gallery");
    if (!gallery) return;
    gallery.innerHTML = tattoos.map(t => `
        <a href="detail.html?id=${t.id}" class="tattoo-card">
            <div class="tattoo-image-wrapper"><img src="${t.image}" alt="${t.title}"></div>
            <div class="tattoo-info"><h3>${t.title}</h3><p>$${t.price}</p></div>
        </a>
    `).join('');
}
document.addEventListener("DOMContentLoaded", loadTattoos);
