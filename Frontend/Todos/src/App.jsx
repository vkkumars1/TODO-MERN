import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ToDo from "./components/ToDo";
import Popup from "./components/Popup";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import axios from "axios";
import { baseURL } from "./utils/constant";
import { LogOut } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import Display from "./components/Display";
import taskSound from './assets/task-sound.mp3'; // Add your audio file here

const CustomButton = ({ onClick, children, className, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </motion.button>
);

const CustomAlert = ({ title, description, onCancel, onConfirm }) => (
  <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-auto">
    <h2 className="text-2xl font-bold mb-2 text-red-600">{title}</h2>
    <p className="mb-6 text-base text-gray-700">{description}</p>
    <div className="flex justify-end space-x-4">
      <CustomButton
        onClick={onCancel}
        className="bg-gray-300 text-gray-800 hover:bg-gray-400"
      >
        Cancel
      </CustomButton>
      <CustomButton
        onClick={onConfirm}
        className="bg-red-500 text-white hover:bg-red-600"
      >
        Logout
      </CustomButton>
    </div>
  </div>
);

export default function App() {
  const storedUserName = localStorage.getItem("userName");
  const userName = storedUserName ? JSON.parse(storedUserName) : null;
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  // Create an audio object
  const audio = new Audio(taskSound);

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);

  const saveToDo = () => {
    if (input.trim()) {
      axios
        .post(`${baseURL}/save`, { toDo: input })
        .then((res) => {
          setUpdateUI((prevState) => !prevState);
          setInput("");
          toast.success("Task added successfully!");
          // Play the sound when the task is added
          audio.play();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      saveToDo();
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${baseURL}/user/logout`, {}, { withCredentials: true });
      setShowLogoutConfirmation(false);
      toast.success(response.data.message);
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userName");
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      toast.error('Logout failed: ' + (error.response?.data?.error || 'An unexpected error occurred'));
    }
  };

  return (
    <Router>
      <AnimatePresence>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Display />} />
          <Route path="/welcome" element={userName ? <WelcomePage /> : <Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/task"
            element={userName ? (
              <div className="min-h-screen w-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4 relative">
                <Toaster position="bottom-center" reverseOrder={false} />
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md mx-auto"
                >
                  <motion.h1
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    ToDo App
                  </motion.h1>

                  <div className="flex mb-6">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress} // Handle Enter Key Press
                      type="text"
                      placeholder="Add a ToDo..."
                      className="flex-grow px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 bg-gray-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                    />
                    <CustomButton
                      onClick={saveToDo}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-r-lg hover:from-purple-700 hover:to-pink-700 focus:ring-purple-600"
                    >
                      Add
                    </CustomButton>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-3 sm:space-y-4 max-h-64 sm:max-h-96 overflow-y-auto pr-2 custom-scrollbar"
                  >
                    <AnimatePresence>
                      {toDos.map((el) => (
                        <ToDo
                          key={el._id}
                          text={el.toDo}
                          id={el._id}
                          setUpdateUI={setUpdateUI}
                          setShowPopup={setShowPopup}
                          setPopupContent={setPopupContent}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>

                {showPopup && (
                  <Popup
                    setShowPopup={setShowPopup}
                    popupContent={popupContent}
                    setUpdateUI={setUpdateUI}
                  />
                )}

                <motion.button
                  className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowLogoutConfirmation(true)}
                >
                  <LogOut size={24} />
                </motion.button>

                <AnimatePresence>
                  {showLogoutConfirmation && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                      >
                        <CustomAlert
                          title="Confirm Logout"
                          description="Are you sure you want to logout? This action cannot be undone."
                          onCancel={() => setShowLogoutConfirmation(false)}
                          onConfirm={handleLogout}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Navigate to="/" />
            )}
          />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}
