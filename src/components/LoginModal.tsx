import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoadingSpinner: React.FC = () => (
  <svg
    className="animate-spin h-5 w-5 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const {
    users,
    newUserEmail,
    setNewUserEmail,
    newUserPassword,
    setNewUserPassword,
    loading,
    error,
    setError,
    setLoggedInUser,
  } = useUser();

  useEffect(() => {
    if (isOpen && !isVisible && !isAnimatingOut) {
      setIsVisible(true);
      setIsAnimatingOut(false);
    } else if (!isOpen && isVisible && !isAnimatingOut) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setIsAnimatingOut(false);
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible, isAnimatingOut]);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
      setIsVisible(false);
      setIsAnimatingOut(false);
      setShowModal(false);
    };
  }, [navigate]);

  const handleCloseClick = () => {
    if (!isLoading && !isAnimatingOut) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsAnimatingOut(false);
        setIsVisible(false);
        onClose();
      }, 300);
    }
  };

  const confirmRedirect = () => {
    setShowModal(false);
    setIsLoading(false);
    handleCloseClick();
    setIsAnimatingOut(true);
    setTimeout(() => {
      navigate("/register");
    }, 100);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const userExists = users.some((user) => user.email === newUserEmail);
    console.log(newUserEmail);
    if (userExists) {
      const user = users.find(
        (user) =>
          user.email === newUserEmail && user.password === newUserPassword
      );

      if (user) {
        console.log("Login successful", user);
        setError("");
        setNewUserEmail("");
        setNewUserPassword("");
        setLoggedInUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoading(false);
        handleCloseClick();
        setTimeout(() => {
            setIsLoading(false);
            setShowModal(false);
            navigate("/");
          }, 100); 
      } else {
        setError("Invalid password");
      }
    } else {
      setError("");
      setShowModal(true);
    }
  };

  if (!isVisible && !isAnimatingOut) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{
        animation: isAnimatingOut ? "fadeOut 0.3s ease" : "fadeIn 0.3s ease",
      }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && !isLoading) handleCloseClick();
      }}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
        style={{
          animation: isAnimatingOut
            ? "slideOut 0.4s ease"
            : "slideIn 0.4s ease",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Login to FleetDatabase
          </h2>
          <button
            onClick={handleCloseClick}
            className={`text-gray-500 hover:text-gray-700 transition-colors duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="button"
            disabled={isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-lg z-10">
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 border-4 border-t-[var(--coreColor)] border-[var(--coreColor)]/30 rounded-full animate-spin mb-3"></div>
              <p className="text-[var(--coreColor)] font-medium">
                Logging in...
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={newUserEmail}
              onChange={(event) => setNewUserEmail(event.target.value)}
              className="w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={newUserPassword}
              onChange={(event) => setNewUserPassword(event.target.value)}
              className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
            <div className="mt-1 text-right">
              <a
                href="#"
                className={`text-sm text-blue-600 hover:text-blue-800 ${
                  isLoading ? "pointer-events-none opacity-50" : ""
                }`}
              >
                Forgot password?
              </a>
            </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <button
              type="submit"
              className={`w-full bg-[var(--coreColor)] text-black py-2 px-4 rounded-md hover:bg-[var(--coreColor2)] transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span>Logging in...</span>
                </>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:text-blue-800">
            Sign up
          </a>
        </div>
      </div>

      {/* Modal for Confirm Redirect */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-xl text-center transform transition-transform"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Email Not Registered
              </h2>
              <p className="text-gray-600 mb-6">
                Would you like to go to the register page?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRedirect}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300"
                >
                  Go to Register
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginModal;
