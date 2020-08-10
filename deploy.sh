#!/usr/bin/env sh

# 當發生錯誤時終止腳本
set -e

# 打包輸出
npm run build

# cd 到打包輸出的目錄下 
cd dist

git init
git add -A
git commit -m 'deploy'

# 部署到 GitHub
git push -f git@github.com:tatdt622989/ChiMooChi.git master:gh-pages

cd -