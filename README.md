## Project Name: Heart2Help. 

## Hosting link: https://heart2help-zdnx.vercel.app/login.html

## Overview

Our project is a web application designed to bridge the gap between organizations and potential candidates. Utilizing the robust capabilities of Firebase, this application enables organizations to post roles and allows individuals to apply for these roles through tailored forms. The aim is to streamline the process of connecting organizations with suitable candidates in an efficient and user-friendly manner.

## Team Members

- **Temilade Dauda**: Frontend Developer, specializing in React and UI/UX design.
- **Nana Kwame Adjei-Antwi**: Backend Developer, focusing on Firebase and database management.
- **Ezeh Chekwube**: Full Stack Developer, overseeing the integration of frontend and backend components.
- **Micheal Oshogwe**: Project Manager and QA Engineer, ensuring the project meets all requirements and maintains high quality through rigorous testing.

Each member brings their unique expertise to the table, working collaboratively to ensure the smooth functioning and success of the project.

## Technologies Used

- **HTML**: For structuring the web pages.
- **CSS**: For styling the web pages.
- **JavaScript**: For adding interactivity to the web pages.
- **React**: For breaking the app into reusable components, enhancing maintainability and scalability.
- **Tailwind**: A utility-first CSS framework for rapid UI development.
- **Firebase**:
  - **Authentication**: For secure email and password validation.
  - **Firestore Database**: For storing and retrieving data in real-time.
  - **Cloud Messaging**: For implementing a demo chat feature.

## Features

- **Account Creation and Authentication**
  - Users can create accounts using email and password.
  - Secure authentication processes to ensure data privacy and protection.
- **Role-based Privileges**

  - Only registered organizations have the ability to post volunteering opportunities.
  - Role-based access control ensures that users only have access to functionalities relevant to them.

- **Opportunity Sorting**

  - Opportunities are automatically sorted by the time they were posted, allowing users to see the most recent postings first.

- **Notification System**

  - Users receive notifications about new job postings and updates on their application statuses.
  - Ensures users are always informed about important updates.

- **Real-time Database Integration**

  - Leveraging Firebase's Firestore for real-time data management.
  - Ensures that changes made by one user are immediately reflected for all users.

- **Tailored Forms**

  - Different forms are provided for organizations and individual users to cater to their specific needs.
  - Simplifies the process of posting and applying for opportunities.

- **User Testing**
  - Conducting regular user testing sessions to gather feedback.
  - Iteratively improving the application based on user feedback to enhance user experience.

## Development Insights

This project has been a significant learning experience, contributing to both personal and professional growth. Key insights gained include:

- **Firebase Integration**: Deep understanding of Firebase services and how to integrate them into a web application.
- **Component-based Architecture**: Mastery of React's component-based architecture, improving code maintainability and scalability.
- **Real-time Data Handling**: Experience with real-time data updates using Firestore and WebSocket.
- **Collaborative Development**: Skills in managing a collaborative development environment, ensuring smooth team coordination.

## Setup and Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/poshtrigghaz/heart2help.git
   cd heart2help
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Setup Firebase:**

   - Create a Firebase project.
   - Enable Firestore, Authentication, and Cloud Messaging.
   - Add your Firebase configuration to a `.env` file:

4. **Start the development server:**
   ```sh
   npm run dev
   ```

## Usage

### For Organizations:

1. **Register an Account**: Sign up with your organization details.
2. **Post Opportunities**: Create new volunteering opportunities.
3. **Manage Applications**: View and manage applications from candidates.

### For Individuals:

1. **Register an Account**: Sign up with your personal details.
2. **Browse Opportunities**: View available volunteering opportunities.
3. **Apply for Opportunities**: Fill out and submit tailored forms for the opportunities you are interested in.
4. **Receive Notifications**: Stay updated with notifications about new postings and application statuses.

## Contributing

We welcome contributions from the community. If you find any issues or have suggestions for improvements, please create a pull request or submit an issue.

### Steps to Contribute:

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature-branch`)
3. **Commit your changes** (`git commit -am 'Add new feature'`)
4. **Push to the branch** (`git push origin feature-branch`)
5. **Create a Pull Request**

## Contact

For any questions or further information, feel free to contact any of the team members:

- Temilade Dauda: dtemilade@gmail.com
- Nana Kwame Adjei-Antwi: nkadjeiantwi5@gmail.com
- Ezeh Chekwube:
- Micheal Oshogwe: nkadjeiantwi5@gmail.com

We hope you find our project useful and look forward to any feedback or contributions!
