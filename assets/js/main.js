/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
        navToggle.setAttribute('aria-expanded', 'true')
    })
}

/*===== MENU HIDDEN =====*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
        navToggle.setAttribute('aria-expanded', 'false')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
    navToggle.setAttribute('aria-expanded', 'false')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME SWIPER ===============*/
let homeSwiper = new Swiper(".home-swiper", {
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
})

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 16,
    on: {
        /*
         * afterInit fires after Swiper has created its loop clones.
         * We re-read persisted favourite state and apply it to ALL
         * .new__favorite buttons now present in the DOM — originals
         * and clones alike.
         */
        afterInit() {
            const favs = getFavorites()
            document.querySelectorAll('.new__favorite').forEach(btn => {
                applyFavoriteState(btn, favs.includes(btn.dataset.id))
            })
        }
    }
})

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 460) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.home-swiper, .new-swiper, .newsletter__container`)
sr.reveal(`.category__data, .trick__content, .footer__content`, {interval: 100})
sr.reveal(`.about__data, .discount__img`, {origin: 'left'})
sr.reveal(`.about__img, .discount__data`, {origin: 'right'})

/*=============== THEME SWITCHER ===============*/
/*  Step 4 – Theme persistence + auto dark detection
    - On first visit: check prefers-color-scheme to pick a sensible default.
    - On subsequent visits: restore whatever the user picked from localStorage.
*/
const themeButtons = document.querySelectorAll('.theme-toggle__button')

const themes = {
    green: {
        body: 'linear-gradient(90deg, hsl(104, 28%, 40%) 0%, hsl(58, 28%, 40%) 100%)',
        container: 'linear-gradient(136deg, hsl(104, 28%, 35%) 0%, hsl(58, 28%, 35%) 100%)'
    },
    red: {
        body: 'linear-gradient(90deg, hsl(360, 28%, 40%) 0%, hsl(18, 28%, 40%) 100%)',
        container: 'linear-gradient(136deg, hsl(360, 28%, 35%) 0%, hsl(18, 28%, 35%) 100%)'
    },
    black: {
        body: 'hsl(30, 8%, 8%)',
        container: 'hsl(30, 8%, 10%)'
    }
}

function applyTheme(themeName) {
    const t = themes[themeName]
    if (!t) return
    document.documentElement.style.setProperty('--body-color', t.body)
    document.documentElement.style.setProperty('--container-color', t.container)
    themeButtons.forEach(b => {
        b.classList.toggle('active-theme', b.dataset.theme === themeName)
    })
}

function getDefaultTheme() {
    // Auto dark detection: map dark preference → black theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'black'
    }
    return 'green'
}

// Restore saved theme, or fall back to auto-detected default
const savedTheme = localStorage.getItem('halloween-theme') || getDefaultTheme()
applyTheme(savedTheme)

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme
        applyTheme(theme)
        localStorage.setItem('halloween-theme', theme)
    })
})

/*=============== FAVORITES – localStorage ===============*/
const FAVORITES_KEY = 'halloween-favorites'

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []
    } catch {
        return []
    }
}

function saveFavorites(ids) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids))
}

function updateFavoriteBadge(ids) {
    const badge = document.getElementById('favorites-badge')
    const navFav = document.getElementById('nav-favorites')
    if (!badge || !navFav) return
    badge.textContent = ids.length
    navFav.setAttribute('aria-label', `View favorites (${ids.length} item${ids.length !== 1 ? 's' : ''})`)
}

/*
 * applyFavoriteState updates a SINGLE button node.
 * Called both during init and whenever state changes.
 */
function applyFavoriteState(btn, isFav) {
    btn.setAttribute('aria-pressed', String(isFav))
    btn.classList.toggle('new__favorite--active', isFav)
    const icon = btn.querySelector('i')
    if (icon) {
        icon.className = isFav ? 'bx bxs-heart' : 'bx bx-heart'
        icon.setAttribute('aria-hidden', 'true')
    }
    const title = btn.closest('.new__content')?.querySelector('.new__title')
    const itemName = title ? title.textContent.trim() : 'item'
    btn.setAttribute('aria-label',
        `${isFav ? 'Remove' : 'Add'} ${itemName} ${isFav ? 'from' : 'to'} favorites`)
}

/*
 * syncFavoriteButtons updates EVERY .new__favorite button that shares
 * the given data-id — including Swiper loop clones.
 * This is the key fix: querySelectorAll at the moment of the call
 * finds all live DOM nodes (originals + clones) rather than a stale
 * snapshot taken at page-load.
 */
function syncFavoriteButtons(id, isFav) {
    document.querySelectorAll(`.new__favorite[data-id="${id}"]`)
            .forEach(btn => applyFavoriteState(btn, isFav))
}

function initFavorites() {
    // Restore persisted state for all currently-existing buttons
    // (originals only at this point — clones may not exist yet).
    const favorites = getFavorites()
    document.querySelectorAll('.new__favorite').forEach(btn => {
        applyFavoriteState(btn, favorites.includes(btn.dataset.id))
    })
    updateFavoriteBadge(favorites)

    /*
     * Event delegation on the stable .new-swiper wrapper.
     * Works for original slides AND Swiper loop clones because
     * the wrapper itself is never duplicated.
     */
    const swiperWrapper = document.querySelector('.new-swiper')
    if (!swiperWrapper) return

    swiperWrapper.addEventListener('click', e => {
        const btn = e.target.closest('.new__favorite')
        if (!btn) return

        const id   = btn.dataset.id
        let favs   = getFavorites()
        const isFav = favs.includes(id)

        if (isFav) {
            favs = favs.filter(f => f !== id)
        } else {
            favs.push(id)
        }

        saveFavorites(favs)
        // Sync ALL buttons with this id (original + clones)
        syncFavoriteButtons(id, !isFav)
        updateFavoriteBadge(favs)
    })
}

initFavorites()

/*=============== SEARCH / FILTER – Trick or Treat (Step 3) ===============*/
const searchInput = document.getElementById('trick-search')
const trickItems  = document.querySelectorAll('.trick__content')
const noResults   = document.getElementById('trick-no-results')

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase()
        let visibleCount = 0

        trickItems.forEach(card => {
            const title = (card.dataset.title || '').toLowerCase()
            const matches = title.includes(query)
            card.hidden = !matches
            if (matches) visibleCount++
        })

        if (noResults) noResults.hidden = visibleCount > 0
    })
}

/*=============== CONFETTI BURST on "Book Now" click (Step 7) ===============*/
/*  Pure CSS-keyframe approach: spawn candy-emoji <span> elements
    positioned at the click origin, animate upward, then remove.
    No external library needed.
*/
const CANDIES = ['🎃', '🍬', '🍭', '💀', '🕷️', '👻', '🦇', '⭐']

function spawnConfetti(originX, originY) {
    const PARTICLE_COUNT = 18

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const el = document.createElement('span')
        el.className = 'confetti-particle'
        el.textContent = CANDIES[Math.floor(Math.random() * CANDIES.length)]
        el.setAttribute('aria-hidden', 'true')

        // Random spread
        const angle  = (Math.random() * 360) * (Math.PI / 180)
        const speed  = 60 + Math.random() * 100           // px
        const dx     = Math.cos(angle) * speed
        const dy     = Math.sin(angle) * speed - 80        // bias upward
        const rotate = Math.floor(Math.random() * 720) - 360

        el.style.cssText = `
            left: ${originX}px;
            top: ${originY}px;
            --dx: ${dx}px;
            --dy: ${dy}px;
            --rotate: ${rotate}deg;
            font-size: ${14 + Math.floor(Math.random() * 12)}px;
            animation-delay: ${Math.random() * 100}ms;
        `

        document.body.appendChild(el)
        el.addEventListener('animationend', () => el.remove(), {once: true})
    }
}

document.querySelectorAll('.book-now-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const rect = btn.getBoundingClientRect()
        const x = rect.left + rect.width / 2 + window.scrollX
        const y = rect.top + window.scrollY
        spawnConfetti(x, y)
    })
})

/*=============== SERVICE WORKER REGISTRATION ===============*/
/*
 * The SW file lives at assets/js/sw.js but must be served from the root
 * to control the whole page scope.  We register it with an explicit scope.
 * The guard keeps this silent on browsers that don't support SW (e.g. older
 * Safari, some private-browsing modes).
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('./assets/js/sw.js', { scope: './' })
            .then(reg => {
                console.log('[SW] Registered, scope:', reg.scope)
            })
            .catch(err => {
                console.warn('[SW] Registration failed:', err)
            })
    })
}

/*=============== COUNTDOWN TIMER ===============*/
/*
 * Counts down to Oct 31 of the current year.
 * Rolls to the following year if that date has already passed.
 * Position: static — banner sits in normal document flow above Home.
 * (sticky is intentionally NOT used — .main has overflow:hidden
 *  which breaks sticky at desktop widths.)
 */
function getHalloweenTarget() {
    const now = new Date()
    let target = new Date(now.getFullYear(), 9, 31, 23, 59, 59) // month 9 = October
    if (now >= target) {
        target = new Date(now.getFullYear() + 1, 9, 31, 23, 59, 59)
    }
    return target
}

function updateCountdown() {
    const daysEl  = document.getElementById('countdown-days')
    const hoursEl = document.getElementById('countdown-hours')
    const minsEl  = document.getElementById('countdown-mins')
    if (!daysEl || !hoursEl || !minsEl) return

    const diff = getHalloweenTarget() - new Date()

    if (diff <= 0) {
        daysEl.textContent = hoursEl.textContent = minsEl.textContent = '0'
        return
    }

    daysEl.textContent  = Math.floor(diff / (1000 * 60 * 60 * 24))
    hoursEl.textContent = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0')
    minsEl.textContent  = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
}

updateCountdown()
setInterval(updateCountdown, 60000) // refresh every minute

/*=============== SHOPPING CART ===============*/
/*
 * State: array of { id, name, price, qty, image }
 * Follows the same helper pattern as the favourites feature above.
 */
const CART_KEY = 'halloween-cart'

function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || [] }
    catch { return [] }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

function cartTotalItems(cart) {
    return cart.reduce((sum, item) => sum + item.qty, 0)
}

function cartSubtotal(cart) {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0)
}

function updateCartBadge(cart) {
    const badge = document.getElementById('cart-badge')
    const btn   = document.getElementById('nav-cart-btn')
    if (!badge || !btn) return
    const count = cartTotalItems(cart)
    badge.textContent = count
    btn.setAttribute('aria-label', `Open cart (${count} item${count !== 1 ? 's' : ''})`)
}

function renderCartItems() {
    const cart      = getCart()
    const listEl    = document.getElementById('cart-items-list')
    const footerEl  = document.getElementById('cart-panel-footer')
    const subtotalEl = document.getElementById('cart-subtotal')
    if (!listEl) return

    updateCartBadge(cart)

    if (cart.length === 0) {
        listEl.innerHTML = `
            <div class="cart-panel__empty">
                <i class='bx bx-cart' aria-hidden="true"></i>
                <p>Your cart is empty.<br>Add something spooky!</p>
            </div>`
        if (footerEl) footerEl.style.display = 'none'
        return
    }

    if (footerEl) footerEl.style.display = ''
    if (subtotalEl) subtotalEl.textContent = `$${cartSubtotal(cart).toFixed(2)}`

    listEl.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item__img" loading="lazy">
            <div class="cart-item__info">
                <span class="cart-item__name">${item.name}</span>
                <span class="cart-item__price">$${item.price.toFixed(2)}</span>
                <div class="cart-item__controls">
                    <button class="cart-item__qty-btn" data-action="dec" data-id="${item.id}"
                        aria-label="Decrease quantity of ${item.name}">−</button>
                    <span class="cart-item__qty" aria-label="Quantity: ${item.qty}">${item.qty}</span>
                    <button class="cart-item__qty-btn" data-action="inc" data-id="${item.id}"
                        aria-label="Increase quantity of ${item.name}">+</button>
                    <button class="cart-item__remove" data-action="remove" data-id="${item.id}"
                        aria-label="Remove ${item.name} from cart">
                        <i class='bx bx-trash' aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>`).join('')

    // Wire quantity / remove controls (event delegation on the list)
    listEl.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id     = btn.dataset.id
            const action = btn.dataset.action
            let cart     = getCart()

            if (action === 'inc') {
                cart = cart.map(i => i.id === id ? {...i, qty: i.qty + 1} : i)
            } else if (action === 'dec') {
                cart = cart.map(i => i.id === id ? {...i, qty: i.qty - 1} : i)
                      .filter(i => i.qty > 0)
            } else if (action === 'remove') {
                cart = cart.filter(i => i.id !== id)
            }

            saveCart(cart)
            renderCartItems()
        })
    })
}

