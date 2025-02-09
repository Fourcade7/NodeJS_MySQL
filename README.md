        npm install prisma @prisma/client
        npx prisma init



install


        
        datasource db {
          provider = "postgresql"
          url      = env("DATABASE_URL")
        }



env file


        DATABASE_URL="postgresql://user:password@localhost:5432/databasename"



database model


        model User {
          id        Int      @id @default(autoincrement())
          username  String
          lastname  String
          createdAt DateTime @default(now())
        }


   prisma init



        npx prisma migrate dev --name init
