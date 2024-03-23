# Ecommerce frontend website

# First thing first

This project get idea from the [https://github.com/huanghanzhilian/c-shopping](https://github.com/huanghanzhilian/c-shopping)

I want to learn with redux and can understand more about some project about ecommerce or shopping web

# Tech stacks

- Nextjs
- Redux
- Tailwindcss
- UI/UX
- JWT
- Mongodb

# Structure

public -> contain assets file

# Source code style

Link blog for more information: [https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9)

- Using the lint-staged, husky, eslint, prettier, commitlint for code consistency

- When type "git commit -m" => husky continue with "pre commit" action => lint-staged will find all file and run fix code and format with eslint and prettier => husky will reject/accept the commit => husky will run the "commit msg" for check message template with commitlint

| Note: If the .git folder in same with main folder, just "prepare": "husky"

# Note after the project

1. This project give idea of nextjs like a full-stack web development, when next server handle backend api
2. This project using jwt one side, only using access token and store it into cookie for verify user. In case, using jwt access_token and refresh_token, need store refresh-token in to a schema of the modal User.
3. Idea of page loading is good, make user feel better when waiting in nextjs page

# Some improve

1. Typescript => for type check and verify
2. English version, the original is Chinese version
3. Handler error middle ware => Handler error name with 400 for default than 500 occur because server
