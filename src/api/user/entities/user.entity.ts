import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { PostGresDataBaseConst } from '../../../../database/postgres.const';

@Table({ tableName: PostGresDataBaseConst.USER })
export class User extends Model {

    @Column
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
        unique: true,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

}
