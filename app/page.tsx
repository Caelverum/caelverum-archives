'use client';

import { useState } from 'react';

type Article = {
  id: number;
  title: string;
  author: string;
  excerpt: string;
  cover: string;
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
    },
    {
      id: 2,
      title: "The Mind-Zillionaires: Inside the Secret Class That Owns the Ultimate Luxury—Their Own Attention",
      author: "Brian Pearce",
      excerpt: "The rarest commodity in the modern world...",
      cover: "/Mind Zillionaire Cover Art (1).png",
    },
    {
      id: 3,
      title: "Can Transformation Be Designed?",
      author: "Soozhee Low Pearce",
      excerpt: "What if change wasn't random...",
      cover: "/Can transformation cover art (1).png",
    },
    {
      id: 4,
      title: "The Permission Trap: When the Child Who Grew Up Still Has to Ask",
      author: "Soozhee Low Pearce",
      excerpt: "Some adults never stop asking for permission...",
      cover: "/Permission Trap cover art (1).png",
    },
    {
      id: 5,
      title: "The Empty Cup: Why the Most Radical Thing You Can Do Is Stop Filling Up",
      author: "Soozhee Low Pearce",
      excerpt: "We keep pouring into already full cups...",
      cover: "/The Empty Cup cover art (1).png",
    },
    {
      id: 6,
      title: "The $850,000 T-Shirt: Why Your Closet Is the New Art Gallery",
      author: "Soozhee Low Pearce",
      excerpt: "Fashion has become the new status signal...",
      cover: "/The $850000 t shirt cover art (1).png",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <nav className="border-b border-zinc-800 py-5">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-3xl font-light text-amber-400">CAELVERUM ARCHIVES</div>
          <div className="flex gap-8 text-sm tracking-wider">
            <a href="#" className="hover:text-amber-400">ARTICLES</a>
            <a href="#" className="hover:text-amber-400">BOOKS</a>
            <a href="#" className="hover:text-amber-400">MUSIC</a>
            <a href="#" className="hover:text-amber-400">AUDIO</a>
            <a href="#" className="hover:text-amber-400">ABOUT</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative h-[55vh] flex items-center justify-center bg-zinc-900">
        <div className="text-center z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight">Ideas that challenge.</h1>
          <p className="text-2xl md:text-3xl text-amber-400 mt-6">Perspectives that transform.</p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl mb-12 font-light">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="cursor-pointer group"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={article.cover}
                  alt={article.title}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="mt-5 text-xl leading-snug group-hover:text-amber-400 transition-colors">
                {article.title}
              </h3>
              <p className="text-zinc-400 mt-2 text-sm">{article.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 max-w-4xl w-full max-h-[90vh] overflow-auto rounded-2xl relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 text-3xl z-10 hover:text-amber-400"
            >
              ×
            </button>
            <img
              src={selectedArticle.cover}
              alt={selectedArticle.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-10 md:p-14">
              <h1 className="text-3xl md:text-4xl leading-tight font-light">
                {selectedArticle.title}
              </h1>
              <p className="text-lg text-zinc-400 mt-4">{selectedArticle.author}</p>
              <div className="mt-10 text-lg leading-relaxed text-zinc-300">
                Full formatted article content will go here in the next step.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
