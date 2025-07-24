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

  static styles = css`
    :host {
      display: block;
      width: 25%;
    }
    
    .container {
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
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
    }
    
    :host([theme="dark"]) .title {
      color: white;
    }
    
    .category-item {
      backdrop-filter: blur(5px);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      border-left: 4px solid transparent;
      transition: all 0.3s;
    }
    
    .category-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .category-item.active {
      border-left-color: #3b82f6;
      background: rgba(59, 130, 246, 0.1);
    }
    
    .category-label {
      color: #1f2937;
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