$(document).ready(function() {
  // set year in footers
  const year = new Date().getFullYear();
  ['yearIndex','yearContact','yearPricing','yearAbout','yearTours'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = year;
  });

  // bootstrap form validation (contact)
  const contactForm = document.getElementById('contactForm')
  if(contactForm){
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault()
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated')
        return;
      }

      const status = document.getElementById('contactStatus')
      if(status) status.textContent = 'Sending...'
      // mock send
      setTimeout(() => {
        if(status) status.textContent = 'Message sent — we will reply within 2 business days.';
        contactForm.reset()
        contactForm.classList.remove('was-validated')

      }, 700)
    })
  }

  // Cart functionality with localStorage persistence
  let cart = JSON.parse(localStorage.getItem('pleasantToursCart')) || [];

  // Update cart count badge
  function updateCartCount() {
    $('#cartCount').text(cart.length);
  }

  // Update cart modal content
  function updateCartModal() {
    const cartItems = $('#cartItems');
    if (cart.length === 0) {
      cartItems.html('<p>Your cart is empty.</p>');
      $('#orderNowBtn').prop('disabled', true);
    } else {
      let html = '<ul class="list-group">';
      cart.forEach((item, index) => {
        html += `<li class="list-group-item d-flex justify-content-between align-items-center">
          ${item.title} - ${item.price}
          <button class="btn btn-sm btn-danger remove-item" data-index="${index}">Remove</button>
        </li>`;
      });
      html += '</ul>';
      cartItems.html(html);
      $('#orderNowBtn').prop('disabled', false);
    }
  }

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('pleasantToursCart', JSON.stringify(cart));
  }

  // Initialize cart count and modal on page load
  updateCartCount();
  updateCartModal();

  // Add to cart button click
  $('#addToCartBtn').click(function() {
    const title = $('#modalTitle').text();
    const price = $('#modalPrice').text();

    // Check if item already in cart
    const existingItem = cart.find(item => item.title === title);
    if (!existingItem) {
      cart.push({ title, price });
      saveCart();
      updateCartCount();
      updateCartModal();
      alert('Tour added to cart!');
    } else {
      alert('This tour is already in your cart.');
    }

    // Close the tour modal
    $('#tourModal').modal('hide');
  });

  // Remove item from cart
  $(document).on('click', '.remove-item', function() {
    const index = $(this).data('index');
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    updateCartModal();
  });

  // Order now button click
  $('#orderNowBtn').click(function() {
    if (cart.length > 0) {
      alert('Order placed successfully! We will contact you soon.');
      cart = [];
      saveCart();
      updateCartCount();
      updateCartModal();
      $('#cartModal').modal('hide');
    }
  });

  // Itinerary Details Modal functionality
  $(document).on('click', '.card a[href="#"]', function(e) {
    e.preventDefault();
    const card = $(this).closest('.card');
    const title = card.find('.card-title').text();
    const description = card.find('.text-muted.small').text();
    const price = card.find('.fw-bold.text-success').text();
    const itinerary = card.data('itinerary');
    const imageSrc = card.find('img').attr('src');

    // Populate modal
    $('#itineraryModalTitle').text(title);
    $('#itineraryModalImage').attr('src', imageSrc);
    $('#itineraryModalDescription').text(description);
    $('#itineraryModalPrice').text(price);
    $('#itineraryModalDetails').text(itinerary);

    // Show modal
    $('#itineraryModal').modal('show');
  });

  // Add to Cart from Itinerary Modal
  $('#addToCartFromItinerary').click(function() {
    const title = $('#itineraryModalTitle').text();
    const price = $('#itineraryModalPrice').text();

    // Check if item already in cart
    const existingItem = cart.find(item => item.title === title);
    if (!existingItem) {
      cart.push({ title, price });
      saveCart();
      updateCartCount();
      updateCartModal();
      alert('Tour added to cart!');
      $('#itineraryModal').modal('hide');
    } else {
      alert('This tour is already in your cart.');
    }
  });

  // Download Itinerary as PDF
  $('#downloadItineraryBtn').click(function() {
    const title = $('#itineraryModalTitle').text();
    const description = $('#itineraryModalDescription').text();
    const price = $('#itineraryModalPrice').text();
    const itinerary = $('#itineraryModalDetails').text();

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(title, 20, 30);

    doc.setFontSize(12);
    doc.text(description, 20, 50);
    doc.text(price, 20, 60);

    doc.setFontSize(14);
    doc.text('Itinerary Details:', 20, 80);

    const lines = doc.splitTextToSize(itinerary, 170);
    doc.text(lines, 20, 90);

    doc.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
  });
});
