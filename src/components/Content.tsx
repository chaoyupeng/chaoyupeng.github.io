import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { CategoryType } from '../App.tsx'
import './ContactForm.tsx'

@customElement('app-content')
export class Content extends LitElement {
  @property({ type: String })
  activeCategory: CategoryType = 'me'

  @state()
  private previewCategory: CategoryType | null = null

  @state()
  private previewText: string | null = null

  @state()
  private isPreviewMode = false

  @state()
  private sortOrder: 'desc' | 'asc' = 'desc'

  @state()
  private expandedPostId: number | null = null

  private aiMlPosts = [
    {
      id: 1,
      title: "Building a Real-time AI Chat Assistant",
      description: "Exploring the implementation of a conversational AI using transformer models and WebSocket connections for real-time interactions.",
      content: `
        <h3>Introduction</h3>
        <p>In this deep dive, we'll explore how to build a sophisticated AI chat assistant that can handle real-time conversations with users. We'll be using cutting-edge transformer models combined with WebSocket technology to create seamless, instantaneous interactions.</p>
        
        <h3>Architecture Overview</h3>
        <p>Our system consists of three main components:</p>
        <ul>
          <li><strong>Frontend WebSocket Client</strong> - Handles user input and displays responses</li>
          <li><strong>Backend WebSocket Server</strong> - Manages connections and message routing</li>
          <li><strong>AI Model Service</strong> - Processes messages using transformer models</li>
        </ul>
        
        <h3>Implementation Details</h3>
        <p>The core challenge was maintaining conversation context while ensuring sub-second response times. We implemented a hybrid approach using both cached responses for common queries and dynamic generation for complex requests.</p>
        
        <h3>Performance Optimizations</h3>
        <p>Key optimizations include model quantization, response caching, and connection pooling, resulting in 90% faster response times compared to traditional REST API approaches.</p>
      `,
      date: new Date('2024-01-15T14:30:00'),
      readTime: "8 min read",
      tags: ["AI", "Chat", "WebSocket", "Transformers"]
    },
    {
      id: 2,
      title: "Computer Vision for Object Detection",
      description: "Deep dive into YOLO v8 implementation for real-time object detection in video streams with performance optimizations.",
      content: `
        <h3>YOLO v8 Overview</h3>
        <p>You Only Look Once (YOLO) v8 represents the latest evolution in real-time object detection. This version introduces significant improvements in both accuracy and speed over its predecessors.</p>
        
        <h3>Key Improvements</h3>
        <ul>
          <li><strong>Enhanced Backbone</strong> - New CSPDarknet architecture</li>
          <li><strong>Improved Head Design</strong> - Better feature fusion mechanisms</li>
          <li><strong>Training Optimizations</strong> - Advanced data augmentation techniques</li>
        </ul>
        
        <h3>Implementation Challenges</h3>
        <p>Working with video streams presents unique challenges including frame buffering, memory management, and maintaining consistent detection accuracy across varying lighting conditions.</p>
        
        <h3>Results</h3>
        <p>Our optimized implementation achieves 60+ FPS on standard hardware while maintaining 95%+ accuracy on the COCO dataset.</p>
      `,
      date: new Date('2024-01-10T09:15:00'),
      readTime: "12 min read", 
      tags: ["Computer Vision", "YOLO", "Object Detection", "Deep Learning"]
    },
    {
      id: 3,
      title: "Machine Learning Model Deployment Strategies",
      description: "Comparing different approaches to deploy ML models in production: from Docker containers to serverless functions.",
      content: `
        <h3>Deployment Landscape</h3>
        <p>The ML deployment ecosystem has evolved rapidly, offering multiple pathways from development to production. Each approach has distinct advantages and trade-offs.</p>
        
        <h3>Container-Based Deployment</h3>
        <p>Docker containers provide excellent isolation and reproducibility. They're ideal for complex models with specific dependencies and offer great scalability options with Kubernetes.</p>
        
        <h3>Serverless Approaches</h3>
        <p>Functions-as-a-Service (FaaS) platforms like AWS Lambda or Google Cloud Functions excel for lightweight models with sporadic usage patterns, offering cost-effective auto-scaling.</p>
        
        <h3>Edge Deployment</h3>
        <p>For latency-critical applications, deploying models directly on edge devices using frameworks like TensorFlow Lite or ONNX Runtime provides optimal performance.</p>
        
        <h3>Recommendations</h3>
        <p>Choose based on your specific requirements: containers for complex models, serverless for variable workloads, and edge for real-time applications.</p>
      `,
      date: new Date('2024-01-05T16:45:00'),
      readTime: "6 min read",
      tags: ["MLOps", "Deployment", "Docker", "Serverless"]
    },
    {
      id: 4,
      title: "Understanding Attention Mechanisms in Transformers",
      description: "A comprehensive guide to self-attention and multi-head attention mechanisms that power modern language models.",
      content: `
        <h3>The Attention Revolution</h3>
        <p>Attention mechanisms have fundamentally transformed how we approach sequence modeling in deep learning. The "Attention is All You Need" paper introduced concepts that now power ChatGPT, BERT, and countless other models.</p>
        
        <h3>Self-Attention Mechanics</h3>
        <p>Self-attention allows each token in a sequence to attend to all other tokens, creating rich contextual representations. The mechanism uses Query, Key, and Value matrices to compute attention weights.</p>
        
        <h3>Multi-Head Attention</h3>
        <p>By running multiple attention heads in parallel, transformers can capture different types of relationships simultaneously - from syntactic patterns to semantic similarities.</p>
        
        <h3>Mathematical Foundation</h3>
        <p>The attention function can be described as: Attention(Q,K,V) = softmax(QK^T/√d_k)V, where the scaling factor prevents softmax saturation in high dimensions.</p>
        
        <h3>Practical Applications</h3>
        <p>Understanding attention patterns helps in model interpretability, debugging, and designing more efficient architectures for specific tasks.</p>
      `,
      date: new Date('2023-12-28T11:20:00'),
      readTime: "15 min read",
      tags: ["Transformers", "Attention", "NLP", "Theory"]
    }
  ]

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('theme-change', this.handleThemeChange.bind(this) as EventListener)
    window.addEventListener('category-hover', this.handleCategoryHover.bind(this) as EventListener)
    window.addEventListener('category-hover-end', this.handleCategoryHoverEnd.bind(this) as EventListener)
    
