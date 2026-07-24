'use client';

import { useState } from 'react';

export default function Home() {
 const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const articles = [
    {
      id: 1,
      title: "The Tall Poppy Paradox and the Slow Erosion of the Australian Spirit",
      author: "Brian Pearce",
      excerpt: "A joke that isn't quite a joke...",
      cover: "https://picsum.photos/id/1015/600/400",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <nav className="border-b border-zinc-800 py-5">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-3xl font-light text-amber-400">CAELVERUM ARCHIVES</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-amber-400">ARTICLES</a>
            <a href="#" className="hover:text-amber-400">BOOKS</a>
            <a href="#" className="hover:text-amber-400">MUSIC</a>
            <a href="#" className="hover:text-amber-400">AUDIO</a>
            <a href="#" className="hover:text-amber-400">ABOUT</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="text-center z-10">
          <h1 className="text-6xl font-light tracking-tight">Ideas that challenge.</h1>
          <p className="text-3xl text-amber-400 mt-6">Perspectives that transform.</p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl mb-12">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} onClick={() => setSelectedArticle(article)} className="cursor-pointer group">
              <img src={article.cover} className="w-full aspect-video object-cover rounded-xl" />
              <h3 className="mt-6 text-2xl group-hover:text-amber-400 transition-colors">{article.title}</h3>
              <p className="text-zinc-400 mt-2">{article.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detail View */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 max-w-4xl w-full max-h-[90vh] overflow-auto rounded-2xl">
            <button onClick={() => setSelectedArticle(null)} className="float-right m-6 text-2xl">×</button>
            <img src={selectedArticle.cover} className="w-full h-96 object-cover" />
            <div className="p-12">
              <h1 className="text-5xl leading-tight">{selectedArticle.title}</h1>
              <p className="text-xl text-zinc-400 mt-6">{selectedArticle.author}</p>
              <div className="prose prose-invert mt-12 text-lg">
                Full article content will go here (coming in next steps).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
