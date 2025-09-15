# 🌧️ Cursor Rain Effect

[![npm version](https://badge.fury.io/js/cursor-rain-effect.svg)](https://badge.fury.io/js/cursor-rain-effect)
[![Downloads](https://img.shields.io/npm/dm/cursor-rain-effect.svg)](https://www.npmjs.com/package/cursor-rain-effect)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

一个美丽的光标雨点效果库，当鼠标移动时会在光标位置产生逼真的雨点落下动画。具有真实的物理效果：细长雨滴从随机角度开始，在下落过程中逐渐变为垂直状态。使用 GSAP 优化性能，完美兼容 VitePress 和其他现代前端框架。

**🎯 [在线演示](https://handsomezhuzhu.github.io)** | **📦 [NPM包](https://www.npmjs.com/package/cursor-rain-effect)** | **🔧 [GitHub仓库](https://github.com/handsomezhuzhu/cursor-rain)**

[English](#english) | [中文](#中文)

## 中文

### ✨ 特性

- 🌧️ **逼真的雨点效果** - 光标移动时产生自然的雨滴动画
- 🎯 **真实物理模拟** - 雨滴从随机角度开始，下落过程中逐渐变为垂直状态
- 💧 **细长雨滴设计** - 宽度30%，高度4倍，更像真实雨丝
- ⚡ **高性能优化** - 使用 GSAP 和对象池技术，确保流畅的动画效果
- 🔧 **高度可配置** - 支持自定义颜色、大小、数量等多种参数
- 📱 **响应式设计** - 完美适配各种屏幕尺寸，智能性能调节
- 🎯 **VitePress 兼容** - 专门优化以支持 VitePress 静态站点
- 📦 **TypeScript 支持** - 完整的类型定义和智能提示
- 🎨 **零依赖冲突** - 使用 peerDependencies 避免版本冲突
- 🌈 **多主题支持** - 内置多种颜色主题和自定义CSS支持

### 📦 安装

```bash
npm install cursor-rain-effect gsap
```

或者使用 yarn：

```bash
yarn add cursor-rain-effect gsap
```

或者使用 pnpm：

```bash
pnpm add cursor-rain-effect gsap
```

### 🚀 快速开始

#### 基础用法

```javascript
import { initCursorRain } from 'cursor-rain-effect';

// 使用默认配置初始化
const rainEffect = initCursorRain();

// 或者自定义配置
const rainEffect = initCursorRain({
  maxDrops: 30,
  color: 'rgba(100, 200, 255, 0.8)',
  dropSize: [3, 10]
});
```

#### VitePress 集成

对于 VitePress 博客，推荐使用专门的初始化函数：

```javascript
// .vitepress/theme/index.js 或 index.ts
import DefaultTheme from 'vitepress/theme';
import { initCursorRainForVitePress } from 'cursor-rain-effect';

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 初始化雨点效果
    if (typeof window !== 'undefined') {
      initCursorRainForVitePress({
        maxDrops: 25,
        color: 'rgba(173, 216, 230, 0.6)',
        duration: [1.0, 2.0]
      });
    }
  }
};
```

#### 高级用法

```javascript
import { createCursorRainEffect } from 'cursor-rain-effect';

const rainEffect = createCursorRainEffect({
  maxDrops: 50,
  dropSize: [2, 8],
  color: 'rgba(173, 216, 230, 0.8)',
  duration: [0.8, 1.5],
  delay: 100,
  zIndex: 9999,
  container: document.getElementById('my-container')
});

// 手动控制
rainEffect.init();

// 暂停效果
rainEffect.disable();

// 恢复效果
rainEffect.enable();

// 更新配置
rainEffect.updateOptions({
  color: 'rgba(255, 182, 193, 0.8)',
  maxDrops: 30
});

// 销毁效果
rainEffect.destroy();
```

### ⚙️ 配置选项

| 参数 | 类型 | 默认值 | 描述 | 推荐范围 |
|------|------|--------|------|----------|
| `maxDrops` | `number` | `50` | 同时显示的最大雨滴数量 | `5-50` |
| `dropSize` | `[number, number]` | `[2, 8]` | 雨滴大小范围 [最小, 最大] | `[1, 15]` |
| `color` | `string` | `'rgba(173, 216, 230, 0.8)'` | 雨滴颜色（支持任何CSS颜色） | - |
| `duration` | `[number, number]` | `[0.8, 1.5]` | 动画持续时间范围（秒） | `[0.5, 3.0]` |
| `delay` | `number` | `100` | 鼠标移动到雨滴开始的延迟（毫秒） | `50-300` |
| `enabled` | `boolean` | `true` | 是否启用效果 | - |
| `zIndex` | `number` | `9999` | 雨滴容器的 z-index | `1000-10000` |
| `container` | `HTMLElement` | `document.body` | 效果容器元素 | - |

### 🎨 预设主题

```javascript
import { initCursorRainForVitePress } from 'cursor-rain-effect';

// 默认蓝色主题
initCursorRainForVitePress({
  color: 'rgba(173, 216, 230, 0.6)'
});

// 粉色主题
initCursorRainForVitePress({
  color: 'rgba(255, 182, 193, 0.7)',
  maxDrops: 30
});

// 绿色主题
initCursorRainForVitePress({
  color: 'rgba(144, 238, 144, 0.7)',
  duration: [1.2, 2.0]
});

// 金色主题
initCursorRainForVitePress({
  color: 'rgba(255, 215, 0, 0.6)',
  dropSize: [2, 6],
  delay: 120
});
```

### 🎨 自定义样式

你可以通过 CSS 进一步自定义雨滴的外观：

```css
.cursor-rain-container .rain-drop {
  /* 自定义雨滴样式 */
  filter: blur(0.5px);
  box-shadow: 0 0 3px rgba(173, 216, 230, 0.5);
}

/* 深色主题适配 */
@media (prefers-color-scheme: dark) {
  .cursor-rain-container .rain-drop {
    background: rgba(173, 216, 230, 0.6) !important;
  }
}
```

### 🔧 VitePress 特殊配置

为了在 VitePress 中获得最佳体验，建议进行以下配置：

#### 1. 主题集成

```javascript
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import { initCursorRainForVitePress } from 'cursor-rain-effect';
import './custom.css'; // 可选：自定义样式

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    if (typeof window !== 'undefined') {
      initCursorRainForVitePress({
        maxDrops: 20, // 减少数量以提高性能
        color: 'rgba(173, 216, 230, 0.5)',
        zIndex: 1000, // 避免与 VitePress UI 冲突
        duration: [1.2, 2.0] // 稍慢的动画更优雅
      });
    }
  }
};
```

#### 2. 响应式配置

```javascript
// 根据屏幕大小调整配置
const isMobile = window.innerWidth < 768;

initCursorRainForVitePress({
  maxDrops: isMobile ? 10 : 25,
  dropSize: isMobile ? [2, 6] : [3, 8],
  duration: isMobile ? [1.5, 2.5] : [1.0, 2.0]
});
```

### 📱 性能优化

该库已经包含多项性能优化：

- **对象池技术** - 重用 DOM 元素，减少创建/销毁开销
- **节流处理** - 限制鼠标事件处理频率（~60fps）
- **GSAP 优化** - 使用高性能的动画库，硬件加速
- **内存管理** - 自动清理不再使用的动画和元素
- **智能适配** - 根据设备性能自动调整参数

#### 性能调优建议

```javascript
// 移动端优化
const mobileConfig = {
  maxDrops: 10,          // 减少数量
  duration: [2.0, 3.0],  // 增加时间
  delay: 200,            // 增加延迟
  dropSize: [2, 4]       // 减小尺寸
};

// 高性能设备
const desktopConfig = {
  maxDrops: 50,          // 更多雨滴
  duration: [0.5, 1.2],  // 更快动画
  delay: 30,             // 更快响应
  dropSize: [4, 12]      // 更大尺寸
};
```

### 🌐 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ IE 不支持（需要现代浏览器）

### ❓ 常见问题

#### Q: 如何在特定页面禁用效果？
```javascript
// 条件初始化
if (window.location.pathname !== '/no-rain') {
  initCursorRainForVitePress(config);
}
```

#### Q: 如何实时调整参数？
```javascript
// 全局访问实例（开发环境）
window.rainEffect.updateOptions({
  maxDrops: 20,
  color: 'rgba(255, 99, 99, 0.8)'
});
```

#### Q: 性能问题怎么办？
- 减少 `maxDrops` 数量
- 增加 `delay` 延迟
- 增加 `duration` 时间
- 使用移动端优化配置

### 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## English

### ✨ Features

- 🌧️ **Realistic Rain Effect** - Natural raindrop animations following cursor movement
- 🎯 **Physics-based Simulation** - Raindrops start at random angles and gradually become vertical during fall
- 💧 **Slim Raindrop Design** - 30% width, 4x height, more like real rain threads
- ⚡ **High Performance** - Optimized with GSAP and object pooling for smooth animations
- 🔧 **Highly Configurable** - Customize colors, sizes, quantities, and more
- 📱 **Responsive Design** - Perfect adaptation to various screen sizes with intelligent performance scaling
- 🎯 **VitePress Compatible** - Specially optimized for VitePress static sites
- 📦 **TypeScript Support** - Complete type definitions and intelligent hints
- 🎨 **Zero Dependency Conflicts** - Uses peerDependencies to avoid version conflicts
- 🌈 **Multi-theme Support** - Built-in color themes and custom CSS support

### 📦 Installation

```bash
npm install cursor-rain-effect gsap
```

### 🚀 Quick Start

#### Basic Usage

```javascript
import { initCursorRain } from 'cursor-rain-effect';

// Initialize with default settings
const rainEffect = initCursorRain();

// Or with custom configuration
const rainEffect = initCursorRain({
  maxDrops: 30,
  color: 'rgba(100, 200, 255, 0.8)',
  dropSize: [3, 10]
});
```

#### VitePress Integration

For VitePress blogs, use the dedicated initialization function:

```javascript
// .vitepress/theme/index.js or index.ts
import DefaultTheme from 'vitepress/theme';
import { initCursorRainForVitePress } from 'cursor-rain-effect';

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    if (typeof window !== 'undefined') {
      initCursorRainForVitePress({
        maxDrops: 25,
        color: 'rgba(173, 216, 230, 0.6)',
        duration: [1.0, 2.0]
      });
    }
  }
};
```

### ⚙️ Configuration Options

| Parameter | Type | Default | Description | Recommended Range |
|-----------|------|---------|-------------|-------------------|
| `maxDrops` | `number` | `50` | Maximum number of raindrops to show simultaneously | `5-50` |
| `dropSize` | `[number, number]` | `[2, 8]` | Raindrop size range [min, max] | `[1, 15]` |
| `color` | `string` | `'rgba(173, 216, 230, 0.8)'` | Raindrop color (supports any CSS color) | - |
| `duration` | `[number, number]` | `[0.8, 1.5]` | Animation duration range (seconds) | `[0.5, 3.0]` |
| `delay` | `number` | `100` | Delay from cursor move to rain start (milliseconds) | `50-300` |
| `enabled` | `boolean` | `true` | Whether to enable the effect | - |
| `zIndex` | `number` | `9999` | Z-index for the rain container | `1000-10000` |
| `container` | `HTMLElement` | `document.body` | Container element for the effect | - |

### 🎨 Theme Presets

```javascript
import { initCursorRainForVitePress } from 'cursor-rain-effect';

// Default blue theme
initCursorRainForVitePress({
  color: 'rgba(173, 216, 230, 0.6)'
});

// Pink theme
initCursorRainForVitePress({
  color: 'rgba(255, 182, 193, 0.7)',
  maxDrops: 30
});

// Green theme
initCursorRainForVitePress({
  color: 'rgba(144, 238, 144, 0.7)',
  duration: [1.2, 2.0]
});

// Gold theme
initCursorRainForVitePress({
  color: 'rgba(255, 215, 0, 0.6)',
  dropSize: [2, 6],
  delay: 120
});
```

### 🔧 API Reference

```typescript
interface CursorRainEffect {
  init(): void;           // Initialize the effect
  destroy(): void;        // Clean up and destroy
  enable(): void;         // Enable the effect
  disable(): void;        // Disable the effect
  updateOptions(options: Partial<RainDropOptions>): void;
}
```

### 📱 Performance Optimization

The library includes several performance optimizations:

- **Object Pooling** - Reuses DOM elements to reduce creation/destruction overhead
- **Throttled Events** - Limits mouse event processing frequency (~60fps)
- **GSAP Optimization** - Uses high-performance animation library with hardware acceleration
- **Memory Management** - Automatically cleans up unused animations and elements
- **Smart Adaptation** - Automatically adjusts parameters based on device performance

#### Performance Tuning Tips

```javascript
// Mobile optimization
const mobileConfig = {
  maxDrops: 10,          // Reduce quantity
  duration: [2.0, 3.0],  // Increase time
  delay: 200,            // Increase delay
  dropSize: [2, 4]       // Reduce size
};

// High-performance devices
const desktopConfig = {
  maxDrops: 50,          // More raindrops
  duration: [0.5, 1.2],  // Faster animation
  delay: 30,             // Faster response
  dropSize: [4, 12]      // Larger size
};
```

### 🌐 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ IE not supported (requires modern browsers)

### ❓ FAQ

#### Q: How to disable effect on specific pages?
```javascript
// Conditional initialization
if (window.location.pathname !== '/no-rain') {
  initCursorRainForVitePress(config);
}
```

#### Q: How to adjust parameters in real-time?
```javascript
// Global access to instance (development)
window.rainEffect.updateOptions({
  maxDrops: 20,
  color: 'rgba(255, 99, 99, 0.8)'
});
```

#### Q: What to do about performance issues?
- Reduce `maxDrops` quantity
- Increase `delay` timing
- Increase `duration` time
- Use mobile optimization config

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📄 License

MIT License - see the [LICENSE](LICENSE) file for details