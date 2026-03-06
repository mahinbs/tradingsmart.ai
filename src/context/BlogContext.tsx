import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { blogsData as initialBlogsData } from '../data/blogs';
import { supabase } from '../lib/supabaseClient';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
}

export type AddBlogInput = Omit<BlogPost, 'id' | 'date' | 'author'> & {
  date?: string;
  author?: { name: string; avatar: string };
};

interface BlogContextType {
  blogs: BlogPost[];
  isLoading: boolean;
  addBlog: (blog: AddBlogInput) => Promise<BlogPost | null>;
  updateBlog: (id: string, updatedBlog: Partial<BlogPost>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  getBlog: (id: string) => BlogPost | undefined;
  refresh: () => Promise<void>;
}

type BlogRow = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date?: string;
  readTime?: string;
  author_name?: string;
  author_avatar?: string;
  created_at?: string;
};

const DEFAULT_AUTHOR = {
  name: 'Admin User',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
};

const mapRowToBlog = (row: BlogRow): BlogPost => {
  const formattedDate =
    row.date ??
    (row.created_at
      ? new Date(row.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }));

  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    image: row.image,
    date: formattedDate,
    readTime: row.readTime ?? '5 min read',
    category: row.category,
    author: {
      name: row.author_name ?? DEFAULT_AUTHOR.name,
      avatar: row.author_avatar ?? DEFAULT_AUTHOR.avatar,
    },
  };
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadFromSupabase = async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('[Supabase] Failed to load blogs, falling back to static data:', error.message);
      setBlogs(initialBlogsData);
      setIsLoading(false);
      return;
    }

    if (!data || data.length === 0) {
      // No rows yet, use initial seed so the UI is not empty
      setBlogs(initialBlogsData);
      setIsLoading(false);
      return;
    }

    setBlogs(data.map((row) => mapRowToBlog(row as BlogRow)));
    setIsLoading(false);
  };

  useEffect(() => {
    void loadFromSupabase();
  }, []);

  const addBlog = async (blogData: AddBlogInput) => {
    const id = blogData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const date =
      blogData.date ??
      new Date().toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    const author = blogData.author ?? DEFAULT_AUTHOR;

    const payload = {
      id,
      title: blogData.title,
      excerpt: blogData.excerpt,
      content: blogData.content,
      image: blogData.image,
      category: blogData.category,
      readTime: blogData.readTime,
      date,
      author_name: author.name,
      author_avatar: author.avatar,
    };

    const { data, error } = await supabase
      .from('blogs')
      .insert(payload)
      .select()
      .single();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('[Supabase] Failed to add blog:', error.message);
      return null;
    }

    const newBlog = mapRowToBlog(data as BlogRow);
    setBlogs((prev) => [newBlog, ...prev.filter((b) => b.id !== newBlog.id)]);
    return newBlog;
  };

  const updateBlog = async (id: string, updatedFields: Partial<BlogPost>) => {
    const payload: Record<string, unknown> = { ...updatedFields };

    if (updatedFields.author) {
      payload.author_name = updatedFields.author.name;
      payload.author_avatar = updatedFields.author.avatar;
      delete payload.author;
    }

    const { error } = await supabase
      .from('blogs')
      .update(payload)
      .eq('id', id);

    if (error) {
      // eslint-disable-next-line no-console
      console.error('[Supabase] Failed to update blog:', error.message);
      return;
    }

    setBlogs((prev) => prev.map((blog) => (blog.id === id ? { ...blog, ...updatedFields } : blog)));
  };

  const deleteBlog = async (id: string) => {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      // eslint-disable-next-line no-console
      console.error('[Supabase] Failed to delete blog:', error.message);
      return;
    }

    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  const getBlog = (id: string) => {
    return blogs.find((blog) => blog.id === id);
  };

  const refresh = async () => {
    await loadFromSupabase();
  };

  return (
    <BlogContext.Provider
      value={{ blogs, isLoading, addBlog, updateBlog, deleteBlog, getBlog, refresh }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogs must be used within a BlogProvider');
  }
  return context;
};
