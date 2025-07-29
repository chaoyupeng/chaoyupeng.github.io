import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { CategoryType } from '../App.tsx'

@customElement('app-categories')
export class Categories extends LitElement {
  @property({ type: String })
  activeCategory: CategoryType = 'me'

  @state()
  private hoveredCategory: CategoryType | null = null

  @state()
  private isContainerHovered = false

  private categories = [
    { 
      id: 'me' as CategoryType, 
      label: 'Me',
      icon: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>`,
      preview: "Learn about my background, experience, and journey in technology"
    },
    { 
      id: 'ai-ml' as CategoryType, 
      label: 'AI/ML',
      icon: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.5 14.5M14.25 3.104c.251.023.501.05.75.082M19.5 14.5l-5.69 5.69a2.25 2.25 0 0 1-3.182 0L4.939 14.5M19.5 14.5V12a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 12v2.5" />
      </svg>`,
      preview: "Explore my AI/ML projects, research insights, and technical deep-dives"
    },
    { 
      id: 'ideas' as CategoryType, 
      label: 'Ideas & Thoughts',
      icon: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>`,
      preview: "Read my thoughts on technology trends, philosophy, and random musings"
    },
    { 
      id: 'contact' as CategoryType, 
      label: 'Contact Me',
      icon: html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>`,
      preview: "Get in touch with me through various channels and social platforms"
    }
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
      perspective: 1000px;
    }
    
    .container {
      backdrop-filter: blur(12px) saturate(120%);
      background: rgba(255, 255, 255, 0.3);
      border: 1px solid rgba(0, 0, 0, 0.15);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
      transform-style: preserve-3d;
    }

    .container.hovered {
      transform: rotateY(-5deg) rotateX(2deg) translateZ(20px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    :host([theme="dark"]) .container {
      background: rgba(31, 41, 55, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    :host([theme="dark"]) .container.hovered {
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .header-icon {
      color: #1f2937;
      margin-right: 0.5rem;
      display: flex;
      align-items: center;
      transition: all 0.6s ease;
    }
    
    .header-icon svg {
      width: 24px;
      height: 24px;
      stroke: currentColor;
      transition: all 0.6s ease;
    }
    
    :host([theme="dark"]) .header-icon {
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

    .categories-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 0.5rem 0;
    }
    
    .category-item {
      backdrop-filter: blur(8px) saturate(120%);
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(0, 0, 0, 0.12);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      padding: 1rem;
      border-radius: 0.75rem;
      cursor: pointer;
      border-left: 3px solid transparent;
      transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
      transform-origin: center;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      position: relative;
      overflow: hidden;
    }

    .category-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: inherit;
    }

    .category-item:hover::before {
      opacity: 1;
    }

    /* Dock effect scaling */
    .categories-list:hover .category-item:not(:hover) {
      transform: scale(0.85) translateX(-8px);
      opacity: 0.7;
    }

    .category-item:hover {
      transform: scale(1.15) translateX(12px) translateZ(10px);
      background: rgba(255, 255, 255, 0.5);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1);
      border-left-color: #3B82F6;
      z-index: 10;
      position: relative;
    }
    
    .category-item.active {
      border-left-color: #000000;
      background: rgba(0, 0, 0, 0.15);
      transform: scale(1.05);
    }

    .category-item.active:hover {
      border-left-color: #000000;
    }
    
    :host([theme="dark"]) .category-item {
      background: rgba(31, 41, 55, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }
    
    :host([theme="dark"]) .category-item:hover {
      background: rgba(31, 41, 55, 0.6);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3);
      border-left-color: #60A5FA;
    }
    
    :host([theme="dark"]) .category-item.active {
      border-left-color: #ffffff;
      background: rgba(255, 255, 255, 0.15);
    }

    :host([theme="dark"]) .category-item.active:hover {
      border-left-color: #ffffff;
    }

    .category-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      color: #1f2937;
      transition: all 0.5s ease;
    }

    .category-item:hover .category-icon {
      color: #3B82F6;
      transform: rotate(5deg) scale(1.1);
    }

    :host([theme="dark"]) .category-icon {
      color: white;
    }

    :host([theme="dark"]) .category-item:hover .category-icon {
      color: #60A5FA;
    }

    .category-item.active .category-icon {
      color: #000000;
    }

    :host([theme="dark"]) .category-item.active .category-icon {
      color: #ffffff;
    }
    
    .category-label {
      color: #1f2937;
      transition: all 0.5s ease;
      font-weight: 500;
      flex: 1;
    }

    .category-item:hover .category-label {
      color: #1F2937;
      font-weight: 600;
    }
    
    :host([theme="dark"]) .category-label {
      color: white;
    }

    :host([theme="dark"]) .category-item:hover .category-label {
      color: white;
    }

    /* Ripple effect */
    .category-item::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.6s ease, height 0.6s ease;
      pointer-events: none;
    }

    .category-item:active::after {
      width: 200px;
      height: 200px;
    }

    /* Smooth entrance animation */
    .category-item {
      animation: slideInUp 0.6s ease-out backwards;
    }

    .category-item:nth-child(1) { animation-delay: 0.1s; }
    .category-item:nth-child(2) { animation-delay: 0.2s; }
    .category-item:nth-child(3) { animation-delay: 0.3s; }
    .category-item:nth-child(4) { animation-delay: 0.4s; }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* Pulse effect for active item */
    .category-item.active {
      animation: gentlePulse 2s ease-in-out infinite;
    }

    @keyframes gentlePulse {
      0%, 100% { box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05), 0 0 0 0 rgba(0, 0, 0, 0.1); }
      50% { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 4px rgba(0, 0, 0, 0.05); }
    }
  `

  private handleCategoryHover(category: CategoryType) {
    this.hoveredCategory = category
    this.dispatchEvent(new CustomEvent('category-hover', {
      detail: { category, preview: this.categories.find(c => c.id === category)?.preview },
      bubbles: true
    }))
  }

  private handleCategoryLeave() {
    this.hoveredCategory = null
    this.dispatchEvent(new CustomEvent('category-hover-end', {
      bubbles: true
    }))
  }

  private handleContainerMouseEnter() {
    this.isContainerHovered = true
  }

  private handleContainerMouseLeave() {
    this.isContainerHovered = false
    this.handleCategoryLeave()
  }

  private handleCategoryChange(category: CategoryType) {
    this.dispatchEvent(new CustomEvent('category-change', {
      detail: { category },
      bubbles: true
    }))
  }

  render() {
    return html`
      <div 
        class="container ${this.isContainerHovered ? 'hovered' : ''}"
        @mouseenter=${this.handleContainerMouseEnter}
        @mouseleave=${this.handleContainerMouseLeave}
      >
        <div class="header">
          <span class="header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </span>
          <span class="title">Categories</span>
        </div>
        
        <div class="categories-list">
          ${this.categories.map((category) => html`
            <div
              class="category-item ${this.activeCategory === category.id ? 'active' : ''}"
              @click=${() => this.handleCategoryChange(category.id)}
              @mouseenter=${() => this.handleCategoryHover(category.id)}
              @mouseleave=${this.handleCategoryLeave}
            >
              <span class="category-icon">${category.icon}</span>
              <span class="category-label">${category.label}</span>
            </div>
          `)}
        </div>
      </div>
    `
  }
}