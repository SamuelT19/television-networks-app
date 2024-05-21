const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed the Type table
    await prisma.type.createMany({
      data: [
        { name: "Live TV" },
        { name: "Movies" },
        { name: "TV Shows" },
        { name: "Sports" }
      ],
    });

    // Seed the Category table
    await prisma.category.createMany({
      data: [
        { name: "Recommended" },
        { name: "Popular" },
        { name: "Featured" },
        { name: "Favorites" },
        { name: "Watch Later" }
      ],
    });

    console.log('Seed successful');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
