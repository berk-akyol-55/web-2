// Kategorilere ait fotoğraf listeleri
// Kendi görsel yollarını (klasöründeki isimleri) buraya yazabilirsin.
const galleryData = {
    "deko-tavan": [
        "images/deko1.jpg",
        "images/deko2.jpg",
        "images/deko3.jpg"
    ],
    "gergi-tavan": [
        "images/gergi1.jpg",
        "images/gergi2.jpg"
    ],
    "gizli-isik": [
        "images/isik1.jpg"
    ],
    "duvar-paneli": [], // Eğer henüz resim yoksa böyle boş bırakabilirsin
    "duvar-citasi": [],
    "kartonpier": []
};

// Elementleri Seçme
const modal = document.getElementById("galleryModal");
const modalTitle = document.getElementById("modalTitle");
const galleryGrid = document.getElementById("galleryGrid");
const closeBtn = document.querySelector(".close-modal");
const cards = document.querySelectorAll(".card[data-category]");

// Kartlara Tıklandığında Galeriyi Açma Etkinliği
cards.forEach(card => {
    card.addEventListener("click", () => {
        const category = card.getAttribute("data-category");
        const title = card.querySelector("h3").innerText;
        
        // Modal başlığını karttaki hizmet ismine göre güncelle
        modalTitle.innerText = `${title} Uygulamalarımız`;
        
        // Önceki içerikleri temizle
        galleryGrid.innerHTML = "";
        
        // İlgili kategorideki resimleri çek
        const images = galleryData[category] || [];
        
        if (images.length === 0) {
            galleryGrid.innerHTML = "<p style='color:#a0a5b5; text-align:center; grid-column: 1/-1; padding: 20px;'>Bu kategoriye ait henüz referans fotoğrafı eklenmedi.</p>";
        } else {
            images.forEach(imgSrc => {
                const imgElement = document.createElement("img");
                imgElement.src = imgSrc;
                imgElement.alt = title;
                galleryGrid.appendChild(imgElement);
            });
        }
        
        // Modalı görünür yap ve arka plan kaydırmasını kapat
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    });
});

// Modalı Kapatma Fonksiyonları
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}
