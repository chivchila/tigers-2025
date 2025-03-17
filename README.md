# tigers-2025
This project consists of a backend server and a frontend server. Below are the steps to set up and run both the backend and frontend servers.

## Backend Server
The backend server is responsible for handling requests related to the data and business logic

Steps to run the backend server:
1. Navigate to the backend directory:

    `cd path_to_your_cloned_directory`

2. Install dependencies

    `yarn install`

3. Start the server: Once the dependencies are installed, start the backend server:

    `yarn start`

4. Server running on localhost: The backend server will be running at http://localhost:3000 by default.

5. Test the backend: After starting the server, you can test it by making a request to the following endpoint:

http://localhost:3000/comms/your-next-delivery/ff535484-6880-4653-b06e-89983ecf4ed5


6. To run backend tests run

    `yarn test`

## Frontend Server
The frontend server is responsible for rendering the user interface and interacting with the backend

Steps to run the frontend server:
1. Navigate to the frontend directory:

    `cd path_to_your_cloned_directory/frontend`


2. Install dependencies

    `yarn install`

3. Start the frontend server: Once the dependencies are installed, start the frontend server:

    `yarn start`

4. Test the frontend: After starting the frontend, you can test it by visiting the following URL:

`http://localhost:3001/next-delivery/ff535484-6880-4653-b06e-89983ecf4ed5`

This will show the user interface for the next delivery information.

