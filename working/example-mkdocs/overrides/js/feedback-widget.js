// Feedback Widget JavaScript
(function() {
  'use strict';

  // Configuration
  const ENDPOINT = 'https://eok92phl93pa2xf.m.pipedream.net';
  const SUBMIT_DELAY = 2000; // Delay before allowing another submission

  // State
  let isSubmitting = false;
  let lastSubmitTime = 0;

  // Initialize the feedback widget
  function init() {
    // Create widget HTML
    const widgetHTML = `
      <div class="feedback-widget">
        <button class="feedback-button" aria-label="Send Feedback">
          Feedback
        </button>
        
        <div class="feedback-overlay"></div>
        
        <div class="feedback-panel" role="dialog" aria-labelledby="feedback-title">
          <div class="feedback-header">
            <h2 id="feedback-title" class="feedback-title">Share your feedback</h2>
            <button class="feedback-close" aria-label="Close feedback panel">
              <span>×</span>
            </button>
          </div>
          
          <div class="feedback-content">
            <form class="feedback-form" novalidate>
              <input 
                type="hidden" 
                id="feedback-url" 
                value="${window.location.href}"
              />
              
              <div class="feedback-field">
                <textarea 
                  id="feedback-comment" 
                  class="feedback-textarea" 
                  placeholder="Please share your thoughts, suggestions, or report any issues..."
                  required
                  aria-required="true"
                ></textarea>
              </div>
              
              <div class="feedback-field">
                <input 
                  type="email" 
                  id="feedback-email" 
                  class="feedback-input" 
                  placeholder="your@email.com"
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
      const comment = commentInput.value.trim();
      
      if (!comment) {
        showMessage('Please enter your feedback before submitting.', 'error');
        commentInput.focus();
        return false;
      }

      const email = emailInput.value.trim();
      if (!email) {
        showMessage('Please enter your email address.', 'error');
        emailInput.focus();
        return false;
      }
      
      if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
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
        showMessage('Please wait a moment before submitting again.', 'error');
        return;
      }

      // Validate
      if (!validateForm()) return;

      // Prepare data
      const data = {
        url: urlInput.value,
        comment: commentInput.value.trim(),
        email: emailInput.value.trim(),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || null
      };

      // Submit
      isSubmitting = true;
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');

      try {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          showMessage('Thank you for your feedback! We appreciate your input.', 'success');
          lastSubmitTime = Date.now();
          
          // Clear form after success
          setTimeout(() => {
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
        showMessage('Sorry, something went wrong. Please try again later.', 'error');
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