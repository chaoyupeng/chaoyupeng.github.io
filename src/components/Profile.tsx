import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import './ViewCounter.tsx'

@customElement('app-profile')
export class Profile extends LitElement {
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
    :host {
      display: block;
      width: 25%;
    }
    
    .container {
      backdrop-filter: blur(12px) saturate(120%);
      background: rgba(255, 255, 255, 0.3);
      border: 1px solid rgba(0, 0, 0, 0.15);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
      padding: 1.5rem;
      border-radius: 0.5rem;
      text-align: center;
      transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    :host([theme="dark"]) .container {
      background: rgba(31, 41, 55, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .icon {
      color: #60a5fa;
      margin-right: 0.5rem;
    }
    
    .title {
      font-size: 1.125rem;
      font-weight: 500;
      color: #1f2937;
      transition: color 0.3s ease;
    }
    
    :host([theme="dark"]) .title {
      color: white;
    }
    
    .avatar {
      margin: 0 auto 1rem auto;
      width: 9rem;
      height: 9rem;
      border-radius: 50%;
      border: 4px solid #374151;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      object-fit: cover;
    }
    
    :host([theme="dark"]) .avatar {
      border-color: white;
    }
    
    .name {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.25rem;
      color: #1f2937;
      transition: color 0.3s ease;
    }
    
    :host([theme="dark"]) .name {
      color: white;
    }
    
    .role {
      color: #4b5563;
      margin-bottom: 1.5rem;
      transition: color 0.3s ease;
    }
    
    :host([theme="dark"]) .role {
      color: #9ca3af;
    }
    
    .service-section {
      margin-top: 2rem;
    }
    
    .service-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .star {
      color: #eab308;
    }
    
    .service-text {
      color: #374151;
      transition: color 0.3s ease;
    }
    
    :host([theme="dark"]) .service-text {
      color: #d1d5db;
    }
    
    .service-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .service-icon-container {
      padding: 0.25rem;
      background: #374151;
      border-radius: 50%;
    }
    
    :host([theme="dark"]) .service-icon-container {
      background: #e5e7eb;
    }
    
    .service-icon svg {
      width: 1.25rem;
      height: 1.25rem;
      color: #9ca3af;
      transition: color 0.3s ease;
    }
    
    :host([theme="dark"]) .service-icon svg {
      color: #4b5563;
    }
  `

  render() {
    return html`
      <div class="container">
        <div class="header">
          <span class="icon">📝</span>
          <span class="title">Profile</span>
        </div>
        
        <img 
          src="/Avatar.jpeg" 
          alt="Profile Picture" 
          class="avatar"
        />
        <h2 class="name">
          Yupeng Chao
        </h2>
        <p class="role">
          ML/AI Enthusiast
        </p>
        
        <app-view-counter></app-view-counter>
        
        <div class="service-section">
          <div class="service-header">
            <span class="star">⭐</span>
            <span class="service-text">Service</span>
          </div>
          
          <div class="service-item">
            <span class="service-icon-container">
              <div class="service-icon">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fill-rule="evenodd" 
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" 
                    clip-rule="evenodd" 
                  />
                </svg>
              </div>
            </span>
            <span class="service-text">Untitled</span>
          </div>
        </div>
      </div>
    `
  }
}