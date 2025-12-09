// contact.js
// Handles contact form submission and shows confirmation message

export function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const confirmation = document.getElementById("confirmation");

  // Only run if contact form exists on the page
  if (!contactForm) return;

  // Listen for form submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    // Show confirmation message
    confirmation.textContent =
      "✅ Your message has been received. Thank you for reaching out!";

    // Clear form fields
    contactForm.reset();
  });
}