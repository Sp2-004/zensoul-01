import React from "react";
import { useTheme } from "../context/ThemeContext"; // Add this import

export default function Settings() {
  const { theme, toggleTheme } = useTheme(); // Use the theme context

  // Account info (stubbed for demo)
  const [displayName, setDisplayName] = React.useState("ZenSoul User");
  const [email] = React.useState("user@email.com");
  const [profilePic, setProfilePic] = React.useState(null);

  // For profile pic preview
  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  // Notifications
  const [affirmationNotif, setAffirmationNotif] = React.useState(() =>
    localStorage.getItem("affirmationNotif") === "true"
  );
  const [journalNotif, setJournalNotif] = React.useState(() =>
    localStorage.getItem("journalNotif") === "true"
  );
  React.useEffect(() => {
    localStorage.setItem("affirmationNotif", affirmationNotif);
  }, [affirmationNotif]);
  React.useEffect(() => {
    localStorage.setItem("journalNotif", journalNotif);
  }, [journalNotif]);

  // Change Password Dialog (simple example)
  const [showPasswordDialog, setShowPasswordDialog] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    alert("Password change functionality coming soon!");
    setShowPasswordDialog(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Export data
  const handleExportData = () => {
    alert("Data export functionality coming soon!");
  };

  // Delete account
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const handleDeleteAccount = () => {
    setShowDeleteDialog(true);
  };
  const confirmDeleteAccount = () => {
    alert("Account deletion functionality coming soon!");
    setShowDeleteDialog(false);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-start pt-16 pb-10">
      <h2 className="text-4xl font-extrabold mb-10 text-violet-700 dark:text-violet-200">Settings</h2>
      <div className="w-full max-w-md space-y-8">
        {/* Account Section */}
        <div className="px-6 py-6 bg-white dark:bg-gray-800 rounded-xl shadow space-y-5">
          <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">Account</h3>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer">
              <img
                src={profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(displayName)}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-violet-400 object-cover"
              />
              <input type="file" accept="image/*" className="hidden" onChange={handlePicChange} />
            </label>
            <div>
              <input
                className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-lg font-semibold text-gray-900 dark:text-gray-100"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
              />
              <div className="text-sm text-gray-500 dark:text-gray-400">Display Name</div>
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-700 dark:text-gray-200">{email}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-200">Password</span>
            <button
              onClick={() => setShowPasswordDialog(true)}
              className="px-4 py-1 rounded bg-violet-100 dark:bg-violet-700 text-violet-900 dark:text-white font-semibold hover:bg-violet-200 dark:hover:bg-violet-600 text-sm"
            >
              Change
            </button>
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <button
              onClick={handleExportData}
              className="px-4 py-2 rounded bg-violet-200 dark:bg-violet-700 text-violet-900 dark:text-white font-semibold hover:bg-violet-300 dark:hover:bg-violet-600"
            >
              Export My Data
            </button>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 rounded bg-red-200 dark:bg-red-700 text-red-900 dark:text-white font-semibold hover:bg-red-300 dark:hover:bg-red-600"
            >
              Delete My Account
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="px-6 py-6 bg-white dark:bg-gray-800 rounded-xl shadow space-y-5">
          <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">Notifications</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-200">Daily Affirmations</span>
            <input
              type="checkbox"
              checked={affirmationNotif}
              onChange={e => setAffirmationNotif(e.target.checked)}
              className="w-6 h-6 accent-violet-600"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-200">Journal Reminders</span>
            <input
              type="checkbox"
              checked={journalNotif}
              onChange={e => setJournalNotif(e.target.checked)}
              className="w-6 h-6 accent-violet-600"
            />
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <span className="text-lg font-medium text-gray-700 dark:text-gray-200">Dark Mode</span>
          <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className={`relative inline-flex items-center h-7 rounded-full w-14 transition bg-gray-300 dark:bg-gray-700 ${
              theme === "dark" ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`inline-block w-7 h-7 transform bg-white dark:bg-gray-900 rounded-full shadow transition`}
            />
            <span className="sr-only">Toggle dark mode</span>
          </button>
        </div>

        {/* About & Support */}
        <div className="px-6 py-4 bg-white dark:bg-gray-800 rounded-xl shadow text-center text-gray-600 dark:text-gray-300">
          <div className="mb-2 font-semibold">ZenSoul v1.0</div>
          <div className="text-sm mb-2">A mindful app for your well-being.</div>
          <a href="mailto:support@zensoul.app" className="text-violet-500 hover:underline">Contact Support</a>
        </div>
      </div>

      {/* Change Password Dialog */}
      {showPasswordDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-80 space-y-4"
            onSubmit={handlePasswordChange}
          >
            <div className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Change Password</div>
            <input
              type="password"
              placeholder="Old Password"
              className="w-full px-3 py-2 rounded border bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-3 py-2 rounded border bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-3 py-2 rounded border bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
                onClick={() => setShowPasswordDialog(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-violet-600 text-white font-semibold hover:bg-violet-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Account Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-80 space-y-4">
            <div className="text-lg font-bold text-red-700 dark:text-red-300 mb-2">Delete Account</div>
            <div className="text-gray-700 dark:text-gray-200">
              Are you sure you want to delete your account? This action cannot be undone.
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700"
                onClick={confirmDeleteAccount}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}