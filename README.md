# Angular + Flask Vercel App

This is a simple "Hello World" application using an Angular frontend and a Flask backend, designed to be deployed seamlessly on Vercel.

## Prerequisites

- Node.js & npm
- Python (v3.9+)

## Local Development

You will need two terminals to run the frontend and backend simultaneously.

### 1. Start the Flask Backend
Navigate to the project root directory and install the Python dependencies:
```bash
pip install -r api/requirements.txt
```

Run the Flask development server:
```bash
python api/index.py
```
*The backend runs on `http://127.0.0.1:5328`.*

### 2. Start the Angular Frontend
In a separate terminal, from the project root directory, install the npm dependencies (if haven't already):
```bash
npm install
```

Start the Angular development server:
```bash
npm run start
```
*The Angular server will automatically proxy requests starting with `/api` to your Flask backend. Open your browser to `http://localhost:4200` to view the app!*

## Development with Vercel CLI (Recommended)

If you want to run the frontend and backend simultaneously in one command, natively as Vercel does:

1. Install the Vercel CLI globally:
```bash
npm install -g vercel
```
2. Run the development server from the project root:
```bash
vercel dev
```
*(Or simply `npx vercel dev` if you haven't installed it globally).*
3. Follow the prompts to log in and link the project.
4. Vercel will automatically start the Angular frontend server and execute your `/api` serverless Python functions from one unified `localhost:3000` port!

## Deployment to Vercel

There are two main ways to deploy this application to Vercel:

### Method 1: Using the Vercel CLI (Quickest)

You can deploy directly from your terminal using the Vercel CLI:

1. Install the CLI if you haven't already:
```bash
npm install -g vercel
```
2. Run the deployment command from the project root:
```bash
vercel
```
*(Or `npx vercel` if not installed globally).*
3. Follow the prompts to set up and deploy the project.
4. To deploy to production later when you make changes, run:
```bash
vercel --prod
```

### Method 2: Git Integration (Recommended for Production)

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project into the Vercel Dashboard.
3. Vercel's automated system will detect the Angular framework and the `api` folder.
4. Deploy! Vercel will automatically rebuild and deploy anytime you push to your main branch.
