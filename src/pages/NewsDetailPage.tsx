// Path: src/pages/NewsDetailPage.tsx

import { useParams, useNavigate } from "react-router-dom";
import { newsItems } from "@/config/newsData";
import { NewsDetail } from "./News";
import SiteShell from "@/components/nesf/NesfShell";

const NewsDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const item = newsItems.find((n) => n.slug === slug);

  if (!item) {
    return (
      <SiteShell>
        <div className="container py-20 text-center text-muted-foreground">
          <p>News not found.</p>
          <button onClick={() => navigate("/news")} className="mt-4 text-primary hover:underline text-sm">
            ← Back to News
          </button>
        </div>
      </SiteShell>
    );
  }

  return <NewsDetail item={item} />;
};

export default NewsDetailPage;