// WordPress API Configuration and Utilities

// WordPress API URL for hackernull.com
const WP_API_URL = 'https://hackernull.com/wp-json/wp/v2';

export interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author: Array<{
      name: string;
      avatar_urls: Record<string, string>;
    }>;
    'wp:featuredmedia': Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term': Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

// Fetch posts with embedded author and featured image
export const fetchPosts = async (params: {
  per_page?: number;
  page?: number;
  categories?: number[];
  search?: string;
} = {}): Promise<WordPressPost[]> => {
  const queryParams = new URLSearchParams({
    _embed: 'true',
    per_page: String(params.per_page || 10),
    page: String(params.page || 1),
    ...(params.categories?.length && { categories: params.categories.join(',') }),
    ...(params.search && { search: params.search }),
  });

  try {
    const response = await fetch(`${WP_API_URL}/posts?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Fetch a single post by slug
export const fetchPostBySlug = async (slug: string): Promise<WordPressPost | null> => {
  try {
    const response = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed=true`);
    if (!response.ok) throw new Error('Failed to fetch post');
    const posts = await response.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

// Fetch categories
export const fetchCategories = async (): Promise<WordPressCategory[]> => {
  try {
    const response = await fetch(`${WP_API_URL}/categories?per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Helper to extract featured image URL
export const getFeaturedImage = (post: WordPressPost): string => {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg';
};

// Helper to extract author name
export const getAuthorName = (post: WordPressPost): string => {
  return post._embedded?.author?.[0]?.name || 'Anonymous';
};

// Helper to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Helper to strip HTML tags from excerpt
export const stripHtml = (html: string): string => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};
