"use client";

import { useState, useTransition } from "react";

type ContactFormState = {
  ok?: boolean;
  message?: string;
};

export function ContactForm() {
  const [state, setState] = useState<ContactFormState>({});
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const email = String(payload.email ?? "").trim().toLowerCase();
    const confirmEmail = String(payload.confirmEmail ?? "").trim().toLowerCase();

    if (email !== confirmEmail) {
      setState({
        ok: false,
        message: "Email addresses do not match. Please check and try again."
      });
      return;
    }

    payload.email = email;
    delete payload.confirmEmail;

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as ContactFormState;
    setState(data);
  }

  return (
    <form
      action={(formData) => startTransition(() => handleSubmit(formData))}
      className="glass-card space-y-4 p-4 sm:space-y-5 sm:p-8 md:p-8 lg:p-8"
    >
      <label className="space-y-2 text-sm font-medium text-ink/80">
        Name
        <input
          name="name"
          placeholder="Your full name"
          className="w-full rounded-2xl border border-rosewood/10 bg-sand/70 px-4 py-3 text-base outline-none transition focus:border-terracotta focus:ring-1 focus:ring-terracotta"
          required
        />
      </label>
      <label className="space-y-2 text-sm font-medium text-ink/80">
        Email
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className="w-full rounded-2xl border border-rosewood/10 bg-sand/70 px-4 py-3 text-base outline-none transition focus:border-terracotta focus:ring-1 focus:ring-terracotta"
          required
        />
      </label>
      <label className="space-y-2 text-sm font-medium text-ink/80">
        Confirm Email
        <input
          type="email"
          name="confirmEmail"
          placeholder="Re-enter your email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className="w-full rounded-2xl border border-rosewood/10 bg-sand/70 px-4 py-3 text-base outline-none transition focus:border-terracotta focus:ring-1 focus:ring-terracotta"
          required
        />
      </label>
      <label className="space-y-2 text-sm font-medium text-ink/80">
        Message
        <textarea
          name="message"
          rows={4}
          placeholder="Ask about appointments, bridal styling, or collaboration."
          className="w-full rounded-[1.5rem] border border-rosewood/10 bg-sand/70 px-4 py-3 text-base outline-none transition focus:border-terracotta focus:ring-1 focus:ring-terracotta sm:rows-5 md:rows-6"
          required
        />
      </label>
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-rosewood px-6 py-3 text-sm font-semibold text-white transition hover:bg-terracotta active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 sm:py-4"
        >
          {isPending ? "Sending..." : "Send message"}
        </button>
        {state.message && (
          <p className={`text-xs sm:text-sm text-center sm:text-right ${state.ok ? "text-olive" : "text-terracotta"}`}>
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
