"use client";

import { Trash2, Eye } from "lucide-react";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onDelete?: (id: any) => void;
  onView?: (id: any) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  onDelete,
  onView,
  isLoading = false,
  emptyMessage = "No data available"
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="inline-block animate-spin">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full" />
        </div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  const renderCellValue = (item: T, column: TableColumn<T>) => {
    const value = item[column.key];
    return column.render ? column.render(value, item) : String(value ?? "-");
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="space-y-3 p-3 md:hidden">
        {data.map((item) => (
          <article key={item.id} className="rounded-lg border border-gray-200 p-4">
            <dl className="space-y-3">
              {columns.map((column) => (
                <div key={String(column.key)}>
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    {column.label}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{renderCellValue(item, column)}</dd>
                </div>
              ))}
            </dl>

            {(onDelete || onView) && (
              <div className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-3">
                {onView && (
                  <button
                    onClick={() => onView(item.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                    title="View"
                  >
                    <Eye size={16} className="text-gray-600" />
                    View
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(item.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700 transition hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={16} className="text-red-600" />
                    Delete
                  </button>
                )}
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
                >
                  {column.label}
                </th>
              ))}
              {(onDelete || onView) && (
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="transition hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-6 py-4 text-sm text-gray-900">
                    {renderCellValue(item, column)}
                  </td>
                ))}
                {(onDelete || onView) && (
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      {onView && (
                        <button
                          onClick={() => onView(item.id)}
                          className="rounded-lg p-2 transition hover:bg-gray-200"
                          title="View"
                        >
                          <Eye size={16} className="text-gray-600" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item.id)}
                          className="rounded-lg p-2 transition hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
