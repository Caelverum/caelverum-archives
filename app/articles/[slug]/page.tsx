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
  archiveCode?: string;
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
    archiveCode: data.archiveCode || '',
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const shareUrl = `https://caelverum-archives.vercel.app/articles/${article.slug}`;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Top Nav */}
      <nav className="border-b border-zinc-800/80 sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
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

      {/* Main Editorial Layout */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-14">
          
          {/* LEFT — Portrait Cover (sticky on desktop) */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="aspect-[3/4] overflow-hidden rounded-xl bg-zinc-900 shadow-2xl">
              <img
                src={article.cover}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Share buttons under the image on desktop */}
            <div className="mt-6 hidden lg:block">
              <p className="text-xs tracking-widest text-zinc-500 mb-3">SHARE</p>
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
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                  title="Open Instagram"
                >
                  Instagram
                </a>
                <a 
                  href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent('I thought you might like this article from Caelverum Archives:\n\n' + article.title + '\n\n' + shareUrl)}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — Article Content */}
          <div>
            <p className="text-xs tracking-widest text-amber-500 mb-4">
              {article.category}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-light leading-tight mb-5">
              {article.title}
            </h1>
         <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400 mb-10">
  <span>By {article.author}</span>
  <span>·</span>
  <span>{article.date}</span>
  <span>·</span>
  <span>{article.readTime}</span>
  {article.archiveCode && (
    <>
      <span>·</span>
      <span className="tracking-wider text-zinc-500">{article.archiveCode}</span>
    </>
  )}
</div>

            {/* Article Body */}
            <div className="text-zinc-300 leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
  h2: ({node, ...props}) => (
    <h2 className="text-2xl font-medium text-white mt-12 mb-5 tracking-tight" {...props} />
  ),
  h3: ({node, ...props}) => (
    <h3 className="text-xl font-medium text-white mt-10 mb-4" {...props} />
  ),
  p: ({node, ...props}) => (
    <p className="mb-6 leading-8 text-[16px] text-zinc-300" {...props} />
  ),
  strong: ({node, ...props}) => (
    <strong className="font-normal text-zinc-300" {...props} />
  ),
  blockquote: ({node, ...props}) => (
    <blockquote className="border-l-2 border-zinc-500 bg-zinc-900/40 py-3 px-5 my-8 rounded-r text-zinc-300 italic" {...props} />
  ),
  hr: () => null,
}}
              >
                {article.content}
              </ReactMarkdown>
            </div>

            {/* Mobile Share */}
            <div className="mt-14 pt-8 border-t border-zinc-800 lg:hidden">
              <p className="text-xs tracking-widest text-zinc-500 mb-3">SHARE</p>
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
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  Instagram
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
          </div>
        </div>
      </div>
    </div>
  );
}