function addToCart(id, name, price, image) {
    let cart = getCart()
    const existing = cart.find(i => i.id === id)
    if (existing) {
        cart = cart.map(i => i.id === id ? {...i, qty: i.qty + 1} : i)
    } else {
        cart.push({ id, name, price, qty: 1, image })
    }
    saveCart(cart)
    renderCartItems()
    openCartPanel()     // give immediate feedback by opening the drawer
}

/* Panel open / close */
function openCartPanel() {
    const panel   = document.getElementById('cart-panel')
    const overlay = document.getElementById('cart-overlay')
    if (!panel || !overlay) return
    panel.classList.add('cart-panel--open')
    overlay.classList.add('cart-overlay--visible')
    panel.removeAttribute('aria-hidden')
    overlay.removeAttribute('aria-hidden')
    document.body.style.overflow = 'hidden'
    // Move focus to close button for keyboard users
    const closeBtn = document.getElementById('cart-panel-close')
    if (closeBtn) closeBtn.focus()
}

function closeCartPanel() {
    const panel   = document.getElementById('cart-panel')
    const overlay = document.getElementById('cart-overlay')
    if (!panel || !overlay) return
    panel.classList.remove('cart-panel--open')
    overlay.classList.remove('cart-overlay--visible')
    panel.setAttribute('aria-hidden', 'true')
    overlay.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
    // Return focus to the nav cart button
    const navBtn = document.getElementById('nav-cart-btn')
    if (navBtn) navBtn.focus()
}

