import { createRoot } from "react-dom/client";
import "./index.css";
import { muatEventDashboard } from "./lib/dashboardIcgi";

/*
 * Event ICGI dari dashboard digabungkan ke EVENTS_REGISTRY SEBELUM aplikasi
 * dimuat: banyak halaman menghitung daftar event saat modulnya diimpor, jadi
 * App diimpor sesudahnya. Kalau dashboard lambat/tidak terjangkau, pemuatnya
 * menyerah setelah 6 detik dan situs tampil dengan data lokal.
 */
muatEventDashboard().finally(async () => {
  const { default: App } = await import("./App.tsx");
  createRoot(document.getElementById("root")!).render(<App />);
});
