import { ReactNode } from "react";

export type Column<T> = {
  header: string;
  render: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
};

export function DataTable<T>({ data, columns }: Props<T>) {
  return (
    <div className="bg-card rounded-lg border shadow-md shadow-black/10">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`p-4 text-sm text-muted-foreground ${
                    col.align === "right" ? "text-right" : ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rIdx) => (
              <tr key={rIdx} className="border-b last:border-0">
                {columns.map((col, cIdx) => (
                  <td
                    key={cIdx}
                    className={`p-4 ${
                      col.align === "right" ? "text-right" : ""
                    }`}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
