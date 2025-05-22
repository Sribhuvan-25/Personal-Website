import os
import requests
import json
from pathlib import Path
from PIL import Image
from io import BytesIO
from rake_nltk import Rake

class ImageTagger:
    def __init__(self):
        self.unsplash_key = os.environ.get("UNSPLASH_ACCESS_KEY")
        if not self.unsplash_key:
            raise ValueError("UNSPLASH_ACCESS_KEY environment variable not set")
        
        self.unsplash_api = "https://api.unsplash.com"
        self.rake = Rake()
        
        # Common tech blog tags
        self.canonical_tags = [
            "AI", "Machine Learning", "Web Development", "Cloud", "DevOps",
            "Cybersecurity", "Blockchain", "Mobile", "Data Science", "IoT",
            "Programming", "Hardware", "Software", "Startups", "Tech News",
            "Gaming", "AR/VR", "Robotics", "5G", "Quantum Computing"
        ]
    
    def fetch_image(self, topic, slug):
        """Fetch a relevant image from Unsplash"""
        try:
            # Search for a relevant image
            search_url = f"{self.unsplash_api}/photos/random"
            params = {
                "query": topic,
                "orientation": "landscape",
                "client_id": self.unsplash_key
            }
            
            response = requests.get(search_url, params=params)
            
            if response.status_code != 200:
                print(f"Unsplash API error: {response.status_code}, {response.text}")
                return "/blog_img/default.jpg", "Default", "#"
            
            data = response.json()
            
            # Download the image
            img_url = data["urls"]["regular"]
            img_response = requests.get(img_url)
            
            if img_response.status_code != 200:
                print(f"Image download error: {img_response.status_code}")
                return "/blog_img/default.jpg", "Default", "#"
            
            # Save the image
            img_dir = Path("public/blog_img")
            img_dir.mkdir(parents=True, exist_ok=True)
            
            img_filename = f"{slug}.jpg"
            img_path = img_dir / img_filename
            
            # Process and save image
            img = Image.open(BytesIO(img_response.content))
            img.save(img_path, "JPEG", quality=85)
            
            # Get photographer credit and link
            photographer = data["user"]["name"]
            photo_link = data["links"]["html"]
            
            return f"/blog_img/{img_filename}", photographer, photo_link
            
        except Exception as e:
            print(f"Error fetching image: {e}")
            return "/blog_img/default.jpg", "Default", "#"
    
    def extract_tags(self, content, num_tags=5):
        """Extract tags from content using RAKE algorithm"""
        try:
            # Extract keywords
            self.rake.extract_keywords_from_text(content)
            keywords = self.rake.get_ranked_phrases()[:10]  # Get top 10 candidates
            
            # Map to canonical tags when possible
            tags = []
            for keyword in keywords:
                for tag in self.canonical_tags:
                    if tag.lower() in keyword.lower():
                        if tag not in tags:
                            tags.append(tag)
                            break
            
            # If we don't have enough tags, add some generic ones
            if len(tags) < 3:
                for tag in ["Tech News", "Technology", "Innovation"]:
                    if tag not in tags:
                        tags.append(tag)
            
            # Limit to requested number
            return tags[:num_tags]
            
        except Exception as e:
            print(f"Error extracting tags: {e}")
            return ["Tech News", "Technology"]

# For testing
if __name__ == "__main__":
    image_tagger = ImageTagger()
    img_path, credit, link = image_tagger.fetch_image("artificial intelligence", "test-post")
    print(f"Image: {img_path}")
    print(f"Credit: {credit}")
    print(f"Link: {link}")
    
    sample_content = """
    Artificial intelligence and machine learning are transforming the tech industry.
    Cloud computing provides scalable infrastructure for modern applications.
    Cybersecurity remains a critical concern for enterprises and individuals alike.
    """
    
    tags = image_tagger.extract_tags(sample_content)
    print(f"Tags: {tags}") 