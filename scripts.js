// Page navigation
function showPage(page) {
    const pages = ['home', 'shop', 'collections', 'about', 'contact'];
    pages.forEach(p => {
        document.getElementById(p + '-page').classList.add('hidden');
    });
    document.getElementById(page + '-page').classList.remove('hidden');
    window.scrollTo(0, 0);
    // Hide overlays if open
    document.getElementById('cart-sidebar').classList.add('translate-x-full');
    document.getElementById('overlay').classList.add('hidden');
    document.getElementById('mobile-menu').classList.remove('open');
}

// Mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');
    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        overlay.classList.add('hidden');
    } else {
        menu.classList.add('open');
        overlay.classList.remove('hidden');
    }
}

// Cart sidebar
function toggleCart() {
    const cart = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    if (cart.classList.contains('translate-x-full')) {
        cart.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
    } else {
        cart.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    }
    // Also close mobile menu if open
    document.getElementById('mobile-menu').classList.remove('open');
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    if (count > 0) {
        badge.textContent = count;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function updateCartSidebar() {
    const cartItems = document.getElementById('cart-items');
    const subtotal = document.getElementById('cart-subtotal');
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="text-center py-8 text-gray-500">Your cart is empty</div>';
        subtotal.textContent = '0.00 DZD';
        updateCartBadge();
        return;
    }
    let html = '';
    let total = 0;
    cart.forEach((item, idx) => {
        total += item.price * item.qty;
        html += `
        <div class="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <div class="flex items-center">
                <img src="${item.img}" alt="${item.name}" class="w-16 h-16 rounded mr-3 object-cover">
                <div>
                    <div class="font-semibold">${item.name}</div>
                    <div class="text-gray-500 text-sm">${item.price.toFixed(2)} DZD</div>
                    <div class="flex items-center mt-1">
                        <button onclick="changeQty(${idx}, -1)" class="px-2 py-1 text-gray-600 hover:text-blue-600">-</button>
                        <span class="mx-2">${item.qty}</span>
                        <button onclick="changeQty(${idx}, 1)" class="px-2 py-1 text-gray-600 hover:text-blue-600">+</button>
                    </div>
                </div>
            </div>
            <button onclick="removeFromCart(${idx})" class="text-red-500 hover:text-red-700 ml-2"><i class="fas fa-trash"></i></button>
        </div>
        `;
    });
    cartItems.innerHTML = html;
    subtotal.textContent = total.toFixed(2) + ' DZD';
    updateCartBadge();
}

function addToCart(name, price, img) {
    const idx = cart.findIndex(item => item.name === name);
    if (idx > -1) {
        cart[idx].qty += 1;
    } else {
        cart.push({ name, price, img, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSidebar();
    updateCartBadge();
    toggleCart();
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSidebar();
    updateCartBadge();
}

function changeQty(idx, delta) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) {
        removeFromCart(idx);
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartSidebar();
        updateCartBadge();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase! (Demo only)');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSidebar();
    updateCartBadge();
    toggleCart();
}

// Product data for search (add all products you want searchable)
const products = [
    {
        id: 1,
        name: "Performance Running Tee",
        price: 7500 ,
        img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        description: "Breathable fabric with moisture-wicking technology",
        available: 50,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Blue", "Black", "Green"],
        details: [
            "Moisture-wicking fabric",
            "4-way stretch material",
            "Seamless construction",
            "Anti-odor technology"
        ]
    },
    {
        id: 2,
        name: "Elite Training Shoes",
        price: 21000,
        img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
        description: "Lightweight with 4-way stretch for maximum mobility",
        available: 50,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Gray", "Red"],
        details: [
            "Quick-dry fabric",
            "Elastic waistband with drawstring",
            "Side pockets",
            "Reflective details for low light visibility"
        ]
    },
    {
        id: 3,
        name: "white crew neck shirt",
        price: 3500,
        img: "https://teamwear.blksport.com/wp-content/uploads/2018/04/Design_Your_Own_Gym_Tee_BLK.png",
        description: "High support with seamless construction",
        available: 50,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["White", "Black", "Navy"],
        details: [
            "Breathable and lightweight",
            "Seamless design for comfort",
            "High stretch for a perfect fit",
            "Machine washable"
        ]
    },
    {
        id: 4,
        name: "Pro Running Jacket",
        price: 10000,
        img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1f469e74b9d94633b5945d0a10883330_9366/Tiro_24_Training_Jacket_Kids_Blue_IR7501_01_laydown.jpg",
        description: "Windproof and water-resistant with reflective details",
        available: 50,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blue", "Black"],
        details: [
            "Windproof and water-resistant fabric",
            "Reflective details for visibility",
            "Zippered pockets",
            "Adjustable hem and cuffs"
        ]
    },
    {
        id: 5,
        name: "slim jacket",
        price:6000,
        img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
        description: "Muscle support and enhanced circulation",
        available: 50,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "Gray"],
        details: [
            "Compression fit for muscle support",
            "Moisture-wicking and breathable",
            "Flatlock seams to prevent chafing",
            "Machine washable"
        ]
    },
    {
        id: 6,
        name: "Performance Hoodie",
        price: 2800,
        img: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
        description: "Warmth without weight for cool weather training",
        available: 50,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Charcoal", "Navy"],
        details: [
            "Lightweight and warm",
            "Breathable fabric",
            "Kangaroo pocket",
            "Ribbed cuffs and hem"
        ]
    },
    {
        id: 7,
        name: "sport jeans",
        price: 5000,
        img: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
        description: "Ultra-breathable for intense workouts",
        available: 50,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Red", "Blue", "Black"],
        details: [
            "Ultra-breathable fabric",
            "Moisture-wicking",
            "Racerback design",
            "Machine washable"
        ]
    },
    {
        id: 8,
        name: "Tech Joggers",
        price: 4200,
        img: "https://media-photos.depop.com/b1/16070889/1723140931_d43cbc6c68564459b5f9df14dd94170d/P0.jpg",
        description: "Stylish comfort for training and recovery",
        available: 50,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Gray"],
        details: [
            "Soft and comfortable fabric",
            "Elastic waistband with drawstring",
            "Zippered pockets",
            "Tapered leg design"
        ]
    },
    {
        id: 9,
        name: "Light Support Sports Bra",
        price: 42.99,
        img: "https://images.unsplash.com/photo-1595341595379-cf2df1c6a95e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        description: "Perfect for yoga and low-impact activities",
        available: 50,
        sizes: ["XS", "S", "M", "L"],
        colors: ["Pink", "Black", "White"],
        details: [
            "Light support for comfort",
            "Breathable and quick-dry fabric",
            "Wide straps for support",
            "Machine washable"
        ]
    }
    // Add more products as needed
];

// Search bar functionality
document.addEventListener('DOMContentLoaded', function () {
    // Overlay click closes cart and mobile menu
    document.getElementById('overlay').addEventListener('click', function() {
        document.getElementById('cart-sidebar').classList.add('translate-x-full');
        document.getElementById('mobile-menu').classList.remove('open');
        this.classList.add('hidden');
    });

    // Initial setup
    updateCartSidebar();
    updateCartBadge();

    // Optional: prevent form submit (demo)
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert('Thank you for contacting us! (Demo only)');
            form.reset();
        });
    });

    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchForm = document.getElementById('search-form');

    if (searchInput && searchResults && searchForm) {
        searchInput.addEventListener('input', function () {
            const query = this.value.trim().toLowerCase();
            if (query.length === 0) {
                searchResults.classList.add('hidden');
                searchResults.innerHTML = '';
                return;
            }
            const matches = products.filter(
                p =>
                    p.name.toLowerCase().includes(query) ||
                    (p.description && p.description.toLowerCase().includes(query))
            );
            if (matches.length === 0) {
                searchResults.innerHTML = '<div class="p-4 text-gray-500">No products found.</div>';
            } else {
                searchResults.innerHTML = matches
                    .map(p => {
                        const stats = JSON.parse(localStorage.getItem(`product_${p.id}`));
                        return `
                <div class="flex items-center p-2 hover:bg-blue-50 cursor-pointer rounded relative" 
                     onclick="showProductDetails(${p.id})">
                    ${stats.views < 10 ? '<div class="badge-new text-xs py-1 px-2 right-2">New</div>' : ''}
                    <img src="${p.img}" alt="${p.name}" class="w-10 h-10 rounded mr-3 object-cover">
                    <div>
                        <div class="font-semibold">${p.name}</div>
                        <div class="text-gray-500 text-sm">${p.price.toFixed(2)} DZD</div>
                    </div>
                </div>
            `;
                    })
                    .join('');
            }
            searchResults.classList.remove('hidden');
        });

        // Hide results when clicking outside
        document.addEventListener('click', function (e) {
            if (!searchForm.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });

        // Optional: handle enter key to go to shop page
        searchForm.addEventListener('submit', function () {
            showPage('shop');
            searchResults.classList.add('hidden');
        });
    }
});

