import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('app-header')
export class Header extends LitElement {
  @state()
  private theme: 'light' | 'dark' = 'light'

  connectedCallback() {
    super.connectedCallback()
    // Initialize theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    this.theme = savedTheme || 'light'
    this.applyTheme()
  }

  private applyTheme() {
    // Apply theme to document root
    document.documentElement.classList.toggle('dark', this.theme === 'dark')
    
    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('theme-change', { 
      detail: { theme: this.theme } 
    }))
    
    // Save theme to localStorage
    localStorage.setItem('theme', this.theme)
    
    // Apply theme to this component
    if (this.theme === 'dark') {
      this.setAttribute('theme', 'dark')
    } else {
      this.removeAttribute('theme')
    }
  }

  static styles = css`
    :host {
      display: block;
    }
    
    header {
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      margin: 1rem 1rem 1rem 1rem;
      border-radius: 0.5rem;
    }
    
    .title {
      font-size: 1.125rem;
      font-weight: bold;
      color: #1f2937;
    }
    
    :host([theme="dark"]) .title {
      color: white;
    }
    
    .theme-controls {
      display: flex;
      align-items: center;
    }
    
    .theme-button {
      width: 3rem;
      height: 3rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      outline: none;
    }
    
    .theme-button:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }
    
    .theme-button:active {
      transform: scale(0.95);
    }
    
    :host([theme="dark"]) .theme-button {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
    }
    
    :host([theme="dark"]) .theme-button:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .icon svg {
      width: 24px;
      height: 24px;
    }
    
    /* Sun icon (shown in dark mode) - white */
    :host([theme="dark"]) .icon svg {
      stroke: white;
    }
    
    /* Moon icon (shown in light mode) - dark */
    :host([theme="light"]) .icon svg {
      stroke: #374151;
    }
  `

  private toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
    this.applyTheme()
  }

  render() {
    return html`
      <header>
        <div class="title">
          Yupeng's Blog
        </div>
        <div class="theme-controls">
          <button
            @click=${this.toggleTheme}
            class="theme-button"
            title=${this.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span class="icon">
              ${this.theme === 'light' 
                ? html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>`
                : html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>`
              }
            </span>
          </button>
        </div>
      </header>
    `
  }
}