#!/bin/bash

echo "正在发布 cursor-rain-effect v1.1.0..."
echo

echo "1. 构建项目..."
npm run build
if [ $? -ne 0 ]; then
    echo "构建失败！"
    exit 1
fi

echo
echo "2. 检查构建文件..."
ls -la dist/
echo

echo "3. 发布到 npm..."
echo "请确保你已经登录 npm (npm login)"
read -p "按回车键继续..."

npm publish
if [ $? -ne 0 ]; then
    echo "发布失败！"
    exit 1
fi

echo
echo "✅ 发布成功！"
echo "📦 cursor-rain-effect@1.1.0 已发布到 npm"
echo
echo "新功能:"
echo "- 🚀 可调节初速度 (initialVelocity)"
echo "- ⚡ 重力物理效果 (gravity)"
echo "- 🎛️ 真实物理计算"
echo
