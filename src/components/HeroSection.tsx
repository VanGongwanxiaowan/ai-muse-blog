import { Sparkles, BookOpen, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary font-medium">探索 AI 前沿技术</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="text-foreground">欢迎来到</span>
          <br />
          <span className="text-gradient">AI Learning Hub</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          深入探索人工智能的奥秘，从大模型到 AI Agent，从理论到实践，
          与你一起成长的 AI 学习平台。
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/30">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-foreground">50+</p>
              <p className="text-sm text-muted-foreground">精选文章</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/30">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-foreground">10+</p>
              <p className="text-sm text-muted-foreground">技术专题</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/30">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-foreground">1000+</p>
              <p className="text-sm text-muted-foreground">活跃读者</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
