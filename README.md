# The Code Library 

## Features
- **Code Snippet Sharing**: Users can paste code snippets and share them via a unique URL.
- **Syntax Highlighting**: The service supports syntax highlighting for various programming languages.
- **Image Export**: Users can export their code snippets as images, similar to Carbon.
- **Minimalistic Design**: The interface is clean and straightforward, focusing on ease of use and quick sharing.

## Tech Stack
- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe development
- **Vue Router** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Highlight.js** - Syntax highlighting for 15+ languages
- **Phosphor Icons** - Beautiful icon system
- **Oxlint/ESLint** - Code linting and formatting

## API connection

The frontend calls `https://api.apps.skwtr.com/codelibrary/` directly in both development and production. The shared base URL is defined in `src/utils/api.ts`; endpoint paths retain `/api`, so the snippet list URL is `https://api.apps.skwtr.com/codelibrary/api/snippets`.

No Vite proxy, frontend `/api` reverse-proxy route, or `VITE_PROXY_TARGET` variable is needed. Local development also uses this remote API, including write requests.

## Done Features
- [x] **Multi-page Navigation** - Home, Library, About, Detail, and Folio views
- [x] **Syntax Highlighting** - Support for 15+ programming languages (Python, JavaScript, TypeScript, Java, C++, C#, Go, Rust, Ruby, PHP, SQL, Bash, JSON, XML/HTML, CSS)
- [x] **Code Block Component** - Reusable component with line numbers and syntax highlighting
- [x] **Folio View** - Full-screen immersive code viewing experience
- [x] **Code Export** - Download code snippets as files
- [x] **Copy to Clipboard** - One-click copy functionality
- [x] **Share Functionality** - Native share API integration
- [x] **Responsive Design** - Works on desktop and mobile devices
- [x] **Clean UI Components** - Buttons, inputs, headers with consistent design system
- [x] **Vue Router Integration** - Client-side routing with meta tags
- [x] **TypeScript Support** - Full type safety throughout the application
- [x] **Custom Design System** - CSS variables for theming and consistent styling
- [x] **Search and filter functionality** - Intuitive search and filtering options
- [x] **Use actual backend API integration** - Use real API endpoints for data fetching and manipulation

## TODO
- [ ] User authentication screens
- [ ] Protected routes
- [ ] Minimal user profile management
- [ ] Image export functionality (PNG/SVG export like Carbon)
- [ ] Theme toggle (light/dark mode)
- [ ] Snippet creation/upload interface
- [ ] User snippet collections
- [ ] Featured snippets logic
