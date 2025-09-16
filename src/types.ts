export interface RainDropOptions {
  /**
   * Maximum number of raindrops to show at once
   * @default 50
   */
  maxDrops?: number;
  
  /**
   * Size range for raindrops [min, max]
   * @default [2, 8]
   */
  dropSize?: [number, number];
  
  /**
   * Color of the raindrops
   * @default 'rgba(173, 216, 230, 0.8)'
   */
  color?: string;
  
  /**
   * Animation duration range in seconds [min, max]
   * @default [0.8, 1.5]
   */
  duration?: [number, number];
  
  /**
   * Delay between cursor move and rain start in milliseconds
   * @default 100
   */
  delay?: number;
  
  /**
   * Whether to enable the effect
   * @default true
   */
  enabled?: boolean;
  
  /**
   * Z-index for the rain container
   * @default 9999
   */
  zIndex?: number;
  
  /**
   * Container element to attach the rain effect
   * @default document.body
   */
  container?: HTMLElement;
  
  /**
   * Initial velocity range for raindrops [min, max] in pixels per second
   * Controls how fast raindrops start falling
   * @default [100, 300]
   */
  initialVelocity?: [number, number];
  
  /**
   * Gravity acceleration in pixels per second squared
   * Controls how much the raindrops accelerate as they fall
   * @default 500
   */
  gravity?: number;
}

export interface RainDrop {
  element: HTMLElement;
  x: number;
  y: number;
  size: number;
  isAnimating: boolean;
}

export interface CursorRainEffect {
  /**
   * Initialize the rain effect
   */
  init(): void;
  
  /**
   * Destroy the rain effect and clean up
   */
  destroy(): void;
  
  /**
   * Enable the rain effect
   */
  enable(): void;
  
  /**
   * Disable the rain effect
   */
  disable(): void;
  
  /**
   * Update options
   */
  updateOptions(options: Partial<RainDropOptions>): void;
}