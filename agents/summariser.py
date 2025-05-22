from transformers import pipeline
import torch

class Summariser:
    def __init__(self):
        # Use BART model for summarization
        self.summarizer = pipeline(
            "summarization", 
            model="facebook/bart-large-cnn",
            device=0 if torch.cuda.is_available() else -1
        )
    
    def summarize_text(self, text, max_length=150, min_length=50):
        """Summarize a text to a short paragraph"""
        # Truncate text if it's too long for the model
        max_input_length = 1024  # BART's limit
        if len(text.split()) > max_input_length:
            text = " ".join(text.split()[:max_input_length])
        
        try:
            summary = self.summarizer(
                text, 
                max_length=max_length, 
                min_length=min_length, 
                do_sample=False
            )[0]['summary_text']
            return summary
        except Exception as e:
            print(f"Error summarizing text: {e}")
            # Return a truncated version if summarization fails
            return text[:max_length * 5] + "..."
    
    def outline(self, articles, num_articles=5):
        """Create an outline from multiple articles"""
        # Select a subset of articles if there are too many
        if len(articles) > num_articles:
            articles = articles[:num_articles]
        
        # Summarize each article
        bullets = []
        for article in articles:
            summary = self.summarize_text(article['text'])
            bullets.append({
                "title": article['title'],
                "summary": summary,
                "url": article['url']
            })
        
        # Create a combined outline
        outline = "# Tech News Roundup\n\n"
        for i, bullet in enumerate(bullets):
            outline += f"## {bullet['title']}\n\n"
            outline += f"{bullet['summary']}\n\n"
            outline += f"Source: {bullet['url']}\n\n"
        
        return outline, bullets

# For testing
if __name__ == "__main__":
    from extractor import Extractor
    
    extractor = Extractor()
    articles = extractor.collect_articles(3)
    
    summariser = Summariser()
    outline, bullets = summariser.outline(articles)
    
    print(outline) 