"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/auth/ToastProvider";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    bankName: string;
    accountType: string;
    accountNumber: string;
    balance: string;
    nickname: string;
  }) => void;
}

const BANK_OPTIONS = [
  "Chase",
  "Bank of America",
  "Wells Fargo",
  "Citibank",
  "Capital One",
  "US Bank",
  "PNC Bank",
  "TD Bank",
  "Truist",
  "Other",
];

const ACCOUNT_TYPES = ["Checking", "Savings", "Investment"];

const AddAccountModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddAccountModalProps) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    bankName: "",
    accountType: "",
    accountNumber: "",
    balance: "",
    nickname: "",
  });

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.bankName ||
      !formData.accountType ||
      !formData.accountNumber ||
      !formData.balance
    ) {
      showToast(
        "Missing Information",
        "Please fill in all required fields",
        "error"
      );
      return;
    }

    // Validate balance is a positive number
    const balanceNum = parseFloat(formData.balance);
    if (isNaN(balanceNum) || balanceNum < 0) {
      showToast(
        "Invalid Balance",
        "Please enter a valid positive amount",
        "error"
      );
      return;
    }

    // Submit data
    onSubmit(formData);

    // Show success toast
    showToast(
      "Account Added!",
      `${formData.accountType} account has been added successfully`,
      "success"
    );

    // Reset form
    setFormData({
      bankName: "",
      accountType: "",
      accountNumber: "",
      balance: "",
      nickname: "",
    });

    // Close modal
    onClose();
  };

  const handleCancel = () => {
    // Reset form on cancel
    setFormData({
      bankName: "",
      accountType: "",
      accountNumber: "",
      balance: "",
      nickname: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - Dark and blurred */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-300">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
            aria-label="Close modal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-600"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-6 pr-8">
            <h2
              id="modal-title"
              className="text-2xl sm:text-3xl font-bold text-gray-900"
            >
              Add New Account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details for your new account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Bank Name */}
            <div>
              <label
                htmlFor="bankName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Bank Name <span className="text-red-500">*</span>
              </label>
              <select
                id="bankName"
                value={formData.bankName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bankName: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                required
              >
                <option value="">Select a bank</option>
                {BANK_OPTIONS.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>

            {/* Account Type */}
            <div>
              <label
                htmlFor="accountType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Account Type <span className="text-red-500">*</span>
              </label>
              <select
                id="accountType"
                value={formData.accountType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    accountType: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                required
              >
                <option value="">Select account type</option>
                {ACCOUNT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Account Number */}
            <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Account Number <span className="text-red-500">*</span>
              </label>
              <input
                id="accountNumber"
                type="text"
                value={formData.accountNumber}
                onChange={(e) => {
                  // Only allow numbers and limit length
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 16) {
                    setFormData((prev) => ({
                      ...prev,
                      accountNumber: value,
                    }));
                  }
                }}
                placeholder="Enter account number"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                maxLength={16}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your full account number (up to 16 digits)
              </p>
            </div>

            {/* Current Balance */}
            <div>
              <label
                htmlFor="balance"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Current Balance <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-700 font-medium">
                  $
                </span>
                <input
                  id="balance"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.balance}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      balance: e.target.value,
                    }))
                  }
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Account Nickname (Optional) */}
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Account Nickname{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                id="nickname"
                type="text"
                value={formData.nickname}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    nickname: e.target.value,
                  }))
                }
                placeholder="e.g., Emergency Fund, Vacation Savings"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                maxLength={50}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-700 font-medium hover:bg-gray-200 hover:border-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
              >
                Add Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default AddAccountModal
