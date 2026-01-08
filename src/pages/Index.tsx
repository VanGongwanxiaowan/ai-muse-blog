import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ArticleList from "@/components/ArticleList";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-16">
        <HeroSection />
        
        <section className="container mx-auto px-4 pb-20">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              最新文章
            </h2>
            <p className="text-muted-foreground">
              探索 AI 领域的最新技术与实践经验
            </p>
          </div>
          
          <ArticleList />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 AI Learning Hub. Created by 宫凡
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
