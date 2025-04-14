/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'skyblue': '#3e8ed0',
      'white': '#FFFFFF',
      'gray': '#808080',
      'lightgray': '#d3d3d3',
      'stone': {
        '300': '#d6d3d1',
        '500': '#78716c'
      },
      'red': {
        '700' : '#b91c1c'
      },
      'roseGreen': '#d9f0ee'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}