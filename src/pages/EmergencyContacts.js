import React, { useState, useEffect, useRef } from "react";

// Default contacts
const defaultContacts = [
  {
    name: "National Emergency Number",
    description: "General emergency support (police, ambulance, fire)",
    phone: "112",
    icon: "🚨"
  },
  {
    name: "Suicide Prevention Lifeline (US)",
    description: "24/7 free and confidential support",
    phone: "1-800-273-8255",
    icon: "💚"
  },
  {
    name: "National Domestic Violence Hotline (US)",
    description: "Support for domestic violence survivors",
    phone: "1-800-799-7233",
    icon: "📞"
  },
  {
    name: "Poison Control (US)",
    description: "For poison emergencies",
    phone: "1-800-222-1222",
    icon: "☣️"
  },
  {
    name: "Crisis Text Line (US)",
    description: "Text HOME to 741741 for free crisis support",
    phone: "741741",
    icon: "📱"
  },
  {
    name: "Family Contact - Mom",
    description: "Primary family member",
    phone: "+1-555-123-4567",
    icon: "👩"
  },
  {
    name: "Family Doctor",
    description: "Dr. Smith, for medical emergencies",
    phone: "+1-555-987-6543",
    icon: "👨‍⚕️"
  }
];

const STORAGE_KEY = "emergencyContacts";

