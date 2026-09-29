# SMTP Server (Express + Nodemailer)

## Structure

- `server/index.js`
- `server/routes/messageRoutes.js`
- `server/controllers/messageController.js`
- `server/.env`

## Setup

1. Create `server/.env` using `server/.env.example`.
2. Start server: `npm run server`

## Endpoint

- `POST /send-message`
- body: `{ "name": "...", "email": "...", "message": "..." }`

## Frontend fetch example (prevent reload + loading state + duplicate prevention)

```js
let isSubmitting = false;

async function submitContactForm(event) {
  event.preventDefault();

  if (isSubmitting) return;
  isSubmitting = true;

  const submitBtn = event.target.querySelector('button[type="submit"]');
  const statusEl = document.querySelector('#contact-status');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  statusEl.textContent = '';

  const formData = new FormData(event.target);

  const payload = {
    name: String(formData.get('name') || '').trim(),
    email: String(formData.get('email') || '').trim().toLowerCase(),
    message: String(formData.get('message') || '').trim()
  };

  try {
    const res = await fetch('http://localhost:5000/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to send message');
    }

    statusEl.textContent = 'Message sent successfully.';
    event.target.reset();
  } catch (err) {
    statusEl.textContent = err.message || 'Could not send message.';
  } finally {
    isSubmitting = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
}
```
