import { useState } from "react";

interface EmailVerificationOverlayProps {
  email: string;
  onClose: () => void;
}
export const EmailVerificationOverlay = ({
  email,
  onClose,
}: EmailVerificationOverlayProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const openGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-md backdrop-blur-2xl bg-white/50 border border-white/60 rounded-3xl p-8 shadow-2xl transition-all duration-300 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/40"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20 backdrop-blur-md bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Check Your Email
          </h2>
          <p className="text-muted-foreground">
            We &apos ve sent a verification link to
          </p>
          <p className="font-medium text-foreground bg-white/40 backdrop-blur-md border border-white/40 rounded-xl px-4 py-2">
            {email}
          </p>
          <p className="text-sm text-muted-foreground">
            Click the link in the email to verify your account and complete the
            signup process.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <button
            onClick={openGmail}
            className="w-full relative overflow-hidden backdrop-blur-md bg-gradient-to-br from-white/50 to-primary/5 border border-primary/30 rounded-xl py-3 px-6 font-medium text-primary hover:from-white/60 hover:to-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Open Gmail
            </span>
          </button>

          <button
            onClick={handleClose}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            I&aposll check later
          </button>
        </div>

        {/* Info Note */}
        <div className="mt-6 p-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-xl">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Tip:</strong> Check your spam folder if you don&apost see
            the email within a few minutes.
          </p>
        </div>
      </div>
    </div>
  );
};
