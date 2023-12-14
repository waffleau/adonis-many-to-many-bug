import { DateTime } from "luxon";

import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";

import Role from "App/Models/Role";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Role, {
    pivotTable: "user_roles",
    onQuery(query) {
      query.whereNull("deletedAt");
    },
  })
  public roles: ManyToMany<typeof Role>;
}
