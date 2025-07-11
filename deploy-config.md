# StarrySkyBox 部署配置

## 环境变量配置

在 Vercel 中设置以下环境变量：

```bash
# Supabase 数据库配置 (推荐使用 Transaction Pooler)
DATABASE_URL=postgresql://postgres.fbzyncftoxopzerawjhe:[你的密码]@aws-0-us-east-2.pooler.supabase.com:6543/postgres

# 应用配置
NODE_ENV=production
SESSION_SECRET=starry-sky-box-secret-key-2024
```

## 🔗 你的 Supabase 连接信息

**项目 ID**：`fbzyncftoxopzerawjhe`
**项目 URL**：`https://fbzyncftoxopzerawjhe.supabase.co`

**数据库连接选项**：
- **Transaction Pooler (推荐用于 Vercel)**：
  ```
  postgresql://postgres.fbzyncftoxopzerawjhe:[你的密码]@aws-0-us-east-2.pooler.supabase.com:6543/postgres
  ```
- **Direct Connection**：
  ```
  postgresql://postgres:[你的密码]@db.fbzyncftoxopzerawjhe.supabase.co:5432/postgres
  ```

## Supabase 设置步骤

### 1. 创建 Supabase 项目
- 访问 https://supabase.com
- 点击 "Start your project"
- 登录或注册账号
- 点击 "New project"
- 选择组织，输入项目名称：`starry-sky-box`
- 设置数据库密码（请保存好）
- 选择区域（推荐：Northeast Asia (Tokyo)）
- 点击 "Create new project"

### 2. 获取数据库连接信息
项目创建完成后：
- 点击左侧 "Settings" 
- 点击 "Database"
- 找到 "Connection string" 部分
- 复制 "postgres" 连接字符串
- 将 [YOUR-PASSWORD] 替换为你设置的密码

### 3. 导入数据库结构和数据
- 点击左侧 "SQL Editor"
- 点击 "New query"
- 将 `database_backup.sql` 文件内容复制粘贴到编辑器
- 点击 "Run" 执行

## Vercel 部署步骤

### 1. 准备代码
```bash
# 初始化 git 仓库（如果还没有）
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub
# 创建 GitHub 仓库，然后：
git remote add origin https://github.com/你的用户名/星空宝盒.git
git branch -M main
git push -u origin main
```

### 2. 连接 Vercel
- 访问 https://vercel.com
- 登录或注册账号
- 点击 "New Project"
- 选择你的 GitHub 仓库
- 项目名称：`starry-sky-box`
- Framework Preset：选择 "Other"

### 3. 配置环境变量
在 Vercel 项目设置中：
- 点击 "Settings" 标签
- 点击 "Environment Variables"
- 添加以下变量：
  ```
  DATABASE_URL = postgresql://postgres.fbzyncftoxopzerawjhe:[你的Supabase密码]@aws-0-us-east-2.pooler.supabase.com:6543/postgres
  NODE_ENV = production
  SESSION_SECRET = starry-sky-box-secret-key-2024
  ```

### 4. 部署
- 点击 "Deploy"
- 等待构建完成
- 访问提供的 URL

## 本地开发环境变量

创建 `.env` 文件（仅本地使用）：
```bash
# 本地开发
DATABASE_URL=postgresql://starry_box_user:starrybox2025@localhost:5432/starry_box_db
NODE_ENV=development
SESSION_SECRET=starry-sky-box-secret-key-2024
```

## 故障排除

### 数据库连接失败
1. 检查 Supabase 项目是否正常运行
2. 确认数据库密码正确
3. 检查防火墙设置

### Vercel 部署失败
1. 检查 vercel.json 配置
2. 确认环境变量设置正确
3. 查看构建日志中的错误信息

### 功能异常
1. 确认数据库数据导入完整
2. 检查控制台错误信息
3. 确认所有环境变量都已设置 