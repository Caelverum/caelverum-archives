import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export async function GET() {
  try {
    if (!fs.existsSync(articlesDirectory)) {
      return NextResponse.json([]);
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
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error reading articles:', error);
    return NextResponse.json([], { status: 500 });
  }
}
