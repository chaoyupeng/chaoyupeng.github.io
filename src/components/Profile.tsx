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
      transition: background 0.6s ease, border-color 0.6s ease, box-shadow 0.6s ease;
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
      color: #1f2937;
      margin-right: 0.5rem;
      display: flex;
      align-items: center;
      transition: color 0.6s ease;
    }
    
    .icon svg {
      width: 24px;
      height: 24px;
      stroke: currentColor;
      transition: stroke 0.6s ease;
    }
    
    :host([theme="dark"]) .icon {
      color: white;
    }
    
    .title {
      font-size: 1.125rem;
      font-weight: 500;
      color: #1f2937;
      transition: color 0.6s ease;
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
      transition: border-color 0.6s ease;
    }
    
    :host([theme="dark"]) .avatar {
      border-color: white;
    }
    
    .name {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.25rem;
      color: #1f2937;
      transition: color 0.6s ease;
    }
    
    :host([theme="dark"]) .name {
      color: white;
    }
    
    .role {
      color: #4b5563;
      margin-bottom: 1.5rem;
      transition: color 0.6s ease;
    }
    
    :host([theme="dark"]) .role {
      color: #9ca3af;
    }
  `

  render() {
    return html`
      <div class="container">
        <div class="header">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </span>
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
      </div>
    `
  }
}