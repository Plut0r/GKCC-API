# Glorious King Christian Centre API

This is a RESTful API for managing church operations. It provides members with endpoints to perform operations such as purchasing eBooks, reading the updated privacy policy, terms and conditions, and accessing the latest church services and audio recordings. Additionally, admin users have the capability to create, read, update, and delete media content, privacy policies, terms and conditions, and eBooks. This ensures efficient and streamlined management of church resources and operations.

## Features

- **User Authentication**: Secure authentication using JWT.
- **Role-Based Access Control**: Differentiates between regular members and admin users.
- **Media Management**: Create, read, update, and delete media content.
- **Privacy Policy/Terms and Conditions**: Create, read, update, and delete content.
- **Ebooks**: Create, read, update, and delete eBooks; mark eBooks as paid, retrieve purchased eBooks for regular members, and get the top 5 purchased eBooks.
- **User Management**: Read all regular members and access user details.
- **Rate Limiting**: Limits to 60 requests per 15 minutes per IP address.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## API Endpoints

### Authentication
- **POST /api/v1/auth/register**: Register a new user.
- **POST /api/v1/auth/login**: Login a user.
- **GET /api/v1/auth/logout**: Logout a user.

### Media
- **GET /api/v1/media?type=livestream**: Retrieve all media of type livestream or audio.
- **POST /api/v1/media**: Create media of type livestream or audio.
- **PATCH /api/v1/media/:id**: Update media by ID.

### Privacy Policy and Terms and Conditions
- **GET /api/v1/policy?type=privacy-policy**: Retrieve privacy policy or terms and conditions. Type is either `privacy-policy` or `terms-conditions`.
- **POST /api/v1/policy**: Create a privacy policy or terms and conditions.
- **PATCH /api/v1/policy/:id**: Update a privacy policy or terms and conditions by ID.

### Users
- **GET /api/v1/users**: Retrieve all registered users.
- **GET /api/v1/users/showMe**: Retrieve current user details.

### Ebooks
- **GET /api/v1/ebooks**: Retrieve all eBooks.
- **POST /api/v1/ebooks**: Create an eBook.
- **PATCH /api/v1/ebooks/:id**: Update an eBook by ID.
- **DELETE /api/v1/ebooks/:id**: Delete an eBook by ID.
- **GET /api/v1/ebooks/:id/mark-paid**: Mark eBook by ID as paid.
- **GET /api/v1/ebooks/purchased**: Retrieve all purchased eBooks per user.
- **GET /api/v1/ebooks/:id**: Retrieve an eBook by ID.

## Documentation

For detailed API documentation, please visit [[postman-documentation](https://documenter.getpostman.com/view/22112903/2sAYBPmaDP)].