function initializeProductStats() {
    products.forEach(product => {
        if (!localStorage.getItem(`product_${product.id}`)) {
            localStorage.setItem(`product_${product.id}`, JSON.stringify({
                views: 0,
                purchased: 0,
                available: product.available
            }));
        }
    });
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Update views
    let stats = JSON.parse(localStorage.getItem(`product_${productId}`));
    stats.views++;
    localStorage.setItem(`product_${productId}`, JSON.stringify(stats));

    // Create details page content
    const detailsHtml = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button onclick="history.back()" class="mb-8 flex items-center text-gray-600 hover:text-blue-600">
                <i class="fas fa-arrow-left mr-2"></i> Back
            </button>
            
            <div class="bg-white rounded-xl shadow-lg overflow-hidden relative">
                ${stats.views < 10 ? '<div class="badge-new">New Arrival</div>' : ''}
                <div class="md:flex">
                    <div class="md:w-1/2 p-8">
                        <img src="${product.img}" alt="${product.name}" class="w-full h-96 object-cover rounded-lg">
                        <div class="grid grid-cols-4 gap-2 mt-4">
                            <img src="${product.img}" class="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75">
                            <!-- Add more thumbnail images if available -->
                        </div>
                    </div>
                    
                    <div class="md:w-1/2 p-8">
                        <h1 class="text-3xl font-bold mb-4">${product.name}</h1>
                        <p class="text-gray-600 mb-4">${product.description}</p>
                        <div class="text-2xl font-bold text-blue-600 mb-6">${product.price} DZD</div>
                        
                        <div class="mb-6">
                            <h3 class="font-semibold mb-2">Product Stats:</h3>
                            <div class="flex space-x-8 text-sm text-gray-600">
                                <div>
                                    <i class="fas fa-eye mr-1"></i>
                                    <span>${stats.views} views</span>
                                </div>
                                <div>
                                    <i class="fas fa-shopping-cart mr-1"></i>
                                    <span>${stats.purchased} purchased</span>
                                </div>
                                <div>
                                    <i class="fas fa-box mr-1"></i>
                                    <span>${stats.available} in stock</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mb-6">
                            <h3 class="font-semibold mb-2">Select Size:</h3>
                            <div class="flex flex-wrap gap-2">
                                ${product.sizes.map(size => `
                                    <label class="size-selector">
                                        <input type="radio" name="size" value="${size}" class="hidden">
                                        <span class="px-4 py-2 border rounded-lg cursor-pointer hover:border-blue-500">${size}</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="mb-6">
                            <h3 class="font-semibold mb-2">Select Color:</h3>
                            <div class="flex flex-wrap gap-2">
                                ${product.colors.map(color => `
                                    <label class="color-selector">
                                        <input type="radio" name="color" value="${color}" class="hidden">
                                        <span class="w-8 h-8 rounded-full border-2 cursor-pointer" style="background-color: ${color.toLowerCase()}"></span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                        
                        <button onclick="addToCart('${product.name}', ${product.price}, '${product.img}')" 
                                class="w-full btn-primary px-8 py-4 rounded-lg font-medium mb-4"
                                ${stats.available === 0 ? 'disabled' : ''}>
                            ${stats.available === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                        
                        <div class="mt-8">
                            <h3 class="font-semibold mb-2">Product Details:</h3>
                            <ul class="list-disc list-inside text-gray-600">
                                ${product.details.map(detail => `<li>${detail}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Show details page
    const pages = document.querySelectorAll('.page-transition');
    pages.forEach(page => page.classList.add('hidden'));
    
    let detailsPage = document.getElementById('product-details-page');
    if (!detailsPage) {
        detailsPage = document.createElement('div');
        detailsPage.id = 'product-details-page';
        detailsPage.className = 'page-transition';
        document.querySelector('main').appendChild(detailsPage);
    }
    
    detailsPage.innerHTML = detailsHtml;
    detailsPage.classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Update addToCart function
const originalAddToCart = addToCart;
addToCart = function(name, price, img) {
    const product = products.find(p => p.name === name);
    if (!product) return;

    let stats = JSON.parse(localStorage.getItem(`product_${product.id}`));
    if (stats.available > 0) {
        stats.purchased++;
        stats.available--;
        localStorage.setItem(`product_${product.id}`, JSON.stringify(stats));
        originalAddToCart(name, price, img);
    } else {
        alert('Sorry, this product is out of stock!');
    }
};

// Initialize product stats when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeProductStats();
    // ... existing DOMContentLoaded code ...
});

// Update the shop page product card generation
function renderShopPage() {
    const shopPage = document.getElementById('shop-page');
    if (shopPage) {
        let shopHtml = `
            <section class="py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        `;
        products.forEach(product => {
            const stats = JSON.parse(localStorage.getItem(`product_${product.id}`));
            shopHtml += `
                <div class="glass-card product-card rounded-xl overflow-hidden relative group cursor-pointer" 
                     onclick="showProductDetails(${product.id})">
                    ${stats.views < 10 ? '<div class="badge-new">New Arrival</div>' : ''}
                    <img src="${product.img}" alt="${product.name}" class="w-full h-56 object-cover">
                    <div class="p-4">
                        <h3 class="font-semibold text-lg mb-1">${product.name}</h3>
                        <div class="text-blue-600 font-bold mb-2">${product.price.toFixed(2)} DZD</div>
                        <div class="text-gray-500 text-sm mb-2">${product.description || ''}</div>
                        <div class="flex justify-between text-xs text-gray-400">
                            <span>Views: ${stats.views}</span>
                            <span>Sold: ${stats.purchased}</span>
                            <span>Stock: ${stats.available}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        shopHtml += `
                    </div>
                </div>
            </section>
        `;
        shopPage.innerHTML = shopHtml;
    }
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    renderShopPage();
});