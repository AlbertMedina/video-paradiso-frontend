# Video Paradiso

## Description
This project recreates the classic video rental store experience in a digital environment, allowing users to browse, rent, and rate movies. The application supports different user roles, such as regular users and administrators, each with dedicated features to interact with the movie catalog and manage the platform.
The system focuses on providing an intuitive way to explore content while enforcing role-based access and permissions, ensuring a structured and well-managed movie rental experience.
> This repository contains the Frontend. The Backend (API) can be found in this repository: [video-paradiso-backend](https://github.com/AlbertMedina/video-paradiso-backend.git)

## Tech Stack
A modern React application bootstrapped with Vite, focused on providing a clean and responsive UI for browsing, renting, and reviewing movies.
- **UI & Styling:** Built with Material UI for a consistent and responsive design.
- **State Management:** React built-in state and context for managing application data.
- **Data Fetching:** Uses native Fetch API to communicate with the backend API.
- **Authentication:** JWT tokens stored in localStorage and included in API requests via custom hooks.

## Installation
1. Clone repository (https://github.com/AlbertMedina/video-paradiso-frontend.git).
```
git clone https://github.com/AlbertMedina/video-paradiso-frontend.git
```
2. Navigate to project folder.
```
cd videostore
```

## Execution
1. Ensure the backend API is running.
2. Install dependencies:
```
npm install
```
3. Run the development server:
```
npm run dev
```
4. Open your browser and access the application:
```
http://localhost:5173
```
> ⚠ Ensure the backend API is running at `http://localhost:8080` to allow the frontend to function properly.
