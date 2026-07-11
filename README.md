# First Node.js App

This is a simple Express.js file upload and download application using Cloudinary and MongoDB.

## Features

- File upload via drag-and-drop or file picker
- Cloudinary storage for uploads
- Download links with 48-hour expiration logic
- MongoDB storage for uploaded file metadata
- EJS views for upload and download pages

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with values for:

```env
URL=<your-mongodb-connection-string>
CLOUD_NAME=<your-cloudinary-cloud-name>
API_KEY=<your-cloudinary-api-key>
API_SECRET=<your-cloudinary-api-secret>
```

3. Start the app:

```bash
npm start
```

## Project Structure

- `index.js` - application entry point
- `route/route.js` - Express routes
- `controlles/controlles.js` - upload/download controller logic
- `models/model.js` - Mongoose file metadata schema
- `views/` - EJS templates for pages
- `publics/` - static frontend assets

## Notes

- Ensure MongoDB is running and the connection string is valid.
- Cloudinary credentials are required for file uploads.
- Uploaded file links currently expire after 48 hours via MongoDB TTL index.
