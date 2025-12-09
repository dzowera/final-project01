const contactForm = document.getElementById("contact-form");
const confirmation = document.getElementById("confirmation");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Show confirmation message
  confirmation.textContent = "✅ Your message has been received. Thank you for reaching out!";
  
  // Clear form fields
  contactForm.reset();
});