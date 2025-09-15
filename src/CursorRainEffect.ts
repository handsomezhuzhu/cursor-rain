import { gsap } from 'gsap';
import type { RainDropOptions, RainDrop, CursorRainEffect as ICursorRainEffect } from './types';

export class CursorRainEffect implements ICursorRainEffect {
  private options: Required<RainDropOptions>;
  private container: HTMLElement;
  private rainContainer: HTMLElement | null = null;
  private drops: RainDrop[] = [];
  private isInitialized = false;
  private mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
  private timeoutId: number | null = null;
  private animationPool: HTMLElement[] = [];

  constructor(options: RainDropOptions = {}) {
    this.options = {
      maxDrops: options.maxDrops ?? 50,
      dropSize: options.dropSize ?? [2, 8],
      color: options.color ?? 'rgba(173, 216, 230, 0.8)',
      duration: options.duration ?? [0.8, 1.5],
      delay: options.delay ?? 100,
      enabled: options.enabled ?? true,
      zIndex: options.zIndex ?? 9999,
      container: options.container ?? document.body
    };
    
    this.container = this.options.container;
  }

  init(): void {
    if (this.isInitialized) {
      return;
    }

    this.createRainContainer();
    this.setupEventListeners();
    this.preCreateDrops();
    this.isInitialized = true;
  }

  destroy(): void {
    if (!this.isInitialized) {
      return;
    }

    this.cleanup();
    this.isInitialized = false;
  }

  enable(): void {
    this.options.enabled = true;
    if (this.isInitialized) {
      this.setupEventListeners();
    }
  }

  disable(): void {
    this.options.enabled = false;
    this.removeEventListeners();
  }

  updateOptions(newOptions: Partial<RainDropOptions>): void {
    this.options = { ...this.options, ...newOptions };
    
    if (newOptions.container && newOptions.container !== this.container) {
      this.container = newOptions.container;
      if (this.isInitialized) {
        this.destroy();
        this.init();
      }
    }
  }

  private createRainContainer(): void {
    this.rainContainer = document.createElement('div');
    this.rainContainer.className = 'cursor-rain-container';
    this.rainContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: ${this.options.zIndex};
      overflow: hidden;
    `;
    
    this.container.appendChild(this.rainContainer);
  }

  private preCreateDrops(): void {
    // Pre-create drop elements for better performance
    for (let i = 0; i < this.options.maxDrops; i++) {
      const drop = this.createDropElement();
      this.animationPool.push(drop);
      if (this.rainContainer) {
        this.rainContainer.appendChild(drop);
      }
    }
  }

  private createDropElement(): HTMLElement {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.cssText = `
      position: absolute;
      background: ${this.options.color};
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      pointer-events: none;
      opacity: 0;
      transform-origin: center bottom;
    `;
    
    return drop;
  }

  private setupEventListeners(): void {
    if (!this.options.enabled) {
      return;
    }

    this.removeEventListeners();
    
    this.mouseMoveHandler = this.throttle((e: MouseEvent) => {
      this.createRainAtPosition(e.clientX, e.clientY);
    }, 16); // ~60fps throttling

    document.addEventListener('mousemove', this.mouseMoveHandler, { passive: true });
  }

  private removeEventListeners(): void {
    if (this.mouseMoveHandler) {
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      this.mouseMoveHandler = null;
    }
    
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private createRainAtPosition(x: number, y: number): void {
    if (!this.rainContainer || this.drops.length >= this.options.maxDrops) {
      return;
    }

    // Get available drop from pool
    const dropElement = this.getAvailableDrop();
    if (!dropElement) {
      return;
    }

    const size = this.randomBetween(this.options.dropSize[0], this.options.dropSize[1]);
    const duration = this.randomBetween(this.options.duration[0], this.options.duration[1]);
    
    // Add some randomness to position
    const offsetX = this.randomBetween(-20, 20);
    const offsetY = this.randomBetween(-10, 10);
    
    const finalX = x + offsetX;
    const finalY = y + offsetY;

    const drop: RainDrop = {
      element: dropElement,
      x: finalX,
      y: finalY,
      size,
      isAnimating: true
    };

    this.drops.push(drop);

    // Set initial position and size
    gsap.set(dropElement, {
      x: finalX - size / 2,
      y: finalY - size / 2,
      width: size,
      height: size * 1.5, // Make drops slightly elongated
      opacity: 0,
      scaleY: 0.1,
      rotation: this.randomBetween(-15, 15)
    });

    // Animate the raindrop
    const tl = gsap.timeline({
      onComplete: () => {
        this.returnDropToPool(drop);
      }
    });

    tl.to(dropElement, {
      opacity: 1,
      scaleY: 1,
      duration: 0.1,
      ease: 'power2.out'
    })
    .to(dropElement, {
      y: `+=${window.innerHeight - finalY + 100}`,
      scaleY: 1.5,
      opacity: 0.3,
      duration: duration,
      ease: 'power1.in'
    }, 0.05)
    .to(dropElement, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out'
    }, '-=0.3');
  }

  private getAvailableDrop(): HTMLElement | null {
    return this.animationPool.find(drop => 
      gsap.getTweensOf(drop).length === 0
    ) || null;
  }

  private returnDropToPool(drop: RainDrop): void {
    const index = this.drops.indexOf(drop);
    if (index > -1) {
      this.drops.splice(index, 1);
    }
    
    drop.isAnimating = false;
    
    // Reset the element
    gsap.set(drop.element, {
      opacity: 0,
      x: 0,
      y: 0,
      scaleY: 1,
      rotation: 0
    });
  }

  private randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: number | null = null;
    let lastExecTime = 0;
    
    return (...args: Parameters<T>) => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        
        timeoutId = window.setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  private cleanup(): void {
    this.removeEventListeners();
    
    // Kill all GSAP animations
    this.drops.forEach(drop => {
      gsap.killTweensOf(drop.element);
    });
    
    this.drops = [];
    this.animationPool = [];
    
    if (this.rainContainer && this.rainContainer.parentNode) {
      this.rainContainer.parentNode.removeChild(this.rainContainer);
      this.rainContainer = null;
    }
  }
}