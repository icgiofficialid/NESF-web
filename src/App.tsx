// ================================================================
// App.tsx — NESF Portal
// National Engineering Science Fair
// ================================================================
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import ScrollToTop from "./components/nesf/ScrollToTop";

// NESF Pages
import NesfIndex          from "./pages/NesfIndex";
import NesfAbout          from "./pages/NesfAbout";
import NesfFaq            from "./pages/NesfFaq";
import NesfContact        from "./pages/NesfContact";
import NesfUpcomingEvents from "./pages/NesfUpcomingEvents";
import NewsArchive        from "@/pages/NewsArchive";       // /news — semua berita per tahun
import WinnersArchive     from "@/pages/WinnersArchive";    // /winners
import CertificatesArchive from "@/pages/CertificatesArchive"; // /certificates
import CurationArchive    from "@/pages/CurationArchive";   // /curation
import NewsDetailPage     from "@/pages/NewsDetailPage";

// Shared pages
import PastEvents  from "./pages/PastEvents";
import EventDetail from "./pages/events/Eventdetail";
import NotFound    from "./pages/NotFound";
import Terms       from "@/pages/data/Terms";
import Guide       from "@/pages/guide";

// Register pages
import NesfRegister from "./pages/NesfRegister"; // ✅ flow generik — dipakai SEMUA event NESF via /register/:slug
import DscfRegister from "./pages/dscf/DscfRegister"; // ✅ DSCF punya flow sendiri, sengaja tidak disatukan

// Event detail pages
import DSCFDetail from "@/pages/events/DSCFDetail";
import BorneoNESFDetail from "@/pages/events/BorneoNESFDetail"; // ✅ Borneo-NESF custom detail
import PastEventGallery from "./pages/PastEventGallery";
import PastEventNews from "./pages/PastEventNews";
import PastEventWinners from "./pages/PastEventWinners";
import PastEventCertificates from "./pages/PastEventCertificates";
import PastEventCuration from "./pages/PastEventCuration";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Main */}
              <Route path="/" element={<NesfIndex />} />

              {/* Events
                  ⚠️ Route spesifik WAJIB di atas route dinamis /:slug
                  agar /events/dscf-2026 & /events/borneonesf-2026
                  tidak tertangkap oleh /:slug */}
              <Route path="/events"                 element={<NesfUpcomingEvents />} />
              <Route path="/past-events"            element={<PastEvents />} />
              {/* Halaman pasca-event — semua dibaca dari eventRegistry */}
              <Route path="/past-events/:slug"              element={<PastEventGallery />} />
              <Route path="/past-events/:slug/news"         element={<PastEventNews />} />
              <Route path="/past-events/:slug/winners"      element={<PastEventWinners />} />
              <Route path="/past-events/:slug/certificates" element={<PastEventCertificates />} />
              <Route path="/past-events/:slug/curation"     element={<PastEventCuration />} />
              <Route path="/events/dscf-2026"       element={<DSCFDetail />} />        {/* ✅ spesifik dulu */}
              <Route path="/events/borneo-nesf-2026" element={<BorneoNESFDetail />} />   {/* ✅ spesifik dulu */}
              <Route path="/events/:slug"           element={<EventDetail />} />        {/* ✅ catch-all belakangan */}

              {/* Register
                  ⚠️ Route spesifik dulu, dinamis belakangan.
                  DSCF tetap punya flow sendiri (/register/dscf-2026).
                  SEMUA event NESF lainnya (Borneo-NESF, dan event
                  berikutnya) otomatis lewat /register/:slug — TIDAK
                  PERLU tambah route baru lagi tiap ada event baru,
                  cukup tambahkan entry-nya di eventRegistry.ts. */}
              <Route path="/register/dscf-2026" element={<DscfRegister />} />  {/* ✅ DSCF flow — jangan disatukan */}
              <Route path="/register/:slug"     element={<NesfRegister />} />  {/* ✅ flow generik untuk semua event lain */}
              <Route path="/register"           element={<NesfRegister />} />  {/* fallback: tanpa slug → pesan "event tidak ditemukan" */}

              {/* Info pages */}
              <Route path="/about"   element={<NesfAbout />} />
              <Route path="/faq"     element={<NesfFaq />} />
              <Route path="/contact" element={<NesfContact />} />
              <Route path="/terms"   element={<Terms />} />
              <Route path="/guide"   element={<Guide />} />

              {/* News */}
              <Route path="/news"       element={<NewsArchive />} />
              <Route path="/news/:slug" element={<NewsDetailPage />} />

              {/* Arsip lintas event (navbar utama) — dipilih per tahun */}
              <Route path="/winners"      element={<WinnersArchive />} />
              <Route path="/certificates" element={<CertificatesArchive />} />
              <Route path="/curation"     element={<CurationArchive />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;