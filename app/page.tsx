'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now we hardcode the list while we finish the architecture.
    // Later this will be fully dynamic.
    async function loadArticles() {
      try {
        const res = await fetch('/api/articles');
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        } else {
          // Temporary fallback while we set up the API route
          setArticles([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsExpanded(false);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    setIsExpanded(false);
  };

  // Temporary hardcoded list so the site still works while we finish the API
  const tempArticles: Article[] = [
    {
      slug: 'tall-poppy-paradox',
      title: 'The Tall Poppy Paradox and the Slow Erosion of the Australian Spirit',
      author: 'Brian Pearce',
      category: 'HUMAN BEHAVIOUR',
      date: '2025-05-12',
      readTime: '8 min read',
      cover: '/Tall Poppy Article Cover Art (1).png',
      excerpt: 'A joke that isn\'t quite a joke — and why it matters more than we admit.',
      content: '', // will be loaded from markdown
    },
  ];

  const displayArticles = articles.length > 0 ? articles : tempArticles;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* TOP NAV */}
      <nav className="border-b border-zinc-800/80 sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-light tracking-[0.15em] text-amber-400">CAELVERUM</div>
            <div className="text-[11px] tracking-[0.35em] text-zinc-400 -mt-0.5">ARCHIVES</div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm tracking-wider">
            <a href="#" className="hover:text-amber-400 transition-colors">ARTICLES</a>
            <a href="#" className="hover:text-amber-400 transition-colors">BOOKS</a>
            <a href="#" className="hover:text-amber-400 transition-colors">MUSIC</a>
            <a href="#" className="hover:text-amber-400 transition-colors">AUDIO</a>
            <a href="#" className="hover:text-amber-400 transition-colors">ABOUT</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm hover:text-amber-400 transition-colors hidden sm:block">SIGN IN</button>
            <button className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2 rounded text-sm font-medium transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[75vh] min-h-[560px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Cael Archives Hero Image.png')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight">
              Ideas that<br />challenge.
            </h1>
            <p className="text-2xl md:text-3xl text-amber-400 mt-5 font-light">
              Perspectives that transform.
            </p>
            <p className="text-sm tracking-[0.25em] text-zinc-300 mt-6 uppercase">
              Timeless insights for a complex world
            </p>
            <button className="mt-10 border border-amber-500/80 hover:bg-amber-500 hover:text-black text-amber-400 px-8 py-3.5 rounded text-sm tracking-wider transition-all">
              EXPLORE ARCHIVES
            </button>
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide">Latest Articles</h2>
            <a href="#" className="text-sm text-amber-400 hover:underline">View All</a>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {displayArticles.map((article) => (
              <div
                key={article.slug}
                onClick={() => openArticle(article)}
                className="flex-shrink-0 w-[220px] sm:w-[240px] md:w-[260px] cursor-pointer group snap-start"
              >
                <div className="overflow-hidden rounded-lg bg-zinc-900 aspect-[3/4]">
                  <img
                    src={article.cover}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="mt-3 px-0.5">
                  <p className="text-[11px] tracking-widest text-amber-500 mb-1.5">{article.category}</p>
                  <h3 className="text-[15px] leading-snug group-hover:text-amber-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1.5">
                    {article.author} · {article.readTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAIL MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 max-w-5xl w-full max-h-[92vh] overflow-hidden rounded-xl border border-zinc-800 relative flex flex-col md:flex-row">
            
            <button
              onClick={closeArticle}
              className="absolute top-5 right-5 text-2xl z-20 hover:text-amber-400"
            >
              ×
            </button>

            {/* LEFT - Cover */}
            <div className="md:w-1/2 bg-zinc-900 flex-shrink-0">
              <img
                src={selectedArticle.cover}
                alt={selectedArticle.title}
                className="w-full h-full object-cover min-h-[400px] md:min-h-full"
              />
            </div>

            {/* RIGHT - Content */}
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto max-h-[92vh]">
              <p className="text-xs tracking-widest text-amber-500 mb-3">
                {selectedArticle.category}
              </p>
              <h1 className="text-2xl md:text-3xl font-light leading-tight mb-3">
                {selectedArticle.title}
              </h1>
              <p className="text-zinc-400 text-sm mb-6">
                By {selectedArticle.author} · {selectedArticle.date} · {selectedArticle.readTime}
              </p>

             <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed mb-8 flex-1
  prose-headings:text-white prose-headings:font-light prose-headings:tracking-tight
  prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-amber-400
  prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-zinc-100
  prose-p:mb-5 prose-p:leading-7
  prose-strong:text-white prose-strong:font-medium
  prose-blockquote:border-l-amber-500 prose-blockquote:bg-zinc-900/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r
  prose-hr:hidden">
  {isExpanded ? (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {selectedArticle.content || selectedArticle.excerpt}
    </ReactMarkdown>
  ) : (
    <div className="whitespace-pre-line leading-7">{selectedArticle.excerpt}</div>
  )}
</div>
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded text-sm font-medium"
                >
                  {isExpanded ? "SHOW LESS" : "READ FULL ARTICLE"}
                </button>
                <button className="border border-zinc-600 hover:border-amber-400 px-6 py-3 rounded text-sm">
                  DOWNLOAD PDF
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span>Share</span>
                <a href="#" className="hover:text-amber-400">X</a>
                <a href="#" className="hover:text-amber-400">LinkedIn</a>
                <a href="#" className="hover:text-amber-400">Email</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
