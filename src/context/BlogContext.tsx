import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { blogsData as initialBlogsData } from '../data/blogs';

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

interface BlogContextType {
    blogs: BlogPost[];
    addBlog: (blog: Omit<BlogPost, 'id' | 'date' | 'author'>) => void;
    updateBlog: (id: string, updatedBlog: Partial<BlogPost>) => void;
    deleteBlog: (id: string) => void;
    getBlog: (id: string) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);

    // Initialize blogs from localStorage or fallback to static data
    useEffect(() => {
        const storedBlogs = localStorage.getItem('tradingSmartBlogs');
        if (storedBlogs) {
            setBlogs(JSON.parse(storedBlogs));
        } else {
            setBlogs(initialBlogsData);
            localStorage.setItem('tradingSmartBlogs', JSON.stringify(initialBlogsData));
        }
    }, []);

    // Sync to localStorage whenever blogs change
    useEffect(() => {
        if (blogs.length > 0) {
            localStorage.setItem('tradingSmartBlogs', JSON.stringify(blogs));
        }
    }, [blogs]);

    const addBlog = (blogData: Omit<BlogPost, 'id' | 'date' | 'author'>) => {
        const newBlog: BlogPost = {
            ...blogData,
            id: blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            author: {
                name: "Admin User",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
            }
        };
        setBlogs([newBlog, ...blogs]);
    };

    const updateBlog = (id: string, updatedFields: Partial<BlogPost>) => {
        setBlogs(blogs.map(blog => blog.id === id ? { ...blog, ...updatedFields } : blog));
    };

    const deleteBlog = (id: string) => {
        setBlogs(blogs.filter(blog => blog.id !== id));
    };

    const getBlog = (id: string) => {
        return blogs.find(blog => blog.id === id);
    };

    return (
        <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog, getBlog }}>
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
