import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import ArticleCard, { Article } from "./ArticleCard";
import TagFilter from "./TagFilter";

// 预设标签
const PRESET_TAGS = [
  "大模型",
  "AI",
  "工程",
  "攻击",
  "Agent",
  "AIGC",
  "图像生成",
  "视频生成",
  "推理",
  "模型量化",
];

// 模拟文章数据（后续会从数据库获取）
const generateMockArticles = (page: number): Article[] => {
  const titles = [
    "深入理解 Transformer 架构：从 Attention 到 Multi-Head",
    "大模型推理优化：量化技术全解析",
    "构建企业级 AI Agent：架构设计与最佳实践",
    "AIGC 时代的图像生成技术发展历程",
    "LLM 安全攻防：提示注入与防护策略",
    "视频生成模型 Sora 技术深度解读",
    "模型微调实战：LoRA 与 QLoRA 对比分析",
    "AI 工程化：从研究到生产的完整链路",
  ];

  const excerpts = [
    "本文将深入探讨 Transformer 的核心机制，包括自注意力机制的数学原理、多头注意力的设计思想，以及位置编码的实现方式...",
    "模型量化是降低大模型推理成本的关键技术。本文将介绍 INT8、INT4 量化原理，GPTQ、AWQ 等量化方法的对比...",
    "AI Agent 正在重塑软件开发范式。本文分享如何设计可扩展的 Agent 架构，处理工具调用、记忆管理等核心问题...",
    "从 GAN 到 Diffusion Model，图像生成技术经历了多次革命性突破。本文梳理技术演进脉络，展望未来发展方向...",
    "大模型的安全问题日益突出。本文分析常见的攻击手法，包括提示注入、越狱攻击，并给出有效的防护建议...",
    "Sora 的发布标志着视频生成进入新纪元。本文解析其技术架构，包括 Spacetime Patches、DiT 等核心创新...",
    "微调是让通用模型适应特定任务的关键。本文对比 LoRA、QLoRA 等参数高效微调方法的原理与效果...",
    "将 AI 模型部署到生产环境面临诸多挑战。本文分享模型服务化、监控运维、持续迭代的工程经验...",
  ];

  const tagSets = [
    ["大模型", "AI", "工程"],
    ["推理", "模型量化", "大模型"],
    ["Agent", "AI", "工程"],
    ["AIGC", "图像生成", "AI"],
    ["攻击", "大模型", "AI"],
    ["视频生成", "AIGC", "AI"],
    ["大模型", "工程", "AI"],
    ["工程", "AI", "大模型"],
  ];

  return Array.from({ length: 4 }, (_, i) => {
    const index = (page * 4 + i) % titles.length;
    return {
      id: `article-${page}-${i}`,
      title: titles[index],
      excerpt: excerpts[index],
      coverImage: `https://images.unsplash.com/photo-${1677442136019 + index * 1000}-21780ecad995?w=800&h=400&fit=crop`,
      author: "宫凡",
      publishedAt: new Date(Date.now() - (page * 4 + i) * 86400000).toISOString(),
      tags: tagSets[index],
    };
  });
};

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // 加载更多文章
  const loadMoreArticles = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    // 模拟 API 延迟
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newArticles = generateMockArticles(page);
    setArticles((prev) => [...prev, ...newArticles]);
    setPage((prev) => prev + 1);
    setLoading(false);

    // 模拟分页限制
    if (page >= 4) {
      setHasMore(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadMoreArticles();
  }, []);

  // 无限滚动触发
  useEffect(() => {
    if (inView && !loading) {
      loadMoreArticles();
    }
  }, [inView]);

  // 标签筛选
  const handleTagSelect = (tag: string) => {
    if (tag === "") {
      setSelectedTags([]);
    } else {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    }
  };

  // 过滤文章
  const filteredArticles =
    selectedTags.length === 0
      ? articles
      : articles.filter((article) =>
          selectedTags.some((tag) => article.tags.includes(tag))
        );

  return (
    <div className="space-y-8">
      {/* 标签筛选 */}
      <div className="sticky top-20 z-40 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <TagFilter
          tags={PRESET_TAGS}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
        />
      </div>

      {/* 文章列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* 加载指示器 */}
      {hasMore && (
        <div ref={ref} className="flex justify-center py-8">
          {loading && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span>加载更多文章...</span>
            </div>
          )}
        </div>
      )}

      {/* 没有更多文章 */}
      {!hasMore && (
        <div className="text-center py-8 text-muted-foreground">
          <p>已加载全部文章</p>
        </div>
      )}

      {/* 无匹配结果 */}
      {filteredArticles.length === 0 && !loading && (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">暂无匹配的文章</p>
          <p className="text-sm text-muted-foreground mt-2">
            尝试选择其他标签或清除筛选
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
