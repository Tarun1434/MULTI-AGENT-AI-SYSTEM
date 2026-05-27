# Frontend Setup Notes

## Why client folder?
Frontend UI code store cheyadaniki.

## Why Vite?
React project fast ga create & run cheyyadaniki.

### Advantages
- Fast startup
- Fast refresh
- Lightweight
- Modern React setup

## Command Used

Create React project:
npm create vite@latest client
Move into client folder:
cd client
Install dependencies:
npm install

Run frontend:
npm run dev
---
## Technologies Used
- React
- JavaScript
- Vite
---
## Important Files
src/ -> Main React code

App.jsx -> Main UI component

main.jsx -> React starting point

package.json -> Project dependencies & scripts

node_modules -> Installed packages

###npm install -D tailwindcss @tailwindcss/vite  - for tailwind css
vite.config.js automatic ga add avutundi - paste cheyali code 
index.css lo - @import "tailwindcss";cheyali 

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})