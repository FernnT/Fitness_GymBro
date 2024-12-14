
## FRONTEND
## TECH STACK## TECH STACK
- **Node.js**
- **JavaScript**


#SETUP YOURSELF
download the repo
```
cd ~/web_gymBro_frontEnd
npm install
npm run dev
```
#HOW IT WAS CREATED
```
npm create vite@latest my-app
cd Fitness_GymBro
npm install react-router-dom
npm install axios
npm install
npm run dev
```
## BACKEND
## TECH STACK
- **Node.js**
- **TypeScript**
- **Express.js**
- **PostgreSQ**
- **Drizzle ORM**
- **AI (for workout generation)not yet implemented**

## HOW TO SETUP
1. Download and install Postgresql
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
2. create a database in PgAdmin
3. create a .env file in the backend folder 
```bash
DATABASE_URL= "postgresql://postgres:[password]@localhost:5432/[dbname]" //remove and replace the []
JWT_SECRET = 'your secret'
```
4. In you code editor cd backend and type
```bash
cd backend
npm i
npx drizzle-kit push
npm run dev
```
## AFTER TEST REGISTER
```bash
POST
http://localhost:3000/auth/register
{
 "username":"guyNum20",
    "email":"imguy20@email.com",
    "password":"december",
    "age":"24",
    "gender":"Male",
    "height":"5.10",
    "weight":"60"
}
```

## Run the exercises seeder
```bash
npm run drizzle:seed
```

### API Documentation
https://documenter.getpostman.com/view/40110318/2sAYBbeowV
