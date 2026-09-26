# PhoneBook - PHP MVC REST API

A PHP MVC application for managing phone book contacts with a custom framework, REST API, and a drag-and-drop file upload frontend.

## Overview

- **Language**: PHP
- **Pattern**: Custom MVC (no framework, no Composer)
- **API**: REST (POST, GET via `.htaccess` URL rewriting)
- **Frontend**: Vanilla HTML/CSS/JS with drag-and-drop file upload
- **Database**: MySQL (`phone_books` database)
- **JWT**: For authentication token generation

## Architecture

```
PhoneBook-php/
├── be/                          # Backend (API + MVC)
│   ├── api/
│   │   ├── .htaccess            # CORS + routing config
│   │   ├── index.php            # API entry point
│   │   └── logs/                # Runtime log storage
│   ├── app/
│   │   ├── bootstrap.php        # Autoloader + class loader
│   │   ├── config/
│   │   │   └── config.php       # DB credentials, JWT key, URL root
│   │   ├── helpers/
│   │   │   └── index.php        # Global helper functions (flash, JWT, mail, logging)
│   │   ├── libraries/
│   │   │   ├── Controller.php   # Base MVC controller
│   │   │   ├── Core.php         # Front controller / router
│   │   │   ├── Database.php     # PDO database wrapper
│   │   │   └── OtherClass/      # Third-party libs (JWT, PHPMailer, etc.)
│   │   └── mvc/
│   │       ├── controllers/
│   │       │   └── PhoneBooks.php   # PhoneBook CRUD controller
│   │       ├── models/
│   │       │   └── PhoneBook.php     # PhoneBook data model
│   │       └── .htaccess            # Route protection
│   ├── http.json              # Sample API response
├── fe/                          # Frontend
│   ├── index.html             # Contact form + list (Pico.css)
│   ├── style.css              # Stylesheet
│   ├── app.js                 # JS (drag-drop, AJAX upload, iframe fallback)
│   └── img/                   # Icons (man.png, woman.png)
├── db/
│   ├── phone_books.sql        # MySQL schema (Navicat export)
│   ├── img.png                # Sample DB diagram
│   └── NavicatModel.ndml2     # Navicat model file
├── phonebook_task.docx        # Task description (Word doc)
├── .gitignore                 # Ignores .idea, *.iml, out, gen
└── README.md                  # This file
```

## Endpoints

### API

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/PhoneBooks/createPBC` | Create a phone book entry |
| GET  | `/` (default) | Health check (returns 'test') |

### Input Validation Rules (`createPBC`)

| Field | Rules |
|-------|-------|
| Gender | required, min:1, max:1, alpha (M/W) |
| Name | required, min:3, max:16, alpha |
| SurName | required, min:3, max:16, alpha |
| Email | required, email |
| Address | required, min:3, max:50 |

## Database Schema

**`phone_books` table:**

| Column | Type | Description |
|--------|------|-------------|
| id | int | Primary key |
| mod_no | int | Optional modifier number |
| Gender | enum('M','W') | M = Male, W = Female |
| Name | varchar(255) | First name |
| SurName | varchar(255) | Last name |
| Email | varchar(255) | Unique email address |
| Phone | varchar(255) | Phone number |
| Address | varchar(255) | Physical address |
| Note | varchar(255) | Optional notes |
| Photo | varchar(255) | Photo filename |
| created_user_id | int | Created by user ID |
| created_date | datetime | Creation timestamp |
| updated_user_id | int | Updated by user ID |
| udpated_date | datetime | Last update timestamp |
| deleted_user_id | int | Deleted by user ID (soft delete) |
| deleted_date | datetime | Deletion timestamp |

**`phone_books_history` table:** Audit trail with `pb_id` foreign key to `phone_books.id`.

## Setup

### 1. Clone and configure

```bash
git clone https://github.com/RasimAghayev/PhoneBook-php.git
cd PhoneBook-php
```

### 2. Database

This app uses MySQL. Import the schema:

```bash
mysql -u root -p
CREATE DATABASE phone_books CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE phone_books;
SOURCE db/phone_books.sql;
```

### 3. Configure

Edit `be/app/config/config.php`:

```php
define("DB_HOST", "localhost");
define("DB_USER", "root");
define("DB_PASS", "root");
define("DB_NAME", "phone_books");
define('URLROOT', 'http://localhost/PhoneBook-php/be/api');
define('JWT_SECCRET_KEY', 'your-secret-key-here');
```

### 4. Run

The backend API runs at `be/api/index.php`. Access via:

```
http://localhost/PhoneBook-php/be/api/PhoneBooks/createPBC
```

The frontend runs at `fe/index.html`:

```
http://localhost/PhoneBook-php/fe/index.html
```

### 5. Dependencies

This project does NOT use Composer. Third-party libraries (JWT, PHPMailer)
are vendored under `be/app/libraries/OtherClass/`.

## Security Notes

- `config.php` contains hardcoded database credentials (`root`/`root`) and a weak JWT secret (`123123123123...`)
- `helpers/index.php` contains hardcoded SMTP email credentials and password placeholders
- CORS is restricted to a single origin in `be/api/.htaccess`
- The `phonebook_task.docx` file is a Word document tracked in the repo — should be moved to documentation/wiki

## Frontend

The contact form (`fe/index.html`) sends POST data to `http://localhost:8080`.
JavaScript (`fe/app.js`) supports both AJAX and iframe fallback upload modes.
Uses Pico.css classes for styling.

## Project Structure

| Directory | Purpose |
|-----------|---------|
| `be/` | Backend API (PHP, custom MVC) |
| `be/api/` | API entry point with CORS config |
| `be/app/` | Core MVC framework |
| `be/app/mvc/` | Controllers and models |
| `fe/` | Frontend UI (HTML, CSS, JS) |
| `db/` | Database schema and docs |

## License

Not specified.
