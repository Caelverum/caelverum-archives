'use client';

import { useState } from 'react';

type Article = {
  id: number;
  title: string;
  author: string;
  excerpt: string;
  content: string;
  cover: string;
  category: string;
  date: string;
  readTime: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: "The Tall Poppy Paradox and the Slow Erosion of the Australian Spirit",
    author: "Brian Pearce",
    excerpt: "A joke that isn't quite a joke — and why it matters more than we admit.",
    content: `It happens in a thousand small ways. A colleague gets promoted and, within the hour, someone mutters that she "must have kissed the right arse." A mate buys a nice car and cops six months of "look at Mr Fancy over here." A teenager wins a scholarship and learns to shrug it off, because being visibly pleased with yourself is somehow worse than the achievement is good.

We call this tall poppy syndrome, and mostly we treat it as harmless larrikin banter — a bit of ribbing that keeps everyone humble and grounded. And often, that's exactly what it is.

But here's the unsettling reframe worth sitting with: what if the reflex to cut down the tall poppy isn't just a joke, but a quiet cultural machinery — one that trains a whole nation to keep its head down, guard its ambitions, and distrust its own?

The fair go was meant to lift the floor. The tall poppy reflex, at its worst, lowers the ceiling.

Healthy egalitarianism says: you are not better than me because of your title, your money, or your accent. It attacks unearned privilege and demands fairness. It is one of the best things about Australian culture.

Corrosive leveling says something different and darker: you are not allowed to rise, and if you do, we will punish you for it. It attacks excellence itself.

We don't decide to become smaller. We agree to it, one shrug at a time.`,
    cover: "/Tall Poppy Article Cover Art (1).png",
    category: "HUMAN BEHAVIOUR",
    date: "May 12, 2025",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "The Mind-Zillionaires: Inside the Secret Class That Owns the Ultimate Luxury—Their Own Attention",
    author: "Brian Pearce",
    excerpt: "The rarest commodity in the modern world is not money. It is focused attention.",
    content: `On a sixty-meter motor yacht drifting three miles off the coast of Montenegro, a man named Julian is watching a bank of monitors. He is not watching the markets. He is watching the live telemetry of a small experimental desalination plant and the slow oscillations of a deep-sea geothermal vent.

Julian is forty-four. His net worth is technically in the hundreds of millions, yet he owns no real estate, no cars, and no public profile. He is a ghost in the machine of global capital. He spends his days in a state of what he calls "surgical availability."

He is a progenitor of a new, nearly invisible class. They are beginning to be whispered about as "Time Chameleons" or the "Radical Shadow Wealthy." A more precise term is emerging: the Mind-Zillionaire.

These are individuals who have realised that in an era of infinite digital noise, the ultimate currency is no longer the dollar or the acre. It is the radical mastery of time, attention, clarity, and the surgical choice of whether and how to participate in human civilisation at all.

If the traditional elite are defined by what they own, the Mind-Zillionaire is defined by what they refuse to be bothered by.

Wealth, Julian says, is the distance between a stimulus and your response. If someone can provoke you, they own you.`,
    cover: "/Mind Zillionaire Cover Art (1).png",
    category: "PSYCHOLOGY",
    date: "May 10, 2025",
    readTime: "9 min read",
  },
  {
    id: 3,
    title: "Can Transformation Be Designed?",
    author: "Soozhee Low Pearce",
    excerpt: "What if organisational and personal change wasn’t left to chance?",
    content: `What if transformation wasn’t something that happens to us — or something we hope for — but something we can deliberately design?

Most organisational change fails not because people resist change, but because the change itself is poorly designed. We treat transformation as a motivational exercise rather than an architectural one.

The State A to State B Bridge is a simple but powerful idea: every meaningful transformation requires a designed path between where we are and where we need to be. Without that path, people either freeze or flail.

Transformation can be designed. Not perfectly, not once-and-for-all, but deliberately, iteratively, and with far greater success than the usual “vision + communication + hope” model.`,
    cover: "/Can transformation cover art (1).png",
    category: "TRANSFORMATIVE DESIGN",
    date: "May 8, 2025",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "The Permission Trap: When the Child Who Grew Up Still Has to Ask",
    author: "Soozhee Low Pearce",
    excerpt: "Some adults never stop asking for permission — even when no one is left to give it.",
    content: `Some of us grow up but never leave the child’s seat at the table.

We still wait for someone to tell us it’s okay. We still need the nod, the approval, the green light. Even when the original authority figures are long gone — or were never safe to begin with — the pattern remains.

The Permission Trap is the quiet inheritance of childhoods where autonomy was either withheld or punished. As adults we continue the habit of outsourcing our authority.

The way out is not rebellion. It is the slow, deliberate practice of granting yourself the permissions you once had to beg for.`,
    cover: "/Permission Trap cover art (1).png",
    category: "HUMAN BEHAVIOUR",
    date: "May 5, 2025",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "The Empty Cup: Why the Most Radical Thing You Can Do Is Stop Filling Up",
    author: "Soozhee Low Pearce",
    excerpt: "We keep pouring into already full cups. What happens when we stop?",
    content: `We live in a culture that treats emptiness as a problem to be solved.

Fill the diary. Fill the feed. Fill the silence. Fill the cupboard. Fill the self.

But an empty cup is not a deficit. It is capacity. It is readiness. It is the only condition in which something new can actually enter.

The most radical act available to many of us right now is not to do more, optimise harder, or consume differently. It is to stop pouring — and to allow the cup to empty.`,
    cover: "/The Empty Cup cover art (1).png",
    category: "PSYCHOLOGY",
    date: "May 3, 2025",
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "The $850,000 T-Shirt: Why Your Closet Is the New Art Gallery",
    author: "Soozhee Low Pearce",
    excerpt: "Fashion has become the new status signal. And the price of entry keeps rising.",
    content: `There are t-shirts that cost more than most people earn in a month. There are handbags that cost more than cars. There are sneakers that trade like assets.

This is not simply about fashion. It is about status in a world where traditional markers of success have become either inaccessible or unfashionable.

When housing, education, and security feel out of reach, the closet becomes a more immediate and controllable stage for identity and belonging.

The $850,000 t-shirt is not an aberration. It is a signal of how we are currently measuring worth.`,
    cover: "/The $850000 t shirt cover art (1).png",
    category: "SOCIETY",
    date: "Apr 28, 2025",
    readTime: "7 min read",
  },
];

