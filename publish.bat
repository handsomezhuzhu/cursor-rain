@echo off
echo 正在发布 cursor-rain-effect v1.1.0...
echo.

echo 1. 构建项目...
call npm run build
if %errorlevel% neq 0 (
    echo 构建失败！
    pause
    exit /b 1
)

echo.
echo 2. 检查构建文件...
dir dist
echo.

echo 3. 发布到 npm...
echo 请确保你已经登录 npm (npm login)
pause

call npm publish
if %errorlevel% neq 0 (
    echo 发布失败！
    pause
    exit /b 1
)

echo.
echo ✅ 发布成功！
echo 📦 cursor-rain-effect@1.1.0 已发布到 npm
echo.
echo 新功能:
echo - 🚀 可调节初速度 (initialVelocity)
echo - ⚡ 重力物理效果 (gravity)
echo - 🎛️ 真实物理计算
echo.
pause
