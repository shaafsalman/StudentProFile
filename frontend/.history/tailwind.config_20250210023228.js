/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#5B6E7E', 
          dark: '#2C3E50',    
        },
        card: {
          light: 'rgba(220,220,230,0.3)', // Soft, light gray with high transparency
          dark: 'rgba(63, 73, 86, 0.9)', // Charcoal gray with no blue tint
        },
        accent: '#2096B3',       // Bright but not overwhelming
        accentHover: '#37B5D6',  // Lighter, vibrant variant
        // accentGradient: '#17697F' ,// Very deep, almost black blue-green // Rich, muted blue-gray
        background: {
          light: '#e5e7eb',   
          dark: '#0A0F1C' // A balanced charcoal gray, used in Google's dark themes
        },
        text: {
          light: '#ffffff',    
          dark: '#000000',     
        },
      },
      fontFamily: {
        publica: ['Publica', 'sans-serif'],  
        publicaSans: ['PublicaSans', 'sans-serif'],  
        poppins: ['Poppins', 'sans-serif'],
        centuryGothic: ['Century Gothic', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'], 
        inter: ['Inter', 'sans-serif'],
     
        montserrat: ['Montserrat', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        workSans: ['Work Sans', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        josefinSans: ['Josefin Sans', 'sans-serif'],
        dmSans: ['DM Sans', 'sans-serif'],
        firaSans: ['Fira Sans', 'sans-serif'],
        sourceSans: ['Source Sans Pro', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        cabin: ['Cabin', 'sans-serif'],
        exo: ['Exo', 'sans-serif'],
        heebo: ['Heebo', 'sans-serif'],
        karla: ['Karla', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        overpass: ['Overpass', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        spaceGrotesk: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.2)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.25)',
        // Glassmorphism-inspired shadows
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) skew(6deg)' },
          '50%': { transform: 'translate(10px, -10px) skew(-6deg)' },
        }
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
    },
  },
  plugins: [],
};