import { TableColumn, TableColumnOptions } from "typeorm";

export const defaultColumns: TableColumnOptions[] = [
  new TableColumn({
    name: "created_by",
    type: "int",
    isNullable: true,
  }),
  new TableColumn({
    name: "updated_by",
    type: "int",
    isNullable: true,
    comment: "Người sửa cuối",
  }),
  new TableColumn({
    name: "created_at",
    type: "TIMESTAMP",
    isNullable: true,
    default: "now()",
  }),
  new TableColumn({
    name: "updated_at",
    type: "TIMESTAMP",
    isNullable: true,
    default: "now()",
  }),
  new TableColumn({
    name: "deleted_at",
    type: "TIMESTAMP",
    isNullable: true,
  }),
];
