const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// **1. Barcha foydalanuvchilarni olish**
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// **2. Bitta foydalanuvchini ID bo‘yicha olish**
app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const user = await prisma.users.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// **3. Yangi foydalanuvchi qo‘shish**
app.post("/users", async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await prisma.users.create({
      data: { username, email },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
    console.log(error.message);
  }
});

// **4. Foydalanuvchini yangilash**
app.put("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { username, email } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { username, email },
    });
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});

// **5. Foydalanuvchini o‘chirish**
app.delete("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.users.delete({ where: { id } });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});

// **Serverni ishga tushirish**
app.listen(3000, () => console.log("Server running on port 3000"));
