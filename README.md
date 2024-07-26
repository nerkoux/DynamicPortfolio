# Dynamic Portfolio 🚀

![Dynamic Portfolio Banner](https://cdn.project.akshatmehta.com/dypo.png)

## 🌟 Overview

Dynamic Portfolio is a powerful, customizable platform that allows developers to create stunning portfolios with ease. Showcase your projects, skills, and experience in a beautiful, responsive design.

## ✨ Features

- 🖼️ Custom profile image upload
- 📊 Dynamic project showcase
- 🛠️ Skill highlighting
- 📚 Education and experience sections
- 🔗 Social media and professional links integration
- 🎨 Customizable design elements

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Cloudflare account (for R2 storage)

### Installation

1. Clone the repository: https://github.com/nerkoux/DynamicPortfolio.git
2. cd dynamic-portfolio
3. Install dependencies
4. Set up environment variables: Create a `.env` file in the root directory and add the following as same as `.env.example`

### Configuration

#### API URL
In `client/components/RegistrationForm.jsx` and `client/components/Portfolio.jsx`, replace the API URL with your deployed API endpoint:

```javascript
const API_URL = 'https://your-api-url.com/api';
```

### Cloudflare R2 Configuration
In server/routes/api.js, update the S3 client configuration:
```javascript
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});
```

## 🤝 Contributing

### Contributions are welcome! Please feel free to submit a Pull Request.


## 📄 License
### This project is licensed under the MIT License - see the LICENSE file for details.


## 🙏 Acknowledgements

React
Express
Cloudflare R2
Vercel

## Credits
Created with ❤️ by Akshat Mehta