// 星星样式系统
const STAR_STYLES = {
    // 大小变体
    sizes: {
        large: { 
            width: "24px", 
            height: "24px", 
            zIndex: "200",
            scale: "1.8",
            shadowIntensity: "1.2"
        },
        normal: { 
            width: "16px", 
            height: "16px", 
            zIndex: "100",
            scale: "1.5",
            shadowIntensity: "1"
        },
        small: { 
            width: "12px", 
            height: "12px", 
            zIndex: "50",
            scale: "1.3",
            shadowIntensity: "0.8"
        }
    },
    
    // 颜色变体
    colors: {
        golden: {
            gradient: "radial-gradient(circle, #ffd700 0%, #ffb347 70%, transparent 100%)",
            shadow: "0 0 15px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 215, 0, 0.8)",
            hoverGlow: "0 0 25px rgba(255, 215, 0, 1), 0 0 50px rgba(255, 215, 0, 0.8)"
        },
        pink: {
            gradient: "radial-gradient(circle, #ff69b4 0%, #ff1493 70%, transparent 100%)",
            shadow: "0 0 15px rgba(255, 105, 180, 1), 0 0 30px rgba(255, 20, 147, 0.8)",
            hoverGlow: "0 0 25px rgba(255, 105, 180, 1), 0 0 50px rgba(255, 20, 147, 0.8)"
        },
        blue: {
            gradient: "radial-gradient(circle, #00bfff 0%, #1e90ff 70%, transparent 100%)",
            shadow: "0 0 15px rgba(0, 191, 255, 1), 0 0 30px rgba(30, 144, 255, 0.8)",
            hoverGlow: "0 0 25px rgba(0, 191, 255, 1), 0 0 50px rgba(30, 144, 255, 0.8)"
        },
        normal: {
            gradient: "radial-gradient(circle, #fff 0%, #f0a5a5 70%, transparent 100%)",
            shadow: "0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(240, 165, 165, 0.6)",
            hoverGlow: "0 0 25px rgba(255, 255, 255, 1), 0 0 50px rgba(240, 165, 165, 0.8)"
        }
    },
    
    // 动画效果
    animations: {
        pulse: "starPulse 3s infinite ease-in-out",
        nftPulse: "realNftPulse 2s infinite ease-in-out",
        twinkle: "starTwinkle 4s infinite ease-in-out",
        appear: "starAppear 0.8s ease-out forwards"
    }
};

// 星星内容模板
const STAR_TEMPLATES = {
    // 祝福语模板
    blessings: {
        default: "✨ 愿你{message}✨",
        special: "🌟 愿这颗星星伴你{message}🌟"
    },
    
    // SVG内容模板
    layouts: {
        standard: (star) => `
            <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="${star.backgroundColor || '#f8f8ff'}"/>
                <text x="50%" y="25%" font-family="Arial, sans-serif" font-size="32" fill="${star.titleColor || '#333'}" text-anchor="middle" font-weight="bold">
                    ${star.emoji} ${star.title}
                </text>
                <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="18" fill="${star.titleColor || '#666'}" text-anchor="middle" font-weight="bold">
                    ${star.title_en}
                </text>
                <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                    ${star.content.split('，')[0]}
                </text>
                <text x="50%" y="75%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                    ${star.content.split('，')[1]}
                </text>
                <text x="50%" y="90%" font-family="Arial, sans-serif" font-size="14" fill="#666666" text-anchor="middle">
                    ${star.blessing}
                </text>
            </svg>
        `
    }
};

// 位置分布策略
const STAR_POSITIONS = {
    // 预设的位置组合，确保视觉平衡
    layouts: [
        { top: "25%", left: "15%" },  // 左上
        { top: "60%", left: "75%" },  // 右中
        { top: "15%", left: "70%" },  // 右上
        { top: "25%", left: "80%" },  // 右上偏右
        { top: "80%", left: "40%" },  // 底部中间
        { top: "35%", left: "85%" },  // 右中上
        { top: "70%", left: "20%" },  // 左下
        { top: "65%", left: "75%" }   // 右下
    ],
    
    // 获取下一个可用位置
    getNextPosition: (index) => {
        return STAR_POSITIONS.layouts[index % STAR_POSITIONS.layouts.length];
    }
};

// 辅助函数
const StarUtils = {
    // 生成星星样式
    generateStarStyle: (size, color) => {
        const sizeStyle = STAR_STYLES.sizes[size];
        const colorStyle = STAR_STYLES.colors[color];
        
        return {
            width: sizeStyle.width,
            height: sizeStyle.height,
            zIndex: sizeStyle.zIndex,
            background: colorStyle.gradient,
            boxShadow: colorStyle.shadow,
            animation: STAR_STYLES.animations.pulse,
            transform: `scale(${sizeStyle.scale})`,
            transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        };
    },
    
    // 生成星星内容
    generateStarContent: (starData) => {
        return STAR_TEMPLATES.layouts.standard({
            ...starData,
            backgroundColor: '#f8f8ff',
            titleColor: starData.color === 'golden' ? '#ffd700' : 
                       starData.color === 'pink' ? '#ff1493' :
                       starData.color === 'blue' ? '#1e90ff' : '#333'
        });
    }
};

// 导出所有常量和工具函数
export {
    STAR_STYLES,
    STAR_TEMPLATES,
    STAR_POSITIONS,
    StarUtils
}; 