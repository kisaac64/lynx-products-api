import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface ProductAttributes {
    id: number
    name: string
    price: number
    description?: number
    isDeleted: number
    productViewed: number
    createdDate: Date
    updatedDate: Date
    deletedDate?: Date
}

export type productPk = 'id'
export type productId = Product[productPk]
export type productOptionalAttributes =
    | 'id'
    | 'description'
    | 'isDeleted'
    | 'productViewed'
    | 'deletedDate'
export type productCreationAttributes = Optional<
    ProductAttributes,
    productOptionalAttributes
>

export class Product
    extends Model<ProductAttributes, productCreationAttributes>
    implements ProductAttributes
{
    id!: number
    name!: string
    price!: number
    description?: number
    isDeleted!: number
    productViewed!: number
    createdDate!: Date
    updatedDate!: Date
    deletedDate?: Date

    static initModel(sequelize: Sequelize.Sequelize): typeof Product {
        return Product.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING(150),
                    allowNull: false
                },
                price: {
                    type: DataTypes.FLOAT,
                    allowNull: false
                },
                description: {
                    type: DataTypes.INTEGER,
                    allowNull: true
                },
                isDeleted: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                productViewed: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                createdDate: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                updatedDate: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                deletedDate: {
                    type: DataTypes.DATE,
                    allowNull: true
                }
            },
            {
                sequelize,
                tableName: 'product',
                timestamps: false,
                indexes: [
                    {
                        name: 'PRIMARY',
                        unique: true,
                        using: 'BTREE',
                        fields: [{ name: 'id' }]
                    }
                ]
            }
        )
    }
}
