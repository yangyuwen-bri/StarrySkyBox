const express = require('express');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const auth = require('./auth');
const content = require('./content');
const db = require('./database'); // 新增：数据库模块

const app = express();
const PORT = process.env.PORT || 3000;

// 设置 trust proxy 以支持 Vercel 部署
app.set('trust proxy', 1);

// 安全中间件
app.use(helmet({
    contentSecurityPolicy: false, // 暂时禁用CSP，方便开发
}));
app.use(cors());

// 速率限制
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 100, // 每个IP最多100次请求
    message: '请求过于频繁，请稍后再试'
});
app.use(limiter);

// 密码验证的特殊限制
const passwordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 5, // 每个IP最多5次密码尝试
    message: '密码尝试次数过多，请稍后再试'
});

// 会话配置
app.use(session({
    secret: process.env.SESSION_SECRET || 'starry-sky-box-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // 生产环境自动启用 HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24小时
    }
}));

// 静态文件服务
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 主页面路由 - 始终提供公共版本
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 获取公共内容路由 - 无需认证（新版：从数据库读取）
app.get('/public-content', async (req, res) => {
    try {
        console.log('📊 正在从数据库获取公共星星内容...');
        const publicStars = await db.getPublicStars();
        
        // 记录访问日志（可选）
        console.log(`✅ 成功获取 ${publicStars.length} 颗公共星星`);
        
        res.json({
            success: true,
            publicStars: publicStars,
            count: publicStars.length,
            source: 'database'
        });
    } catch (error) {
        console.error('❌ 获取公共内容错误:', error);
        
        // 降级处理：如果数据库查询失败，使用原有硬编码数据
        console.log('🔄 数据库查询失败，使用备用数据');
        try {
            const publicContent = content.getPublicContent();
            res.json({
                ...publicContent,
                source: 'fallback'
            });
        } catch (fallbackError) {
            console.error('❌ 备用数据也获取失败:', fallbackError);
            res.status(500).json({
                success: false,
                message: '无法获取内容，请稍后重试'
            });
        }
    }
});

// 密码验证路由（新版：使用数据库验证）
app.post('/verify-password', passwordLimiter, async (req, res) => {
    try {
        const { password } = req.body;
        
        if (!password) {
            return res.status(400).json({
                success: false,
                message: '请输入密码'
            });
        }

        console.log('🔐 验证密码中...');
        const isValid = await db.validatePassword(password);
        
                 if (isValid) {
             req.session.authenticated = true;
             req.session.authTime = Date.now(); // 添加认证时间
             console.log('✅ 密码验证成功');
             res.json({
                 success: true,
                 message: '验证成功！正在为您开启私密星空...'
             });
         } else {
            console.log('❌ 密码验证失败');
            res.status(401).json({
                success: false,
                message: '密码错误'
            });
        }
    } catch (error) {
        console.error('❌ 密码验证过程错误:', error);
        
        // 降级处理：使用原有验证方法
        console.log('🔄 使用备用密码验证');
        auth.verifyPassword(req, res);
    }
});

// 检查认证状态路由
app.get('/auth-status', auth.checkAuthStatus);

// 注销路由
app.post('/logout', auth.logout);

// 获取私密内容路由（新版：从数据库读取）
app.get('/private-content', auth.requireAuth, async (req, res) => {
    try {
        console.log('🔐 正在从数据库获取私密星星内容...');
        const privateStars = await db.getPrivateStars();
        
        // 记录访问历史
        for (const star of privateStars) {
            await db.logContentAccess(star.id, 'view', req.session.userId || 'anonymous');
        }
        
        console.log(`✅ 成功获取 ${privateStars.length} 颗私密星星`);
        
        res.json({
            success: true,
            privateStars: privateStars,
            count: privateStars.length,
            source: 'database'
        });
    } catch (error) {
        console.error('❌ 获取私密内容错误:', error);
        
        // 降级处理：使用原有硬编码数据
        console.log('🔄 数据库查询失败，使用备用数据');
        try {
            const privateContent = content.getPrivateContent();
            res.json({
                ...privateContent,
                source: 'fallback'
            });
        } catch (fallbackError) {
            console.error('❌ 备用数据也获取失败:', fallbackError);
            res.status(500).json({
                success: false,
                message: '无法获取私密内容'
            });
        }
    }
});

