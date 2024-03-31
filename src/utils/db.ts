// utils/database.ts
import { db } from "~/server/db";

export const getUserFromDatabase = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        // Add any other user fields you need
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    return null;
  }
};
