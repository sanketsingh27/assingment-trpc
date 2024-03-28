import data from "./data.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const seededValue = await prisma.category.createMany({ data });
    console.log({ seededValue });
    await prisma.$disconnect();
  } catch (error) {
    console.log(error);
  }
}

main()
  .catch((e) => console.log(e))
  .finally(() => {
    console.log("bulk insertion completed");
  });
