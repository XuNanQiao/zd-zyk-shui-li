/*
 * @Author: ZHAO
 * @Date: 2026-06-29 10:50:15
 * @LastEditTime: 2026-06-29 10:50:26
 * @LastEditors: ZHAO
 * @Description: 
 * @FilePath: \zd-zyk-shui-li\version-bump.js
 * 
 */
/**
 * 版本号自动更新脚本
 * 使用方式：
 *   node version-bump.js          # 补丁版本 +1 (例如 0.0.0 -> 0.0.1)
 *   node version-bump.js minor    # 次版本 +1 (例如 0.0.0 -> 0.1.0)
 *   node version-bump.js major    # 主版本 +1 (例如 0.0.0 -> 1.0.0)
 *   node version-bump.js --release    # 正式发布版本（-dev 或 -beta 等后缀）
 */

const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

// 获取当前版本号和更新类型
const currentVersion = packageJson.version;
const args = process.argv.slice(2);
const updateType = args[0];
const isRelease = args.includes('--release');

if (!['patch', 'minor', 'major', ''].includes(updateType)) {
    console.error('❌ 无效的更新类型。使用: patch, minor, major 或留空进行 patch 更新');
    console.log('使用方式:');
    console.log('  node version-bump.js          # patch 版本 +1');
    console.log('  node version-bump.js minor    # minor 版本 +1');
    console.log('  node version-bump.js major    # major 版本 +1');
    console.log('  node version-bump.js --release    # 移除开发版本后缀');
    process.exit(1);
}

// 解析版本号
let [major, minor, patch] = currentVersion.split('.').map(Number);

// 处理版本号中的额外标识（如 1.0.0-dev、1.0.0-beta）
const versionParts = currentVersion.split('-');
const hasSuffix = versionParts.length > 1;
const suffix = hasSuffix ? versionParts[1] : '';

if (isRelease && suffix) {
    // 移除开发版本后缀
    const newVersion = `${major}.${minor}.${patch}`;
    
    // 更新 package.json
    packageJson.version = newVersion;
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
    
    console.log(`✅ 发布版本: ${currentVersion} -> ${newVersion}`);
} else {
    // 更新版本号
    if (updateType === 'major') {
        major++;
        minor = 0;
        patch = 0;
    } else if (updateType === 'minor') {
        minor++;
        patch = 0;
    } else {
        // patch 是默认操作
        patch++;
    }
    
    // 添加开发版本标识（表示这是开发/测试版本）
    const newVersion = hasSuffix 
        ? `${major}.${minor}.${patch}-${suffix}`
        : `${major}.${minor}.${patch}-dev`;
    
    // 更新 package.json
    packageJson.version = newVersion;
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
    
    console.log(`✅ 版本已更新: ${currentVersion} -> ${newVersion}`);
}

// 同时生成版本号环境变量文件（供 Vite 使用）
const envPath = path.join(__dirname, '.env.version');
const envContent = `VITE_APP_VERSION=${packageJson.version}\n`;
fs.writeFileSync(envPath, envContent, 'utf-8');
console.log(`📝 版本环境变量已更新: .env.version`);