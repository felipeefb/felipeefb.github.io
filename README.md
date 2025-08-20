# Felipe Eduardo Farias Belo - Portfolio Website

A responsive, bilingual portfolio website hosted on GitHub Pages, showcasing the professional resume and experience of Felipe Eduardo Farias Belo, Senior Software Engineer.

## 🌟 Features

- **Bilingual Support**: Available in Portuguese (PT) and English (EN)
- **Multiple Resume Formats**: Two distinct versions available:
  - **Detailed Portfolio**: Comprehensive experience with detailed job descriptions and project cards
  - **Condensed Resume**: Simplified format with summary experience and highlighted projects
- **Theme Switching**: Automatic dark/light theme detection based on user preferences
- **Responsive Design**: Optimized for desktop and mobile devices using Bootstrap 5.3.1
- **Smart Redirection**: Automatic language and theme detection on first visit
- **Professional Sections**: About, Experience, Education, Projects, Skills, and Contact

## 🚀 Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom styling with theme variants
- **Bootstrap 5.3.1**: Responsive framework and components
- **JavaScript**: Theme and language detection logic
- **GitHub Pages**: Static site hosting

## 📁 Project Structure

```
felipeefb.github.io/
├── index.html              # Main entry point with auto-redirection
├── pt-dark.html            # Portuguese detailed portfolio with dark theme
├── pt-light.html           # Portuguese detailed portfolio with light theme
├── pt-dark3.html           # Portuguese condensed resume with dark theme
├── en-dark.html            # English detailed portfolio with dark theme
├── en-light.html           # English detailed portfolio with light theme
├── en-dark3.html           # English condensed resume with dark theme
├── css/
│   ├── style-dark.css      # Dark theme styles
│   └── style-light.css     # Light theme styles
└── README.md               # Project documentation
```

## 🎯 How It Works

1. **Entry Point**: `index.html` detects the user's browser language and color scheme preference
2. **Smart Routing**: Automatically redirects to the appropriate version:
   - Language: Portuguese (`pt`) or English (`en`)
   - Theme: Dark or Light based on `prefers-color-scheme`
3. **Responsive Layout**: All pages adapt to different screen sizes with mobile-first design

## 🛠️ Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/felipeefb/felipeefb.github.io.git
   ```

2. Open `index.html` in your browser or serve with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. Navigate to `http://localhost:8000` to view the site

## 🌐 Live Website

Visit the live website at: [https://felipeefb.github.io](https://felipeefb.github.io)

## 👨‍💻 About Felipe Eduardo Farias Belo

Senior Software Engineer with 12 years of experience in system development. Since 2013, works at the VIRTUS innovation center (UFCG), leading R&D projects in partnership with companies. Has extensive experience in agile methodologies, full-stack development, and technical team leadership.

### Key Expertise:
- Full-stack web development (Angular, Spring Boot, NestJS)
- Mobile development (Android, VR applications)
- Backend technologies (Java, .NET, Python, TypeScript)
- Embedded systems (Linux, Raspberry Pi)
- Agile methodologies and technical leadership

## 📞 Contact

- **Email**: felipeefb@gmail.com
- **Phone**: +55 83 99980-6074 / +55 83 99650-2223
- **Location**: Campina Grande, Paraíba - Brasil
- **LinkedIn**: [felipe-eduardo-farias-belo](https://www.linkedin.com/in/felipe-eduardo-farias-belo)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
