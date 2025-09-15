# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-09-15

### Added
- 🌧️ **Realistic Rain Effect** - Beautiful raindrop animations following cursor movement
- ⚡ **High Performance** - Optimized with GSAP and object pooling for smooth animations
- 🔧 **Highly Configurable** - Support for custom colors, sizes, quantities, and more
- 📱 **Responsive Design** - Perfect adaptation to various screen sizes
- 🎯 **VitePress Compatible** - Specially optimized for VitePress static sites
- 📦 **TypeScript Support** - Complete type definitions
- 🎨 **Zero Dependency Conflicts** - Uses peerDependencies to avoid version conflicts

### Features
- **Slim Raindrops** - Raindrops are 30% width and 4x height for realistic appearance
- **Physics-based Animation** - Raindrops start at random angles and gradually become vertical during fall
- **Realistic Shape** - Border-radius optimized for water drop appearance (90% 90% 10% 10%)
- **Continuous Fall** - Smooth gravity acceleration without stage-based pauses
- **Horizontal Drift** - Slight horizontal movement simulating air resistance
- **Object Pooling** - Reuses DOM elements for better performance
- **Throttled Events** - Limits mouse event processing frequency
- **Memory Management** - Automatic cleanup of unused animations and elements

### API
- `initCursorRain()` - Basic initialization function
- `initCursorRainForVitePress()` - VitePress-optimized initialization
- `createCursorRainEffect()` - Advanced usage with manual control
- `CursorRainEffect` class with methods:
  - `init()` - Initialize the effect
  - `destroy()` - Clean up and destroy
  - `enable()` / `disable()` - Toggle effect
  - `updateOptions()` - Update configuration

### Configuration Options
- `maxDrops` - Maximum number of raindrops (default: 50)
- `dropSize` - Size range [min, max] (default: [2, 8])
- `color` - Raindrop color (default: 'rgba(173, 216, 230, 0.8)')
- `duration` - Animation duration range (default: [0.8, 1.5])
- `delay` - Mouse move to rain delay (default: 100ms)
- `enabled` - Enable/disable effect (default: true)
- `zIndex` - Container z-index (default: 9999)
- `container` - Container element (default: document.body)

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Dependencies
- GSAP ^3.12.0 (peer dependency)