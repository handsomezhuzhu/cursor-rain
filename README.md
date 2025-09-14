# Cursor Rain Effect

一个美丽的光标雨点效果库，当鼠标移动时会在光标位置产生逼真的雨点落下动画。使用 GSAP 优化性能，完美兼容 VitePress 和其他现代前端框架。

[English](#english) | [中文](#中文)

## 中文

### ✨ 特性

- 🌧️ **逼真的雨点效果** - 光标移动时产生自然的雨滴动画
- ⚡ **高性能优化** - 使用 GSAP 和对象池技术，确保流畅的动画效果
- 🔧 **高度可配置** - 支持自定义颜色、大小、数量等多种参数
- 📱 **响应式设计** - 完美适配各种屏幕尺寸
- 🎯 **VitePress 兼容** - 专门优化以支持 VitePress 静态站点
- 📦 **TypeScript 支持** - 完整的类型定义
- 🎨 **零依赖冲突** - 使用 peerDependencies 避免版本冲突

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

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `maxDrops` | `number` | `50` | 同时显示的最大雨滴数量 |
| `dropSize` | `[number, number]` | `[2, 8]` | 雨滴大小范围 [最小, 最大] |
| `color` | `string` | `'rgba(173, 216, 230, 0.8)'` | 雨滴颜色 |
| `duration` | `[number, number]` | `[0.8, 1.5]` | 动画持续时间范围（秒） |
| `delay` | `number` | `100` | 鼠标移动到雨滴开始的延迟（毫秒） |
| `enabled` | `boolean` | `true` | 是否启用效果 |
| `zIndex` | `number` | `9999` | 雨滴容器的 z-index |
| `container` | `HTMLElement` | `document.body` | 效果容器元素 |

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
- **节流处理** - 限制鼠标事件处理频率
- **GSAP 优化** - 使用高性能的动画库
- **内存管理** - 自动清理不再使用的动画和元素

### 🌐 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 📄 许可证

MIT License

---

## English

### ✨ Features

- 🌧️ **Realistic Rain Effect** - Natural raindrop animations following cursor movement
- ⚡ **High Performance** - Optimized with GSAP and object pooling for smooth animations
- 🔧 **Highly Configurable** - Customize colors, sizes, quantities, and more
- 📱 **Responsive Design** - Perfect adaptation to various screen sizes
- 🎯 **VitePress Compatible** - Specially optimized for VitePress static sites
- 📦 **TypeScript Support** - Complete type definitions
- 🎨 **Zero Dependency Conflicts** - Uses peerDependencies to avoid version conflicts

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

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `maxDrops` | `number` | `50` | Maximum number of raindrops to show simultaneously |
| `dropSize` | `[number, number]` | `[2, 8]` | Raindrop size range [min, max] |
| `color` | `string` | `'rgba(173, 216, 230, 0.8)'` | Raindrop color |
| `duration` | `[number, number]` | `[0.8, 1.5]` | Animation duration range (seconds) |
| `delay` | `number` | `100` | Delay from cursor move to rain start (milliseconds) |
| `enabled` | `boolean` | `true` | Whether to enable the effect |
| `zIndex` | `number` | `9999` | Z-index for the rain container |
| `container` | `HTMLElement` | `document.body` | Container element for the effect |

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

### 📄 License

MIT License