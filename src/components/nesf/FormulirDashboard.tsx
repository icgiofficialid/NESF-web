// ================================================================
// FormulirDashboard.tsx — NESF-web
//
// Formulir pendaftaran resmi dari dashboard ICGI: berkas sisipan
// `daftar.js` yang sama dengan yang dipakai situs event lain.
// Formulirnya dirawat di dashboard (paket, kategori, syarat, verifikasi
// surel, invoice & LoA atas nama ICGI) — portal ini hanya menyediakan
// tempatnya. Edisi yang dilayani mengikuti pin seri di dashboard.
// ================================================================
import { useEffect } from "react";
import { DASHBOARD_API } from "@/lib/dashboardIcgi";

declare global {
  interface Window {
    IysaDaftar?: { pasang?: () => void; pemuat?: boolean };
  }
}

const ID_SKRIP = "dashboard-daftar-js";

const FormulirDashboard = ({ akronim }: { akronim: string }) => {
  useEffect(() => {
    if (!document.getElementById(ID_SKRIP)) {
      const s = document.createElement("script");
      s.id = ID_SKRIP;
      s.src = `${DASHBOARD_API}/embed/daftar.js`;
      s.defer = true;
      document.body.appendChild(s);
    } else {
      // Skrip sudah termuat (pindah halaman tanpa muat ulang) — pasang ulang wadahnya.
      window.IysaDaftar?.pasang?.();
    }
  }, [akronim]);

  return (
    <div
      key={akronim}
      className="w-full max-w-3xl"
      data-iysa-daftar={akronim.toLowerCase()}
      data-iysa-api={DASHBOARD_API}
    />
  );
};

export default FormulirDashboard;
