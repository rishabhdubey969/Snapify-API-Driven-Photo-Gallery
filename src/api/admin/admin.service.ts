import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { fn, col, literal } from 'sequelize';

import { Photo } from '../photo/entities/photo.entity';
import { User } from '../user/entities/user.entity';

interface TopUserResult {
  userId: number;
  id: string; // Sequelize returns COUNT as string by default
}

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Photo)
    private photoModel: typeof Photo,

    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async statsService() {
    const [totalPhotos, topUserRaw, maxSize] = await Promise.all([
      this.photoModel.count(),
  
      this.photoModel.findOne({
        attributes: [
          'userId',
          [fn('COUNT', col('id')), 'id'],
        ],
        group: ['userId'],
        order: [[literal('id'), 'DESC']], 
        limit: 1,
        raw: true,
      }) as Promise<TopUserResult | null>,
  
      this.photoModel.max('size'),
    ]);
  
    return {
      totalPhotos,
      maxPhotoSize: maxSize,
      topUser: {
        userId: topUserRaw?.userId || null,
        photoCount: Number(topUserRaw?.id || 0),
      },
    };
    }
}
