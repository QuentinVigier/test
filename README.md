# Task Management Application Test
This README document outlines the process, decisions, and challenges encountered during the development of the Task Management Application test.

## Setup Process
Cloned the repository and ensured the database was running.
Installed packages using yarn install as specified.
Created the database using credentials from the .env file in the backend project.
Ran Prisma migration using the command found in package.json.
Started both frontend and backend applications.

## Implementation Details
Backend
Implemented task creation functionality
Implemented task editing functionality
Utilized Prisma ORM for database operations
Frontend
Implemented task creation and editing interface
Implemented task deletion functionality, connecting to the existing backend endpoint

## Key Decisions and Challenges
ORM Choice: Stuck with Prisma as it was already set up and provides type-safe database queries.
API Design: Ensured RESTful principles were followed for consistency and ease of use.
Working with Backend: Never even heard of this technology before, didnt knew this way of structure in backend
Error Handling: Didnt succed to find a way to handle errors properly, i don't have anymore time to finish this and there is an error in the backend that i cant fix, about JSON response. 
Code Organization: Structured the code to maintain separation of concerns, keeping components, services, and utilities in separate files.


## Breakpoints and Challenges
Database Connection: Initially faced issues connecting to the database, resolved by double-checking the .env file configuration.
Prisma Migration: Encountered a migration error due to existing data, resolved by carefully reviewing and adjusting the migration scripts.
Frontend-Backend Integration: Faced CORS issues initially, resolved by properly configuring CORS settings in the backend.
State Updates: Encountered challenges with real-time updates of the task list after operations, resolved by implementing optimistic updates and proper state management.
Conclusion
This test provided a comprehensive opportunity to work on both frontend and backend aspects of a full-stack application. It highlighted the importance of proper setup, clear API design, and seamless integration between frontend and backend components.
The bonus implementation allowed for creativity and showcased ability to extend the application's functionality beyond the basic requirements.
Overall, this test was an excellent exercise in full-stack development, error handling, and problem-solving in a real-world scenario, wished i had more time to complete this project and learn more about the technologies involved. Didn't seem to have enough time to finish this, but i'm glad i did it.