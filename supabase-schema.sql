-- ===================================
-- 星空宝盒 - Supabase 数据库架构
-- ===================================

-- 创建项目设置表
CREATE TABLE IF NOT EXISTS project_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(50) NOT NULL UNIQUE,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建星星表
CREATE TABLE IF NOT EXISTS stars (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('public', 'private')),
    content_type VARCHAR(20) DEFAULT 'text' CHECK (content_type IN ('text', 'image', 'mixed')),
    text_content TEXT,
    image_url TEXT,
    image_alt_text VARCHAR(200),
    is_nft BOOLEAN DEFAULT false,
    nft_metadata JSONB,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建星星样式表
CREATE TABLE IF NOT EXISTS star_styles (
    id SERIAL PRIMARY KEY,
    star_id INTEGER REFERENCES stars(id) ON DELETE CASCADE,
    position_x DECIMAL(5,2) NOT NULL CHECK (position_x >= 0 AND position_x <= 100),
    position_y DECIMAL(5,2) NOT NULL CHECK (position_y >= 0 AND position_y <= 100),
    color_scheme VARCHAR(20) DEFAULT 'normal' CHECK (color_scheme IN ('golden', 'blue', 'pink', 'normal', 'special')),
    size_category VARCHAR(20) DEFAULT 'normal' CHECK (size_category IN ('small', 'normal', 'large')),
    animation_delay DECIMAL(3,1) DEFAULT 0,
    custom_css JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建内容历史表
CREATE TABLE IF NOT EXISTS content_history (
    id SERIAL PRIMARY KEY,
    star_id INTEGER REFERENCES stars(id) ON DELETE SET NULL,
    action_type VARCHAR(20) NOT NULL CHECK (action_type IN ('create', 'update', 'delete', 'view')),
    old_data JSONB,
    new_data JSONB,
    change_description TEXT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by VARCHAR(100)
);

-- 创建媒体文件表
CREATE TABLE IF NOT EXISTS media_files (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    file_type VARCHAR(50),
    file_size INTEGER,
    file_path VARCHAR(500),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_used BOOLEAN DEFAULT false,
    description TEXT
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_stars_type_active ON stars(type, is_active);
CREATE INDEX IF NOT EXISTS idx_stars_display_order ON stars(display_order);
CREATE INDEX IF NOT EXISTS idx_star_styles_star_id ON star_styles(star_id);
CREATE INDEX IF NOT EXISTS idx_content_history_star_id ON content_history(star_id);
CREATE INDEX IF NOT EXISTS idx_media_files_used ON media_files(is_used);

-- 插入项目设置数据
INSERT INTO project_settings (setting_key, setting_value, description) VALUES
('access_password_hash', '$2b$10$hNOS1wWVGqpq.xXbCiSCLOY1YhwEkA2R2Qb/RnBIwP3x5J8eY2kKm', '访问密码的 bcrypt 哈希值（原密码：20241008）'),
('project_title', '星空宝盒', '项目标题'),
('theme_color', '#1a1a2e', '主题颜色'),
('max_stars_display', '50', '最大同时显示星星数量')
ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value;

-- 插入公共星星数据
INSERT INTO stars (id, title, type, content_type, text_content, display_order, is_active) VALUES
(1, '初次相遇', 'public', 'text', '2024年10月8日，我们第一次相遇。那天的阳光很温暖，就像你的笑容一样。', 1, true),
(2, '第一封信', 'public', 'text', '收到你的第一封信时，我的心跳得很快。字里行间透露着你的温柔和真诚。', 2, true),
(3, '共同的梦想', 'public', 'text', '我们谈论着各自的梦想，发现彼此有着相似的人生追求。这种心灵的契合让我感到惊喜。', 3, true),
(4, '雨天的思念', 'public', 'text', '雨天的午后，我会想起你说过的话。雨声滴答，如同你敲击键盘的声音。', 4, true),
(5, '月圆之夜', 'public', 'text', '月圆之夜，我们虽然相隔两地，但看着同一轮明月，心却无比贴近。', 5, true),
(6, '节日祝福', 'public', 'text', '每一个节日，你都会送来温暖的祝福。这些话语如春风般温柔，温暖着我的心田。', 6, true),
(7, '未来的约定', 'public', 'text', '我们约定要一起看遍世界的美景，品尝各地的美食，创造属于我们的美好回忆。', 7, true),
(8, '永恒的友谊', 'public', 'text', '时间流逝，但我们的友谊如夜空中的星星，永远闪亮，永远温暖。', 8, true)
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    text_content = EXCLUDED.text_content,
    display_order = EXCLUDED.display_order;

-- 插入私密星星数据（NFT星星）
INSERT INTO stars (id, title, type, content_type, text_content, image_url, is_nft, nft_metadata, display_order, is_active) VALUES
(9, '特别的礼物', 'private', 'mixed', '这是我们之间最特别的回忆，就像这颗独一无二的星星一样珍贵。', 
'https://gateway.pinata.cloud/ipfs/bafkreiatmp6t4oskzyjcfgebqzg46fm7daggm4ejoou34ecfx25v2cdxje', 
true, 
'{"contract_address": "0x...", "token_id": "1", "blockchain": "ethereum", "rarity": "legendary"}', 
1, true)
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    text_content = EXCLUDED.text_content,
    image_url = EXCLUDED.image_url,
    is_nft = EXCLUDED.is_nft,
    nft_metadata = EXCLUDED.nft_metadata;

-- 插入星星样式数据
INSERT INTO star_styles (star_id, position_x, position_y, color_scheme, size_category, animation_delay) VALUES
(1, 15.5, 25.3, 'golden', 'normal', 0.2),
(2, 78.2, 45.7, 'blue', 'normal', 0.5),
(3, 32.8, 68.1, 'pink', 'large', 0.8),
(4, 65.4, 23.9, 'normal', 'small', 1.1),
(5, 88.7, 77.6, 'golden', 'normal', 1.4),
(6, 25.1, 52.4, 'blue', 'normal', 1.7),
(7, 55.9, 38.2, 'pink', 'large', 2.0),
(8, 42.3, 82.5, 'normal', 'normal', 2.3),
(9, 70.0, 60.0, 'special', 'large', 0.0)
ON CONFLICT DO NOTHING;

-- 重置序列
SELECT setval('stars_id_seq', (SELECT MAX(id) FROM stars));
SELECT setval('star_styles_id_seq', (SELECT MAX(id) FROM star_styles));
SELECT setval('project_settings_id_seq', (SELECT MAX(id) FROM project_settings)); 