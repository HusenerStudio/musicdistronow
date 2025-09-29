# MusicDistroNow 🎵

A modern, responsive music distribution platform for independent artists to distribute their music across multiple streaming platforms.

## 🚀 Features

- **Artist Dashboard** - Complete management interface for music distribution
- **Music Upload** - Drag & drop file upload with metadata forms
- **Multi-Platform Distribution** - Spotify, Apple Music, YouTube Music, Amazon Music, Deezer, Tidal
- **Analytics** - Real-time streaming data and performance metrics
- **Earnings Tracking** - Revenue monitoring and payout management
- **Responsive Design** - Works perfectly on desktop and mobile devices

## 🌐 Live Demo

Visit the live application: [https://musicdistronow.netlify.app](https://musicdistronow.netlify.app)

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Modern CSS with Glassmorphism effects
- **Deployment**: Netlify
- **Backend**: Node.js, Express.js (for future API integration)
- **Database**: MongoDB (for future data persistence)

## 📦 Project Structure

```
MusicDistroNow/
├── client/                 # Frontend static files
│   ├── index.html         # Main application file
│   └── _redirects         # Netlify routing configuration
├── config/                # Database configuration
├── models/                # Data models
├── routes/                # API routes (future backend)
├── netlify.toml          # Netlify deployment configuration
├── .gitignore            # Git ignore rules
└── package.json          # Project dependencies
```

## 🚀 Deployment to Netlify

### Option 1: Direct Deployment

1. **Fork this repository** to your GitHub account
2. **Connect to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose your forked repository
   - Netlify will automatically detect the configuration from `netlify.toml`
3. **Deploy**: Click "Deploy site"

### Option 2: Manual Deployment

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/music-distro-now.git
   cd music-distro-now
   ```

2. **Deploy the client folder**:
   - Zip the `client` folder contents
   - Go to Netlify dashboard
   - Drag and drop the zip file

### Configuration Files

The project includes optimized configuration for Netlify:

- **`netlify.toml`**: Build settings, redirects, headers, and security configurations
- **`client/_redirects`**: SPA routing rules
- **`.gitignore`**: Excludes node_modules and build artifacts

## 🔧 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/music-distro-now.git
   cd music-distro-now
   ```

2. **Start local server**:
   ```bash
   cd client
   python -m http.server 3000
   ```

3. **Open in browser**: http://localhost:3000

## 📱 Features Overview

### Home Page
- Modern hero section with compelling call-to-actions
- Feature showcase with detailed benefits
- Artist testimonials and success stories
- Statistics and platform information

### Artist Dashboard
- **Overview**: Key statistics and recent activity
- **Upload Music**: File upload with complete metadata forms
- **My Releases**: Track distribution status and performance
- **Analytics**: Detailed streaming and geographic data
- **Earnings**: Revenue tracking and payout management

## 🎨 Design Features

- **Modern UI**: Clean, professional interface
- **Glassmorphism Effects**: Contemporary visual design
- **Responsive Layout**: Mobile-first design approach
- **Green & Black Theme**: Consistent brand colors
- **Smooth Animations**: Enhanced user experience
- **Interactive Elements**: Hover effects and transitions

## 🔒 Security & Performance

- Content Security Policy headers
- XSS protection
- Frame options security
- Optimized caching for static assets
- Compressed and minified resources

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: support@musicdistronow.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/music-distro-now/issues)

---

**Built with ❤️ for independent artists worldwide**