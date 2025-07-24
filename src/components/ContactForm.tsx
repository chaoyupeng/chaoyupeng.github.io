import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

@customElement('app-contact-form')
export class ContactForm extends LitElement {
  @state()
  private formData: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  @state()
  private errors: Partial<ContactFormData> = {}

  @state()
  private isSubmitting = false

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('theme-change', this.handleThemeChange.bind(this) as EventListener)
    
    // Apply initial theme
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      this.setAttribute('theme', 'dark')
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('theme-change', this.handleThemeChange.bind(this) as EventListener)
  }

  private handleThemeChange(event: Event) {
    const customEvent = event as CustomEvent
    const theme = customEvent.detail.theme
    if (theme === 'dark') {
      this.setAttribute('theme', 'dark')
    } else {
      this.removeAttribute('theme')
    }
  }

  static styles = css`
    .container {
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 1.5rem;
      border-radius: 0.5rem;
    }
    
    .header {
      margin-bottom: 1.5rem;
    }
    
    .title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }
    
    :host([theme="dark"]) .title {
      color: white;
    }
    
    .description {
      color: #4b5563;
    }
    
    :host([theme="dark"]) .description {
      color: #9ca3af;
    }
    
    .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .field-group {
      display: flex;
      flex-direction: column;
    }
    
    .label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }
    
    :host([theme="dark"]) .label {
      color: #d1d5db;
    }
    
    .input,
    .textarea {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      background: white;
      color: #1f2937;
      font-family: inherit;
      font-size: inherit;
      box-sizing: border-box;
    }
    
    .input:focus,
    .textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    }
    
    .input.error,
    .textarea.error {
      border-color: #ef4444;
    }
    
    :host([theme="dark"]) .input,
    :host([theme="dark"]) .textarea {
      border-color: #4b5563;
      background: #374151;
      color: white;
    }
    
    .textarea {
      resize: vertical;
      min-height: 150px;
    }
    
    .error-message {
      margin-top: 0.25rem;
      font-size: 0.875rem;
      color: #ef4444;
    }
    
    .submit-section {
      padding-top: 1rem;
    }
    
    .submit-button {
      width: 100%;
      background: #2563eb;
      color: white;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .submit-button:hover:not(:disabled) {
      background: #1d4ed8;
    }
    
    .submit-button:disabled {
      background: #60a5fa;
      cursor: not-allowed;
    }
    
    .submit-button:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5), 0 0 0 4px rgba(59, 130, 246, 0.2);
    }
  `

  private handleChange(e: Event, field: keyof ContactFormData) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement
    this.formData = {
      ...this.formData,
      [field]: target.value
    }
    
    // Clear error when user starts typing
    if (this.errors[field]) {
      this.errors = {
        ...this.errors,
        [field]: undefined
      }
    }
  }

  private validateForm(): boolean {
    const newErrors: Partial<ContactFormData> = {}

    if (!this.formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!this.formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!this.formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!this.formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    this.errors = newErrors
    return Object.keys(newErrors).length === 0
  }

  private async handleSubmit(e: Event) {
    e.preventDefault()
    
    if (!this.validateForm()) {
      return
    }

    this.isSubmitting = true

    try {
      const recipientEmail = 'henrychao553@gmail.com'
      
      const subject = encodeURIComponent(this.formData.subject)
      const body = encodeURIComponent(
        `Name: ${this.formData.name}\nEmail: ${this.formData.email}\n\nMessage:\n${this.formData.message}`
      )
      
      const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`
      
      window.location.href = mailtoLink
      
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      
      alert('Email client opened successfully! Please send the email from your email application.')
      
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error processing your request. Please try again.')
    } finally {
      this.isSubmitting = false
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <h2 class="title">Contact Me</h2>
          <p class="description">
            I'd love to hear from you! Send me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        <form class="form" @submit=${this.handleSubmit}>
          <div class="field-group">
            <label class="label" for="name">Name *</label>
            <input
              class="input ${this.errors.name ? 'error' : ''}"
              type="text"
              id="name"
              .value=${this.formData.name}
              @input=${(e: Event) => this.handleChange(e, 'name')}
              placeholder="Your full name"
            />
            ${this.errors.name ? html`<p class="error-message">${this.errors.name}</p>` : ''}
          </div>

          <div class="field-group">
            <label class="label" for="email">Email *</label>
            <input
              class="input ${this.errors.email ? 'error' : ''}"
              type="email"
              id="email"
              .value=${this.formData.email}
              @input=${(e: Event) => this.handleChange(e, 'email')}
              placeholder="your.email@example.com"
            />
            ${this.errors.email ? html`<p class="error-message">${this.errors.email}</p>` : ''}
          </div>

          <div class="field-group">
            <label class="label" for="subject">Subject *</label>
            <input
              class="input ${this.errors.subject ? 'error' : ''}"
              type="text"
              id="subject"
              .value=${this.formData.subject}
              @input=${(e: Event) => this.handleChange(e, 'subject')}
              placeholder="What's this about?"
            />
            ${this.errors.subject ? html`<p class="error-message">${this.errors.subject}</p>` : ''}
          </div>

          <div class="field-group">
            <label class="label" for="message">Message *</label>
            <textarea
              class="textarea ${this.errors.message ? 'error' : ''}"
              id="message"
              .value=${this.formData.message}
              @input=${(e: Event) => this.handleChange(e, 'message')}
              placeholder="Tell me what's on your mind..."
            ></textarea>
            ${this.errors.message ? html`<p class="error-message">${this.errors.message}</p>` : ''}
          </div>

          <div class="submit-section">
            <button
              type="submit"
              class="submit-button"
              ?disabled=${this.isSubmitting}
            >
              ${this.isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    `
  }
}