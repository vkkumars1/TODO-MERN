import React from "react";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";

const ToDo = ({ text, id, setUpdateUI, setShowPopup, setPopupContent }) => {
  const controls = useAnimation();

  const deleteTodo = async () => {
    await controls.start({
      scale: [1, 1.1, 0],
      rotate: [0, 5, -5, 0],
      opacity: [1, 1, 0],
      transition: { duration: 0.5 }
    });
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateToDo = () => {
    setPopupContent({ text, id });
    setShowPopup(true);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, rotate: -5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, y: -50, rotate: 5 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-yellow-200 to-yellow-100 p-4 rounded-lg shadow-lg mb-4 transform hover:scale-105 transition-all duration-300"
    >
      <motion.div animate={controls} className="flex justify-between items-center">
        <p className="text-gray-800 font-medium">{text}</p>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={updateToDo}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-300 bg-transparent hover:bg-transparent"
          >
            <AiFillEdit size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: -15 }}
            whileTap={{ scale: 0.9 }}
            onClick={deleteTodo}
            className="text-red-600 hover:text-red-800 transition-colors duration-300 bg-transparent hover:bg-transparent"
          >
            <RxCross1 size={24} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ToDo;