// 公共内容配置 - 8颗卡片星星，所有人都可以看到
const publicContent = {
    stars: [
        {
            id: 'public-1',
            title: '快乐 / Joy',
            content: '快乐是生活最好的调味料，让每一天都充满阳光！',
            position: { top: "25%", left: "15%" },
            size: "large",
            color: "golden",
            type: 'card',
            image: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
                <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#fff8dc"/>
                    <text x="50%" y="25%" font-family="Arial, sans-serif" font-size="32" fill="#ff6b6b" text-anchor="middle" font-weight="bold">
                        😊 快乐
                    </text>
                    <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="18" fill="#ff6b6b" text-anchor="middle" font-weight="bold">
                        Joy
                    </text>
                    <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        快乐是生活最好的调味料，
                    </text>
                    <text x="50%" y="75%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        让每一天都充满阳光！
                    </text>
                    <text x="50%" y="90%" font-family="Arial, sans-serif" font-size="14" fill="#666666" text-anchor="middle">
                        ✨ 愿你每天都开心快乐 ✨
                    </text>
                </svg>
            `)
        },
        {
            id: 'public-2',
            title: '有钱 / Prosperity',
            content: '真正的财富不仅是金钱，更是内心的富足与满足。',
            position: { top: "60%", left: "75%" },
            size: "normal",
            color: "golden",
            type: 'card',
            image: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
                <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f0f8ff"/>
                    <text x="50%" y="25%" font-family="Arial, sans-serif" font-size="32" fill="#ffd700" text-anchor="middle" font-weight="bold">
                        💰 有钱
                    </text>
                    <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="18" fill="#ffd700" text-anchor="middle" font-weight="bold">
                        Prosperity
                    </text>
                    <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        真正的财富不仅是金钱，
                    </text>
                    <text x="50%" y="75%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        更是内心的富足与满足。
                    </text>
                    <text x="50%" y="90%" font-family="Arial, sans-serif" font-size="14" fill="#666666" text-anchor="middle">
                        ✨ 愿你拥有真正的富足 ✨
                    </text>
                </svg>
            `)
        },
        {
            id: 'public-3',
            title: '勇敢 / Courage',
            content: '勇敢不是没有恐惧，而是面对恐惧时依然前行。',
            position: { top: "15%", left: "70%" },
            size: "normal",
            color: "pink",
            type: 'card',
            image: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
                <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f0ffff"/>
                    <text x="50%" y="25%" font-family="Arial, sans-serif" font-size="32" fill="#ff4757" text-anchor="middle" font-weight="bold">
                        🦁 勇敢
                    </text>
                    <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="18" fill="#ff4757" text-anchor="middle" font-weight="bold">
                        Courage
                    </text>
                    <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        勇敢不是没有恐惧，
                    </text>
                    <text x="50%" y="75%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        而是面对恐惧时依然前行。
                    </text>
                    <text x="50%" y="90%" font-family="Arial, sans-serif" font-size="14" fill="#666666" text-anchor="middle">
                        ✨ 愿你永远勇敢坚强 ✨
                    </text>
                </svg>
            `)
        },
        {
            id: 'public-4',
            title: '做自己 / Be Yourself',
            content: '做自己是最美丽的事，世界需要独一无二的你。',
            position: { top: "25%", left: "80%" },
            size: "normal",
            color: "blue",
            type: 'card',
            image: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
                <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#fff8ee"/>
                    <text x="50%" y="25%" font-family="Arial, sans-serif" font-size="32" fill="#6c5ce7" text-anchor="middle" font-weight="bold">
                        🌈 做自己
                    </text>
                    <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="18" fill="#6c5ce7" text-anchor="middle" font-weight="bold">
                        Be Yourself
                    </text>
                    <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        做自己是最美丽的事，
                    </text>
                    <text x="50%" y="75%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        世界需要独一无二的你。
                    </text>
                    <text x="50%" y="90%" font-family="Arial, sans-serif" font-size="14" fill="#666666" text-anchor="middle">
                        ✨ 愿你永远做真实的自己 ✨
                    </text>
                </svg>
            `)
        },
        {
            id: 'public-5',
            title: '幸福 / Happiness',
            content: '幸福就在身边的小事里，用心感受生活的美好。',
            position: { top: "80%", left: "40%" },
            size: "normal",
            color: "normal",
            type: 'card',
            image: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
                <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f5fffa"/>
                    <text x="50%" y="25%" font-family="Arial, sans-serif" font-size="32" fill="#00b894" text-anchor="middle" font-weight="bold">
                        🍀 幸福
                    </text>
                    <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="18" fill="#00b894" text-anchor="middle" font-weight="bold">
                        Happiness
                    </text>
                    <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        幸福就在身边的小事里，
                    </text>
                    <text x="50%" y="75%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        用心感受生活的美好。
                    </text>
                    <text x="50%" y="90%" font-family="Arial, sans-serif" font-size="14" fill="#666666" text-anchor="middle">
                        ✨ 愿你拥有满满的幸福 ✨
                    </text>
                </svg>
            `)
        },
        {
            id: 'public-6',
            title: '好运 / Good Luck',
            content: '好运总是眷顾努力的人，相信美好正在路上。',
            position: { top: "35%", left: "85%" },
            size: "small",
            color: "pink",
            type: 'card',
            image: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
                <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#fff5f5"/>
                    <text x="50%" y="25%" font-family="Arial, sans-serif" font-size="32" fill="#fd79a8" text-anchor="middle" font-weight="bold">
                        🎲 好运
                    </text>
                    <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="18" fill="#fd79a8" text-anchor="middle" font-weight="bold">
                        Good Luck
                    </text>
                    <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        好运总是眷顾努力的人，
                    </text>
                    <text x="50%" y="75%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        相信美好正在路上。
                    </text>
                    <text x="50%" y="90%" font-family="Arial, sans-serif" font-size="14" fill="#666666" text-anchor="middle">
                        ✨ 愿好运永远伴随你 ✨
                    </text>
                </svg>
            `)
        },
        {
            id: 'public-7',
            title: '平安 / Peace',
            content: '平安是最珍贵的礼物，愿你一生健康顺遂。',
            position: { top: "70%", left: "20%" },
            size: "normal",
            color: "blue",
            type: 'card',
            image: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
                <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#fff0f0"/>
                    <text x="50%" y="25%" font-family="Arial, sans-serif" font-size="32" fill="#74b9ff" text-anchor="middle" font-weight="bold">
                        🕊️ 平安
                    </text>
                    <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="18" fill="#74b9ff" text-anchor="middle" font-weight="bold">
                        Peace
                    </text>
                    <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        平安是最珍贵的礼物，
                    </text>
                    <text x="50%" y="75%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        愿你一生健康顺遂。
                    </text>
                    <text x="50%" y="90%" font-family="Arial, sans-serif" font-size="14" fill="#666666" text-anchor="middle">
                        ✨ 愿你永远平安喜乐 ✨
                    </text>
                </svg>
            `)
        },
        {
            id: 'public-8',
            title: '自信 / Confidence',
            content: '自信是最美的光芒，相信自己就是最好的开始。',
            position: { top: "65%", left: "75%" },
            size: "normal",
            color: "golden",
            type: 'card',
            image: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
                <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f8ffff"/>
                    <text x="50%" y="25%" font-family="Arial, sans-serif" font-size="32" fill="#e17055" text-anchor="middle" font-weight="bold">
                        💪 自信
                    </text>
                    <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="18" fill="#e17055" text-anchor="middle" font-weight="bold">
                        Confidence
                    </text>
                    <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        自信是最美的光芒，
                    </text>
                    <text x="50%" y="75%" font-family="Arial, sans-serif" font-size="16" fill="#333333" text-anchor="middle">
                        相信自己就是最好的开始。
                    </text>
                    <text x="50%" y="90%" font-family="Arial, sans-serif" font-size="14" fill="#666666" text-anchor="middle">
                        ✨ 愿你永远自信闪耀 ✨
                    </text>
                </svg>
            `)
        }
    ]
};

