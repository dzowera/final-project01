export function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const confirmation = document.getElementById("confirmation");

  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    confirmation.textContent = "✅ Your message has been received. Thank you!";
    contactForm.reset();
  });
}