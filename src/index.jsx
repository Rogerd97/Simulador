import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Encontrar el elemento raíz en el DOM
const rootElement = document.getElementById("root");

// Solo continuar si el rootElement existe
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  // Renderizar el componente App en el elemento raíz
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
