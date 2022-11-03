import { defaultColumns } from "src/config/column.config";
import { MigrationInterface, QueryRunner, Table, TableColumn, TableIndex } from "typeorm";

export class createRolesPermissionsTable1667430250886 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "modules",
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
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          }),
          new TableColumn({
            name: "description",
            type: "varchar",
            length: "255",
            isNullable: true,
          }),
          ...defaultColumns,
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: "roles",
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
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          }),
          new TableColumn({
            name: "description",
            type: "varchar",
            length: "255",
            isNullable: true,
          }),
          ...defaultColumns,
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: "permissions",
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
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          }),
          new TableColumn({
            name: "description",
            type: "varchar",
            length: "255",
            isNullable: true,
          }),
          new TableColumn({
            name: "module_id",
            type: "int",
            isNullable: false,
          }),
          ...defaultColumns,
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: "user_role",
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
            name: "user_id",
            type: "int",
            isNullable: false,
          }),
          new TableColumn({
            name: "role_id",
            type: "int",
            isNullable: false,
          }),
          ...defaultColumns,
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: "role_permission",
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
            name: "role_id",
            type: "int",
            isNullable: false,
          }),
          new TableColumn({
            name: "permission_id",
            type: "int",
            isNullable: false,
          }),
          ...defaultColumns,
        ],
      }),
    );
    // Index
    await queryRunner.createIndex(
      "permissions",
      new TableIndex({
        name: "idx_permissions_module_id",
        columnNames: ["module_id"],
      }),
    );
    await queryRunner.createIndex(
      "user_role",
      new TableIndex({
        name: "idx_user_role_role_id",
        columnNames: ["role_id"],
      }),
    );
    await queryRunner.createIndex(
      "user_role",
      new TableIndex({
        name: "idx_user_role_user_id",
        columnNames: ["user_id"],
      }),
    );
    await queryRunner.createIndex(
      "role_permission",
      new TableIndex({
        name: "idx_role_permission_role_id",
        columnNames: ["role_id"],
      }),
    );
    await queryRunner.createIndex(
      "role_permission",
      new TableIndex({
        name: "idx_role_permission_permission_id",
        columnNames: ["permission_id"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("modules");
    await queryRunner.dropTable("roles");
    await queryRunner.dropTable("permissions");
    await queryRunner.dropTable("user_role");
    await queryRunner.dropTable("role_permission");
  }
}
