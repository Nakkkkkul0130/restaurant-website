# Deployment Guide

## Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `frontend` folder as root directory
   - Add environment variables:
     - `REACT_APP_API_URL` = your backend URL

3. **Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   ```

## Backend Deployment (Vercel)

1. **Deploy Backend**
   - Create new Vercel project
   - Select the `backend` folder as root directory
   - Add all environment variables from `.env`

2. **Environment Variables**
   ```
   PORT=5001
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_secret
   ADMIN_EMAIL=admin@indianlounge.com
   ADMIN_PASSWORD=your_password
   EMAIL_USER=your_gmail
   EMAIL_PASS=your_app_password
   ```

## Alternative: Render Deployment

### Backend on Render
1. Connect GitHub repository
2. Select `backend` folder
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add environment variables

### Frontend on Render
1. Connect GitHub repository  
2. Select `frontend` folder
3. Build command: `npm run build`
4. Publish directory: `build`
5. Add environment variables

## Local Development

For local development, update frontend `.env`:
```
REACT_APP_API_URL=http://localhost:5001
```

## Production URLs
- Frontend: https://restaurant-frontend-wheat.vercel.app
- Backend: https://restaurant-backend-nine-psi.vercel.app