import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";
import CardList from "./components/CardList";
import CardForm from "./components/CardForm";
import CardDetails from "./pages/CardDetails";
import MyCards from "./pages/MyCards";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: "1rem" }}>
      <h2>Something went wrong:</h2>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <AuthProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className={`app-container ${darkMode ? "dark" : ""}`}>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/cards"
                element={
                  <ProtectedRoute roles={["admin", "business", "regular"]}>
                    <CardList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cards/new"
                element={
                  <ProtectedRoute roles={["business"]}>
                    <CardForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cards/:id/edit"
                element={
                  <ProtectedRoute roles={["business"]}>
                    <CardForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute roles={["admin", "business", "regular"]}>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-cards"
                element={
                  <ProtectedRoute roles={["business"]}>
                    <MyCards />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cards/:id"
                element={
                  <ProtectedRoute roles={["admin", "business", "regular"]}>
                    <CardDetails />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