/* Modal open / close */
function openCartModal() {
    const modal = document.getElementById('cart-modal-overlay')
    if (!modal) return
    modal.classList.add('cart-modal-overlay--visible')
    modal.removeAttribute('aria-hidden')
    const confirmBtn = document.getElementById('cart-modal-confirm')
    if (confirmBtn) confirmBtn.focus()
}

function closeCartModal() {
    const modal = document.getElementById('cart-modal-overlay')
    if (!modal) return
    modal.classList.remove('cart-modal-overlay--visible')
    modal.setAttribute('aria-hidden', 'true')
}

function initCart() {
    /* Render initial state from localStorage */
    renderCartItems()

    /* Nav cart button → open panel */
    const navCartBtn = document.getElementById('nav-cart-btn')
    if (navCartBtn) navCartBtn.addEventListener('click', openCartPanel)

    /* Close button + overlay click → close panel */
    const closeBtn = document.getElementById('cart-panel-close')
    if (closeBtn) closeBtn.addEventListener('click', closeCartPanel)

    const overlay = document.getElementById('cart-overlay')
    if (overlay) overlay.addEventListener('click', closeCartPanel)

    /* Escape key closes panel and modal */
    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return
        const panel = document.getElementById('cart-panel')
        const modal = document.getElementById('cart-modal-overlay')
        if (modal && modal.classList.contains('cart-modal-overlay--visible')) {
            closeCartModal()
        } else if (panel && panel.classList.contains('cart-panel--open')) {
            closeCartPanel()
        }
    })

    /* Checkout button → open modal */
    const checkoutBtn = document.getElementById('cart-checkout-btn')
    if (checkoutBtn) checkoutBtn.addEventListener('click', openCartModal)

    /* Modal: cancel */
    const cancelBtn = document.getElementById('cart-modal-cancel')
    if (cancelBtn) cancelBtn.addEventListener('click', closeCartModal)

    /* Modal: confirm → clear cart */
    const confirmBtn = document.getElementById('cart-modal-confirm')
    if (confirmBtn) confirmBtn.addEventListener('click', () => {
        saveCart([])
        renderCartItems()
        closeCartModal()
        closeCartPanel()
    })

    /* Wire Add-to-cart buttons on New Arrivals cards.
     *
     * Uses event delegation on the stable .new-swiper wrapper instead of
     * querying individual .new__button elements at page-load time.
     * This means Swiper loop clones — created AFTER this code runs —
     * work identically to the original slides without any re-wiring.
     */
    const newSwiperEl = document.querySelector('.new-swiper')
    if (newSwiperEl) {
        newSwiperEl.addEventListener('click', e => {
            const btn = e.target.closest('.new__button')
            if (!btn) return

            // Walk up to the card to read its data attributes
            const card = btn.closest('.new__content')
            if (!card) return

            const id        = card.dataset.id
            const name      = card.querySelector('.new__title')?.textContent?.trim() || id
            const img       = card.querySelector('.new__img')?.getAttribute('src') || ''
            const priceText = card.querySelector('.new__price')?.textContent?.trim() || '$0'
            const price     = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0

            addToCart(id, name, price, img)
        })
    }

    /* Wire Add-to-cart buttons on Trick or Treat cards.
     *
     * .trick__container is a plain CSS grid — no Swiper, no clones.
     * A single delegated listener on the container is sufficient.
     * data-title is intentionally left untouched; it is used by
     * the search/filter feature and must not be removed.
     */
    const trickContainerEl = document.querySelector('.trick__container')
    if (trickContainerEl) {
        trickContainerEl.addEventListener('click', e => {
            const btn = e.target.closest('.trick__button')
            if (!btn) return

            const card = btn.closest('.trick__content')
            if (!card) return

            const id        = card.dataset.id
            const name      = card.querySelector('.trick__title')?.textContent?.trim() || id
            const img       = card.querySelector('.trick__img')?.getAttribute('src') || ''
            const priceText = card.querySelector('.trick__price')?.textContent?.trim() || '$0'
            const price     = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0

            addToCart(id, name, price, img)
        })
    }
}

initCart()
