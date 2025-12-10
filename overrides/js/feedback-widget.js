// Feedback Widget JavaScript - OSE Vidensbank
(function() {
  'use strict';

  // Configuration
  const ENDPOINT = 'https://formspree.io/f/mzznjagl';
  const SUBMIT_DELAY = 2000;

  // State
  let isSubmitting = false;
  let lastSubmitTime = 0;

  // Initialize the feedback widget
  function init() {
    // Create widget HTML
    const widgetHTML = `
      <div class="feedback-widget">
        <button class="feedback-button" aria-label="Send feedback">
          Feedback
        </button>

        <div class="feedback-overlay"></div>

        <div class="feedback-panel" role="dialog" aria-labelledby="feedback-title">
          <div class="feedback-header">
            <h2 id="feedback-title" class="feedback-title">Send feedback</h2>
            <button class="feedback-close" aria-label="Luk feedback panel">
              <span>&times;</span>
            </button>
          </div>

          <div class="feedback-content">
            <form class="feedback-form" novalidate>
              <input
                type="hidden"
                name="url"
                id="feedback-url"
                value="${window.location.href}"
              />

              <div class="feedback-field">
                <label class="feedback-label" for="feedback-subject">
                  Emne <span class="required">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  id="feedback-subject"
                  class="feedback-input"
                  placeholder="Hvad handler din feedback om?"
                  required
                  aria-required="true"
                />
              </div>

              <div class="feedback-field">
                <label class="feedback-label" for="feedback-comment">
                  Kommentar <span class="required">*</span>
                </label>
                <textarea
                  id="feedback-comment"
                  name="comment"
                  class="feedback-textarea"
                  placeholder="Hjælp os med at forbedre dokumentationen - del dine forslag, rettelser eller idéer til nyt indhold..."
                  required
                  aria-required="true"
                ></textarea>
              </div>

              <div class="feedback-field">
                <label class="feedback-label" for="feedback-email">
                  Email <span class="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="feedback-email"
                  class="feedback-input"
                  placeholder="din@email.dk"
                  required
                  aria-required="true"
                />
              </div>

              <button type="submit" class="feedback-submit">
                Send
              </button>

              <div class="feedback-message" role="alert"></div>
            </form>
          </div>
        </div>
      </div>
    `;

    // Add widget to page
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // Get elements
    const button = document.querySelector('.feedback-button');
    const overlay = document.querySelector('.feedback-overlay');
    const panel = document.querySelector('.feedback-panel');
    const closeBtn = document.querySelector('.feedback-close');
    const form = document.querySelector('.feedback-form');
    const submitBtn = document.querySelector('.feedback-submit');
    const message = document.querySelector('.feedback-message');
    const urlInput = document.querySelector('#feedback-url');
    const subjectInput = document.querySelector('#feedback-subject');
    const commentInput = document.querySelector('#feedback-comment');
    const emailInput = document.querySelector('#feedback-email');

    // Event handlers
    function openPanel() {
      overlay.classList.add('active');
      panel.classList.add('active');
      document.body.style.overflow = 'hidden';
      commentInput.focus();

      // Update URL in case of SPA navigation
      urlInput.value = window.location.href;
    }

    function closePanel() {
      overlay.classList.remove('active');
      panel.classList.remove('active');
      document.body.style.overflow = '';

      // Reset form after animation
      setTimeout(() => {
        form.reset();
        urlInput.value = window.location.href;
        message.classList.remove('success', 'error');
        message.textContent = '';
        message.style.display = 'none';
      }, 300);
    }

    function showMessage(text, type) {
      message.textContent = text;
      message.classList.remove('success', 'error');
      message.classList.add(type);
      message.style.display = 'block';
    }

    function validateForm() {
      const subject = subjectInput.value.trim();

      if (!subject) {
        showMessage('Indtast venligst et emne.', 'error');
        subjectInput.focus();
        return false;
      }

      const comment = commentInput.value.trim();

      if (!comment) {
        showMessage('Skriv venligst din feedback inden du sender.', 'error');
        commentInput.focus();
        return false;
      }

      const email = emailInput.value.trim();
      if (!email) {
        showMessage('Indtast venligst din email.', 'error');
        emailInput.focus();
        return false;
      }

      if (!isValidEmail(email)) {
        showMessage('Indtast venligst en gyldig email.', 'error');
        emailInput.focus();
        return false;
      }

      return true;
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async function submitFeedback(e) {
      e.preventDefault();

      // Prevent double submission
      if (isSubmitting) return;

      // Rate limiting
      const now = Date.now();
      if (now - lastSubmitTime < SUBMIT_DELAY) {
        showMessage('Vent venligst et øjeblik før du sender igen.', 'error');
        return;
      }

      // Validate
      if (!validateForm()) return;

      // Submit
      isSubmitting = true;
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');

      try {
        const formData = new FormData(form);

        const response = await fetch(ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showMessage('Tak for din feedback! Vi sætter pris på dit input.', 'success');
          lastSubmitTime = Date.now();

          // Clear form after success
          setTimeout(() => {
            subjectInput.value = '';
            commentInput.value = '';
            emailInput.value = '';
          }, 1000);

          // Auto-close after success
          setTimeout(closePanel, 3000);
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (error) {
        console.error('Feedback submission error:', error);
        showMessage('Beklager, noget gik galt. Prøv venligst igen senere.', 'error');
      } finally {
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      }
    }

    // Attach event listeners
    button.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);
    form.addEventListener('submit', submitFeedback);

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('active')) {
        closePanel();
      }
    });

    // Prevent panel close when clicking inside
    panel.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
