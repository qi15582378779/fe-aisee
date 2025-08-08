#!/bin/bash

# 构建脚本 - 支持不同部署环境

# 检查是否提供了 basePath 参数
if [ "$1" = "subpath" ]; then
    echo "构建子路径版本 (basePath: /aisee)"
    export NEXT_PUBLIC_BASE_PATH="/aisee"
elif [ "$1" = "root" ]; then
    echo "构建根域名版本 (basePath: 空)"
    export NEXT_PUBLIC_BASE_PATH=""
else
    echo "用法: $0 [subpath|root]"
    echo "  subpath - 部署到子路径 (如 /aisee)"
    echo "  root    - 部署到根域名"
    exit 1
fi

# 构建项目
echo "开始构建..."
npm run build

echo "构建完成！"
echo "basePath: $NEXT_PUBLIC_BASE_PATH"
