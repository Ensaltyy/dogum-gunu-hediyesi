$(document).ready(function() {
    
    // --- 1. LIGHTBOX (FOTO BÜYÜTME) ---
    function openModal(src) {
        $('#img01').attr('src', src);
        $('#image-modal').fadeIn();
    }
    
    // Fotoğrafa tıklayınca aç (Sayfa dönmesini engellemek için stopPropagation)
    $(document).on('click', '.scattered-img', function(e) {
        e.stopPropagation(); 
        openModal($(this).attr('src'));
    });

    $('.close-modal, #image-modal').click(function() { $('#image-modal').fadeOut(); });

    // --- 2. HİKAYE MOTORU (Verileri Yükle) ---
    if (typeof myLoveStory !== 'undefined') {
        myLoveStory.forEach(function(item) {
            
            // FOTOĞRAFLAR (SOL)
            let photosHtml = '';
            if (item.images && item.images.length > 0) {
                const count = item.images.length;
                
                // Tek Fotoğraf (Ortala)
                if (count === 1) {
                    photosHtml = `<img src="${item.images[0]}" class="scattered-img" 
                        style="width: 75%; height: 65%; top: 17.5%; left: 12.5%; transform: rotate(${Math.random()*6-3}deg); z-index:1;" 
                        onerror="this.style.display='none'">`;
                } 
                // Çoklu Fotoğraf (Grid)
                else {
                    let rows = count <= 2 ? 2 : (count <= 6 ? 3 : 4);
                    let cols = count <= 2 ? 1 : (count <= 4 ? 2 : 3);
                    let cellW = 100/cols; let cellH = 100/rows;

                    item.images.forEach((src, i) => {
                        let r = Math.floor(i/cols); let c = i%cols;
                        let w = cellW * 1.15; let h = cellH * 1.15; // Biraz büyük olsun boşluk kalmasın
                        let top = (r*cellH) + (cellH/2) - (h/2) + (Math.random()*4-2);
                        let left = (c*cellW) + (cellW/2) - (w/2) + (Math.random()*4-2);
                        
                        // Sınırlar
                        top = Math.max(2, Math.min(98-h, top));
                        left = Math.max(2, Math.min(98-w, left));

                        photosHtml += `<img src="${src}" class="scattered-img" 
                            style="width:${w}%; height:${h}%; top:${top}%; left:${left}%; transform:rotate(${Math.random()*16-8}deg); z-index:${i+1};"
                            onerror="this.style.display='none'">`;
                    });
                }
            }
            const pageL = `<div class="page collage-page">${photosHtml}</div>`;
            
            // YAZI (SAĞ)
            const pageR = `
                <div class="page text-page">
                    <h2 class="page-title">${item.title}</h2>
                    <div class="page-date">${item.date}</div>
                    <p class="page-text">"${item.text}"</p>
                </div>`;
            
            $('#magazine').append(pageL).append(pageR);
        });
    }

    // ARKA KAPAK
    $('#magazine').append(`
        <div class="page cover-back">
            <h1 class="main-title" style="font-size:2rem">Seni Çok Seviyorum Ayşebalım</h1>
            <div class="divider"><span class="heart-icon">♥</span></div>
            <p class="names" style="margin-top:20px">14.02.2025</p>
        </div>
    `);

    // --- 3. TURN.JS BAŞLAT ---
    $('#magazine').turn({
        width: 900, height: 550, display: 'double',
        autoCenter: true, acceleration: true, gradients: true, elevation: 50, duration: 1000
    });

    // --- 4. TELEFON İÇİN DOKUNMATİK KONTROL (YENİ!) ---
    // Kitabın sağına basınca ileri, soluna basınca geri
    $('#magazine').click(function(e) {
        // Eğer resme tıklandıysa (lightbox açıldıysa) sayfa çevirme
        if($(e.target).hasClass('scattered-img')) return;

        var bookWidth = $(this).width();
        var clickX = e.pageX - $(this).offset().left;

        // Sağ tarafa tıklandıysa -> İLERİ
        if (clickX > bookWidth / 2) {
            $(this).turn('next');
        } 
        // Sol tarafa tıklandıysa -> GERİ
        else {
            $(this).turn('previous');
        }
    });

    // Klavye Desteği (Bilgisayar için)
    $(window).bind('keydown', function(e){
        if (e.keyCode==37) $('#magazine').turn('previous');
        if (e.keyCode==39) $('#magazine').turn('next');
    });

    // SAYAÇ
    setInterval(function() {
        var start = new Date("2024-08-03T00:00:00");
        var diff = new Date() - start;
        var d = Math.floor(diff / (1000 * 60 * 60 * 24));
        var h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        var m = Math.floor((diff / 1000 / 60) % 60);
        $('#together-counter').html(d + " GÜN " + h + " SAAT " + m + " DAKİKA");
    }, 1000);
});
