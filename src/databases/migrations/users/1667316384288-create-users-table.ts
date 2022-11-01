import { defaultColumns } from "src/config/column.config";
import { MigrationInterface, QueryRunner, Table, TableColumn, TableIndex } from "typeorm";

export class createUsersTable1667316384288 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          new TableColumn({
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment",
            isGenerated: true,
            isNullable: false,
          }),
          new TableColumn({
            name: "username",
            isUnique: true,
            type: "varchar",
            length: "255",
            isNullable: false,
          }),
          new TableColumn({
            name: "email",
            isUnique: true,
            type: "varchar",
            length: "255",
            isNullable: false,
          }),
          new TableColumn({
            name: "password",
            type: "varchar",
            length: "255",
            isNullable: true,
          }),
          new TableColumn({
            name: "full_name",
            type: "varchar",
            length: "255",
            isNullable: false,
          }),
          new TableColumn({
            name: "status",
            type: "TINYINT",
            length: "1",
            isNullable: false,
            comment: "Trạng thái user: 1-active, 2-disabled, 3-banned",
            default: 2,
          }),
          new TableColumn({
            name: "account_type",
            type: "TINYINT",
            length: "1",
            isNullable: false,
            comment: "Loại tài khoản: 1-authenticated, 2-administrator, 3-super admin",
            default: 1,
          }),
          new TableColumn({
            name: "last_login_at",
            type: "TIMESTAMP",
            isNullable: true,
          }),
          new TableColumn({
            name: "token_expired_at",
            type: "TIMESTAMP",
            isNullable: true,
          }),
          ...defaultColumns,
        ],
      }),
    );

    await queryRunner.createIndex(
      "users",
      new TableIndex({
        name: "idx_users_status",
        columnNames: ["status"],
      }),
    );
    await queryRunner.createIndex(
      "users",
      new TableIndex({
        name: "idx_users_deleted_at",
        columnNames: ["deleted_at"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
