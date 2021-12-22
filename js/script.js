
window.addEventListener('load', () => {
    document.querySelector('#header-menu').addEventListener('click', () => {
        document.querySelector('#header-menu-middle').classList.add('active');
    });
    document.querySelector('#header-menu-middle-close').addEventListener('click', () => {
        document.querySelector('#header-menu-middle').classList.remove('active');
    });
    document.querySelector('.cart-item-delete a').addEventListener('click', () => {
        document.querySelector('body').classList.remove('has-items');
        cartBadge.innerText = 0;
    });
    document.querySelector('#header-menu-right-cart-button a').addEventListener('click', () => {
        document.querySelector('#cart').classList.toggle('active');
    });

    document.addEventListener('click', event => {
        const elmCart = document.querySelector('#cart');
        const btnOpenCart = document.querySelector('#header-menu-right-cart-button a');
        let elmTarget = event.target;
        do {
        if (elmTarget === elmCart || elmTarget === btnOpenCart) {
            return;
        }
        elmTarget = elmTarget.parentNode;
        } while(elmTarget);
        // clicked outside of the cart
        document.querySelector('#cart').classList.remove('active');
    });

    function handleMoveProducstsImagesCarroussel(actionType) {
        const actualImage = document.querySelector('#product-images-center .product-image.active');
        const actualImageIndex = prodsImages.indexOf(actualImage);

        let nextImageIndex = null;
        if (actionType === 'next') {
        nextImageIndex = actualImageIndex === prodsImagesTotal - 1 ? 0 : actualImageIndex + 1;
        } else {
        nextImageIndex = actualImageIndex === 0 ? prodsImagesTotal - 1 : actualImageIndex - 1;
        }
        document.querySelector('#product-images-center .product-image.active').classList.remove('active');
        document.querySelectorAll('#product-images-center .product-image')[nextImageIndex].classList.add('active');
        
        document.querySelector('#product-images-thumbs .product-image-thumb.active').classList.remove('active');
        document.querySelectorAll('#product-images-thumbs .product-image-thumb')[nextImageIndex].classList.add('active');
    }

    const prodsImages = [...document.querySelectorAll('#product-images-center .product-image')];
    const prodsImagesTotal = prodsImages.length;
    document.querySelectorAll('.product-arrow button').forEach(bntArrow => {
        const btnType = bntArrow.dataset.type;
        bntArrow.addEventListener('click', () => handleMoveProducstsImagesCarroussel(btnType));
    });

    const thumbproductImages = [...document.querySelectorAll('#product-images-thumbs .product-image-thumb')];
    document.querySelectorAll('.product-image-thumb').forEach(imgProduct => {
        imgProduct.addEventListener('click', () => {
        if (imgProduct.classList.contains('active')) {
            return;
        }
        const btnImageIndex = thumbproductImages.indexOf(imgProduct);
        document.querySelector('#product-images-thumbs .product-image-thumb.active').classList.remove('active');
        document.querySelectorAll('#product-images-thumbs .product-image-thumb')[btnImageIndex].classList.add('active');

        document.querySelector('#product-images-center .product-image.active').classList.remove('active');
        document.querySelectorAll('#product-images-center .product-image')[btnImageIndex].classList.add('active');
        });
    });

    document.querySelectorAll('.product-amount-button').forEach(btnAmount => {
        btnAmount.addEventListener('click', () => {
        const btnType = btnAmount.dataset.type;
        const inputAmount = document.querySelector('#product-amount-value');
        const inputValue = parseInt(inputAmount.value);
        if (btnType === 'minus') {
            inputAmount.value = inputValue > 0 ? inputValue - 1 : 0;
        } else {
            inputAmount.value = inputValue < 999 ? inputValue + 1 : 999;
        }
        });
    });

    const inpAmountValue = document.querySelector('#product-amount-value');
    const cartBadge = document.querySelector('#header-menu-right-cart-badge');
    const itemPrice = document.querySelector('#product-actual-price-content');
    const itemCartPrice = document.querySelector('.cart-item-middle-price');
    const itemCartQuantity = document.querySelector('.cart-item-middle-quantity');
    const itemCartAmount = document.querySelector('.cart-item-middle-amount');
    document.querySelector('#btn-add-to-cart').addEventListener('click', () => {
        const amount = parseInt(inpAmountValue.value);
        if (amount === 0) {
        return;
        }
        const totalAmount = parseInt(cartBadge.innerText) + amount;
        cartBadge.innerText = totalAmount;
        if (document.querySelector('body').classList.contains('has-items') === false) {
        document.querySelector('body').classList.add('has-items');
        }
        let itemPriceValue = parseFloat(itemPrice.innerText.replace('$', ''));
        itemCartQuantity.innerText = totalAmount;
        itemCartPrice.innerText = itemPriceValue;
        itemCartAmount.innerText = totalAmount * itemPriceValue;
        inpAmountValue.value = 0;
    });

    document.querySelector('#product-lightbox-close button').addEventListener('click', () => {
        document.querySelector('#product-lightbox').classList.remove('active');
    });

    const prodsLightboxImages = [...document.querySelectorAll('.product-lightbox-content-image')];
    const prodsLightboxImagesTotal = prodsLightboxImages.length;

    function handleMoveProducstsLightboxImagesCarroussel(actionType, nextImageIndex = null) {
        const actualImage = document.querySelector('.product-lightbox-content-image.active');
        const actualImageIndex = prodsLightboxImages.indexOf(actualImage);

        if (nextImageIndex === null && actionType === 'next') {
        nextImageIndex = actualImageIndex === prodsLightboxImagesTotal - 1 ? 0 : actualImageIndex + 1;
        } else if (nextImageIndex === null) {
        nextImageIndex = actualImageIndex === 0 ? prodsLightboxImagesTotal - 1 : actualImageIndex - 1;
        }
        document.querySelector('.product-lightbox-content-image.active').classList.remove('active');
        document.querySelectorAll('.product-lightbox-content-image')[nextImageIndex].classList.add('active');
        
        document.querySelector('.product-lightbox-content-thumb.active').classList.remove('active');
        document.querySelectorAll('.product-lightbox-content-thumb')[nextImageIndex].classList.add('active');
    }

    document.querySelectorAll('.product-lightbox-arrows').forEach(arrowLightbox => {
        const btnType = arrowLightbox.dataset.type;
        arrowLightbox.addEventListener('click', () => handleMoveProducstsLightboxImagesCarroussel(btnType));
    });

    const thumbProductLightboxImages = [...document.querySelectorAll('.product-lightbox-content-thumb')];
    document.querySelectorAll('.product-lightbox-content-thumb').forEach(imgProduct => {
        imgProduct.addEventListener('click', () => {
        if (imgProduct.classList.contains('active')) {
            return;
        }
        const btnImageIndex = thumbProductLightboxImages.indexOf(imgProduct);
        handleMoveProducstsLightboxImagesCarroussel(null, btnImageIndex);
        });
    });

    document.querySelectorAll('.product-image').forEach(productImage => {
        productImage.addEventListener('click', () => {
        document.querySelector('#product-lightbox').classList.add('active');
        });
    });

    document.addEventListener('click', event => {
        const elmLightboxContent = document.querySelector('#product-lightbox-center');
        const elmThumbs = document.querySelector('#product-images-center');
        let elmTarget = event.target;
        do {
        if (elmTarget === elmLightboxContent || elmTarget === elmThumbs) {
            return;
        }
        elmTarget = elmTarget.parentNode;
        } while(elmTarget);
        // clicked outside of the cart
        document.querySelector('#product-lightbox').classList.remove('active');
    });
});