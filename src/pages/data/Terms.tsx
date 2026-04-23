import SiteShell from "@/components/nesf/NesfShell"; 
import { Button } from "@/components/ui/button";

const Terms = () => {
  return (
    <SiteShell>
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/terms-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <img src="/logo.png" alt="Logo" className="h-32 w-auto" />
          <h1 className="text-4xl font-bold text-white">Terms & Conditions</h1>
          <Button
            variant="hero"
            size="lg"
            className="bg-primary/90 text-white font-bold tracking-widest px-8 py-4"
            asChild
          >
            <a href="/terms-doc.pdf" target="_blank">VIEW TERMS 2025</a>
          </Button>
        </div>
      </div>
    </SiteShell>
  );
};

export default Terms;