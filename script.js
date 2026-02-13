$(document).ready(function() {
    
    // --- 1. LIGHTBOX (MODAL) ---
    function openModal(src) {
        $('#img01').attr('src', src);
        $('#image-modal').fadeIn();
    }

    $(document).on('click', '.scattered-img', function() {
        openModal($(this).attr('src'));
    });

    $('.close-modal').click(function() { $('#image-modal').fadeOut(); });
    $('#image-modal').click(function(e) { if (e.target.id === 'image-modal') $(this).fadeOut(); });

    // --- 2. HİKAYE MOTORU ---
    if (typeof myLoveStory !== 'undefined') {
        myLoveStory.forEach(function(item) {
            
            // --- SOL SAYFA ---
            let photosHtml = '';
            
            if (item.images && item.images.length > 0) {
                const count = item.images.length;
                
                // --- SENARYO A: TEK FOTOĞRAF (ÖZEL ORTALAMA) ---
                if (count === 1) {
                    const imgSrc = item.images[0];
                    const imgWidth = 75; 
                    const imgHeight = 65; 
                    
                    // Tam merkeze
                    const finalLeft = 50 - (imgWidth / 2);
                    const finalTop = 50 - (imgHeight / 2);
                    const randomRotate = Math.floor(Math.random() * 6) - 3; 

                    photosHtml = `
                        <img src="${imgSrc}" class="scattered-img" 
                             style="width: ${imgWidth}%; 
                                    height: ${imgHeight}%; 
                                    top: ${finalTop}%; 
                                    left: ${finalLeft}%; 
                                    transform: rotate(${randomRotate}deg); 
                                    z-index: 1;" 
                             onerror="this.src='https://via.placeholder.com/300'">
                    `;

                } 
                // --- SENARYO B: ÇOKLU FOTOĞRAF (GENİŞLETİLMİŞ GRID) ---
                else {
                    let gridRows, gridCols;
                    // Sayıya göre en ideal ızgara
                    if (count <= 2) { gridRows = 2; gridCols = 1; }
                    else if (count <= 4) { gridRows = 2; gridCols = 2; }
                    else if (count <= 6) { gridRows = 3; gridCols = 2; }
                    else if (count <= 9) { gridRows = 3; gridCols = 3; }
                    else { gridRows = 4; gridCols = 3; }

                    const cellW = 100 / gridCols;
                    const cellH = 100 / gridRows;
                    
                    // FOTOĞRAFLAR HÜCREDEN %15 BÜYÜK OLSUN (Boşlukları kapatır)
                    const imgWidth = cellW * 1.15;
                    const imgHeight = cellH * 1.15;

                    item.images.forEach((imgSrc, index) => {
                        const row = Math.floor(index / gridCols); 
                        const col = index % gridCols;

                        const cellCenterX = (col * cellW) + (cellW / 2);
                        const cellCenterY = (row * cellH) + (cellH / 2);

                        // Merkezden hesapla
                        let calculatedLeft = cellCenterX - (imgWidth / 2);
                        let calculatedTop = cellCenterY - (imgHeight / 2);

                        // Hafif rastgele sapma (Doğallık için)
                        const randomOffsetX = (Math.random() * 6) - 3; 
                        const randomOffsetY = (Math.random() * 6) - 3;
                        calculatedLeft += randomOffsetX;
                        calculatedTop += randomOffsetY;

                        // --- TAŞMA ÖNLEYİCİ (DUVARLAR) ---
                        // Fotoğraf sayfa sınırından dışarı çıkamaz (min %2, max %98)
                        const minPos = 2;
                        const maxLeft = 98 - imgWidth;
                        const maxTop = 98 - imgHeight;

                        const finalLeft = Math.max(minPos, Math.min(maxLeft, calculatedLeft));
                        const finalTop = Math.max(minPos, Math.min(maxTop, calculatedTop));

                        const randomRotate = Math.floor(Math.random() * 16) - 8;
                        const zIndex = index + 1;

                        photosHtml += `
                            <img src="${imgSrc}" class="scattered-img" 
                                 style="width: ${imgWidth}%; 
                                        height: ${imgHeight}%; 
                                        top: ${finalTop}%; 
                                        left: ${finalLeft}%; 
                                        transform: rotate(${randomRotate}deg); 
                                        z-index: ${zIndex};" 
                                 onerror="this.src='https://via.placeholder.com/300'">
                        `;
                    });
                }
            }
            
            const collagePageHTML = `<div class="page collage-page">${photosHtml}</div>`;

            // --- SAĞ SAYFA ---
            const textPageHTML = `
                <div class="page text-page">
                    <h2 class="page-title">${item.title}</h2>
                    <div class="page-date">${item.date}</div>
                    <p class="page-text">"${item.text}"</p>
                </div>
            `;
            $('#magazine').append(collagePageHTML);
            $('#magazine').append(textPageHTML);
        });
    }

    // --- ARKA KAPAK ---
    const backCoverHTML = `
        <div class="page cover-back">
            <div class="divider" style="margin-bottom:30px;"><span class="heart-icon">♥</span></div>
            <h1 class="final-message">Ve hikayemiz,<br>her gün yeniden başlıyor...</h1>
            <p class="final-note">
                Seninle geçen her saniye, bu kitabın en güzel sayfası. 
                Daha yazılacak çok anımız, doldurulacak çok sayfamız var.<br><br>
                Seni Seviyorum. 🐼
            </p>
            <p style="color:#ccc; font-size:0.8rem; margin-top:40px;">14 Şubat 2025</p>
        </div>
    `;
    $('#magazine').append(backCoverHTML);

    // --- TURN.JS ---
    $('#magazine').turn({
        width: 900, height: 550, display: 'double', autoCenter: true, acceleration: true, gradients: true, elevation: 50, duration: 1200
    });

    // --- SAYAÇ ---
    setInterval(function() {
        var start = new Date("2024-08-03T00:00:00"); 
        var now = new Date(); var diff = now - start;
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        var mins = Math.floor((diff / 1000 / 60) % 60);
        var secs = Math.floor((diff / 1000) % 60);
        $('#together-counter').html(days + " GÜN &nbsp;" + hours + ":" + mins + ":" + secs);
    }, 1000);

    // --- KLAVYE ---
    $(window).bind('keydown', function(e){
        if (e.keyCode==37) $('#magazine').turn('previous');
        if (e.keyCode==39) $('#magazine').turn('next');
    });
});