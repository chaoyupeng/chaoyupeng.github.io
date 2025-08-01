import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import './components/Header.tsx'
import './components/Categories.tsx'
import './components/Content.tsx'
import './components/Profile.tsx'
import './App.css'

export type CategoryType = 'me' | 'ai-ml' | 'ideas' | 'contact'

@customElement('app-root')
export class App extends LitElement {
  @state()
  private activeCategory: CategoryType = 'me'

  connectedCallback() {
    super.connectedCallback()
    // Listen for theme changes
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
    .min-h-screen {
      min-height: 100vh;
    }
    .bg-cover {
      background-size: cover;
    }
    .bg-center {
      background-position: center;
    }
    .bg-fixed {
      background-attachment: fixed;
    }
    .flex {
      display: flex;
    }
    .flex-row {
      flex-direction: row;
    }
    .justify-between {
      justify-content: space-between;
    }
    .px-4 {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .pb-4 {
      padding-bottom: 1rem;
    }
    .space-x-4 > * + * {
      margin-left: 1rem;
    }
  `

  private handleCategoryChange(event: CustomEvent) {
    this.activeCategory = event.detail.category
  }

  render() {
    return html`
      <div class="min-h-screen">
        <app-header></app-header>
        <div class="flex flex-row justify-between px-4 pb-4 min-h-screen space-x-4">
          <app-categories 
            .activeCategory=${this.activeCategory}
            @category-change=${this.handleCategoryChange}
          ></app-categories>
          <app-content .activeCategory=${this.activeCategory}></app-content>
          <app-profile></app-profile>
        </div>
      </div>
    `
  }
}