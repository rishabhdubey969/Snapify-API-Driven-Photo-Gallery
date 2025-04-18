import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { PostGresDataBaseConst } from '../../../../database/postgres.const';
import { User } from '../../user/entities/user.entity'

@Table({ tableName: PostGresDataBaseConst.PHOTO })
export class Photo extends Model {

    @Column({ type: DataType.STRING, allowNull: false })
    public fileName: string;
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    public size: number;
  
    @Column({ type: DataType.STRING, allowNull: false })
    public path: string;
  
    @Column({ type: DataType.STRING })
    public caption: string;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    public userId: number;

}
