<div align="center">

# The Starry Sky Box ✨

**A Private Digital Starry Sky for Preserving Precious Memories**

![Web3](https://img.shields.io/badge/Web3-Blockchain-blue)
![NFT](https://img.shields.io/badge/NFT-ERC721-green)
![Production](https://img.shields.io/badge/Status-Production_Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

*"Every handwritten letter is a shining star  
Every precious memory deserves to be treasured forever"*

---

**🌍 Language / 语言**

[🇨🇳 中文](../README.md) | 🇺🇸 English (Current)

</div>

---

## 📖 A Story About Warmth and Memory

In this age of instant messaging overload, what could be more precious than a handwritten letter? For girls participating in the "Rainbow Charity Society" project, every letter from volunteer mentors is the warmest companionship on their journey of growth.

However, paper yellows, ink fades, and precious memories might get lost in the torrent of time. **The Starry Sky Box** was born to solve this problem—we want to build an eternal home for every beautiful memory.

## 🌟 What is The Starry Sky Box?

Imagine opening a mysterious webpage and seeing not a cold interface, but a **private starry sky** that belongs to you. Each shining star represents a precious memory:

- 💌 **Every letter received** becomes a warm star
- 🎨 **Every hand-drawn artwork** transforms into a creative star
- 📸 **Every precious photo** becomes a memory star
- 🎁 **Special keepsakes** sparkle with unique light

As time passes, your starry sky becomes more and more brilliant. This is not just a place to store files, but a warm space that **visualizes your growth journey**.

## 💝 Why Choose The Starry Sky Box?

### 🔒 **True Privacy Protection**
Your starry sky belongs only to you. Through password protection, only you know how to open this door to memories.

### 💎 **Eternal Preservation**
Using cutting-edge Web3 technology, every memory is safely stored in distributed networks and will never be lost.

### 🌈 **Zero Barrier Access**
No software downloads needed, no complex technical concepts to understand. As simple as opening any ordinary website.

### 🎯 **Focus on Beauty**
We believe technology should be invisible. You only need to focus on collecting and cherishing beautiful memories—leave the rest to us.

## 🚀 Experience Now

### 🌐 Online Access
[Click here to start your starry sky journey](https://starry-sky-box.vercel.app)

### 🔑 How to Start
1. Open the webpage and you'll see a beautiful starry sky
2. Click the stars on the page to explore public beautiful memories
3. If you have an exclusive password, enter it to access your private starry sky
4. Enjoy this warm collection of memories that belongs exclusively to you

## 💻 Technical Implementation (Developer Zone)

If you're a developer who wants to understand the technical implementation of this project:

### 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel CDN    │    │  Supabase DB    │    │   IPFS/Pinata   │
│ (Static Assets) │    │  (User Data)     │    │  (NFT Images)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                     Vercel Edge Functions                        │
│                    (Node.js + Express)                           │
└──────────────────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Frontend App (SPA)                            │
│                 (Vanilla JS + CSS3)                              │
└──────────────────────────────────────────────────────────────────┘
```

### 🛠️ Core Technology Stack

#### **Backend Architecture**
- **Server**: Node.js + Express.js
- **Database**: Supabase PostgreSQL (Cloud Database)
- **Authentication**: bcrypt password encryption + express-session management
- **Security**: helmet, rate-limit, CORS cross-origin control
- **Deployment**: Vercel Serverless Functions

#### **Frontend Technology**
- **Core**: Vanilla JavaScript (framework-free, lightweight)
- **Styling**: CSS3 + CSS Variables (modern layout)
- **Animation**: CSS keyframes + requestAnimationFrame (smooth effects)
- **Responsive**: Flexbox/Grid + Media Queries (all-device adaptation)

#### **Data Storage**
- **User Data**: PostgreSQL relational database
- **Media Files**: IPFS + Pinata Gateway (decentralized storage)
- **Cache Optimization**: Vercel CDN global acceleration

#### **Core Database Tables**
- `stars` - Star content main table (public/private content)
- `star_styles` - Star display styles (position, color, size)
- `project_settings` - Project configuration (passwords, themes, etc.)
- `content_history` - Access records (audit logs)

### 🔒 Security Design

#### **Authentication Security**
- Password bcrypt hash storage (salt protection)
- Server-side session state verification
- Password attempt rate limiting (5 times/15 minutes)
- HTTPS forced encrypted transmission

#### **Data Protection**
- SQL parameterized queries (injection prevention)
- XSS output encoding (script attack prevention)
- CSRF token protection
- Environment variable isolation of sensitive information

### 🚀 Performance Optimization

#### **Frontend Optimization**
- Image lazy loading (Intersection Observer)
- Smart animation frame rate control (60fps limiting)
- Static resource CDN caching
- On-demand loading of private content

#### **Backend Optimization**
- Database connection pool management
- Query performance monitoring
- Error fallback mechanism (backup static content)
- Structured logging

### 🚀 Local Development
```bash
# Clone the project
git clone https://github.com/yourusername/StarrySkyBox.git
cd StarrySkyBox

# Install dependencies
npm install

# Configure environment variables
cp env.example .env
# Edit .env file with your configuration

# Start the service
npm start
```

For detailed deployment documentation, see [Deployment Guide](../deploy-config.md)

## 🌍 Project Vision and Future

### Current Version Features
- ✅ Beautiful private starry sky interface
- ✅ Password-protected privacy space
- ✅ Image and text content display
- ✅ NFT digital collectibles support
- ✅ Cloud secure storage

### Future Development Directions
- 🎨 **Creator Economy**: Enable girls' artworks to generate economic value at appropriate times
- 🔐 **Complete Autonomy**: Transfer complete control of digital assets to users at appropriate moments
- 🌐 **Community Features**: Safe, supervised communication spaces
- 📱 **Mobile Optimization**: Better mobile user experience

## ❤️ This is More Than Just Technology

The core of **The Starry Sky Box** is not code, but the heartfelt intention to protect beautiful memories. We believe:

- 💝 Every sincere emotion deserves to be cherished
- 🌟 Every girl should have her own starry sky
- 🚀 The highest goal of technology is to make people happier
- 🌈 The best products are those that make you forget technology exists

## 🤝 Join the Project

If you also believe in this vision, welcome to join us:

### 🎨 **Non-Technical Contributions**
- 💌 Share your stories and suggestions
- 🎭 Participate in interface design and user experience improvement
- 📝 Help improve documentation and instructions
- 🌟 Recommend this project to friends

### 💻 **Technical Contributions**
- 🐛 Report issues and suggest improvements
- 🔧 Submit code optimizations
- 🛡️ Security audits and testing
- 📦 Feature development and extensions

### 📧 Contact Us
- Submit [Issues](https://github.com/yourusername/StarrySkyBox/issues)
- Create [Pull Requests](https://github.com/yourusername/StarrySkyBox/pulls)

## 🏆 Acknowledgments

Special thanks to all friends who have contributed to this project, and to everyone who believes in beauty and spreads warmth.

---

<div align="center">

**Current Version:** v2.0 - Production Ready  
**Last Updated:** 2025-07-11

> 💝 May every star shine brightly, may every memory be treated with tenderness.  
> This is not just a project, but our small contribution to a beautiful world.

**Made with ❤️ for preserving beautiful memories**

---

*"In this fast-paced world, we choose to leave a piece of sky for slowed-down beauty."*

</div> 