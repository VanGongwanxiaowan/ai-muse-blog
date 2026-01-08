# Frontend Components Documentation - AI Muse Blog

本文档提供 AI Muse Blog 前端组件的详细说明，包括组件结构、用法、props 和示例。

## 目录

- [组件概述](#组件概述)
- [UI 组件 (shadcn/ui)](#ui-组件-shadcnui)
- [功能组件](#功能组件)
- [页面组件](#页面组件)
- [组件模式](#组件模式)
- [样式指南](#样式指南)

## 组件概述

### 技术栈

- **React**: 18.3+
- **TypeScript**: 5.8+
- **UI 库**: shadcn/ui (Radix UI)
- **样式**: Tailwind CSS 3.4+
- **图标**: Lucide React
- **表单**: React Hook Form + Zod
- **动画**: Framer Motion (可选)

### 组件目录结构

```
src/
├── components/
│   ├── ui/                    # shadcn/ui 基础组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── ArticleCard.tsx        # 文章卡片
│   ├── ArticleList.tsx        # 文章列表
│   ├── CommentSection.tsx     # 评论区域
│   ├── Navbar.tsx             # 导航栏
│   ├── UserProfile.tsx        # 用户资料
│   └── ...
└── pages/                     # 页面组件
    ├── Index.tsx
    ├── Articles.tsx
    └── ...
```

## UI 组件 (shadcn/ui)

shadcn/ui 提供了一套可访问的、可定制的 React 组件。这些组件基于 Radix UI 构建。

### Button（按钮）

基础按钮组件，支持多种变体和尺寸。

```tsx
import { Button } from '@/components/ui/button';

function Example() {
  return (
    <div className="flex gap-2">
      <Button>默认</Button>
      <Button variant="secondary">次要</Button>
      <Button variant="destructive">危险</Button>
      <Button variant="outline">轮廓</Button>
      <Button variant="ghost">幽灵</Button>
      <Button variant="link">链接</Button>
    </div>
  );
}
```

**Props**:
- `variant`: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
- `size`: 'default' | 'sm' | 'lg' | 'icon'
- `asChild`: boolean - 使用子元素作为根元素
- `disabled`: boolean

### Card（卡片）

容器组件，用于展示内容。

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

function Example() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>卡片标题</CardTitle>
        <CardDescription>卡片描述</CardDescription>
      </CardHeader>
      <CardContent>
        <p>卡片内容</p>
      </CardContent>
      <CardFooter>
        <Button>操作</Button>
      </CardFooter>
    </Card>
  );
}
```

### Input（输入框）

表单输入组件。

```tsx
import { Input } from '@/components/ui/input';

function Example() {
  return (
    <Input type="email" placeholder="输入邮箱" />
  );
}
```

### Dialog（对话框）

模态对话框组件。

```tsx
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>打开对话框</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认操作</DialogTitle>
          <DialogDescription>
            您确定要执行此操作吗？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">取消</Button>
          <Button>确认</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Dropdown Menu（下拉菜单）

```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">选项</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>我的账户</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>个人资料</DropdownMenuItem>
        <DropdownMenuItem>设置</DropdownMenuItem>
        <DropdownMenuItem>退出</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Form（表单）

结合 React Hook Form 和 Zod 的表单组件。

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
});

function Example() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input placeholder="输入用户名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">提交</Button>
      </form>
    </Form>
  );
}
```

## 功能组件

### ArticleCard（文章卡片）

展示单篇文章的卡片组件。

**位置**: `src/components/ArticleCard.tsx`

```tsx
import { ArticleCard } from '@/components/ArticleCard';

function Example() {
  const article = {
    id: 1,
    title: "文章标题",
    summary: "文章摘要",
    cover_image: "https://example.com/image.jpg",
    author: { username: "作者名", avatar_url: "..." },
    category: { name: "分类" },
    tags: [{ name: "标签1" }, { name: "标签2" }],
    views_count: 100,
    likes_count: 20,
    created_at: "2024-01-08T10:00:00Z"
  };

  return (
    <ArticleCard
      article={article}
      onLike={() => console.log('liked')}
      onBookmark={() => console.log('bookmarked')}
    />
  );
}
```

**Props**:
- `article`: Article
  - `id`: number
  - `title`: string
  - `slug`: string
  - `summary`: string
  - `cover_image`: string | null
  - `author`: { username: string; avatar_url?: string }
  - `category`: { name: string }
  - `tags`: Array<{ name: string }>
  - `views_count`: number
  - `likes_count`: number
  - `comments_count`: number
  - `is_liked`: boolean
  - `is_bookmarked`: boolean
  - `created_at`: string
- `onLike?`: () => void
- `onBookmark?`: () => void
- `showActions?`: boolean

### ArticleList（文章列表）

展示文章列表的组件，支持分页和筛选。

**位置**: `src/components/ArticleList.tsx`

```tsx
import { ArticleList } from '@/components/ArticleList';

function Example() {
  return (
    <ArticleList
      tagId={1}
      categoryId={3}
      status="published"
      itemsPerPage={10}
    />
  );
}
```

**Props**:
- `tagId?`: string | number
- `categoryId?`: string | number
- `authorId?`: string | number
- `status?`: 'draft' | 'published'
- `search?`: string
- `itemsPerPage?`: number

### CommentSection（评论区）

评论展示和提交组件。

**位置**: `src/components/CommentSection.tsx`

```tsx
import { CommentSection } from '@/components/CommentSection';

function Example() {
  return (
    <CommentSection articleId={1} />
  );
}
```

**Props**:
- `articleId`: number | string
- `showReplies?`: boolean
- `maxDepth?`: number

### UserProfile（用户资料卡片）

用户信息展示组件。

**位置**: `src/components/UserProfile.tsx`

```tsx
import { UserProfile } from '@/components/UserProfile';

function Example() {
  return (
    <UserProfile
      userId={1}
      showStats={true}
      showBio={true}
      onFollow={() => console.log('followed')}
    />
  );
}
```

**Props**:
- `userId`: number | string
- `showStats?`: boolean
- `showBio?`: boolean
- `onFollow?`: () => void
- `onMessage?`: () => void

### Navbar（导航栏）

顶部导航栏组件。

**位置**: `src/components/Navbar.tsx`

```tsx
import { Navbar } from '@/components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      {/* 其他内容 */}
    </>
  );
}
```

**Props**:
- `fixed?`: boolean - 固定在顶部
- `transparent?`: boolean - 透明背景

### TagFilter（标签筛选器）

标签选择和筛选组件。

**位置**: `src/components/TagFilter.tsx`

```tsx
import { TagFilter } from '@/components/TagFilter';

function Example() {
  return (
    <TagFilter
      onChange={(tagId) => console.log('selected:', tagId)}
      selectedTagId={1}
    />
  );
}
```

**Props**:
- `selectedTagId?`: number | string
- `onChange`: (tagId: number | string | null) => void
- `showAllOption?`: boolean

### SearchBar（搜索栏）

搜索输入组件。

**位置**: `src/components/SearchBar.tsx`

```tsx
import { SearchBar } from '@/components/SearchBar';

function Example() {
  return (
    <SearchBar
      onSearch={(query) => console.log('search:', query)}
      placeholder="搜索文章..."
    />
  );
}
```

**Props**:
- `onSearch`: (query: string) => void
- `placeholder?`: string
- `debounceMs?`: number - 防抖延迟（毫秒）

### NotificationPanel（通知面板）

通知展示组件。

**位置**: `src/components/NotificationPanel.tsx`

```tsx
import { NotificationPanel } from '@/components/NotificationPanel';

function Example() {
  return (
    <NotificationPanel
      onMarkAsRead={(id) => console.log('marked as read:', id)}
      onMarkAllAsRead={() => console.log('all marked as read')}
    />
  );
}
```

**Props**:
- `onMarkAsRead?`: (id: number) => void
- `onMarkAllAsRead?`: () => void
- `maxItems?`: number

## 页面组件

### Index（首页）

首页展示最新和热门文章。

**位置**: `src/pages/Index.tsx`

```tsx
import { Index } from '@/pages/Index';

function App() {
  return <Index />;
}
```

**功能**:
- Hero 区域
- 最新文章列表
- 热门文章
- 分类展示
- 标签云

### Articles（文章列表页）

文章列表和筛选页面。

**位置**: `src/pages/Articles.tsx`

```tsx
import { Articles } from '@/pages/Articles';

function App() {
  return <Articles />;
}
```

**功能**:
- 文章列表
- 标签筛选
- 分类筛选
- 搜索
- 分页
- 排序

### ArticleDetail（文章详情页）

单个文章的详情页面。

**位置**: `src/pages/ArticleDetail.tsx`

```tsx
import { ArticleDetail } from '@/pages/ArticleDetail';

function App() {
  return <ArticleDetail articleId={1} />;
}
```

**Props**:
- `articleId`: string | number

**功能**:
- 文章内容展示（Markdown 渲染）
- 作者信息
- 相关文章推荐
- 评论区域
- 点赞和收藏

### WriteArticle（写文章页）

文章创建和编辑页面。

**位置**: `src/pages/WriteArticle.tsx`

```tsx
import { WriteArticle } from '@/pages/WriteArticle';

function App() {
  return <WriteArticle />;
}

// 或编辑现有文章
function EditExample() {
  return <WriteArticle articleId={1} />;
}
```

**Props**:
- `articleId?`: string | number - 编辑现有文章

**功能**:
- Markdown 编辑器
- 实时预览
- 标签选择
- 分类选择
- 封面图片上传
- 草稿保存
- 发布文章

### Auth（认证页）

登录和注册页面。

**位置**: `src/pages/Auth.tsx`

```tsx
import { Auth } from '@/pages/Auth';

function App() {
  return <Auth />;
}
```

**功能**:
- 登录表单
- 注册表单
- 表单验证
- 错误处理
- 切换登录/注册

### About（关于页）

关于本站页面。

**位置**: `src/pages/About.tsx`

## 组件模式

### 容器/展示组件分离

```tsx
// 展示组件 - 只关心 UI
export function ArticleCard({ article, onLike, onBookmark }: ArticleCardProps) {
  return (
    <Card>
      {/* UI 代码 */}
    </Card>
  );
}

// 容器组件 - 处理逻辑和数据
export function ArticleCardContainer({ articleId }: { articleId: number }) {
  const { data: article } = useArticle(articleId);
  const likeMutation = useLikeArticle();

  if (!article) return <Loading />;

  return (
    <ArticleCard
      article={article}
      onLike={() => likeMutation.mutate(articleId)}
      onBookmark={() => bookmarkMutation.mutate(articleId)}
    />
  );
}
```

### 组合组件

```tsx
// 页面组件组合多个子组件
export function ArticleDetailPage() {
  return (
    <div className="container">
      <Navbar />
      <article>
        <ArticleHeader />
        <ArticleContent />
        <ArticleMeta />
      </article>
      <CommentSection />
      <RelatedArticles />
      <Footer />
    </div>
  );
}
```

### 高阶组件（HOC）

```tsx
import { useAuth } from '@/contexts/AuthContext';

// HOC 用于保护需要认证的路由
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/auth" />;
    }

    return <Component {...props} />;
  };
}

// 使用
export const WriteArticlePage = withAuth(WriteArticle);
```

### 自定义 Hooks 封装逻辑

```tsx
// 封装文章详情逻辑
export function useArticleDetail(articleId: number) {
  const { data, isLoading, error } = useArticle(articleId);
  const { mutate: likeArticle } = useLikeArticle();
  const { mutate: bookmarkArticle } = useBookmarkArticle();

  const handleLike = () => {
    if (data) {
      likeArticle({ articleId: data.id, isLiked: data.is_liked });
    }
  };

  const handleBookmark = () => {
    if (data) {
      bookmarkArticle({ articleId: data.id, isBookmarked: data.is_bookmarked });
    }
  };

  return {
    article: data,
    isLoading,
    error,
    handleLike,
    handleBookmark,
  };
}

// 在组件中使用
function ArticleDetail({ articleId }: { articleId: number }) {
  const { article, isLoading, handleLike } = useArticleDetail(articleId);

  if (isLoading) return <Loading />;
  if (!article) return <Error />;

  return (
    <div>
      <h1>{article.title}</h1>
      <Button onClick={handleLike}>点赞</Button>
    </div>
  );
}
```

## 样式指南

### Tailwind CSS 使用规范

#### 间距

```tsx
// 好的做法 - 使用一致的间距
<div className="space-y-4">
  <div className="p-4">内容</div>
  <div className="p-4">内容</div>
</div>

// 不好的做法 - 随意的间距
<div className="mt-3 mb-5 ml-2 mr-4">
  <div className="pt-2 pb-6 pl-1 pr-3">内容</div>
</div>
```

#### 颜色

```tsx
// 使用语义化颜色
<Button variant="destructive">删除</Button>
<Alert variant="destructive">错误信息</Alert>

// 使用主题变量
<div className="bg-background text-foreground">
  主要内容
</div>
```

#### 响应式设计

```tsx
// 移动优先
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 响应式网格 */}
</div>

// 响应式文本
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  响应式标题
</h1>
```

### 主题支持

```tsx
import { useTheme } from '@/hooks/useTheme';

function ThemedComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        切换主题
      </button>
    </div>
  );
}
```

### 动画

```tsx
import { motion } from 'framer-motion';

function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      卡片内容
    </motion.div>
  );
}
```

## 组件最佳实践

### 1. Props 类型定义

```tsx
// 好的做法 - 清晰的类型定义
interface ArticleCardProps {
  article: Article;
  onLike?: () => void;
  onBookmark?: () => void;
  className?: string;
  showActions?: boolean;
}

export function ArticleCard({
  article,
  onLike,
  onBookmark,
  className,
  showActions = true,
}: ArticleCardProps) {
  // ...
}
```

### 2. 默认值

```tsx
// 好的做法 - 提供合理的默认值
function Button({ variant = 'default', size = 'default' }: ButtonProps) {
  return <button className={`btn btn-${variant} btn-${size}`} />;
}
```

### 3. 条件渲染

```tsx
// 好的做法
{article && <ArticleCard article={article} />}
{isLoading && <Loading />}
{error && <ErrorMessage />}

// 不好的做法
{article ? <ArticleCard article={article} /> : null}
```

### 4. 列表渲染

```tsx
// 好的做法 - 使用 key
{articles.map((article) => (
  <ArticleCard key={article.id} article={article} />
))}

// 不好的做法 - 使用索引作为 key
{articles.map((article, index) => (
  <ArticleCard key={index} article={article} />
))}
```

### 5. 事件处理

```tsx
// 好的做法 - 使用事件回调
<Button onClick={() => handleDelete(article.id)}>删除</Button>

// 不好的做法 - 内联逻辑
<Button onClick={() => {
  fetch(`/api/articles/${article.id}`, { method: 'DELETE' })
    .then(() => setArticles(prev => prev.filter(a => a.id !== article.id)));
}}>
  删除
</Button>
```

### 6. 性能优化

```tsx
// 使用 memo 避免不必要的重新渲染
import { memo } from 'react';

export const ArticleCard = memo(function ArticleCard({ article }: ArticleCardProps) {
  return <div>{article.title}</div>;
});

// 使用 useMemo 缓存计算结果
const sortedArticles = useMemo(() => {
  return articles.sort((a, b) => b.created_at.localeCompare(a.created_at));
}, [articles]);

// 使用 useCallback 缓存函数
const handleLike = useCallback((articleId: number) => {
  likeArticle(articleId);
}, [likeArticle]);
```

## 组件测试

```tsx
// ArticleCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ArticleCard } from './ArticleCard';

describe('ArticleCard', () => {
  const mockArticle = {
    id: 1,
    title: 'Test Article',
    summary: 'Test summary',
    // ...其他字段
  };

  it('renders article title', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('Test Article')).toBeInTheDocument();
  });

  it('calls onLike when like button is clicked', () => {
    const handleLike = vi.fn();
    render(<ArticleCard article={mockArticle} onLike={handleLike} />);

    const likeButton = screen.getByRole('button', { name: /like/i });
    likeButton.click();

    expect(handleLike).toHaveBeenCalledTimes(1);
  });
});
```

## 可访问性

### ARIA 属性

```tsx
<button
  aria-label="关闭对话框"
  aria-pressed={isPressed}
  aria-expanded={isExpanded}
>
  <XIcon />
</button>
```

### 键盘导航

```tsx
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <button onClick={() => setIsOpen(!isOpen)}>菜单</button>
      {isOpen && <MenuItems />}
    </div>
  );
}
```

### 语义化 HTML

```tsx
// 好的做法
<article>
  <header>
    <h1>{article.title}</h1>
    <time dateTime={article.created_at}>
      {formatDate(article.created_at)}
    </time>
  </header>
  <main>{article.content}</main>
  <footer>
    <AuthorInfo author={article.author} />
  </footer>
</article>

// 不好的做法 - 全部使用 div
<div>
  <div>{article.title}</div>
  <div>{article.content}</div>
</div>
```

## 资源

- [Radix UI 文档](https://www.radix-ui.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [React 文档](https://react.dev/)
- [shadcn/ui 示例](https://ui.shadcn.com/examples)

---

**最后更新**: 2024-01-08
**UI 库版本**: shadcn/ui (latest)