// 根据类型获取内容路由（更新为支持数据库）
app.get('/content/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const isPrivate = req.session.authenticated || false;
        
        let stars = [];
        
        if (type === 'public') {
            stars = await db.getPublicStars();
        } else if (type === 'private' && isPrivate) {
            stars = await db.getPrivateStars();
        } else if (type === 'all' && isPrivate) {
            const publicStars = await db.getPublicStars();
            const privateStars = await db.getPrivateStars();
            stars = [...publicStars, ...privateStars];
        }
        
        res.json({
            success: true,
            type: type,
            isPrivate: isPrivate,
            stars: stars,
            count: stars.length,
            source: 'database'
        });
    } catch (error) {
        console.error('❌ 获取分类内容错误:', error);
        
        // 降级处理
        try {
            const contentByType = content.getContentByType(type, isPrivate);
            res.json({
                success: true,
                type: type,
                isPrivate: isPrivate,
                stars: contentByType,
                source: 'fallback'
            });
        } catch (fallbackError) {
            res.status(500).json({
                success: false,
                message: '服务器错误'
            });
        }
    }
});

// 新增：数据库状态检查路由
app.get('/db-status', async (req, res) => {
    try {
        const isConnected = await db.testConnection();
        const settings = await db.getProjectSettings();
        
        res.json({
            success: true,
            database: {
                connected: isConnected,
                settings: settings ? Object.keys(settings) : [],
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            database: {
                connected: false,
                error: error.message
            }
        });
    }
});

// 诊断API - 帮助调试密码验证问题
app.get('/debug-password', async (req, res) => {
    try {
        console.log('🔍 开始密码验证诊断...');
        
        const diagnosis = {
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            hasDatabase: !!process.env.DATABASE_URL,
            databaseConnection: false,
            projectSettings: null,
            passwordHash: null,
            testResults: {}
        };
        
        // 测试数据库连接
        try {
            diagnosis.databaseConnection = await db.testConnection();
            console.log('数据库连接状态:', diagnosis.databaseConnection);
        } catch (error) {
            console.error('数据库连接测试失败:', error);
        }
        
        // 获取项目配置
        if (diagnosis.databaseConnection) {
            try {
                const settings = await db.getProjectSettings();
                diagnosis.projectSettings = settings ? Object.keys(settings) : null;
                diagnosis.passwordHash = settings?.access_password_hash || settings?.password_hash || 'NOT_FOUND';
                console.log('项目配置键:', diagnosis.projectSettings);
                console.log('密码哈希存在:', !!diagnosis.passwordHash);
            } catch (error) {
                console.error('获取项目配置失败:', error);
                diagnosis.error = error.message;
            }
        }
        
        // 测试bcrypt验证
        if (diagnosis.passwordHash && diagnosis.passwordHash !== 'NOT_FOUND') {
            try {
                const bcrypt = require('bcrypt');
                diagnosis.testResults.bcryptTest = await bcrypt.compare('20241008', diagnosis.passwordHash);
                console.log('bcrypt测试结果:', diagnosis.testResults.bcryptTest);
            } catch (error) {
                console.error('bcrypt测试失败:', error);
                diagnosis.testResults.bcryptError = error.message;
            }
        }
        
        res.json(diagnosis);
    } catch (error) {
        console.error('❌ 诊断过程错误:', error);
        res.status(500).json({
            error: '诊断失败',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// 健康检查路由
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 404处理
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: '页面不存在'
    });
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('服务器错误:', err);
    res.status(500).json({
        success: false,
        message: '服务器内部错误'
    });
});

// 启动服务器（仅在非 Vercel 环境下）
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, async () => {
        console.log(`🌟 星空宝盒服务器启动成功！`);
        console.log(`🌐 访问地址: http://localhost:${PORT}`);
        console.log(`🔒 安全模式已启用`);
        
        // 测试数据库连接
        console.log('📊 正在测试数据库连接...');
        const dbConnected = await db.testConnection();
        
        if (dbConnected) {
            try {
                const publicStars = await db.getPublicStars();
                const privateStars = await db.getPrivateStars();
                const settings = await db.getProjectSettings();
                
                console.log(`📊 公共内容: ${publicStars.length} 颗星星`);
                console.log(`🔐 私密内容: ${privateStars.length} 颗星星`);
                console.log(`⚙️  项目配置: ${settings ? Object.keys(settings).length : 0} 项设置`);
                console.log(`💾 数据来源: PostgreSQL 数据库`);
            } catch (error) {
                console.error('❌ 数据库查询测试失败:', error);
                console.log(`📊 公共内容: ${content.publicContent.stars.length} 颗星星 (备用数据)`);
                console.log(`🔐 私密内容: ${content.privateContent.stars.length} 颗星星 (备用数据)`);
                console.log(`💾 数据来源: 硬编码备用数据`);
            }
        } else {
            console.log(`📊 公共内容: ${content.publicContent.stars.length} 颗星星 (备用数据)`);
            console.log(`🔐 私密内容: ${content.privateContent.stars.length} 颗星星 (备用数据)`);
            console.log(`💾 数据来源: 硬编码备用数据`);
        }
    });
}

module.exports = app; 