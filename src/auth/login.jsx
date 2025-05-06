import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./authService";
import Notification from "../components/Notification/Notifications";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Por favor, introduzca su dirección de correo electrónico";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Dirección de correo electrónico inválida";
    }
    return error;
  };

  const handleLogin = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setEmailError(emailError);
      Notification.error(emailError);
      return;
    }

    const result = await loginUser(email, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      Notification.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center">
      <div className="w-1/2 max-w-sm bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Inicia sesión</h2>
        <div className="pb-6">
          <label className="block mb-2 font-medium">Correo</label>
          <input
            type="text"
            placeholder="Usuario"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            onBlur={() => setEmailError(validateEmail(email))}
            className={`w-full px-4 py-2 mb-1 border ${
              emailError ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <label className="block mb-2 font-medium">Contraseña</label>
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="text-xl" />
            ) : (
              <FaEye className="text-xl" />
            )}
          </button>
        </div>

        <div className="mt-6 justify-center">
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
