Vue.component('PromoComp', {
    template: `
        <section class="promo">
            <div class="promo__boxes container">
                <div class="promo__boxes__box-1 promo__boxes--small promo__boxes--common">
                    <span class="promo__boxes__headline--style-1">30% off</span><br>
                    <span class="promo__boxes__headline--style-2">For women</span>
                </div>
                <div class="promo__boxes__box-2 promo__boxes--small promo__boxes--common">
                    <span class="promo__boxes__headline--style-1">Hot deal</span><br>
                    <span class="promo__boxes__headline--style-2">For men</span>
                </div>
                <div class="promo__boxes__box-3 promo__boxes--small promo__boxes--common">
                    <span class="promo__boxes__headline--style-1">New arrivals</span><br>
                    <span class="promo__boxes__headline--style-2">For kids</span>
                </div>
                <div class="promo__boxes__box-4 promo__boxes--big promo__boxes--common">
                    <span class="promo__boxes__headline--style-1">Luxurious and trendy</span><br>
                    <span class="promo__boxes__headline--style-2">Accessories</span>
                </div>
            </div>
        </section>
    `
});