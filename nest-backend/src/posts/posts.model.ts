import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/users/users.model'

interface IPostCreationAttrs {
	title: string
	content: string
	userID: number
	image: string
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, IPostCreationAttrs> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	title: string

	@Column({ type: DataType.STRING, allowNull: false })
	content: string

	@Column({ type: DataType.STRING })
	image: string
	
	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number

	@BelongsTo(() => User)
	author: User
}