export default function Home() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* ===== TOP NAV ===== */}
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

      {/* ===== HERO WITH IMAGE ===== */}
      <section className="relative h-[75vh] min-h-[560px] flex items-center overflow-hidden">
        {/* Hero Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Cael Archives Hero Image.png')" }}
        ></div>
        
        {/* Dark overlay for text readability */}
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

      {/* ===== LATEST ARTICLES ===== */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide">Latest Articles</h2>
            <a href="#" className="text-sm text-amber-400 hover:underline">View All</a>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {articles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
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

      {/* ===== HUMAN BEHAVIOUR ROW ===== */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-5">
            <h2 className="text-xl font-light tracking-wide">Human Behaviour</h2>
            <a href="#" className="text-sm text-amber-400 hover:underline">View All</a>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
            {articles
              .filter((a) => a.category === "HUMAN BEHAVIOUR")
              .map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
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
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ===== DETAIL MODAL ===== */}
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
              <div className="bg-zinc-900">
                <img
                  src={selectedArticle.cover}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover min-h-[420px]"
                />
              </div>

              <div className="p-8 md:p-12 flex flex-col">
                <p className="text-xs tracking-widest text-amber-500 mb-3">
                  {selectedArticle.category}
                </p>
                <h1 className="text-2xl md:text-3xl font-light leading-tight mb-4">
                  {selectedArticle.title}
                </h1>
                <p className="text-zinc-400 text-sm mb-6">
                  By {selectedArticle.author} · {selectedArticle.date} · {selectedArticle.readTime}
                </p>

                <div className="text-zinc-300 leading-relaxed mb-8 flex-1 whitespace-pre-line text-[15px]">
                  {selectedArticle.content}
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <button className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded text-sm font-medium">
                    READ FULL ARTICLE
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
        </div>
      )}
    </div>
  );
}
