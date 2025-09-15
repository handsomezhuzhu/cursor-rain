import { CursorRainEffect } from './CursorRainEffect';
import type { RainDropOptions, CursorRainEffect as ICursorRainEffect } from './types';

/**
 * Create a new cursor rain effect instance
 */
export function createCursorRainEffect(options?: RainDropOptions): ICursorRainEffect {
  return new CursorRainEffect(options);
}

/**
 * Initialize cursor rain effect with default options
 * This is a convenience function for quick setup
 */
export function initCursorRain(options?: RainDropOptions): ICursorRainEffect {
  const effect = createCursorRainEffect(options);
  
  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      effect.init();
    });
  } else {
    // DOM is already ready
    effect.init();
  }
  
  return effect;
}

/**
 * VitePress compatible initialization
 * This function ensures the effect works correctly in VitePress environment
 */
export function initCursorRainForVitePress(options?: RainDropOptions): ICursorRainEffect {
  const effect = createCursorRainEffect({
    container: document.body,
    zIndex: 1000, // Lower z-index to avoid conflicts with VitePress UI
    ...options
  });

  // Handle VitePress page navigation
  const initEffect = () => {
    // Small delay to ensure VitePress has finished rendering
    setTimeout(() => {
      effect.init();
    }, 100);
  };

  // Handle both initial load and client-side navigation
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initEffect);
    } else {
      initEffect();
    }

    // Handle VitePress client-side navigation
    window.addEventListener('popstate', () => {
      effect.destroy();
      initEffect();
    });

    // Handle programmatic navigation (if using Vue Router)
    if (window.history && window.history.pushState) {
      const originalPushState = window.history.pushState;
      window.history.pushState = function(...args) {
        originalPushState.apply(window.history, args);
        effect.destroy();
        initEffect();
      };
    }
  }

  return effect;
}

// Export types and class for advanced usage
export { CursorRainEffect } from './CursorRainEffect';
export type { RainDropOptions, RainDrop, CursorRainEffect as ICursorRainEffect } from './types';

// Default export for convenience
export default {
  createCursorRainEffect,
  initCursorRain,
  initCursorRainForVitePress,
  CursorRainEffect
};