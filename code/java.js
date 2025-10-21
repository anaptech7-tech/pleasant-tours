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

  // Cart functionality
  let cart = [];

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

  // Add to cart button click
  $('#addToCartBtn').click(function() {
    const title = $('#modalTitle').text();
    const price = $('#modalPrice').text();

    // Check if item already in cart
    const existingItem = cart.find(item => item.title === title);
    if (!existingItem) {
      cart.push({ title, price });
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
    updateCartCount();
    updateCartModal();
  });

  // Order now button click
  $('#orderNowBtn').click(function() {
    if (cart.length > 0) {
      alert('Order placed successfully! We will contact you soon.');
      cart = [];
      updateCartCount();
      updateCartModal();
      $('#cartModal').modal('hide');
    }
  });
});
