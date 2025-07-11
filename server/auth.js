const bcrypt = require('bcrypt');

// 验证密码（已弃用 - 现在使用数据库验证）
// 保留此函数仅作为备用验证方法
const verifyPassword = async (req, res) => {
    try {
        const { password } = req.body;
        
        if (!password) {
            return res.status(400).json({
                success: false,
                message: '请输入密码'
            });
        }

        // 现在应该使用数据库验证，这里返回错误
        return res.status(500).json({
            success: false,
            message: '请使用数据库验证方法'
        });

        // 原来的密码比较逻辑已移除（安全考虑）
        // const isValid = await bcrypt.compare(password, PASSWORD_HASH);
        
        if (isValid) {
            // 设置会话
            req.session.authenticated = true;
            req.session.authTime = Date.now();
            
            return res.json({
                success: true,
                message: '验证成功！正在为您开启私密星空...'
            });
        } else {
            return res.status(401).json({
                success: false,
                message: '密码错误，请重试'
            });
        }
        
    } catch (error) {
        console.error('密码验证错误:', error);
        return res.status(500).json({
            success: false,
            message: '服务器错误，请稍后再试'
        });
    }
};

// 检查认证状态的中间件
const requireAuth = (req, res, next) => {
    if (req.session.authenticated) {
        // 检查会话是否过期（24小时）
        const now = Date.now();
        const authTime = req.session.authTime || 0;
        const sessionDuration = 24 * 60 * 60 * 1000; // 24小时
        
        if (now - authTime < sessionDuration) {
            return next();
        } else {
            // 会话过期
            req.session.destroy();
        }
    }
    
    return res.status(401).json({
        success: false,
        message: '需要验证身份才能访问私密内容'
    });
};

// 检查当前认证状态
const checkAuthStatus = (req, res) => {
    const isAuthenticated = !!req.session.authenticated;
    res.json({
        authenticated: isAuthenticated,
        authTime: req.session.authTime || null
    });
};

// 注销
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: '注销失败'
            });
        }
        res.json({
            success: true,
            message: '已安全注销'
        });
    });
};

module.exports = {
    verifyPassword,
    requireAuth,
    checkAuthStatus,
    logout
}; 