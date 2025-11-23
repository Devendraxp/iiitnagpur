# IIIT Nagpur Web Portal

A web application for the Indian Institute of Information Technology, Nagpur (IIITN), built primarily with EJS templates and JavaScript.  
This project provides a server-rendered web interface that can be run locally for development and testing.

> **Tech stack overview**
>
> - **Templating:** EJS (~72%)
> - **Language:** JavaScript (~18%)
> - **Markup & Styles:** HTML, CSS, SCSS

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the repository](#1-clone-the-repository)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Run the application](#3-run-the-application)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

> Adjust this list according to the actual functionality in your project.

- Server-rendered pages using **EJS** templates
- Node.js backend (run with **Bun** or **nodemon**)
- Modular front-end using **HTML**, **CSS**, and **SCSS**
- Easily runnable local development environment

---

## Tech Stack

- **Backend Runtime:** Node.js (with [Bun](https://bun.sh/) support)
- **Templating Engine:** EJS
- **Languages:** JavaScript, HTML, CSS, SCSS
- **Tooling:** Bun, nodemon

---

## Prerequisites

Make sure the following are installed on your system:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Bun](https://bun.sh/) (for `bun install` and `bun run`)
- (Optional) [nodemon](https://github.com/remy/nodemon) for automatic reloads during development

---

## Getting Started

Follow these steps to set up the project on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/Devendraxp/iiitnagpur.git
cd iiitnagpur
```

### 2. Install dependencies

Using **Bun**:

```bash
bun install
```

(If you prefer npm or pnpm, you can adapt this step to your package manager, if supported by the project.)

### 3. Run the application

Using **Bun**:

```bash
bun run app.js
```

Using **nodemon** (Linux/macOS):

```bash
nodemon app.js
```

Using **nodemon** (Windows – via `npx`):

```bash
npx nodemon app.js
```

By default, the application will usually start on a port like `http://localhost:3000/` (or whichever is configured in `app.js`).  
Open your browser and navigate to the configured URL to access the app.

---

## Project Structure

> This is a generic example; adjust it to reflect your actual directory layout.

```text
iiitnagpur/
├─ app.js              # Main application entry point
├─ package.json        # Project metadata and scripts
├─ views/              # EJS templates
├─ public/             # Static assets (CSS, JS, images)
├─ routes/             # Route definitions
├─ controllers/        # Request handlers / business logic
└─ README.md           # Project documentation
```

---

## Scripts

Commonly used commands (based on the instructions above):

- **Install dependencies**

  ```bash
  bun install
  ```

- **Run the app with Bun**

  ```bash
  bun run app.js
  ```

- **Run the app with nodemon (Linux/macOS)**

  ```bash
  nodemon app.js
  ```

- **Run the app with nodemon (Windows)**

  ```bash
  npx nodemon app.js
  ```

If you have `scripts` defined in `package.json` (e.g., `start`, `dev`), you may also use:

```bash
npm run dev
# or
npm start
```

---

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature description"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

Please ensure your code is clear, documented where necessary, and consistent with existing style.

---

## License

This project is currently not explicitly licensed.  
If you plan to use or redistribute this code, please open an issue or contact the maintainer for clarification.

---

## Contact

- **Maintainer:** [Devendraxp](https://github.com/Devendraxp)
- **Repository:** [iiitnagpur](https://github.com/Devendraxp/iiitnagpur)

For questions, suggestions, or bug reports, please open an issue on the repository.
