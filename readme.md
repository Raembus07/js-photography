# **Projects Overview Application**

This is a Next.js-based web application that displays a list of projects dynamically loaded from a `JSON` file. Each project has an overview and a detail page. The styling is managed with modular CSS files.

---

## **Features**

- Overview of projects, displayed dynamically from a JSON file.
- Responsive design with 2 projects per row and adjusts to 1 project per row on smaller screens.
- Detail pages for each project, showing in-depth information and image galleries.
- Clean and maintainable CSS modules.

---

## **Getting Started**

### **1. Clone the repository**

```bash
git clone <repository-url>
cd <project-directory>
```

### **2. Install dependencies**

Ensure you have [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/) installed.

```bash
npm init -y
npm install react react-dom next
npm install -g npm@9.8.1
npm install react-intl
npm install react-hook-form
npm install nodemailer
npm i @vercel/analytics
npm install react-burger-menu
npm install @mui/material @emotion/react @emotion/styled
```

### **3. Run the development server**

```bash
npm run dev
```

Open your browser and go to `http://localhost:3000`. You should see the projects overview page.

---

## **JSON File Structure**

The `projekte.json` file is located in the `/public` folder and contains all project data used for the overview and detail pages.

Example:

```json
[
  {
    "id": 1,
    "title": "Project Title Example",
    "shortDescription": "Short description of the project.",
    "longDescription": "Detailed description of the project, including any specific details.",
    "mainImage": "/images/main-project.jpg",
    "gallery": ["/images/gallery1.jpg", "/images/gallery2.jpg"]
  }
]
```

---

## **Customization**

### **Styling**

The project uses CSS modules for styling. Each component has a dedicated CSS file to ensure maintainability and modularity.

- `/pages/projects/Projects.module.css` — Styles for the project overview page.
- `/pages/projects/Project.module.css` — Styles for the project detail page.

### **Responsive Design**

- Displays **2 projects per row** on larger screens.
- Displays **1 project per row** on smaller screens.

---

## **Scripts**

- `npm run dev` — Starts the development server.
- `npm run build` — Builds the production version of the application.
- `npm run start` — Starts the production server.

---

## **License**

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).