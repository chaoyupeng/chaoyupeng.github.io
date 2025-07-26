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
      color: #eab308;
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
    
    .category-item {
      backdrop-filter: blur(8px) saturate(120%);
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(0, 0, 0, 0.12);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      border-left: 4px solid transparent;
      transition: all 0.3s, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    .category-item:hover {
      background: rgba(255, 255, 255, 0.4);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    }
    
    .category-item.active {
      border-left-color: #3b82f6;
      background: rgba(59, 130, 246, 0.15);
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
      background: rgba(59, 130, 246, 0.2);
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
          <span class="icon">📋</span>
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