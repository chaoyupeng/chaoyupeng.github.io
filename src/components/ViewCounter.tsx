import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('app-view-counter')
export class ViewCounter extends LitElement {
  @state()
  private viewCount: number = 0

  static styles = css`
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .icon {
      color: #10b981;
    }
    
    .count {
      color: #374151;
      font-weight: 500;
    }
    
    :host([theme="dark"]) .count {
      color: #d1d5db;
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.updateViewCount()
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

  private updateViewCount() {
    // Get current view count from localStorage
    const currentViews = localStorage.getItem('pageViews')
    let views = currentViews ? parseInt(currentViews, 10) : 0
    
    // Check if this is a new session (to avoid counting multiple times per session)
    const lastVisit = localStorage.getItem('lastVisit')
    const now = new Date().getTime()
    const oneHour = 60 * 60 * 1000 // 1 hour in milliseconds
    
    // If no last visit or it's been more than an hour, count as new view
    if (!lastVisit || (now - parseInt(lastVisit, 10)) > oneHour) {
      views += 1
      localStorage.setItem('pageViews', views.toString())
      localStorage.setItem('lastVisit', now.toString())
    }
    
    this.viewCount = views
  }

  private formatViews(count: number): string {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M'
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K'
    }
    return count.toString()
  }

  render() {
    return html`
      <div class="container">
        <span class="icon">👁️</span>
        <span class="count">
          ${this.formatViews(this.viewCount)} views
        </span>
      </div>
    `
  }
}