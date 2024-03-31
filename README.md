<p align="center">
  <img src="logo.png" width="200px" align="center" alt="Babel Logo" />
  <h1 align="center">Babel - AgiGit </h1>
  <p align="center">
    Vercel: ✨ <a href="https://agi-git.vercel.app/ ">Agi-Git Link</a> ✨
  </p>
   <p align="center">
      AgiGit is the future git🤩.
    </p>
</p>
<br/>

# Content

## Project Vision

The Agigit project primarily has two objectives.

1. The first one is to address the storage issue of large models by implementing model compression and model pruning algorithms, thereby using less space to store large models.

2. The second one is to achieve decentralized storage of git through Move contracts.

## Start Project

### Client

```bash
cd client
npm install
npm run dev
```

### Server

####  Installation Requirements

- Go environment
- PostgreSQL database

#### Startup Method

```bash
go mod tidy
cd relay-service/
go build -o relayer-basic
Enter your database username and password
POSTGRESQL_DATABASE=postgres://name:pass@localhost:5432/dbname ./relayer-basic  
```

### Connect Wallet

If you need to log in, you will need to install the corresponding Chrome extension. We are using the Pontem Wallet here. Please go to the Google Chrome market to install the `Pontem Aptos Wallet`, and then follow the instructions to register.

<div style="text-align:center;">
<img src="https://github.com/XinBaoCode/ImageBed/blob/main/remoteBBY/agigit-1.png?raw=true" alt="firstStep.jpg" width="38%" style="display:inline-block;">
<img src="https://github.com/XinBaoCode/ImageBed/blob/main/remoteBBY/agigit-2.png?raw=true" alt="firstStep.jpg" width="38%" style="display:inline-block;">
</div>

## Technology stack

### Client

* React + Next.js
* Tailwind CSS
* Vercel
* aptos
* NextUI
* monaco-editor

### Server
* GoLang
* aptos
* PostgreSQL 