"use client";

import { AdminNavbar } from "@/components/admin/navbar";
import { DataTable, TableColumn } from "@/components/admin/data-table";
import { mockBookings, Booking } from "@/lib/admin/mock-data";
import { useState, useEffect } from "react";
import { CheckCircle, Clock } from "lucide-react";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("/api/admin/bookings", {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = (await response.json()) as {
          bookings?: Booking[];
        };

        if (Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await fetch(`/api/admin/bookings/${id}`, {
          method: "DELETE"
        });

        if (response.ok) {
          setBookings(bookings.filter((booking) => booking.id !== id));
        } else {
          alert("Failed to delete booking");
        }
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const handleView = (id: string) => {
    const booking = bookings.find((b) => b.id === id);
    setSelectedBooking(booking || null);
  };

  const columns: TableColumn<Booking>[] = [
    { key: "full_name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "service", label: "Service" },
    {
      key: "preferred_date",
      label: "Date",
      render: (value) => <span className="text-sm">{formatDate(value)}</span>
    }
  ];

  return (
    <>
      <AdminNavbar title="Bookings" />

      <main className="flex-1 overflow-auto">
        <div className="px-4 py-5 sm:px-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Manage customer bookings and appointments
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Bookings Table */}
            <div className="lg:col-span-2">
              <DataTable<Booking>
                columns={columns}
                data={bookings}
                onDelete={handleDelete}
                onView={handleView}
                isLoading={isLoading}
                emptyMessage="No bookings yet"
              />
            </div>

            {/* Booking Details */}
            <div>
              {selectedBooking ? (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-black mb-4">
                    Booking Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">
                        Name
                      </p>
                      <p className="text-gray-900 mt-1">
                        {selectedBooking.full_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">
                        Email
                      </p>
                      <p className="text-gray-900 mt-1">{selectedBooking.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">
                        Phone
                      </p>
                      <p className="text-gray-900 mt-1">{selectedBooking.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">
                        Service
                      </p>
                      <p className="text-gray-900 mt-1">
                        {selectedBooking.service}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">
                        Preferred Date
                      </p>
                      <p className="text-gray-900 mt-1">
                        {formatDate(selectedBooking.preferred_date)}
                      </p>
                    </div>
                    {selectedBooking.notes && (
                      <div>
                        <p className="text-xs text-gray-600 uppercase font-semibold">
                          Notes
                        </p>
                        <p className="text-gray-900 mt-1 text-sm">
                          {selectedBooking.notes}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">
                        Booked On
                      </p>
                      <p className="text-gray-900 mt-1">
                        {formatDateTime(selectedBooking.created_at)}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 mt-6 pt-6 border-t border-gray-200">
                      <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
                        <CheckCircle size={18} />
                        Confirm Booking
                      </button>
                      <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition flex items-center justify-center gap-2">
                        <Clock size={18} />
                        Send Reminder
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                  Select a booking to view details
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
