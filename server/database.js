const { Pool } = require('pg');

// 数据库连接配置 - 支持环境变量
const dbConfig = process.env.DATABASE_URL ? {
    // Supabase 连接方式
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
} : {
    // 本地开发连接方式 - 需要在 .env 文件中配置
    user: process.env.DB_USER || 'starry_box_user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'starry_box_db',
    password: process.env.DB_PASSWORD, // 不再提供默认密码，强制使用环境变量
    port: parseInt(process.env.DB_PORT) || 5432
};

const pool = new Pool({
    ...dbConfig,
    // 连接池配置优化 - 适配Vercel环境
    max: 3,  // Vercel函数并发限制
    connectionTimeoutMillis: 10000,  // 增加连接超时
    idleTimeoutMillis: 30000,
    query_timeout: 15000,  // 查询超时
    statement_timeout: 15000,  // 语句超时
    // Vercel环境优化
    keepAlive: true,
    keepAliveInitialDelayMillis: 10000,
});

// 数据库查询函数
async function query(text, params) {
    try {
        const start = Date.now();
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('数据库查询执行:', { text, duration, rows: res.rowCount });
        return res;
    } catch (err) {
        console.error('数据库查询错误:', err);
        throw err;
    }
}

// 获取项目配置
async function getProjectSettings() {
    try {
        const result = await query('SELECT setting_key, setting_value FROM project_settings');
        const settings = {};
        result.rows.forEach(row => {
            settings[row.setting_key] = row.setting_value;
        });
        return settings;
    } catch (err) {
        console.error('获取项目配置失败:', err);
        return null;
    }
}

// 获取公共星星数据
async function getPublicStars() {
    try {
        const result = await query(`
            SELECT 
                s.id, s.title, s.text_content, s.image_url, s.is_nft,
                st.position_x, st.position_y, st.color_scheme, st.size_category
            FROM stars s
            JOIN star_styles st ON s.id = st.star_id
            WHERE s.type = 'public' AND s.is_active = true
            ORDER BY s.display_order
        `);
        
        return result.rows.map(row => ({
            id: row.id,
            title: row.title,
            content: row.text_content,
            image: row.image_url,
            isReal: row.is_nft,
            position: {
                top: `${row.position_y}%`,
                left: `${row.position_x}%`
            },
            color: row.color_scheme,
            size: row.size_category
        }));
    } catch (err) {
        console.error('获取公共星星失败:', err);
        return [];
    }
}

// 获取私密星星数据
async function getPrivateStars() {
    try {
        const result = await query(`
            SELECT 
                s.id, s.title, s.text_content, s.image_url, s.is_nft, s.nft_metadata,
                st.position_x, st.position_y, st.color_scheme, st.size_category
            FROM stars s
            JOIN star_styles st ON s.id = st.star_id
            WHERE s.type = 'private' AND s.is_active = true
            ORDER BY s.display_order
        `);
        
        return result.rows.map(row => ({
            id: row.id,
            title: row.title,
            content: row.text_content,
            image: row.image_url,
            isReal: row.is_nft,
            metadata: row.nft_metadata,
            position: {
                top: `${row.position_y}%`,
                left: `${row.position_x}%`
            },
            color: row.color_scheme,
            size: row.size_category
        }));
    } catch (err) {
        console.error('获取私密星星失败:', err);
        return [];
    }
}

// 验证密码（从数据库获取）
async function validatePassword(inputPassword) {
    try {
        const bcrypt = require('bcrypt');
        const settings = await getProjectSettings();
        if (!settings || !settings.access_password_hash && !settings.password_hash) {
            console.error('无法获取密码哈希');
            return false;
        }
        
        // 支持两种字段名：access_password_hash 和 password_hash
        const passwordHash = settings.access_password_hash || settings.password_hash;
        return await bcrypt.compare(inputPassword, passwordHash);
    } catch (err) {
        console.error('密码验证失败:', err);
        return false;
    }
}

// 记录内容访问历史
async function logContentAccess(starId, actionType, userId = 'anonymous') {
    try {
        await query(`
            INSERT INTO content_history (star_id, action_type, change_description, changed_by)
            VALUES ($1, $2, $3, $4)
        `, [starId, actionType, `用户访问了星星内容`, userId]);
    } catch (err) {
        console.error('记录访问历史失败:', err);
    }
}

// 测试数据库连接
async function testConnection() {
    try {
        const result = await query('SELECT NOW() as current_time');
        console.log('✅ 数据库连接成功:', result.rows[0].current_time);
        return true;
    } catch (err) {
        console.error('❌ 数据库连接失败:', err);
        return false;
    }
}

module.exports = {
    query,
    getProjectSettings,
    getPublicStars,
    getPrivateStars,
    validatePassword,
    logContentAccess,
    testConnection,
    pool
}; 