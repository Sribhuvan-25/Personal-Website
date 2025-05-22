import feedparser
from newspaper import Article
import random

class Extractor:
    def __init__(self):
        # Tech news RSS feeds
        self.feeds = [
            "https://techcrunch.com/feed/",
            "https://www.theverge.com/rss/index.xml",
            "https://www.wired.com/feed/rss",
            "https://www.technologyreview.com/feed/",
            "https://feeds.arstechnica.com/arstechnica/technology-lab"
        ]
    
    def fetch_rss(self, url):
        """Fetch articles from an RSS feed"""
        try:
            feed = feedparser.parse(url)
            return feed.entries
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return []
    
    def extract_article_content(self, url):
        """Extract full text content from a URL using newspaper3k"""
        try:
            article = Article(url)
            article.download()
            article.parse()
            
            return {
                "title": article.title,
                "text": article.text,
                "url": url,
                "authors": article.authors,
                "publish_date": article.publish_date
            }
        except Exception as e:
            print(f"Error extracting content from {url}: {e}")
            return None
    
    def collect_articles(self, max_articles=10):
        """Collect articles from all feeds"""
        all_entries = []
        
        # Fetch entries from all feeds
        for feed_url in self.feeds:
            entries = self.fetch_rss(feed_url)
            all_entries.extend(entries)
        
        # Sort by publication date (newest first) if available
        all_entries = sorted(
            all_entries, 
            key=lambda x: x.get('published_parsed', 0), 
            reverse=True
        )
        
        # Take the most recent entries
        recent_entries = all_entries[:max_articles]
        
        # Extract full content
        articles = []
        for entry in recent_entries:
            article = self.extract_article_content(entry.link)
            if article:
                articles.append(article)
        
        return articles

# For testing
if __name__ == "__main__":
    extractor = Extractor()
    articles = extractor.collect_articles(3)
    for i, article in enumerate(articles):
        print(f"\n--- Article {i+1} ---")
        print(f"Title: {article['title']}")
        print(f"URL: {article['url']}")
        print(f"Length: {len(article['text'])} chars")
        print(f"First 150 chars: {article['text'][:150]}...") 