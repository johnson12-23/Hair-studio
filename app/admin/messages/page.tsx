"use client";

import { AdminNavbar } from "@/components/admin/navbar";
import { DataTable, TableColumn } from "@/components/admin/data-table";
import { mockMessages, ContactMessage } from "@/lib/admin/mock-data";
import { useState, useEffect } from "react";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch("/api/admin/messages", {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = (await response.json()) as {
          messages?: ContactMessage[];
        };

        if (Array.isArray(data.messages)) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        const response = await fetch(`/api/admin/messages/${id}`, {
          method: "DELETE"
        });

        if (response.ok) {
          setMessages(messages.filter((msg) => msg.id !== id));
        } else {
          alert("Failed to delete message");
        }
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const handleView = (id: string) => {
    const message = messages.find((msg) => msg.id === id);
    setSelectedMessage(message || null);
  };

  const columns: TableColumn<ContactMessage>[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "message",
      label: "Message",
      render: (value) => (
        <span className="text-gray-600 line-clamp-2">{value}</span>
      )
    },
    {
      key: "created_at",
      label: "Date",
      render: (value) => <span className="text-sm text-gray-600">{formatDate(value)}</span>
    }
  ];

  return (
    <>
      <AdminNavbar title="Contact Messages" />

      <main className="flex-1 overflow-auto">
        <div className="px-4 py-5 sm:px-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Manage and respond to customer contact messages
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Messages Table */}
            <div className="lg:col-span-2">
              <DataTable<ContactMessage>
                columns={columns}
                data={messages}
                onDelete={handleDelete}
                onView={handleView}
                isLoading={isLoading}
                emptyMessage="No messages yet"
              />
            </div>

            {/* Message Details */}
            <div>
              {selectedMessage ? (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-black mb-4">
                    Message Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">
                        Name
                      </p>
                      <p className="text-gray-900 mt-1">{selectedMessage.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">
                        Email
                      </p>
                      <p className="text-gray-900 mt-1">{selectedMessage.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">
                        Date
                      </p>
                      <p className="text-gray-900 mt-1">
                        {formatDate(selectedMessage.created_at)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">
                        Message
                      </p>
                      <p className="text-gray-900 mt-1 whitespace-pre-wrap text-sm">
                        {selectedMessage.message}
                      </p>
                    </div>
                    <button className="w-full mt-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition">
                      Send Reply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                  Select a message to view details
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
