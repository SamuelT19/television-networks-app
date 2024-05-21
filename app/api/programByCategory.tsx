import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const programsCountByCategory = await prisma.program.groupBy({
      by: ['categoryId'],
      _count: true,
      include: {
        category: true,
      },
    });

    const result = programsCountByCategory.map(item => ({
      categoryId: item.categoryId,
      categoryName: item.category.name,
      count: item._count.id,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching programs count by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};