// Phone validation: Accepts +, numbers, spaces, dashes, parentheses, min 7 digits
function validatePhone(phone) {
  return /^(\+)?(\d[\d\-()\s]{6,})$/.test(phone.trim());
}

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState(defaultContacts);
  const [showDrawer, setShowDrawer] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", phone: "", icon: "📞" });
  const [showToast, setShowToast] = useState(null);
  const [formError, setFormError] = useState({});

  // Accessibility: focus trap and initial focus
  const drawerRef = useRef(null);
  const firstInputRef = useRef(null);
  const addContactBtnRef = useRef(null);

  // Load contacts from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setContacts(JSON.parse(saved));
    }
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  // Focus the first input when drawer opens
  useEffect(() => {
    if (showDrawer) {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [showDrawer]);

  // Keyboard: Escape closes drawer, focus trap within drawer
  useEffect(() => {
    if (!showDrawer) return;
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setShowDrawer(false);
        setFormError({});
        addContactBtnRef.current?.focus();
      }
      // Focus trap
      if (e.key === "Tab" && drawerRef.current) {
        const focusableEls = drawerRef.current.querySelectorAll(
          'input, button, [tabindex]:not([tabindex="-1"])'
        );
        const focusable = Array.from(focusableEls).filter(
          el => !el.disabled && el.getAttribute("aria-hidden") !== "true"
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showDrawer]);

  const handleAdd = (e) => {
    e.preventDefault();
    let errors = {};
    if (!form.name.trim()) errors.name = "Name required";
    if (!form.phone.trim()) errors.phone = "Phone required";
    else if (!validatePhone(form.phone)) errors.phone = "Invalid phone number";
    if (contacts.some(
      c => c.name.toLowerCase() === form.name.trim().toLowerCase() ||
           c.phone.replace(/\D/g, "") === form.phone.replace(/\D/g, "")
    )) {
      errors.duplicate = "Contact with this name or phone already exists";
    }
    setFormError(errors);
    if (Object.keys(errors).length) return;

    setContacts([...contacts, { ...form }]);
    setForm({ name: "", description: "", phone: "", icon: "📞" });
    setShowDrawer(false);
    setShowToast({type: "success", message: "Contact added!"});
    setFormError({});
  };

  const handleRemove = (idx) => {
    if (window.confirm("Remove this contact?")) {
      setContacts(contacts.filter((_, i) => i !== idx));
      setShowToast({type: "success", message: "Contact removed."});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Toast auto-hide
  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => setShowToast(null), 2500);
      return () => clearTimeout(timeout);
    }
  }, [showToast]);

  return (
    <div className="max-w-xl mx-auto px-2 sm:px-6 py-10 relative">
      {/* Toast Notification */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-8 left-1/2 z-50 -translate-x-1/2 px-4 py-2 rounded shadow-lg transition-all ${
            showToast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {showToast.message}
        </div>
      )}
      <h1 className="text-3xl font-extrabold mb-4 text-center">Emergency Contacts</h1>
      <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
        Quickly reach out to someone you trust or get professional help.
      </p>
      {/* Add Contact Button */}
      <div className="flex justify-end mb-6">
        <button
          ref={addContactBtnRef}
          onClick={() => { setShowDrawer(true); setFormError({}); }}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition"
          aria-haspopup="dialog"
          aria-controls="drawer"
          aria-expanded={showDrawer}
        >
          + Add New Contact
        </button>
      </div>
      {/* Slide-in Drawer for Add Contact */}
      <div
        id="drawer"
        ref={drawerRef}
        className={`fixed top-0 right-0 z-40 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ${
          showDrawer ? "translate-x-0" : "translate-x-full"
        }`}
        style={{boxShadow: showDrawer ? "rgba(0,0,0,0.3) 0 0 0 100vw" : ""}}
        aria-modal="true"
        role="dialog"
        aria-labelledby="drawerTitle"
        aria-hidden={!showDrawer}
        tabIndex={-1}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 id="drawerTitle" className="text-xl font-semibold">Add New Contact</h2>
            <button
              onClick={() => { setShowDrawer(false); setFormError({}); addContactBtnRef.current?.focus(); }}
              aria-label="Close"
              className="p-2 -mr-2 text-gray-500 hover:text-red-500 focus:outline-none"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {/* Error messages */}
          {formError.duplicate && <div className="mb-2 text-red-500 font-semibold" role="alert">{formError.duplicate}</div>}
          <form onSubmit={handleAdd} className="flex flex-col gap-3 flex-1" aria-describedby="drawerTitle">
            <input
              ref={firstInputRef}
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className={`p-2 rounded border dark:bg-gray-800 ${formError.name ? "border-red-500" : ""}`}
              required
              aria-invalid={!!formError.name}
              aria-describedby={formError.name ? "error-name" : undefined}
            />
            {formError.name && <span id="error-name" className="text-red-500 text-sm" role="alert">{formError.name}</span>}
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className={`p-2 rounded border dark:bg-gray-800 ${formError.phone ? "border-red-500" : ""}`}
              required
              aria-invalid={!!formError.phone}
              aria-describedby={formError.phone ? "error-phone" : undefined}
            />
            {formError.phone && <span id="error-phone" className="text-red-500 text-sm" role="alert">{formError.phone}</span>}
            <input
              name="description"
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="p-2 rounded border dark:bg-gray-800"
            />
            <input
              name="icon"
              type="text"
              placeholder="Icon (emoji)"
              value={form.icon}
              onChange={handleChange}
              className="p-2 rounded border dark:bg-gray-800"
              maxLength={2}
            />
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => { setShowDrawer(false); setFormError({}); addContactBtnRef.current?.focus(); }}
                className="flex-1 px-4 py-2 bg-gray-400 text-white rounded shadow hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Overlay when drawer is open */}
      {showDrawer && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-40 transition-opacity"
          onClick={() => { setShowDrawer(false); setFormError({}); addContactBtnRef.current?.focus(); }}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      {/* Contact List */}
      <div className="grid gap-6">
        {contacts.map((contact, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex items-center transition-transform transform hover:scale-[1.025] duration-200"
          >
            <span className="text-4xl mr-4" aria-label={contact.name + " icon"}>{contact.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-lg truncate">{contact.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-300 truncate">{contact.description}</div>
              <a
                href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
                aria-label={`Call ${contact.name} at ${contact.phone}`}
              >
                Call {contact.phone}
              </a>
            </div>
            <button
              className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              onClick={() => handleRemove(idx)}
              aria-label={`Remove ${contact.name}`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}