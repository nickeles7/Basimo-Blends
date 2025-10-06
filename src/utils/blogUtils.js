// utils/blogUtils.js - Updated to fetch from Sanity
import { client } from './sanityClient';

// Utility functions
export const getAllBlogPosts = async () => {
  try {
    const query = `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      "slug": slug.current,
      title,
      "date": publishedAt,
      author,
      category,
      tags,
      excerpt,
      readTime,
      "featuredImage": featuredImage.asset->url,
      content,
      relatedProducts
    }`;

    const posts = await client.fetch(query);

    // Format dates for display
    return posts.map(post => ({
      ...post,
      date: formatDate(post.date),
    }));
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
};

export const getBlogPostBySlug = async (slug) => {
  try {
    const query = `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      "slug": slug.current,
      title,
      "date": publishedAt,
      author,
      category,
      tags,
      excerpt,
      readTime,
      "featuredImage": featuredImage.asset->url,
      content,
      relatedProducts
    }`;

    const post = await client.fetch(query, { slug });

    if (!post) return null;

    return {
      ...post,
      date: formatDate(post.date),
    };
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
};

export const getPostsByCategory = (posts, category) => {
  if (category === 'all') return posts;
  return posts.filter(post => post.category === category);
};

export const getPostsByTag = (posts, tag) => {
  return posts.filter(post => post.tags.includes(tag));
};

export const getFeaturedPosts = (posts, count = 3) => {
  return posts.slice(0, count);
};

export const searchPosts = (posts, searchTerm) => {
  const term = searchTerm.toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(term) ||
    post.excerpt.toLowerCase().includes(term) ||
    post.content.toLowerCase().includes(term) ||
    post.tags.some(tag => tag.toLowerCase().includes(term))
  );
};

export const getRelatedPosts = (posts, currentPost, count = 3) => {
  return posts
    .filter(post => post.slug !== currentPost.slug)
    .filter(post =>
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, count);
};

// Helper function to format dates
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to calculate reading time
export const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};
