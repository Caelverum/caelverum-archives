'use client';

import { useState } from 'react';

type Article = {
  id: number;
  title: string;
  author: string;
  excerpt: string;
  cover: string;
  category: string;
  date: string;
  readTime: string;
};

export default function Home() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 1,
      title: "The Tall Poppy Paradox and the Slow Erosion of the Australian Spirit",
      author: "Brian Pearce",
      excerpt: "A joke that isn't quite a joke...",
      cover: "/Tall Poppy Article Cover Art (1).png",
      category: "HUMAN BEHAVIOUR",
      date: "May 12, 2025",
      readTime: "8 min read",
    },
    {
      id: 2,
      title: "The Mind-Zillionaires: Inside the Secret Class That Owns the Ultimate Luxury—Their Own Attention",
      author: "Brian Pearce",
      excerpt: "The rarest commodity in the modern world...",
      cover: "/Mind Zillionaire Cover Art (1).png",
      category: "PSYCHOLOGY",
      date: "May 10, 2025",
      readTime: "9 min read",
    },
    {
      id: 3,
      title: "Can Transformation Be Designed?",
      author: "Soozhee Low Pearce",
      excerpt: "What if change wasn't random...",
      cover: "/Can transformation cover art (1).png",
      category: "TRANSFORMATIVE DESIGN",
      date: "May 8, 2025",
      readTime: "7 min read",
    },
    {
      id: 4,
      title: "The Permission Trap: When the Child Who Grew Up Still Has to Ask",
      author: "Soozhee Low Pearce",
      excerpt: "Some adults never stop asking for permission...",
      cover: "/Permission Trap cover art (1).png",
      category: "HUMAN BEHAVIOUR",
      date: "May 5, 2025",
      readTime: "8 min read",
    },
    {
      id: 5,
      title: "The Empty Cup: Why the Most Radical Thing You Can Do Is Stop Filling Up",
      author: "Soozhee Low Pearce",
      excerpt: "We keep pouring into already full cups...",
      cover: "/The Empty Cup cover art (1).png",
      category: "PSYCHOLOGY",
      date: "May 3, 2025",
      readTime: "6 min read",
    },
    {
      id: 6,
      title: "The $850,000 T-Shirt: Why Your Closet Is the New Art Gallery",
      author: "Soozhee Low Pearce",
      excerpt: "Fashion has become the new status signal...",
      cover: "/The $850000 t shirt cover art (1).png",
      category: "SOCIETY",
      date: "Apr 28, 2025",
      readTime: "7 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Top Navigation - closer to mockup */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <div className="text-2xl font-light tracking-widest text-amber-400">CAELVERUM</div>
            <div className="text-xs tracking-[0.3em] text-zinc-400 -mt-1">ARCHIVES</div>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm tracking-wider">
            <a href="#" className="hover:text-amber-400">ARTICLES</a>
            <a href="#" className="hover:text-amber-400">BOOKS</a>
            <a href="#" className="hover:text-amber-400">MUSIC</a>
            <a href="#" className="hover:text-amber-400">AUDIO</a>
            <a href="#" className="hover:text-amber-400">ABOUT</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm hover:text-amber-400">SIGN IN</button>
            <button className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2 rounded text-sm font-medium">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative h-[50vh] flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="text-center z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight leading-tight">
            Ideas that<br />challenge.
          </h1>
          <p className="text-2xl md:text-3xl text-amber-400 mt-5 font-light">
            Perspectives that transform.
          </p>
          <p className="text-sm tracking-widest text-zinc-500 mt-6">
            TIMELESS INSIGHTS FOR A COMPLEX WORLD
          </p>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-2xl font-light tracking-wide">LATEST ARTICLES</h2>
          <a href="#" className="text-sm text-amber-400 hover:underline">VIEW ALL</a>
        </div>

        {/* Articles Grid - portrait style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="cursor-pointer group"
            >
              <div className="overflow-hidden rounded-lg bg-zinc-900">
                <img
                  src={article.cover}
                  alt={article.title}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="mt-4">
                <p className="text-xs tracking-widest text-amber-500 mb-2">{article.category}</p>
                <h3 className="text-lg leading-snug group-hover:text-amber-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-zinc-500 mt-2">
                  {article.author} · {article.readTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal - closer to mockup style */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 max-w-5xl w-full max-h-[92vh] overflow-auto rounded-xl border border-zinc-800 relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 text-2xl z-20 hover:text-amber-400"
            >
              ×
            </button>

            <div className="grid md:grid-cols-2">
              {/* Left - Cover */}
              <div className="bg-zinc-900">
                <img
                  src={selectedArticle.cover}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover min-h-[400px]"
                />
              </div>

              {/* Right - Content */}
              <div className="p-8 md:p-12 flex flex-col">
                <p className="text-xs tracking-widest text-amber-500 mb-3">
                  {selectedArticle.category}
                </p>
                <h1 className="text-3xl font-light leading-tight mb-4">
                  {selectedArticle.title}
                </h1>
                <p className="text-zinc-400 text-sm mb-8">
                  By {selectedArticle.author} · {selectedArticle.date} · {selectedArticle.readTime}
                </p>

                <p className="text-zinc-300 leading-relaxed mb-10 flex-1">
                  {selectedArticle.excerpt}
                  <br /><br />
                  Full article content will be added in the next step.
                </p>

                <div className="flex gap-4 mb-8">
                  <button className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded text-sm font-medium">
                    READ ARTICLE
                  </button>
                  <button className="border border-zinc-600 hover:border-amber-400 px-6 py-3 rounded text-sm">
                    DOWNLOAD PDF
                  </button>
                </div>

                <div className="flex items-center gap-4 text-sm text-zinc-500">
                  <span>Share this article</span>
                  <a href="#" className="hover:text-amber-400">X</a>
                  <a href="#" className="hover:text-amber-400">in</a>
                  <a href="#" className="hover:text-amber-400">✉</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
