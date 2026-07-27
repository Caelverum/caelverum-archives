'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch('/api/articles');
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  // Get unique categories in the order they first appear
  const categories = Array.from(
    new Set(articles.map((a) => a.category).filter(Boolean))
  );

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
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DYNAMIC CATEGORY ROWS */}
      {categories.map((category) => {
        const categoryArticles = articles.filter((a) => a.category === category);
        if (categoryArticles.length === 0) return null;

        return (
          <section key={category} className="pb-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-end justify-between mb-5">
                <h2 className="text-xl font-light tracking-wide">{category}</h2>
                <a href="#" className="text-sm text-amber-400 hover:underline">View All</a>
              </div>
              <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
                {categoryArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="flex-shrink-0 w-[200px] cursor-pointer group"
                  >
                    <div className="overflow-hidden rounded-lg aspect-[3/4] bg-zinc-900">
                      <img
                        src={article.cover}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="mt-2.5 text-sm leading-snug group-hover:text-amber-400 line-clamp-2">
                      {article.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
