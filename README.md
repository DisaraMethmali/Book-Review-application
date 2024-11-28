

# Book Review Application

This is a **Book Review App** built using **React**. Users can add reviews, view reviews, and sort them by rating and date.

## Features
- Add book reviews
- View and search reviews by title or author
- Sort reviews by rating and date

## Technologies
- **React**
- **Material-UI**
- **Axios** (for API requests)
- **GitHub** (for version control)

---

## Setup Instructions

Follow these steps to set up and run the **Book Review Application** locally.

### 1. Clone the Repository

If you have the GitHub repository set up, you can clone it to your local machine. Run the following command in your terminal:

```bash
git clone https://github.com/your-username/book-review-app.git
```

Replace `your-username` with your actual GitHub username.

### 2. Navigate to Your Project Directory

After cloning the repository, navigate into the project directory:

```bash
cd book-review-app
```

### 3. Install Dependencies

Ensure you have **Node.js** and **npm** installed on your system. You can check if they are installed by running:

```bash
node -v
npm -v
```

If they are not installed, you can download and install them from [nodejs.org](https://nodejs.org).

Once Node.js and npm are installed, run the following command to install the project dependencies:

```bash
npm install
```

This will install all the dependencies listed in the `package.json` file.



### 4. Run the Development Server

To start the project locally, run the following command:

```bash
npm start
```

This will start the development server and open the application in your default web browser at `http://localhost:3000`.

### 5. Setting Up the Backend 


#### Backend Setup

1. **Navigate to the server directory** 
   ```bash
   cd server
   ```

2. **Install necessary dependencies**:
   ```bash
   npm init -y
   npm install express mongoose cors
   ```


   ```
4.**Rename `.env` File***


Replace the MongoDB URL with your actual database connection string.

```
MONGODB_URI=mongodb://localhost:27017/book-reviews
```

3. **Run the backend** :
   ```bash
   nodemon App.js
   ```

