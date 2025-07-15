# StudentProFile

A React-based CV/Resume template generator that allows students to create professional resumes with multiple template styles and export options.

## Features

- **Multiple CV Templates**: Different professional layouts and styles
- **JSON Data Management**: Save, load, and export resume data in JSON format
- **PDF Export**: Generate high-quality PDF resumes
- **Template Customization**: Various styles and formatting options
- **Real-time Preview**: Live preview while editing

## Tech Stack

- React.js
- CSS3
- JavaScript (ES6+)
- PDF generation library
- JSON data handling

## Project Structure

```
frontend/
├── src/
│   ├── Ui/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   └── utils/
├── App.jsx
├── index.css
├── main.jsx
├── index.html
└── eslint.config.js
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Open browser at `http://localhost:3000`

## Core Functionality

### Data Management
- Save resume data as JSON
- Load existing JSON data
- Export/import functionality

### Template System
- Multiple professional CV templates
- Customizable layouts and styles
- Responsive design

### Export Options
- PDF download
- JSON data export
- Print-friendly formats

## Usage

1. Choose a template style
2. Fill in your information
3. Preview your resume
4. Save data as JSON or export as PDF

## Development

Run in development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## License

MIT License
