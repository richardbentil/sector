
# Sector app

An app that adds users to a database

## Features

- create user
- update user



## API Reference

#### Get all notes

```https
  POST /api/user/create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id, name, sector, agree` | `object` | **Required**. |

#### Update user

```https
  PUT /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name, sector`      | `object` | **Required**. title and body of note |



## Installation

Install my-project with npm

```bash
  clone project
  cd my-project
  npm install - in project folder
```
    
## Tech Stack

**Client:** React, Bootstrap

**Server:** Node, Express

**Backend Hosting:** Vercel(backend)

**Client Hosting:** Vercel


## Run Locally

Clone the project

```bash
  git clone https://github.com/richardbentil/sector.git
```

Go to the project directory

```bash
  cd sector
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

