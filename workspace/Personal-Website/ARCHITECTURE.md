# Personal Website Architecture

## Overview

This document provides a high-level overview of the architecture of the Personal Website application. The application is divided into several key components, each with a specific role in the application.

## Components

### 1. Home Component

The Home component serves as the landing page of the application. It provides a brief introduction about the user and links to other sections of the website.

### 2. About Component

The About component provides detailed information about the user. This includes their skills, experiences, and a downloadable resume.

### 3. Portfolio Component

The Portfolio component showcases the user's projects. Each project is represented as a card that includes a brief description, technologies used, and a link to the live project or codebase.

### 4. Contact Component

The Contact component provides a form for visitors to send a message to the user. It also includes links to the user's social media profiles.

## Dependencies

The application has several dependencies:

- React: Used to build the user interface of the application.
- React Router: Used for routing within the application.
- Axios: Used for making HTTP requests.
- Bootstrap: Used for styling the application.

## Interaction

The components interact with each other through the App component, which serves as the root component of the application. The App component uses React Router to render the appropriate component based on the current path.

## Diagram

```
App
|
|-- Home
|
|-- About
|
|-- Portfolio
|
|-- Contact
```

For more detailed information about each component, please refer to the comments in the respective files.

## Conclusion

This document provides a high-level overview of the architecture of the Personal Website application. For more detailed information, please refer to the comments in the respective files.