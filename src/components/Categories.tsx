import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { CategoryType } from '../App.tsx'

@customElement('app-categories')
export class Categories extends LitElement {
  @property({ type: String })
  activeCategory: CategoryType = 'me'

  private categories = [
    { id: 'me' as CategoryType, label: 'Me' },
    { id: 'ai-ml' as CategoryType, label: 'AI/ML' },
    { id: 'ideas' as CategoryType, label: 'Ideas & Thoughts' },
    { id: 'contact' as CategoryType, label: 'Contact Me' }
  ]

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
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
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
      color: #1f2937;
      margin-right: 0.5rem;
      display: flex;
      align-items: center;
      transition: color 0.3s ease;
    }
    
    .icon svg {
      width: 24px;
      height: 24px;
      stroke: currentColor;
      transition: stroke 0.3s ease;
    }
    
    :host([theme="dark"]) .icon {
      color: white;
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
    
    .category-item {
      backdrop-filter: blur(8px) saturate(120%);
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(0, 0, 0, 0.12);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      border-left: 1px solid transparent;
      transition: all 0.3s, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    .category-item:hover {
      background: rgba(255, 255, 255, 0.4);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    }
    
    .category-item.active {
      border-left-color: #000000;
      background: rgba(0, 0, 0, 0.1);
    }
    
    :host([theme="dark"]) .category-item {
      background: rgba(31, 41, 55, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }
    
    :host([theme="dark"]) .category-item:hover {
      background: rgba(31, 41, 55, 0.5);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
    
    :host([theme="dark"]) .category-item.active {
      border-left-color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }
    
    .category-label {
      color: #1f2937;
      transition: color 0.3s ease;
    }
    
    :host([theme="dark"]) .category-label {
      color: white;
    }
  `

  private handleCategoryChange(category: CategoryType) {
    this.dispatchEvent(new CustomEvent('category-change', {
      detail: { category },
      bubbles: true
    }))
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </span>
          <span class="title">Categories</span>
        </div>
        
        ${this.categories.map((category) => html`
          <div
            class="category-item ${this.activeCategory === category.id ? 'active' : ''}"
            @click=${() => this.handleCategoryChange(category.id)}
          >
            <span class="category-label">${category.label}</span>
          </div>
        `)}
      </div>
    `
  }
}