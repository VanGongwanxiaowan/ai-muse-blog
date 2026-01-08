import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

interface ArticleCardProps {
  article: Article;
  className?: string;
}

const tagColors: Record<string, string> = {
  "大模型": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "AI": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "工程": "bg-green-500/20 text-green-400 border-green-500/30",
  "攻击": "bg-red-500/20 text-red-400 border-red-500/30",
  "Agent": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "AIGC": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "图像生成": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "视频生成": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "推理": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  "模型量化": "bg-teal-500/20 text-teal-400 border-teal-500/30",
};

const ArticleCard = ({ article, className }: ArticleCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Link to={`/article/${article.id}`}>
      <Card
        className={cn(
          "group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300",
          "hover:border-primary/50 hover:bg-card/80 hover:glow-primary hover:-translate-y-1",
          className
        )}
      >
        {/* Cover Image */}
        {article.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          </div>
        )}

        <CardHeader className={cn(!article.coverImage && "pt-6")}>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={cn(
                  "text-xs font-medium",
                  tagColors[tag] || "bg-secondary/50 text-secondary-foreground border-secondary"
                )}
              >
                {tag}
              </Badge>
            ))}
            {article.tags.length > 3 && (
              <Badge variant="outline" className="text-xs bg-secondary/50 text-muted-foreground">
                +{article.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </CardHeader>

        <CardContent>
          {/* Excerpt */}
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <User className="h-3.5 w-3.5" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>

          {/* Read More */}
          <div className="flex items-center text-primary text-sm font-medium opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
            阅读
            <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ArticleCard;
