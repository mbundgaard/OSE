// Feedback Widget JavaScript - OSE Vidensbank
(function() {
  'use strict';

  // Configuration
  const ENDPOINT = 'http://localhost:7132/api/feedback';
  const SUBMIT_DELAY = 2000;
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  const MAX_FILES = 5;
  const ALLOWED_TYPES = '.png,.jpg,.jpeg,.gif,.pdf,.docx,.xlsx,.txt,.md';

  // State
  let isSubmitting = false;
  let lastSubmitTime = 0;
  let selectedFiles = [];

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
                <label class="feedback-label" for="feedback-name">
                  Navn <span class="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="feedback-name"
                  class="feedback-input"
                  placeholder="Dit navn"
                  required
                  aria-required="true"
                />
              </div>

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
                <label class="feedback-label">
                  Vedhæft filer <span class="optional">(valgfrit)</span>
                </label>
                <div class="feedback-file-upload">
                  <input
                    type="file"
                    id="feedback-files"
                    class="feedback-file-input"
                    multiple
                    accept="${ALLOWED_TYPES}"
                  />
                  <label for="feedback-files" class="feedback-file-label">
                    <span class="feedback-file-icon">📎</span>
                    <span>Vælg filer</span>
                  </label>
                  <div class="feedback-file-list"></div>
                  <div class="feedback-file-hint">Max ${MAX_FILES} filer, ${MAX_FILE_SIZE / 1024 / 1024} MB per fil</div>
                </div>
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
    const nameInput = document.querySelector('#feedback-name');
    const subjectInput = document.querySelector('#feedback-subject');
    const commentInput = document.querySelector('#feedback-comment');
    const fileInput = document.querySelector('#feedback-files');
    const fileList = document.querySelector('.feedback-file-list');

    // Event handlers
    function openPanel() {
      overlay.classList.add('active');
      panel.classList.add('active');
      document.body.style.overflow = 'hidden';
      nameInput.focus();

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
        selectedFiles = [];
        updateFileList();
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

    function updateFileList() {
      fileList.innerHTML = selectedFiles.map((file, index) => `
        <div class="feedback-file-item">
          <span class="feedback-file-name">${file.name}</span>
          <button type="button" class="feedback-file-remove" data-index="${index}">&times;</button>
        </div>
      `).join('');

      // Add remove handlers
      fileList.querySelectorAll('.feedback-file-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = parseInt(e.target.dataset.index);
          selectedFiles.splice(index, 1);
          updateFileList();
        });
      });
    }

    function handleFileSelect(e) {
      const files = Array.from(e.target.files);

      for (const file of files) {
        if (selectedFiles.length >= MAX_FILES) {
          showMessage(`Max ${MAX_FILES} filer tilladt.`, 'error');
          break;
        }
        if (file.size > MAX_FILE_SIZE) {
          showMessage(`${file.name} er for stor (max ${MAX_FILE_SIZE / 1024 / 1024} MB).`, 'error');
          continue;
        }
        if (!selectedFiles.some(f => f.name === file.name)) {
          selectedFiles.push(file);
        }
      }

      updateFileList();
      fileInput.value = ''; // Reset input
    }

    function validateForm() {
      const name = nameInput.value.trim();
      if (!name) {
        showMessage('Indtast venligst dit navn.', 'error');
        nameInput.focus();
        return false;
      }

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

      return true;
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

        // Add files
        selectedFiles.forEach(file => {
          formData.append('files', file);
        });

        const response = await fetch(ENDPOINT, {
          method: 'POST',
          body: formData
        });

        let result = {};
        try {
          result = await response.json();
        } catch {
          // Response might not be JSON
        }

        if (response.ok && result.success) {
          showMessage('Tak for din feedback!', 'success');
          lastSubmitTime = Date.now();

          // Auto-close after success
          setTimeout(closePanel, 2000);
        } else {
          throw new Error(result.message || `Server fejl (${response.status})`);
        }
      } catch (error) {
        console.error('Feedback submission error:', error);
        showMessage(error.message || 'Beklager, noget gik galt. Prøv venligst igen senere.', 'error');
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
    fileInput.addEventListener('change', handleFileSelect);

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
