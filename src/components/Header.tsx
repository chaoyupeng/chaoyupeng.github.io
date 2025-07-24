import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('app-header')
export class Header extends LitElement {
  @state()
  private theme: 'light' | 'dark' = 'light'

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
      gap: 1rem;
      align-items: center;
      position: relative;
      height: 48px;
    }
    
    .theme-slider {
      position: relative;
      width: 12rem;
      height: 3.5rem;
      background: #374151;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      transition: all 0.3s;
      outline: none;
      border: none;
      cursor: pointer;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: visible;
    }
    
    :host([theme="dark"]) .theme-slider {
      background: #1f2937;
    }
    
    .slider-text {
      position: absolute;
      font-weight: bold;
      font-size: 1.125rem;
      transition: all 0.3s;
      user-select: none;
      color: #9ca3af;
    }
    
    .light-text {
      position: absolute;
      transition: all 0.3s;
    }
    
    :host([theme="light"]) .light-text {
      right: 24px;
      opacity: 1;
    }
    
    :host([theme="dark"]) .light-text {
      left: 24px;
      opacity: 0;
    }
    
    .dark-text {
      position: absolute;
      transition: all 0.3s;
      color: white;
    }
    
    :host([theme="light"]) .dark-text {
      right: 24px;
      opacity: 0;
    }
    
    :host([theme="dark"]) .dark-text {
      left: 24px;
      opacity: 1;
    }
    
    .slider-circle {
      position: absolute;
      width: 3.5rem;
      height: 3.5rem;
      background: white;
      border-radius: 50%;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      transition: all 0.3s;
      z-index: 2;
      top: 0;
      left: 0px;
    }
    
    :host([theme="dark"]) .slider-circle {
      left: calc(70%);
    }
    
    :host([theme="dark"]) .slider-circle {
      background: #374151;
    }
    
    .icon {
      color: #fbbf24;
    }
    
    :host([theme="dark"]) .icon {
      color: #fde047;
    }
  `

  private toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
    this.setAttribute('theme', this.theme)
    document.documentElement.classList.toggle('dark', this.theme === 'dark')
  }

  render() {
    return html`
      <header>
        <div class="title">
          Yupeng's Blog
        </div>
        <div class="theme-controls">
          <div style="position: relative; z-index: 1;">
            <button
              @click=${this.toggleTheme}
              class="theme-slider"
            >
              <span class="slider-text light-text">
                LIGHT MODE
              </span>
              <span class="slider-text dark-text">
                DARK MODE
              </span>
              
              <span class="slider-circle">
                <span class="icon">
                  ${this.theme === 'dark' ? '🌙' : '☀️'}
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>
    `
  }
}