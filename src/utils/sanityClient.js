// utils/sanityClient.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Create Sanity client with fallback values
export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || 'ua6bwc3k',
  dataset: process.env.REACT_APP_SANITY_DATASET || 'production',
  useCdn: true, // Enable CDN for faster response times
  apiVersion: '2024-01-01', // Use current date for API version
  token: process.env.REACT_APP_SANITY_API_TOKEN || '', // Optional, only needed for writes
});

// Helper function to generate image URLs from Sanity image objects
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  if (!source) return null;
  return builder.image(source);
}

// Query helpers for blog posts
export const sanityQueries = {
  // Get all blog posts
  getAllPosts: `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    slug,
    title,
    publishedAt,
    author,
    category,
    tags,
    excerpt,
    readTime,
    "featuredImage": featuredImage.asset->url,
    relatedProducts
  }`,

  // Get single post by slug
  getPostBySlug: (slug) => `*[_type == "blogPost" && slug.current == "${slug}"][0] {
    _id,
    slug,
    title,
    publishedAt,
    author,
    category,
    tags,
    excerpt,
    readTime,
    "featuredImage": featuredImage.asset->url,
    content,
    relatedProducts
  }`,

  // Get posts by category
  getPostsByCategory: (category) => `*[_type == "blogPost" && category == "${category}"] | order(publishedAt desc) {
    _id,
    slug,
    title,
    publishedAt,
    author,
    category,
    tags,
    excerpt,
    readTime,
    "featuredImage": featuredImage.asset->url,
    relatedProducts
  }`,
};
