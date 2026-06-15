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
import News               from "@/pages/News";
import NewsDetailPage     from "@/pages/NewsDetailPage";

// Shared pages
import PastEvents  from "./pages/PastEvents";
import EventDetail from "./pages/events/Eventdetail";
import NotFound    from "./pages/NotFound";
import Terms       from "@/pages/data/Terms";
import Guide       from "@/pages/guide";

// Register pages
import NesfRegister from "./pages/NesfRegister";
import DscfRegister from "./pages/dscf/DscfRegister"; // ✅ path yang benar

// Event detail pages
import DSCFDetail from "@/pages/events/DSCFDetail";

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
                  agar /events/dscf-2026 tidak tertangkap oleh /:slug */}
              <Route path="/events"            element={<NesfUpcomingEvents />} />
              <Route path="/past-events"       element={<PastEvents />} />
              <Route path="/events/dscf-2026"  element={<DSCFDetail />} />   {/* ✅ spesifik dulu */}
              <Route path="/events/:slug"      element={<EventDetail />} />   {/* ✅ catch-all belakangan */}

              {/* Register
                  ⚠️ Sama — route spesifik dulu, catch-all belakangan */}
              <Route path="/register/dscf-2026" element={<DscfRegister />} /> {/* ✅ DSCF flow */}
              <Route path="/register"           element={<NesfRegister />} /> {/* flow lama / event lain */}

              {/* Info pages */}
              <Route path="/about"   element={<NesfAbout />} />
              <Route path="/faq"     element={<NesfFaq />} />
              <Route path="/contact" element={<NesfContact />} />
              <Route path="/terms"   element={<Terms />} />
              <Route path="/guide"   element={<Guide />} />

              {/* News */}
              <Route path="/news"       element={<News />} />
              <Route path="/news/:slug" element={<NewsDetailPage />} />

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