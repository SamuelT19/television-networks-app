import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const programsCountByTypeOverTime = await prisma.program.groupBy({
      by: ['typeId', 'createdAt'],
      _count: true,
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        type: true,
      },
    });

    const result = programsCountByTypeOverTime.map(item => ({
      typeId: item.typeId,
      typeName: item.type?.name || '',
      createdAt: item.createdAt,
      count: item._count.id,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching programs count by type over time:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};
