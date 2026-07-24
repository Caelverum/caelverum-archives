import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export type Article = {
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

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);

  const articles = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
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
    });

  // Sort by date (newest first)
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
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
