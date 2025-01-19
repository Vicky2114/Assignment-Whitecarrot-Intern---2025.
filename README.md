## Overview
- Hosted Link - https://calendarmakeeasy.netlify.app/
- Git Link -  https://github.com/Vicky2114/Assignment-Whitecarrot-Intern---2025..git

## Overview

This project is designed to manage events through a calendar system using Google Authentication and Google Calendar API. The application provides an interface for creating events, filtering events, and managing user authentication via third-party OAuth services.

## Table of Contents

1. [Installation](https://www.notion.so/Assignment-Whitecarrot-Intern-2025-Calendar-Make-Easy-135b8f7837b880279f8cd93a6cc4bac2?pvs=21)
2. [Features](https://www.notion.so/Assignment-Whitecarrot-Intern-2025-Calendar-Make-Easy-135b8f7837b880279f8cd93a6cc4bac2?pvs=21)
3. [Google OAuth Integration](https://www.notion.so/Assignment-Whitecarrot-Intern-2025-Calendar-Make-Easy-135b8f7837b880279f8cd93a6cc4bac2?pvs=21)
4. [Google Calendar API Integration](https://www.notion.so/Assignment-Whitecarrot-Intern-2025-Calendar-Make-Easy-135b8f7837b880279f8cd93a6cc4bac2?pvs=21)
5. [Setting up Superbase](https://www.notion.so/Assignment-Whitecarrot-Intern-2025-Calendar-Make-Easy-135b8f7837b880279f8cd93a6cc4bac2?pvs=21)
6. [Project Structure](https://www.notion.so/Assignment-Whitecarrot-Intern-2025-Calendar-Make-Easy-135b8f7837b880279f8cd93a6cc4bac2?pvs=21)
7. [Conclusion](https://www.notion.so/Assignment-Whitecarrot-Intern-2025-Calendar-Make-Easy-135b8f7837b880279f8cd93a6cc4bac2?pvs=21)

---

## 1. Installation

### Prerequisites:

Before starting the project, ensure that you have the following installed:

- **Node.js** (version 16 or above)
- **npm** or **yarn**
- **Google Developer Account** (for OAuth and Calendar API)
- **Superbase account** (for backend database management)

### Steps for Installation:

1. **Clone the Repository:**
    
    ```bash
    git clone https://github.com/your-repository-name
    cd your-repository-name
    ```
    
2. **Install Dependencies:**
If you use `npm`:
    
    ```bash
    
    npm instal
    ```
    
    Or if you use `yarn`:
    
    ```bash
    yarn install
    ```
    
3. **Environment Configuration:**
Create a `.env` file in the root of the project and add the following environment variables:
    
    ```bash
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    SUPABASE_URL=your-supabase-url
    SUPABASE_ANON_KEY=your-supabase-anon-key
    ```
    
4. **Run the Application:**
    
    ```bash
    npm start
    ```
    
    This will start the development server at `http://localhost:3000`.
    

---

## 2. Features

### **1. User Authentication with Google OAuth:**

- The app uses **Google OAuth 2.0** to authenticate users via their Google accounts.
- On successful login, users' profile data (like email) is fetched and used in the app.
- This allows the user to sign in and access personalized calendar data securely.

### **2. Event Management:**

- Users can create events, specifying the event name, description, and timing (start and end date).
- Events are saved to both the **local database** and the **Google Calendar** via the API integration.
- The interface provides an intuitive form for creating and managing events.

### **3. Filtering Events:**

- Users can filter events by date range (from date to date).
- The filtering functionality helps in displaying only relevant events on the calendar.

### **4. Calendar Integration:**

- Events created in the app are synchronized with **Google Calendar**.
- Google Calendar API is used to create, update, and retrieve events from the user's calendar.

### **5. Pagination:**

- The application includes a pagination mechanism for event lists to optimize performance when displaying a large number of events.

---

## 3. Google OAuth Integration

### Setting Up Google OAuth for Authentication

1. **Create a Google Developer Account:**
    - Visit the Google Cloud Console.
    - Create a new project.
2. **Enable Google OAuth API:**
    - In your Google Developer Console project, go to **API & Services > Library**.
    - Search for **Google OAuth** and enable the **Google Identity API**.
3. **Create OAuth Credentials:**
    - In the Google Developer Console, navigate to **APIs & Services > Credentials**.
    - Create **OAuth 2.0 Client IDs** under **Create Credentials**.
    - Set the **authorized JavaScript origins** (e.g., `http://localhost:3000` for local development).
    - Set the **authorized redirect URIs** (e.g., `http://localhost:3000/auth/callback`).
4. **Configure Your `.env` File:**
In your `.env` file, you need the following credentials:
    
    ```bash
    GOOGLE_CLIENT_ID=your-client-id
    GOOGLE_CLIENT_SECRET=your-client-secret
    ```
    
5. **OAuth Flow:**
    - On clicking "Login with Google", users are redirected to Google's OAuth consent screen.
    - Upon successful authentication, Google redirects back to the app with a token.
    - The token is used to retrieve user information (email, name) and is stored for session management.

---

## 4. Google Calendar API Integration

### Steps to Set Up Google Calendar API:

1. **Enable Google Calendar API:**
    - In the Google Developer Console, go to **APIs & Services > Library**.
    - Search for **Google Calendar API** and enable it.
2. **Create OAuth Credentials:**
    - Ensure that your OAuth credentials are linked to the **Google Calendar API** by configuring them in the **API Console**.
3. **Install Google API Client:**
Install the required client library to interact with the Google Calendar API:
    
    ```bash
    npm install googleapis
    ```
    
4. **Set Up Google Calendar API Client:**
In your project, create a service file to configure and interact with the Google Calendar API:
    
    ```jsx
    const { google } = require('googleapis');
    const calendar = google.calendar('v3');
    
    // Set up Google Calendar authentication with OAuth credentials
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/auth/callback'
    );
    
    google.options({ auth: oauth2Client });
    
    // Function to create a new calendar event
    const createEvent = (eventData) => {
      return calendar.events.insert({
        calendarId: 'primary',
        resource: eventData,
      });
    };
    
    // Function to list events
    const listEvents = () => {
      return calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });
    };
    
    ```
    
5. **Calendar Event Management:**
    - When users create events, the app sends the event data to the Google Calendar API to be stored in their Google Calendar.
    - Events can be listed, edited, or deleted from the Google Calendar directly through API calls.

---

## 5. Setting up Superbase

### What is Superbase?

Superbase is an open-source Firebase alternative for database management, authentication, and serverless functions. It simplifies integrating backend services like user authentication, storage, and real-time databases.

### Steps to Set Up Superbase:

1. **Create a Superbase Project:**
    - Visit [Superbase.io](https://supabase.io/) and create a new account or log in.
    - Create a new project and set up your database.
2. **Install Superbase Client:**
Install the required package for integrating Superbase:
    
    ```bash
    npm install @supabase/supabase-j
    ```
    
3. **Set Up the Superbase Client:**
In your project, create a file (e.g., `supabaseClient.js`) to initialize the Superbase client:
    
    ```jsx
    
    import { createClient } from '@supabase/supabase-js';
    
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    
    export default supabase;
    
    ```
    
4. **User Authentication with Superbase:**
You can use Superbase for user authentication if required, or combine it with Google OAuth.
5. **Database Integration:**
You can use Superbase as your backend for storing event data, such as event names, descriptions, start and end times. Example:
    
    ```jsx
    
    const { data, error } = await supabase
      .from('events')
      .insert([
        { event_name: 'Sample Event', description: 'Description', start_time: start, end_time: end }
      ]);
    
    ```
    

---

## 6. Project Structure

Here is a typical structure for the project:

```bash

/src
  /pages
    dashboard.js          # Home page with event management and filter
    login.js          # Google login page
  App.js
  index.js

```

---

### 7. Hosting the Application with Netlify CLI

To deploy your app using Netlify CLI, follow these steps:

1. **Install Netlify CLI**:
    
    ```bash
    npm install -g netlify-cli
    
    ```
    
2. **Login to Netlify**:
    
    ```bash
    netlify login
    ```
    
3. **Link Project**:
Navigate to your project directory and link it to your Netlify account:
    
    ```bash
    netlify init
    ```
    
4. **Build the App**:
Build your React app for production:
    
    ```bash
    run build
    ```
    
5. **Deploy the App**:
Deploy the build folder to Netlify:
    
    ```bash
    netlify deploy --prod
    ```
    
6. **Enable Continuous Deployment**:
Link your GitHub/GitLab repository to Netlify for automatic deployments.
7. **Custom Domain (Optional)**:
Set up a custom domain in the Netlify dashboard.
8. **View Live App**:
After deployment, Netlify provides a URL (e.g., `https://your-site-name.netlify.app`) to access your live application.

For more advanced commands, refer to the Netlify CLI documentation.

## 8. Conclusion

This documentation explains how to set up and use the features of this project. It outlines:

- Installation steps
- Features such as Google OAuth, event management, and Google Calendar API integration
- Superbase for backend services and data management

By following the steps and explanations provided, you should be able to successfully set up, run, and integrate the Google Calendar API and OAuth authentication for managing events effectively.
This project is designed to manage events through a calendar system using Google Authentication and Google Calendar API. The application provides an interface for creating events, filtering events, and managing user authentication via third-party OAuth services.

## Table of Contents

1. [Installation](https://www.notion.so/Assignment-Whitecarrot-Intern-2025-Calendar-Make-Easy-135b8f7837b880279f8cd93a6cc4bac2?pvs=21)
2. [Features](https://www.notion.so/Assignment-Whitecarrot-Intern-2025-Calendar-Make-Easy-135b8f7837b880279f8cd93a6cc4bac2?pvs=21)
3. [Google OAuth Integration](https://www.notion.so/Assignment-Whitecarrot-Intern-2025-Calendar-Make-Easy-135b8f7837b880279f8cd93a6cc4bac2?pvs=21)
4. [Google Calendar API Integration](https://www.notion.so/Assignment-Whitecarrot-Intern-2025-Calendar-Make-Easy-135b8f7837b880279f8cd93a6cc4bac2?pvs=21)
5. [Setting up Superbase](https://www.notion.so/Assignment-Whitecarrot-Intern-2025-Calendar-Make-Easy-135b8f7837b880279f8cd93a6cc4bac2?pvs=21)
6. [Project Structure](https://www.notion.so/Assignment-Whitecarrot-Intern-2025-Calendar-Make-Easy-135b8f7837b880279f8cd93a6cc4bac2?pvs=21)
7. [Conclusion](https://www.notion.so/Assignment-Whitecarrot-Intern-2025-Calendar-Make-Easy-135b8f7837b880279f8cd93a6cc4bac2?pvs=21)

---

## 1. Installation

### Prerequisites:

Before starting the project, ensure that you have the following installed:

- **Node.js** (version 16 or above)
- **npm** or **yarn**
- **Google Developer Account** (for OAuth and Calendar API)
- **Superbase account** (for backend database management)

### Steps for Installation:

1. **Clone the Repository:**
    
    ```bash
    git clone https://github.com/your-repository-name
    cd your-repository-name
    ```
    
2. **Install Dependencies:**
If you use `npm`:
    
    ```bash
    
    npm instal
    ```
    
    Or if you use `yarn`:
    
    ```bash
    yarn install
    ```
    
3. **Environment Configuration:**
Create a `.env` file in the root of the project and add the following environment variables:
    
    ```bash
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    SUPABASE_URL=your-supabase-url
    SUPABASE_ANON_KEY=your-supabase-anon-key
    ```
    
4. **Run the Application:**
    
    ```bash
    npm start
    ```
    
    This will start the development server at `http://localhost:3000`.
    

---

## 2. Features

### **1. User Authentication with Google OAuth:**

- The app uses **Google OAuth 2.0** to authenticate users via their Google accounts.
- On successful login, users' profile data (like email) is fetched and used in the app.
- This allows the user to sign in and access personalized calendar data securely.

### **2. Event Management:**

- Users can create events, specifying the event name, description, and timing (start and end date).
- Events are saved to both the **local database** and the **Google Calendar** via the API integration.
- The interface provides an intuitive form for creating and managing events.

### **3. Filtering Events:**

- Users can filter events by date range (from date to date).
- The filtering functionality helps in displaying only relevant events on the calendar.

### **4. Calendar Integration:**

- Events created in the app are synchronized with **Google Calendar**.
- Google Calendar API is used to create, update, and retrieve events from the user's calendar.

### **5. Pagination:**

- The application includes a pagination mechanism for event lists to optimize performance when displaying a large number of events.

---

## 3. Google OAuth Integration

### Setting Up Google OAuth for Authentication

1. **Create a Google Developer Account:**
    - Visit the Google Cloud Console.
    - Create a new project.
2. **Enable Google OAuth API:**
    - In your Google Developer Console project, go to **API & Services > Library**.
    - Search for **Google OAuth** and enable the **Google Identity API**.
3. **Create OAuth Credentials:**
    - In the Google Developer Console, navigate to **APIs & Services > Credentials**.
    - Create **OAuth 2.0 Client IDs** under **Create Credentials**.
    - Set the **authorized JavaScript origins** (e.g., `http://localhost:3000` for local development).
    - Set the **authorized redirect URIs** (e.g., `http://localhost:3000/auth/callback`).
4. **Configure Your `.env` File:**
In your `.env` file, you need the following credentials:
    
    ```bash
    GOOGLE_CLIENT_ID=your-client-id
    GOOGLE_CLIENT_SECRET=your-client-secret
    ```
    
5. **OAuth Flow:**
    - On clicking "Login with Google", users are redirected to Google's OAuth consent screen.
    - Upon successful authentication, Google redirects back to the app with a token.
    - The token is used to retrieve user information (email, name) and is stored for session management.

---

## 4. Google Calendar API Integration

### Steps to Set Up Google Calendar API:

1. **Enable Google Calendar API:**
    - In the Google Developer Console, go to **APIs & Services > Library**.
    - Search for **Google Calendar API** and enable it.
2. **Create OAuth Credentials:**
    - Ensure that your OAuth credentials are linked to the **Google Calendar API** by configuring them in the **API Console**.
3. **Install Google API Client:**
Install the required client library to interact with the Google Calendar API:
    
    ```bash
    npm install googleapis
    ```
    
4. **Set Up Google Calendar API Client:**
In your project, create a service file to configure and interact with the Google Calendar API:
    
    ```jsx
    const { google } = require('googleapis');
    const calendar = google.calendar('v3');
    
    // Set up Google Calendar authentication with OAuth credentials
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/auth/callback'
    );
    
    google.options({ auth: oauth2Client });
    
    // Function to create a new calendar event
    const createEvent = (eventData) => {
      return calendar.events.insert({
        calendarId: 'primary',
        resource: eventData,
      });
    };
    
    // Function to list events
    const listEvents = () => {
      return calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });
    };
    
    ```
    
5. **Calendar Event Management:**
    - When users create events, the app sends the event data to the Google Calendar API to be stored in their Google Calendar.
    - Events can be listed, edited, or deleted from the Google Calendar directly through API calls.

---

## 5. Setting up Superbase

### What is Superbase?

Superbase is an open-source Firebase alternative for database management, authentication, and serverless functions. It simplifies integrating backend services like user authentication, storage, and real-time databases.

### Steps to Set Up Superbase:

1. **Create a Superbase Project:**
    - Visit [Superbase.io](https://supabase.io/) and create a new account or log in.
    - Create a new project and set up your database.
2. **Install Superbase Client:**
Install the required package for integrating Superbase:
    
    ```bash
    npm install @supabase/supabase-j
    ```
    
3. **Set Up the Superbase Client:**
In your project, create a file (e.g., `supabaseClient.js`) to initialize the Superbase client:
    
    ```jsx
    
    import { createClient } from '@supabase/supabase-js';
    
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    
    export default supabase;
    
    ```
    
4. **User Authentication with Superbase:**
You can use Superbase for user authentication if required, or combine it with Google OAuth.
5. **Database Integration:**
You can use Superbase as your backend for storing event data, such as event names, descriptions, start and end times. Example:
    
    ```jsx
    
    const { data, error } = await supabase
      .from('events')
      .insert([
        { event_name: 'Sample Event', description: 'Description', start_time: start, end_time: end }
      ]);
    
    ```
    

---

## 6. Project Structure

Here is a typical structure for the project:

```bash

/src
  /pages
    dashboard.js          # Home page with event management and filter
    login.js          # Google login page
  App.js
  index.js

```

---

### 7. Hosting the Application with Netlify CLI

To deploy your app using Netlify CLI, follow these steps:

1. **Install Netlify CLI**:
    
    ```bash
    npm install -g netlify-cli
    
    ```
    
2. **Login to Netlify**:
    
    ```bash
    netlify login
    ```
    
3. **Link Project**:
Navigate to your project directory and link it to your Netlify account:
    
    ```bash
    netlify init
    ```
    
4. **Build the App**:
Build your React app for production:
    
    ```bash
    run build
    ```
    
5. **Deploy the App**:
Deploy the build folder to Netlify:
    
    ```bash
    netlify deploy --prod
    ```
    
6. **Enable Continuous Deployment**:
Link your GitHub/GitLab repository to Netlify for automatic deployments.
7. **Custom Domain (Optional)**:
Set up a custom domain in the Netlify dashboard.
8. **View Live App**:
After deployment, Netlify provides a URL (e.g., `https://your-site-name.netlify.app`) to access your live application.

For more advanced commands, refer to the Netlify CLI documentation.

## 8. Conclusion

This documentation explains how to set up and use the features of this project. It outlines:

- Installation steps
- Features such as Google OAuth, event management, and Google Calendar API integration
- Superbase for backend services and data management

By following the steps and explanations provided, you should be able to successfully set up, run, and integrate the Google Calendar API and OAuth authentication for managing events effectively.