    // Apply initial theme
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      this.setAttribute('theme', 'dark')
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('theme-change', this.handleThemeChange.bind(this) as EventListener)
    window.removeEventListener('category-hover', this.handleCategoryHover.bind(this) as EventListener)
    window.removeEventListener('category-hover-end', this.handleCategoryHoverEnd.bind(this) as EventListener)
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

  private handleCategoryHover(event: Event) {
    const customEvent = event as CustomEvent
    this.previewCategory = customEvent.detail.category
    this.previewText = customEvent.detail.preview
    this.isPreviewMode = true
  }

  private handleCategoryHoverEnd() {
    this.isPreviewMode = false
    setTimeout(() => {
      if (!this.isPreviewMode) {
        this.previewCategory = null
        this.previewText = null
      }
    }, 300) // Delay to avoid flicker
  }

  private toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc'
  }

  private getSortedPosts() {
    return [...this.aiMlPosts].sort((a, b) => {
      if (this.sortOrder === 'desc') {
        return b.date.getTime() - a.date.getTime()
      } else {
        return a.date.getTime() - b.date.getTime()
      }
    })
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  private handlePostClick(postId: number) {
    this.expandedPostId = this.expandedPostId === postId ? null : postId
  }

  private navigateToPost(direction: 'prev' | 'next') {
    if (this.expandedPostId === null) return
    
    const sortedPosts = this.getSortedPosts()
    const currentIndex = sortedPosts.findIndex(post => post.id === this.expandedPostId)
    
    if (direction === 'prev' && currentIndex > 0) {
      this.expandedPostId = sortedPosts[currentIndex - 1].id
    } else if (direction === 'next' && currentIndex < sortedPosts.length - 1) {
      this.expandedPostId = sortedPosts[currentIndex + 1].id
    }
  }

  private closeExpandedPost() {
    this.expandedPostId = null
  }

  static styles = css`
    :host {
      display: block;
      flex: 1;
      margin: 0 1rem;
    }
    
    .container {
      backdrop-filter: blur(12px) saturate(120%);
      background: rgba(255, 255, 255, 0.3);
      border: 1px solid rgba(0, 0, 0, 0.15);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
      padding: 2rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      min-height: 600px;
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      position: relative;
      overflow: hidden;
    }

    .container.preview-mode {
      background: rgba(255, 255, 255, 0.4);
      border-color: rgba(59, 130, 246, 0.3);
      box-shadow: 0 8px 24px rgba(59, 130, 246, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05);
    }
    
    :host([theme="dark"]) .container {
      background: rgba(31, 41, 55, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    :host([theme="dark"]) .container.preview-mode {
      background: rgba(31, 41, 55, 0.5);
      border-color: rgba(96, 165, 250, 0.3);
      box-shadow: 0 8px 24px rgba(96, 165, 250, 0.1), 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    .content-container {
      transition: all 0.5s ease;
    }

    .content-container.fade-out {
      opacity: 0.3;
      transform: translateY(-10px);
    }

    .preview-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05));
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.5s ease;
      pointer-events: none;
    }

    .preview-overlay.visible {
      opacity: 1;
    }

    :host([theme="dark"]) .preview-overlay {
      background: linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(147, 197, 253, 0.05));
    }

    .preview-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      opacity: 0;
      transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
      z-index: 10;
      padding: 2rem;
      max-width: 80%;
    }

    .preview-content.visible {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    .preview-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1F2937;
      margin-bottom: 1rem;
      text-transform: capitalize;
    }

    :host([theme="dark"]) .preview-title {
      color: white;
    }

    .preview-description {
      font-size: 1.1rem;
      color: #4B5563;
      line-height: 1.6;
      background: rgba(255, 255, 255, 0.8);
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(59, 130, 246, 0.2);
      backdrop-filter: blur(8px);
    }

    :host([theme="dark"]) .preview-description {
      color: #D1D5DB;
      background: rgba(31, 41, 55, 0.8);
      border-color: rgba(96, 165, 250, 0.2);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      transition: border-color 0.6s ease;
    }
    
    :host([theme="dark"]) .header {
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }
    
    .title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
      transition: color 0.6s ease;
    }
    
    :host([theme="dark"]) .title {
      color: white;
    }
    
    .sort-options {
      display: flex;
      gap: 0.5rem;
    }
    
    .sort-active,
    .sort-inactive {
      padding: 0.25rem 0.75rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .sort-active {
      background: rgba(0, 0, 0, 0.1);
      color: #1f2937;
      font-weight: 500;
    }
    
    .sort-inactive {
      color: #6b7280;
    }
    
    .sort-inactive:hover {
      background: rgba(0, 0, 0, 0.05);
      color: #1f2937;
    }
    
    :host([theme="dark"]) .sort-active {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }
    
    :host([theme="dark"]) .sort-inactive {
      color: #9ca3af;
    }
    
    :host([theme="dark"]) .sort-inactive:hover {
      background: rgba(255, 255, 255, 0.05);
      color: white;
    }
    
    .content-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
      transition: color 0.6s ease;
    }
    
    .content-subtitle {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
      transition: color 0.6s ease;
    }
    
    :host([theme="dark"]) .content-title,
    :host([theme="dark"]) .content-subtitle {
      color: white;
    }
    
    .date {
      font-size: 0.875rem;
      color: #6b7280;
      margin-bottom: 0.75rem;
      transition: color 0.6s ease;
    }
    
    :host([theme="dark"]) .date {
      color: #9ca3af;
    }
    
    .description {
      color: #4b5563;
      line-height: 1.6;
      transition: color 0.6s ease;
    }
    
    :host([theme="dark"]) .description {
      color: #d1d5db;
    }

    .preview-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(59, 130, 246, 0.8);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 500;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
    }

    .preview-badge.visible {
      opacity: 1;
      transform: translateY(0);
    }

    :host([theme="dark"]) .preview-badge {
      background: rgba(96, 165, 250, 0.8);
    }

    .posts-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .post-card {
      background: rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      cursor: pointer;
      overflow: hidden;
      position: relative;
    }

    .post-card.collapsed {
      opacity: 0.6;
      transform: scale(0.95) translateY(10px);
      pointer-events: none;
      max-height: 120px;
    }

    .post-card.expanded {
      background: rgba(255, 255, 255, 0.8);
      transform: scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      border-color: rgba(59, 130, 246, 0.3);
      z-index: 10;
      position: relative;
    }

    .post-card:hover:not(.collapsed) {
      background: rgba(255, 255, 255, 0.6);
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .post-card.expanded:hover {
      transform: scale(1.02);
    }

    :host([theme="dark"]) .post-card {
      background: rgba(31, 41, 55, 0.3);
      border-color: rgba(255, 255, 255, 0.1);
    }

    :host([theme="dark"]) .post-card.expanded {
      background: rgba(31, 41, 55, 0.7);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      border-color: rgba(96, 165, 250, 0.3);
    }

    :host([theme="dark"]) .post-card:hover:not(.collapsed) {
      background: rgba(31, 41, 55, 0.5);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .post-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .post-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1F2937;
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }

    :host([theme="dark"]) .post-title {
      color: white;
    }

    .post-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25rem;
      text-align: right;
    }

    .post-date {
      font-size: 0.875rem;
      color: #6B7280;
      font-weight: 500;
    }

    .post-time {
      font-size: 0.75rem;
      color: #9CA3AF;
    }

    .post-read-time {
      font-size: 0.75rem;
      color: #3B82F6;
      font-weight: 500;
    }

    :host([theme="dark"]) .post-date {
      color: #D1D5DB;
    }

    :host([theme="dark"]) .post-time {
      color: #9CA3AF;
    }

    :host([theme="dark"]) .post-read-time {
      color: #60A5FA;
    }

    .post-description {
      color: #4B5563;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    :host([theme="dark"]) .post-description {
      color: #D1D5DB;
    }

    .post-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tag {
      background: rgba(59, 130, 246, 0.1);
      color: #3B82F6;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 500;
      border: 1px solid rgba(59, 130, 246, 0.2);
    }

    :host([theme="dark"]) .tag {
      background: rgba(96, 165, 250, 0.1);
      color: #60A5FA;
      border-color: rgba(96, 165, 250, 0.2);
    }

    .empty-state {
      text-align: center;
      padding: 3rem 2rem;
      color: #6B7280;
    }

    :host([theme="dark"]) .empty-state {
      color: #9CA3AF;
    }

    .expanded-content {
      max-height: 0;
      overflow: hidden;
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      opacity: 0;
      transform: translateY(-20px);
      margin-top: 0;
    }

    .post-card.expanded .expanded-content {
      max-height: 2000px;
      opacity: 1;
      transform: translateY(0);
      margin-top: 1.5rem;
    }

    .expanded-content h3 {
      color: #1F2937;
      font-size: 1.125rem;
      font-weight: 600;
      margin: 1.5rem 0 0.75rem 0;
    }

    .expanded-content h3:first-child {
      margin-top: 0;
    }

    .expanded-content p {
      color: #4B5563;
      line-height: 1.7;
      margin-bottom: 1rem;
    }

    .expanded-content ul {
      color: #4B5563;
      margin: 1rem 0;
      padding-left: 1.5rem;
    }

    .expanded-content li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }

    .expanded-content strong {
      color: #1F2937;
      font-weight: 600;
    }

    :host([theme="dark"]) .expanded-content h3 {
      color: white;
    }

    :host([theme="dark"]) .expanded-content p,
    :host([theme="dark"]) .expanded-content ul,
    :host([theme="dark"]) .expanded-content li {
      color: #D1D5DB;
    }

    :host([theme="dark"]) .expanded-content strong {
      color: white;
    }

    .post-navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.4s ease 0.2s;
    }

    .post-card.expanded .post-navigation {
      opacity: 1;
      transform: translateY(0);
    }

    :host([theme="dark"]) .post-navigation {
      border-top-color: rgba(255, 255, 255, 0.1);
    }

    .nav-button {
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.2);
      color: #3B82F6;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.875rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-button:hover {
      background: rgba(59, 130, 246, 0.2);
      transform: translateY(-1px);
    }

    .nav-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .nav-button:disabled:hover {
      transform: none;
    }

    :host([theme="dark"]) .nav-button {
      background: rgba(96, 165, 250, 0.1);
      border-color: rgba(96, 165, 250, 0.2);
      color: #60A5FA;
    }

    :host([theme="dark"]) .nav-button:hover {
      background: rgba(96, 165, 250, 0.2);
    }

    .close-button {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: #EF4444;
      padding: 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .close-button:hover {
      background: rgba(239, 68, 68, 0.2);
      transform: scale(1.1);
    }

    :host([theme="dark"]) .close-button {
      background: rgba(248, 113, 113, 0.1);
      border-color: rgba(248, 113, 113, 0.2);
      color: #F87171;
    }

    .post-summary {
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .post-card.expanded .post-summary {
      opacity: 0.8;
      transform: scale(0.98);
    }

    .expand-indicator {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 24px;
      height: 24px;
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      opacity: 0;
    }

    .post-card:hover .expand-indicator {
      opacity: 1;
    }

    .post-card.expanded .expand-indicator {
      opacity: 1;
      background: rgba(59, 130, 246, 0.2);
      transform: rotate(180deg);
    }

    :host([theme="dark"]) .expand-indicator {
      background: rgba(96, 165, 250, 0.1);
      border-color: rgba(96, 165, 250, 0.2);
    }

    :host([theme="dark"]) .post-card.expanded .expand-indicator {
      background: rgba(96, 165, 250, 0.2);
    }
`

  private getContent() {
    switch (this.activeCategory) {
      case 'me':
        return html`
          <div class="content-container ${this.isPreviewMode && this.previewCategory !== 'me' ? 'fade-out' : ''}">
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
        const sortedPosts = this.getSortedPosts()
        return html`
          <div class="content-container ${this.isPreviewMode && this.previewCategory !== 'ai-ml' ? 'fade-out' : ''}">
            <div class="header">
              <div class="title">AI/ML Posts</div>
              <div class="sort-options">
                <span 
                  class="${this.sortOrder === 'desc' ? 'sort-active' : 'sort-inactive'}"
                  @click=${() => this.sortOrder !== 'desc' && this.toggleSortOrder()}
                >
                  Desc
                </span>
                <span 
                  class="${this.sortOrder === 'asc' ? 'sort-active' : 'sort-inactive'}"
                  @click=${() => this.sortOrder !== 'asc' && this.toggleSortOrder()}
                >
                  Asc
                </span>
              </div>
            </div>
            
            <div class="posts-container">
              ${sortedPosts.map((post) => {
                const isExpanded = this.expandedPostId === post.id
                const isCollapsed = this.expandedPostId !== null && this.expandedPostId !== post.id
                const sortedPostsForNav = this.getSortedPosts()
                const currentIndex = sortedPostsForNav.findIndex(p => p.id === post.id)
                
                return html`
                  <div 
                    class="post-card ${isExpanded ? 'expanded' : ''} ${isCollapsed ? 'collapsed' : ''}"
                    @click=${() => !isCollapsed && this.handlePostClick(post.id)}
                  >
                    <div class="post-summary">
                      <div class="post-header">
                        <div>
                          <h3 class="post-title">${post.title}</h3>
                        </div>
                        <div class="post-meta">
                          <div class="post-date">${this.formatDate(post.date)}</div>
                          <div class="post-time">${this.formatTime(post.date)}</div>
                          <div class="post-read-time">${post.readTime}</div>
                        </div>
                      </div>
                      
                      <p class="post-description">${post.description}</p>
                      
                      <div class="post-tags">
                        ${post.tags.map(tag => html`
                          <span class="tag">${tag}</span>
                        `)}
                      </div>
                    </div>

                    <div class="expand-indicator">
                      <svg width="12" height="12" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M6 8.5L2.5 5h7L6 8.5z"/>
                      </svg>
                    </div>
                    
                    <div class="expanded-content">
                      <div .innerHTML=${post.content}></div>
                      
                      <div class="post-navigation">
                        <button 
                          class="nav-button"
                          @click=${(e: Event) => { e.stopPropagation(); this.navigateToPost('prev'); }}
                          ?disabled=${currentIndex === 0}
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11 3L6 8l5 5"/>
                          </svg>
                          Previous Post
                        </button>
                        
                        <button 
                          class="close-button"
                          @click=${(e: Event) => { e.stopPropagation(); this.closeExpandedPost(); }}
                          title="Close"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4 4l8 8m-8 0l8-8"/>
                          </svg>
                        </button>
                        
                        <button 
                          class="nav-button"
                          @click=${(e: Event) => { e.stopPropagation(); this.navigateToPost('next'); }}
                          ?disabled=${currentIndex === sortedPostsForNav.length - 1}
                        >
                          Next Post
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5 3l5 5-5 5"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                `
              })}
            </div>
          </div>
        `
      
      case 'ideas':
        return html`
          <div class="content-container ${this.isPreviewMode && this.previewCategory !== 'ideas' ? 'fade-out' : ''}">
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
        return html`
          <div class="content-container ${this.isPreviewMode && this.previewCategory !== 'contact' ? 'fade-out' : ''}">
            <app-contact-form></app-contact-form>
          </div>
        `
      
      default:
        return html``
    }
  }

  render() {
    return html`
      <div class="container ${this.isPreviewMode ? 'preview-mode' : ''}">
        ${this.getContent()}
        
        <div class="preview-overlay ${this.isPreviewMode ? 'visible' : ''}"></div>
        
        ${this.isPreviewMode ? html`
          <div class="preview-badge visible">Preview Mode</div>
          
          <div class="preview-content visible">
            <div class="preview-title">${this.previewCategory}</div>
            <div class="preview-description">${this.previewText}</div>
          </div>
        ` : ''}
      </div>
    `
  }
}