// App.tsx
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      {/* Layout dasar aplikasi (misalnya navbar, sidebar, dll.) */}
      <h1>Selamat Datang di Aplikasi!</h1>

      {/* Outlet untuk menampilkan konten halaman */}
      <Outlet />
    </div>
  );
}

export default App;
