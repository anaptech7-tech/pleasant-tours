document.addEventListener('DOMContentLoaded', function () {
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
})
