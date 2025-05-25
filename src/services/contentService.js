import CONTENT_CONFIG from "../config/content.js";

class ContentService {
  constructor() {
    this.config = CONTENT_CONFIG;
    this.cache = new Map();
  }

  // Generic method to fetch content with caching
  async fetchContent(path) {
    const cacheKey = path;
    const cached = this.cache.get(cacheKey);

    // Return cached content if still valid
    if (cached && Date.now() - cached.timestamp < this.config.cacheTimeout) {
      return cached.data;
    }

    try {
      // Use raw GitHub URL for direct JSON access
      const response = await fetch(`${this.config.rawUrl}/${path}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.status}`);
      }

      const data = await response.json();

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return data;
    } catch (error) {
      console.error(`Error fetching content from ${path}:`, error);

      // Return cached data if available, even if expired
      if (cached) {
        console.warn(`Using expired cache for ${path}`);
        return cached.data;
      }

      // Return fallback data
      return this.getFallbackData(path);
    }
  }

  // Specific methods for different content types
  async getPersonalInfo() {
    return this.fetchContent(this.config.paths.personal.bio);
  }

  async getExperience() {
    return this.fetchContent(this.config.paths.personal.experience);
  }

  async getResearch() {
    return this.fetchContent(this.config.paths.personal.research);
  }

  async getProjects() {
    return this.fetchContent(this.config.paths.projects.index);
  }

  async getTechnologies() {
    return this.fetchContent(this.config.paths.personal.skills);
  }

  async getBlogPosts() {
    return this.fetchContent(this.config.paths.blog.index);
  }

  async getBlogPost(slug) {
    return this.fetchContent(`${this.config.paths.blog.posts}/${slug}.json`);
  }

  // Get image URL from content repo
  getImageUrl(path) {
    if (!path) return "/default-image.jpg";

    // If it's already a full URL, return as is
    if (path.startsWith("http")) return path;

    // If it's a local path (starts with /), return as is
    if (path.startsWith("/")) return path;

    // Otherwise, construct the GitHub raw URL
    return `${this.config.rawUrl}/${path}`;
  }

  // Fallback data for when content can't be loaded
  getFallbackData(path) {
    return this.config.fallbackData[path] || {};
  }

  // Clear cache (useful for development)
  clearCache() {
    this.cache.clear();
  }

  // Preload critical content
  async preloadCriticalContent() {
    const criticalPaths = [
      this.config.paths.personal.bio,
      this.config.paths.personal.experience,
      this.config.paths.projects.index,
    ];

    await Promise.allSettled(
      criticalPaths.map((path) => this.fetchContent(path))
    );
  }

  // Get cache status (useful for debugging)
  getCacheStatus() {
    const status = {};
    for (const [key, value] of this.cache.entries()) {
      const age = Date.now() - value.timestamp;
      const isExpired = age > this.config.cacheTimeout;
      status[key] = {
        age: Math.round(age / 1000), // in seconds
        isExpired,
        size: JSON.stringify(value.data).length,
      };
    }
    return status;
  }

  // Force refresh content (bypasses cache)
  async refreshContent(path) {
    this.cache.delete(path);
    return this.fetchContent(path);
  }
}

// Create singleton instance
const contentService = new ContentService();

export default contentService;
