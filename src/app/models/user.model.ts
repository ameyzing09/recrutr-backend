import { Model } from 'sequelize/types'
import { AutoIncrement, Table, Column, DataType, PrimaryKey, ForeignKey, BelongsTo, HasMany, BelongsToMany, AllowNull, NotEmpty, Default } from 'sequelize-typescript'

interface UserAttributes {
    id: number;
    username: string;
    password: string;
    email: string;
    created_ts: Date;
    updated_ts: Date;
}

@Table({ tableName: 'users', timestamps: false })
class User extends Model<UserAttributes> implements UserAttributes {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number

    @AllowNull(false)
    @NotEmpty
    @Column(DataType.STRING)
    username!: string

    @AllowNull(false)
    @NotEmpty
    @Column(DataType.STRING)
    password!: string

    @AllowNull(false)
    @NotEmpty
    @Column(DataType.STRING)
    email!: string

    @Default(Date.now())
    @Column(DataType.DATE)
    created_ts!: Date;

    @Column(DataType.DATE)
    updated_ts!: Date;
    // @HasMany(() => CandidateInfo)
    // candidate_info!: CandidateInfo[]
}

export default User;