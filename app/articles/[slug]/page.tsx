import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

type Article = {
  slug: string;
  title: string;
  author: string;
  category: string;
  date: string;
  readTime: string;
  cover: string;
  excerpt: string;
  content: string;
};

function getArticle(slug: string): Article | null {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    author: data.author || '',
    category: data.category || '',
    date: data.date || '',
    readTime: data.readTime || '',
    cover: data.cover || '',
    excerpt: data.excerpt || '',
    content,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const shareUrl = `https://caelverum-archives.vercel.app/articles/${article.slug}`;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Simple Top Nav */}
      <nav className="border-b border-zinc-800/80 sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <div className="text-xl font-light tracking-[0.15em] text-amber-400">CAELVERUM</div>
            <div className="text-[10px] tracking-[0.35em] text-zinc-400 -mt-0.5">ARCHIVES</div>
          </Link>
          <Link 
            href="/" 
            className="text-sm text-zinc-400 hover:text-amber-400 transition-colors"
          >
            ← Back to Archives
          </Link>
        </div>
      </nav>

      {/* Article Header */}
      <header className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        <p className="text-xs tracking-widest text-amber-500 mb-4">
          {article.category}
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-zinc-400 mb-8">
          <span>By {article.author}</span>
          <span>·</span>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </header>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="aspect-[16/10] overflow-hidden rounded-xl bg-zinc-900">
          <img
            src={article.cover}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-6 pb-20">
        <div className="text-zinc-300 leading-relaxed article-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({node, ...props}) => (
                <h2 className="text-2xl font-light text-amber-400 mt-12 mb-5 tracking-tight" {...props} />
              ),
              h3: ({node, ...props}) => (
                <h3 className="text-xl font-medium text-white mt-10 mb-4" {...props} />
              ),
              p: ({node, ...props}) => (
                <p className="mb-6 leading-8 text-[16px]" {...props} />
              ),
              strong: ({node, ...props}) => (
                <strong className="text-white font-medium" {...props} />
              ),
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-2 border-amber-500 bg-zinc-900/40 py-3 px-5 my-8 rounded-r text-zinc-300 italic" {...props} />
              ),
              hr: () => null,
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <p className="text-sm text-zinc-500 mb-4">Share this article</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title + ' — Caelverum Archives')}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              X
            </a>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Facebook
            </a>
            <a 
              href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent('I thought you might like this article from Caelverum Archives:\n\n' + article.title + '\n\n' + shareUrl)}`}
              className="hover:text-amber-400 transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12">
          <Link 
            href="/" 
            className="text-amber-400 hover:underline text-sm"
          >
            ← Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}
