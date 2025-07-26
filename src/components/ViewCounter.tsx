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
      color: #374151;
      display: flex;
      align-items: center;
      transition: color 0.6s ease;
    }
    
    .icon svg {
      stroke: currentColor;
      transition: stroke 0.6s ease;
    }
    
    :host([theme="dark"]) .icon {
      color: white;
    }
    
    .count {
      color: #374151;
      font-weight: 500;
      transition: color 0.6s ease;
    }
    
    :host([theme="dark"]) .count {
      color: white;
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
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </span>
        <span class="count">
          ${this.formatViews(this.viewCount)} views
        </span>
      </div>
    `
  }
}