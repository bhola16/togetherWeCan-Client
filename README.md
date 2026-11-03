# 🌱 TogetherWeCan

### Small Actions. Greater Impact.

**TogetherWeCan** is a modern, responsive, community-driven social development and volunteering platform built with **Next.js, React, TypeScript, and Tailwind CSS**.

The platform connects people through meaningful community events and social initiatives. Users can explore upcoming and past events, create and manage their own events, join activities organized by others, and track their volunteering participation.

From tree plantation and community cleanup to blood donation, food distribution, and other social welfare activities, TogetherWeCan encourages people to make a difference through small actions.

---

## 🚀 Live Demo

🔗 **Live Website:** [Visit TogetherWeCan](https://togetherwecan-client.vercel.app/)

## 📂 GitHub Repositories

- **Client-side:** [TogetherWeCan Client](https://github.com/bhola16/togetherWeCan-Client)
- **Server-side:** [TogetherWeCan Server](https://github.com/bhola16/togetherWeCan-Server)

---

## ✨ Features

### 1. 🏠 Homepage and Community Overview

The homepage introduces TogetherWeCan and highlights community development activities.

- Attractive hero banner with calls to action.
- Overview of platform features.
- Display of upcoming community events.
- Showcase of past community events.
- Newsletter subscription section.
- Easy navigation to important pages.

### 2. 📅 Explore Upcoming Events

Browse upcoming social development and volunteering events.

- View available upcoming events.
- Explore event titles, categories, dates, and locations.
- View event images and descriptions.
- Search and filter events.
- Open individual event detail pages.

### 3. 🕒 Explore Past Events

Discover previously completed community activities.

- Browse past events.
- View event details and descriptions.
- Explore completed social initiatives.

### 4. ➕ Create Community Events

Authenticated users can organize new social development events.

Event creation includes:

- Event title.
- Event category or type.
- Event date.
- Location or venue.
- Event thumbnail image URL.
- Event description.

Users can create events to organize volunteering activities and encourage community participation.

### 5. 📝 Manage Your Events

Users can manage events they have created.

- View personally created events.
- Edit existing event information.
- Update event details.
- Delete events when necessary.
- Manage community activities from a dedicated page.

### 6. 🤝 Join Community Events

Users can participate in events organized by other community members.

- Explore available events.
- View individual event details.
- Join community activities.
- Check participation information.
- Leave joined events when applicable.

### 7. 📋 Track Joined Events

The joined events page helps users keep track of their volunteering activities.

- View events you have joined.
- Access event information.
- Review participation details.
- Keep track of upcoming activities.

### 8. 📄 Event Details

Each event has an individual details page.

Event information includes:

- Event title and category.
- Event date.
- Event location.
- Event image.
- Event description.
- Organizer information.
- Event participation options.

Dynamic routing allows individual events to be accessed using their unique IDs.

### 9. 🔐 User Authentication

TogetherWeCan uses **Better Auth** for authentication and session management.

Supported authentication methods include:

- Email and password.
- Google sign-in.
- GitHub sign-in.

The application also uses JWT-based authorization for authenticated API requests.

Google and GitHub authentication require valid OAuth credentials and correctly configured callback URLs.

### 10. 📝 User Registration and Login

New users can register and existing users can log in to access personalized platform features.

- Account registration.
- Email and password login.
- Google authentication.
- GitHub authentication.
- Session management.
- Logout functionality.

### 11. 👤 User Profile

TogetherWeCan provides a dedicated profile page for authenticated users.

- View personal profile information.
- Display user name and email.
- Display profile image when available.
- Access account-related information.

### 12. 🔎 Event Search and Filtering

The platform includes event filtering functionality to help users discover relevant activities.

Users can explore events using available filtering options and find community activities based on event information.

### 13. 📬 Newsletter Subscription

The homepage includes a newsletter subscription section.

- Enter an email address.
- Submit a subscription request.
- Receive success or error notifications.
- Stay informed about upcoming events and volunteering opportunities.

The subscription form communicates with the backend API.

### 14. 🧭 Navigation System

Reusable navigation components provide consistent navigation throughout the application.

- Main navigation bar.
- Mobile-friendly navigation.
- Footer section.
- Theme switching control.
- Navigation to events, event management, joined events, profiles, and authentication pages.

### 15. 🌙 Dark and Light Mode

TogetherWeCan supports light and dark themes.

- Switch between light and dark appearance.
- Maintain consistent styling across pages.
- Improve the browsing experience in different lighting conditions.

The theme functionality uses `next-themes`.

### 16. 🔔 Toast Notifications

The application uses **Sonner** for toast notifications.

- Display successful operation messages.
- Show validation feedback.
- Communicate API errors.
- Provide feedback for important user actions.

### 17. ⏳ Loading States and Error Handling

The application includes loading interfaces and error-handling functionality.

- Loading interfaces.
- Retry functionality for supported failed requests.
- Friendly error messages.
- Custom handling for unavailable pages and resources.

### 18. 📱 Responsive Design

Built with Tailwind CSS, TogetherWeCan adapts to different screen sizes.

- **Mobile:** Mobile-friendly navigation and event browsing.
- **Tablet:** Flexible layouts and adaptive spacing.
- **Desktop:** Expanded event cards, navigation, and content sections.

### 19. 🎨 Modern User Interface

The application combines reusable components with Tailwind CSS and shadcn/ui.

It includes:

- Event cards.
- Event detail sections.
- Responsive navigation.
- Dialogs for event management.
- Search and filtering interfaces.
- Interactive buttons and forms.
- Theme switching.
- Toast notifications.
- Loading and error states.

---

## 🛠️ Technologies Used

| Technology     | Purpose                                  |
| -------------- | ---------------------------------------- |
| Next.js 16     | React framework and App Router           |
| React 19       | User interface development               |
| TypeScript     | Type-safe application code               |
| Tailwind CSS 4 | Styling and responsive layouts           |
| shadcn/ui      | Reusable UI components                   |
| Better Auth    | Authentication and session management    |
| MongoDB        | Database and authentication data storage |
| Express.js     | Backend REST API                         |
| Node.js        | Backend runtime                          |
| Sonner         | Toast notifications                      |
| Lucide React   | Icons                                    |
| React Icons    | Additional icons                         |
| next-themes    | Dark and light theme management          |
| date-fns       | Date utilities                           |
| Vercel         | Client-side application deployment       |

---

## 🔗 API Configuration

TogetherWeCan communicates with its Express.js backend through REST API endpoints.

**Local Backend API URL:**

```text
http://localhost:8000
```

The client application uses the following environment variable to configure the backend API URL:

```env
NEXT_PUBLIC_SERVER_API_URL=http://localhost:8000
```

The backend handles event-related operations, including:

- Retrieving upcoming events.
- Retrieving past events.
- Creating events.
- Updating and deleting events.
- Retrieving individual event details.
- Joining and leaving events.
- Managing event participation.
- Newsletter subscriptions.

Authenticated operations use JWT-based authorization.

For more information, visit the [TogetherWeCan Server Repository](https://github.com/bhola16/togetherWeCan-Server).

---

## 📂 Project Structure

The main client-side project structure is organized as follows:

```text
togetherWeCan-Client/
│
├── public/
│   └── assets/
│       ├── TogetherWeCan.png
│       ├── Blood Donation.jpeg
│       ├── Community Cleanup.jpeg
│       ├── Food Distribution.jpeg
│       ├── tree plantation.jpeg
│       ├── volunteer.webp
│       ├── google.png
│       └── github.png
│
├── src/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.ts
│   │   │
│   │   ├── events/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   ├── joined/
│   │   │   │   └── page.tsx
│   │   │   ├── manage/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── pastevents/
│   │   │   └── page.tsx
│   │   │
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── Home/
│   │   │   ├── BannerSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── NextEventsHome.tsx
│   │   │   ├── OurFeatures.tsx
│   │   │   ├── PastEventsHome.tsx
│   │   │   ├── Subscribe.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── ThemeToggle.tsx
│   │   │
│   │   ├── event-details/
│   │   │   ├── EventDetailsContent.tsx
│   │   │   ├── EventDetailsHero.tsx
│   │   │   └── EventDetailsSidebar.tsx
│   │   │
│   │   ├── shared/
│   │   │   ├── EditMyEventDialog.tsx
│   │   │   ├── EventsCard.tsx
│   │   │   ├── EventsFilter.tsx
│   │   │   ├── HomeEventCard.tsx
│   │   │   ├── JoinEventOption.tsx
│   │   │   ├── JoinedCard.tsx
│   │   │   ├── ManageMyEventCard.tsx
│   │   │   ├── MobileNavbar.tsx
│   │   │   ├── PastEventsFilter.tsx
│   │   │   └── RetryButton.tsx
│   │   │
│   │   └── ui/
│   │       └── Reusable shadcn/ui components
│   │
│   ├── hooks/
│   │   ├── use-highlighted-code.ts
│   │   └── use-mobile.ts
│   │
│   ├── lib/
│   │   ├── auth-client.ts
│   │   ├── auth.ts
│   │   ├── getTokenClient.ts
│   │   ├── getTokenServer.ts
│   │   ├── highlighter.tsx
│   │   └── utils.ts
│   │
│   ├── proxy.ts
│   │
│   └── type/
│       └── Type.ts
│
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Installation and Setup

Follow these steps to run TogetherWeCan on your local machine.

### Prerequisites

Before running the project, make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- Git
- MongoDB database or MongoDB connection string.
- Google OAuth credentials if Google sign-in is required.
- GitHub OAuth credentials if GitHub sign-in is required.

The TogetherWeCan server-side application must also be configured and running.

### 1. Clone the Client Repository

Open your terminal and run:

```bash
git clone https://github.com/bhola16/togetherWeCan-Client.git
```

### 2. Navigate to the Project Directory

```bash
cd togetherWeCan-Client
```

### 3. Install Dependencies

Install the required packages:

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and configure the following environment variables:

```env
# Backend API URL
NEXT_PUBLIC_SERVER_API_URL=http://localhost:8000

# Better Auth application URL
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# MongoDB connection
MONGODB_URL=your_mongodb_connection_string

# Google OAuth credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth credentials
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Replace the placeholder values with your actual credentials.

**Important:** Keep your database connection string and OAuth credentials private. Never commit environment files or secrets to GitHub.

The server-side application may require additional environment variables. Configure those separately in the server repository.

### 5. Configure Authentication Providers

To enable Google or GitHub authentication:

1. Create an OAuth application with the relevant provider.
2. Obtain the client ID and client secret.
3. Configure the callback URL according to your Better Auth setup.
4. Add the required credentials to your environment variables.
5. Ensure the application URL matches your local or deployed environment.

OAuth authentication will not work until the provider credentials and callback URLs are configured correctly.

### 6. Start the Backend Server

Clone and configure the server-side project by following its instructions:

[TogetherWeCan Server Repository](https://github.com/bhola16/togetherWeCan-Server)

Make sure the backend API is available at:

```text
http://localhost:8000
```

### 7. Start the Client Development Server

Run:

```bash
npm run dev
```

### 8. Open the Application

Visit the following address in your browser:

```text
http://localhost:3000
```

The TogetherWeCan client application should now be available locally.

---

## 📦 Available Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Starts the Next.js development server |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Starts the production server          |
| `npm run lint`  | Runs ESLint checks                    |

---

## 🔐 Authentication and Data Storage

TogetherWeCan uses **Better Auth** for authentication and session management.

### Authentication Methods

- Email and password.
- Google OAuth.
- GitHub OAuth.

### Authentication Configuration

The authentication setup includes server-side and client-side authentication integration.

MongoDB is used for authentication data storage through the Better Auth MongoDB adapter.

The application also uses JWT support for authenticated communication between the client and server.

---

## 🔄 Application Flow

The main application flow is outlined below:

```text
User opens TogetherWeCan
          |
          v
Homepage displays community initiatives
          |
          v
User explores upcoming and past events
          |
          v
User searches or filters available events
          |
          v
User opens an individual event
          |
          v
User registers or logs in
          |
          v
Authenticated user can create an event
          |
          v
User can manage created events
          |
          v
User can join events organized by others
          |
          v
User tracks joined events
          |
          v
Community participation and social impact
```

---

## 🌙 Theme Management

TogetherWeCan supports light and dark themes using `next-themes`.

The theme provider manages the application theme, while the theme toggle allows users to switch between light and dark appearance.

---

## 🚀 Deployment

The client-side application is deployed on **Vercel**.

**Live Website:** [TogetherWeCan](https://togetherwecan-client.vercel.app/)

To deploy your own instance:

1. Push the client-side project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables in Vercel project settings.
4. Set the production backend API URL.
5. Configure MongoDB and Better Auth environment variables.
6. Configure Google and GitHub OAuth callback URLs if social authentication is enabled.
7. Deploy the application.
8. Verify the homepage, event pages, authentication, and protected features.

**Important:** Environment variables configured locally are not automatically available in Vercel. Configure all required production values separately.

---

## 🐛 Troubleshooting

### 1. Backend API Connection Errors

- Make sure the Express server is running.
- Verify the `NEXT_PUBLIC_SERVER_API_URL` value.
- Check that the backend allows requests from the deployed frontend origin.
- Inspect browser network requests for API errors.

### 2. MongoDB Connection Errors

- Verify that `MONGODB_URL` is correct.
- Confirm that your MongoDB database is accessible.
- Check MongoDB network access and database permissions.

### 3. Google or GitHub Sign-In Is Not Working

- Verify the client ID and client secret.
- Check the OAuth callback URL.
- Confirm that the Better Auth application URL is correct.
- Ensure the production environment variables are configured.

### 4. JWT Authentication Errors

- Confirm that the user session is valid.
- Verify that the client retrieves the authentication token correctly.
- Check the authorization header sent with protected API requests.
- Make sure the backend JWT verification configuration matches the authentication setup.

### 5. Environment Variable Changes Are Not Applied

Restart the development server after editing the `.env.local` file.

```bash
# Stop the running server with Ctrl+C, then restart it
npm run dev
```

---

## 🤝 Contributing

Suggestions and improvements are welcome.

If you want to contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes.
4. Test the application.
5. Submit a pull request.

Before submitting changes, verify that the project builds successfully.

```bash
npm run lint
npm run build
```

---

## 👨‍💻 Author

**Bholanath Bala**

- **GitHub:** [@bhola16](https://github.com/bhola16)
- **Client Repository:** [TogetherWeCan Client](https://github.com/bhola16/togetherWeCan-Client)
- **Server Repository:** [TogetherWeCan Server](https://github.com/bhola16/togetherWeCan-Server)
- **Live Website:** [TogetherWeCan](https://togetherwecan-client.vercel.app/)

Electronics & Communication Engineering Graduate
Khulna University, Bangladesh

---

## 📄 License

This project was created for educational purposes as part of the Programming Hero Web Development course.

---

<p align="center">
  Made with ❤️ for a better community.
  <br />
  <strong>TogetherWeCan — Small Actions. Greater Impact.</strong>
</p>
