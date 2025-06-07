import { LitElement, html, css } from 'https://unpkg.com/lit@2.0.0-rc.2?module';

class HomePage extends LitElement {
  static styles = css`
    .container {
      @apply flex flex-col items-center justify-center min-h-screen bg-gray-100;
    }
    .title {
      @apply text-4xl font-bold text-gray-800;
    }
    .subtitle {
      @apply text-lg text-gray-600;
    }
  `;

  render() {
    return html`
      <div class="container">
        <h1 class="title">Welcome to My Personal Website</h1>
        <p class="subtitle">Built with Lit and Tailwind CSS</p>
      </div>
    `;
  }
}

customElements.define('home-page', HomePage);
