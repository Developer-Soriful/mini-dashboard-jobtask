import { motion, AnimatePresence } from "framer-motion";
import { User } from "@/types";

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ user, isOpen, onClose }: UserModalProps) {
  return (
    <AnimatePresence>
      {isOpen && user && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">{user.name}</h2>
              <div className="space-y-3">
                <p>
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-semibold">Company:</span>{" "}
                  {user.company.name}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {user.phone}
                </p>
                <p>
                  <span className="font-semibold">Website:</span> {user.website}
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
