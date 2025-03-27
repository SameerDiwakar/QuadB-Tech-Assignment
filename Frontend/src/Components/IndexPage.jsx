import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const slides = [
  { id: 1, image: "https://i.rtings.com/assets/pages/KSgFV72t/best-laptops-for-working-from-home-20230503-medium.jpg?format=auto", text: "Stay Organized with Ease" },
  { id: 2, image: "https://supercharge.design/wp-content/uploads/2022/03/blog-stay-organized-01.jpg", text: "Track Your Tasks Effortlessly" },
  { id: 3, image: "https://6-pence.com/wp-content/uploads/2023/11/employee-productivity.webp", text: "Boost Your Productivity Today" },
];

const IndexPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to TaskMaster</h1>
        <p className="text-lg text-gray-600 mt-4">Your ultimate To-Do application to manage tasks efficiently.</p>
        <button className="mt-6 px-6 py-3 text-lg bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-500" onClick={() => navigate("/login")}>Get Started</button>
      </section>
      
      {/* Slider Section */}
      <section className="relative w-full max-w-3xl overflow-hidden rounded-lg shadow-lg">
        <motion.div
          key={slides[currentSlide].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full h-64 flex items-end justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
        >
          <div className="bg-black bg-opacity-50 text-white text-lg font-semibold px-4 py-2 rounded-md mb-4">
            {slides[currentSlide].text}
          </div>
        </motion.div>
        <button onClick={nextSlide} className="absolute right-4 bottom-4 bg-white p-2 rounded-full shadow-md">▶</button>
      </section>
      
      {/* Features Section */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-4xl">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Task Scheduling</h3>
          <p className="text-gray-600 mt-2">Plan your tasks with reminders.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Progress Tracking</h3>
          <p className="text-gray-600 mt-2">Monitor your daily productivity.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Collaboration</h3>
          <p className="text-gray-600 mt-2">Work with your team efficiently.</p>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;