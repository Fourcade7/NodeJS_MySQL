        npm install prisma @prisma/client
        npx prisma init






        
        datasource db {
          provider = "postgresql"
          url      = env("DATABASE_URL")
        }






        DATABASE_URL="postgresql://user:password@localhost:5432/databasename"






        model User {
          id        Int      @id @default(autoincrement())
          username  String
          lastname  String
          createdAt DateTime @default(now())
        }


        


        npx prisma migrate dev --name init