// 私密内容配置 - 1颗NFT星星，需要密码才能看到
const privateContent = {
    stars: [
        {
            id: 'private-nft-center',
            title: 'A Picture to My Friend',
            content: '💝 来自幸运星的珍贵礼物\n\n这是一只叫做"可乐"的小狗，它曾陪伴我的小笔友度过一段快乐的时光。当我收到这幅画时，我被深深感动了。\n\n这不仅仅是一幅画，更是我们友谊的见证，是一份珍贵的回忆。现在它变成了一颗永恒的星星，永远闪耀在我们的星空中。',
            position: { top: "48%", left: "48%" },
            size: "large",
            color: "special",
            type: 'nft',
            imageUrl: 'https://gateway.pinata.cloud/ipfs/bafkreiatmp6t4oskzyjcfgebqzg46fm7daggm4ejoou34ecfx25v2cdxje',
            isReal: true,
            tokenId: 1
        }
    ]
};

// 获取公共内容
function getPublicContent() {
    return {
        success: true,
        publicStars: publicContent.stars
    };
}

// 获取私密内容 (需要认证)
function getPrivateContent() {
    return {
        success: true,
        privateStars: privateContent.stars
    };
}

// 根据类型获取内容
function getContentByType(type, isPrivate = false) {
    const content = isPrivate ? privateContent : publicContent;
    return content.stars.filter(star => star.type === type);
}

module.exports = {
    getPublicContent,
    getPrivateContent,
    getContentByType,
    publicContent,
    privateContent
}; 