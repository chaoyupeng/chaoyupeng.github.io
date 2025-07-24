import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { CategoryType } from '../App.tsx'
import './ContactForm.tsx'

@customElement('app-content')
export class Content extends LitElement {
  @property({ type: String })
  activeCategory: CategoryType = 'me'

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
      width: 50%;
    }
    
    .content-container {
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .header {
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .title {
      font-size: 1.125rem;
      font-weight: 500;
      color: #1f2937;
    }
    
    :host([theme="dark"]) .title {
      color: white;
    }
    
    .sort-options {
      display: flex;
      gap: 0.5rem;
      font-size: 0.875rem;
    }
    
    .sort-active {
      font-weight: 500;
      color: #374151;
    }
    
    :host([theme="dark"]) .sort-active {
      color: #d1d5db;
    }
    
    .sort-inactive {
      color: #9ca3af;
    }
    
    :host([theme="dark"]) .sort-inactive {
      color: #6b7280;
    }
    
    .content-title {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #1f2937;
    }
    
    :host([theme="dark"]) .content-title {
      color: white;
    }
    
    .content-subtitle {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: #1f2937;
    }
    
    :host([theme="dark"]) .content-subtitle {
      color: white;
    }
    
    .date {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
    }
    
    :host([theme="dark"]) .date {
      color: #9ca3af;
    }
    
    .description {
      margin-bottom: 1rem;
      color: #374151;
    }
    
    :host([theme="dark"]) .description {
      color: #d1d5db;
    }
  `

  private getContent() {
    switch (this.activeCategory) {
      case 'me':
        return html`
          <div class="content-container">
            <div class="header">
              <div class="title">About Me</div>
            </div>
            <div>
              <h2 class="content-title">
                Welcome to my personal page
              </h2>
              <p class="description">
                This section will contain information about me.
              </p>
            </div>
          </div>
        `
      
      case 'ai-ml':
        return html`
          <div class="content-container">
            <div class="header">
              <div class="title">AI/ML Posts</div>
              <div class="sort-options">
                <span class="sort-active">Desc</span>
                <span class="sort-inactive">Asc</span>
              </div>
            </div>
            <div>
              <h2 class="content-subtitle">
                Machine Learning Project Insights
              </h2>
              <p class="date">Jul 1, 2023</p>
              <p class="description">
                Exploring the latest in machine learning applications.
              </p>
            </div>
          </div>
        `
      
      case 'ideas':
        return html`
          <div class="content-container">
            <div class="header">
              <div class="title">Ideas & Thoughts</div>
            </div>
            <div>
              <h2 class="content-subtitle">
                Reflections on Technology Trends
              </h2>
              <p class="date">Jun 15, 2023</p>
              <p class="description">
                Some thoughts on the direction of technology.
              </p>
            </div>
          </div>
        `
      
      case 'contact':
        return html`<app-contact-form></app-contact-form>`
      
      default:
        return html``
    }
  }

  render() {
    return this.getContent()
  }
}