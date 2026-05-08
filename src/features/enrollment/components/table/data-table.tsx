"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Enrollment } from "@/types/enrollment";

interface EnrollmentDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function EnrollmentDataTable<TData, TValue>({
  columns,
  data,
}: EnrollmentDataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [filterGender, setFilterGender] = useState({
    male: 0,
    female: 0,
  });

  useEffect(() => {
    const enrollments = data as Enrollment[];
    const male = enrollments.filter((r) => r.gender === "Male").length;
    const female = enrollments.filter((r) => r.gender === "Female").length;
    setFilterGender({
      male: male,
      female: female,
    });
  }, [data]);

  const placeholders = [
    "name...",
    "email...",
    "university...",
    "address...",
    "status...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholders.length]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      columnPinning: {
        right: ["actions"],
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase();

      const rowData = row.original as Enrollment;

      const searchableFields = [
        rowData.englishName,
        rowData.khmerName,
        rowData.email,
        rowData.university,
        rowData.dob,
        rowData.gender,
        rowData.currentAddress,
        rowData.isPaid ? "paid" : "unpaid",
      ];

      return searchableFields.some((field) => {
        if (field === null || field === undefined) return false;
        return String(field).toLowerCase().includes(search);
      });
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (pageCount <= maxVisible) {
      for (let i = 0; i < pageCount; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage < 3) {
        pages.push(0, 1, 2, 3);
        pages.push("ellipsis");
        pages.push(pageCount - 1);
      } else if (currentPage > pageCount - 4) {
        pages.push(0);
        pages.push("ellipsis");
        pages.push(pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1);
      } else {
        pages.push(0);
        pages.push("ellipsis");
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push("ellipsis");
        pages.push(pageCount - 1);
      }
    }

    return pages;
  };

  return (
    <div className="w-full h-fit space-y-4">
      <style jsx>{`
        @keyframes slideUpFade {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          50% {
            opacity: 0;
            transform: translateY(-10px);
          }
          51% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-placeholder {
          animation: slideUpFade 0.6s ease-in-out;
        }

        *::-webkit-scrollbar {
          display: none;
        }

        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* ✅ Responsive table text size adjustments */
        @media (max-width: 1024px) {
          table,
          th,
          td {
            font-size: 0.875rem; /* text-sm */
          }
        }

        @media (max-width: 768px) {
          table,
          th,
          td {
            font-size: 0.75rem; /* text-xs */
            padding: 0.4rem 0.6rem !important;
          }

          .text-primary,
          .font-bold {
            font-size: 0.8rem;
          }

          button {
            width: 1.8rem !important;
            height: 1.8rem !important;
            font-size: 0.7rem !important;
          }

          input {
            font-size: 0.8rem !important;
          }
        }

        @media (max-width: 480px) {
          table,
          th,
          td {
            font-size: 0.7rem; /* smaller for phones */
          }
          button {
            width: 1.6rem !important;
            height: 1.6rem !important;
            font-size: 0.65rem !important;
          }
        }
      `}</style>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm w-full">
          <Input
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="w-full"
          />
          {!globalFilter && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground text-sm flex space-x-1">
              <span>Search</span>
              <div className={` ${isAnimating ? "animate-placeholder" : ""}`}>
                {placeholders[placeholderIndex]}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border w-full overflow-hidden">
        <div className="w-full overflow-x-auto overflow-y-auto scrollbar-hide relative">
          <Table
            className="w-full"
            style={{ borderCollapse: "separate", borderSpacing: 0 }}
          >
            <TableHeader className="sticky top-0 z-[1]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const isPinned = header.column.getIsPinned();
                    return (
                      <TableHead
                        key={header.id}
                        className="text-primary dark:text-white font-bold whitespace-nowrap bg-whitesmoke border-b"
                        style={{
                          minWidth: header.column.columnDef.minSize || 100,
                          width: header.column.columnDef.size,
                          maxWidth: header.column.columnDef.maxSize,
                          position: isPinned ? "sticky" : "relative",
                          left:
                            isPinned === "left"
                              ? `${header.column.getStart("left")}px`
                              : undefined,
                          right:
                            isPinned === "right"
                              ? `${header.column.getAfter("right")}px`
                              : undefined,
                          zIndex: isPinned ? 1 : 1,
                          boxShadow:
                            isPinned === "left"
                              ? "2px 0 4px rgba(0,0,0,0.1)"
                              : isPinned === "right"
                              ? "-2px 0 4px rgba(0,0,0,0.1)"
                              : undefined,
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="scrollbar-hide ">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`transition-colors h-fit `}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isPinned = cell.column.getIsPinned();
                      return (
                        <TableCell
                          key={cell.id}
                          className="text-primary dark:text-white py-4 !z-0"
                          style={{
                            minWidth: cell.column.columnDef.minSize || 100,
                            width: cell.column.columnDef.size,
                            maxWidth: cell.column.columnDef.maxSize,
                            position: isPinned ? "sticky" : "relative",
                            left:
                              isPinned === "left"
                                ? `${cell.column.getStart("left")}px`
                                : undefined,
                            right:
                              isPinned === "right"
                                ? `${cell.column.getAfter("right")}px`
                                : undefined,
                            zIndex: isPinned ? 1 : 0,
                            backgroundColor:
                              index % 2 === 0 ? "var(--row-1)" : "var(--row-2)",
                            boxShadow:
                              isPinned === "left"
                                ? "2px 0 4px rgba(0,0,0,0.1)"
                                : isPinned === "right"
                                ? "-2px 0 4px rgba(0,0,0,0.1)"
                                : undefined,
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-400"
                  >
                    No enrollments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-muted-foreground flex-1 text-sm whitespace-nowrap">
          {(() => {
            const rows = table.getFilteredRowModel().rows;
            const currentPage = table.getPaginationRowModel().rows.length;
            const total = rows.length;

            return (
              <>
                {currentPage} row(s) of {total} enrollment(s), Male:{" "}
                {filterGender.male} • Female: {filterGender.female}
              </>
            );
          })()}
        </div>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === "ellipsis") {
              return (
                <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => table.setPageIndex(Number(page))}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {Number(page) + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}