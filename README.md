# Expense Tracker App

This application has been developed to solve a major problem of budget and expense management which was causing financial stress and anxiety among students. As I examined the survey and research papers and gained knowledge and awareness from user personas, and went through the design thinking process step by step, I proposed a solution to develop an "Expense Tracker App".

## Technologies used:

- Next.js + Typescript
- Tailwindcss
- Shadcn UI
- NextAuth
- Prisma

Libraries

- Zod
- React Hook Form
- Sonner (Toast notification)
- Chart.js + React Charjs 2

## Installing Dependecies

Run this command to install all the required:

```bash
npm install
```

## SetUp Environment Variables

The .env file will contain:

```bash
DATABASE_URL=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

NEXTAUTH_SECRET=""
```

## SetUp Database

You can choose which database you want to use in `prisma/schema.prisma` file and add the specific URL for the database to `.env` file. To push database to production.

```bash
npx primsa db push
```

For generating client code

```bash
npx primsa generate
```

You can run below command to visualize the data stored in your database (optional).

```bash
npx prisma studio
```

**Note:** A `"postinstall": "prisma generate"` script is added to the `package.json` file to generate prisma database duraing deployment.

Now that you have Set up all the pre-requisites, you are good to go. Go ahead and run the application.

```bash
npm run dev
```
