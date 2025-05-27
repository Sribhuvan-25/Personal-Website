import os
import requests
import json
from pathlib import Path
from PIL import Image
from io import BytesIO
from rake_nltk import Rake
import google.generativeai as genai
import hashlib
import time

class ImageTagger:
    def __init__(self):
        self.gemini_key = os.environ.get("GOOGLE_GEMINI_API")
        
        if self.gemini_key:
            genai.configure(api_key=self.gemini_key)
            self.gemini_model = genai.GenerativeModel('gemini-pro')
        else:
            print("Warning: GOOGLE_GEMINI_API not set, using basic keyword search")
            self.gemini_model = None
        
        # Hugging Face Inference API (free)
        self.hf_api_url = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1"
        
        # Lorem Picsum for fallback
        self.lorem_picsum_api = "https://picsum.photos"
        
        self.rake = Rake()
        
        # Common tech blog tags
        self.canonical_tags = [
            "AI", "Machine Learning", "Web Development", "Cloud", "DevOps",
            "Cybersecurity", "Blockchain", "Mobile", "Data Science", "IoT",
            "Programming", "Hardware", "Software", "Startups", "Tech News",
            "Gaming", "AR/VR", "Robotics", "5G", "Quantum Computing"
        ]
    
    def generate_image_prompt(self, topic, content_summary=""):
        """Use Gemini to generate image prompts for Stable Diffusion"""
        if not self.gemini_model:
            # Fallback to basic prompt
            return f"professional technology illustration about {topic}, clean modern design, tech aesthetic"
        
        try:
            prompt = f"""
            Based on this blog post topic: "{topic}"
            {f"Content summary: {content_summary[:200]}..." if content_summary else ""}
            
            Create a detailed image prompt for Stable Diffusion to generate a professional tech blog hero image.
            
            Guidelines:
            - Professional, clean, modern aesthetic
            - Technology-focused visual elements
            - Suitable for a tech blog header
            - Avoid text or specific people
            - Focus on abstract tech concepts, devices, or environments
            
            Example prompts:
            - "modern server room with glowing blue lights, clean minimalist design, professional photography"
            - "abstract neural network visualization, blue and purple gradients, futuristic tech aesthetic"
            - "sleek laptop on modern desk, coding environment, soft lighting, professional workspace"
            
            Return only the image prompt, no additional text.
            """
            
            response = self.gemini_model.generate_content(prompt)
            return response.text.strip().strip('"').strip("'")
                
        except Exception as e:
            print(f"Error generating image prompt with Gemini: {e}")
            return f"professional technology illustration about {topic}, clean modern design, tech aesthetic"
    
    def generate_image_with_stable_diffusion(self, prompt, slug):
        """Generate image using Hugging Face Stable Diffusion (free)"""
        try:
            print(f"Generating image with prompt: '{prompt}'")
            
            headers = {
                "Content-Type": "application/json",
            }
            
            payload = {
                "inputs": prompt,
                "parameters": {
                    "width": 1024,
                    "height": 576,  # 16:9 aspect ratio for blog headers
                    "num_inference_steps": 20
                }
            }
            
            # Make request to Hugging Face
            response = requests.post(self.hf_api_url, headers=headers, json=payload)
            
            if response.status_code == 200:
                # Save the generated image
                img_dir = Path("public/blog_img")
                img_dir.mkdir(parents=True, exist_ok=True)
                
                img_filename = f"{slug}.jpg"
                img_path = img_dir / img_filename
                
                # Save image
                with open(img_path, "wb") as f:
                    f.write(response.content)
                
                return f"/blog_img/{img_filename}", "AI Generated (Stable Diffusion)", "#"
            
            elif response.status_code == 503:
                print("Stable Diffusion model is loading, falling back to Lorem Picsum...")
                return self.get_lorem_picsum_image(slug)
            
            else:
                print(f"Stable Diffusion API error: {response.status_code}")
                return self.get_lorem_picsum_image(slug)
                
        except Exception as e:
            print(f"Error generating image with Stable Diffusion: {e}")
            return self.get_lorem_picsum_image(slug)
    
    def get_lorem_picsum_image(self, slug):
        """Get a random image from Lorem Picsum (completely free)"""
        try:
            # Create a seed based on slug for consistent images
            seed = abs(hash(slug)) % 1000
            
            # Lorem Picsum URL with seed for consistency
            img_url = f"{self.lorem_picsum_api}/1024/576?random={seed}"
            
            response = requests.get(img_url)
            
            if response.status_code == 200:
                # Save the image
                img_dir = Path("public/blog_img")
                img_dir.mkdir(parents=True, exist_ok=True)
                
                img_filename = f"{slug}.jpg"
                img_path = img_dir / img_filename
                
                # Save image
                with open(img_path, "wb") as f:
                    f.write(response.content)
                
                return f"/blog_img/{img_filename}", "Lorem Picsum", "https://picsum.photos"
            else:
                print(f"Lorem Picsum error: {response.status_code}")
                return "/blog_img/default.jpg", "Default", "#"
                
        except Exception as e:
            print(f"Error fetching Lorem Picsum image: {e}")
            return "/blog_img/default.jpg", "Default", "#"
    
    def fetch_image(self, topic, slug, content_summary=""):
        """Fetch/generate a relevant image using free alternatives"""
        try:
            # Generate image prompt using Gemini
            image_prompt = self.generate_image_prompt(topic, content_summary)
            
            # Try to generate with Stable Diffusion first
            print("Attempting to generate image with Stable Diffusion...")
            return self.generate_image_with_stable_diffusion(image_prompt, slug)
            
        except Exception as e:
            print(f"Error in image fetching pipeline: {e}")
            return self.get_lorem_picsum_image(slug)
    
    def extract_tags(self, content, num_tags=5):
        """Extract tags from content using RAKE algorithm and Gemini enhancement"""
        try:
            # Use Gemini for better tag extraction if available
            if self.gemini_model:
                return self._extract_tags_with_gemini(content, num_tags)
            else:
                return self._extract_tags_with_rake(content, num_tags)
                
        except Exception as e:
            print(f"Error extracting tags: {e}")
            return ["Tech News", "Technology"]
    
    def _extract_tags_with_gemini(self, content, num_tags):
        """Use Gemini for intelligent tag extraction"""
        try:
            canonical_tags_str = ", ".join(self.canonical_tags)
            
            prompt = f"""
            Analyze this blog post content and extract {num_tags} relevant tags.
            
            Content: {content[:500]}...
            
            Choose from these canonical tags when possible: {canonical_tags_str}
            
            If the content doesn't match canonical tags, create appropriate new tags (2-3 words max).
            
            Return only the tags, separated by commas.
            """
            
            response = self.gemini_model.generate_content(prompt)
            tags = [tag.strip().strip('"').strip("'") for tag in response.text.strip().split(',')]
            
            return tags[:num_tags]
            
        except Exception as e:
            print(f"Error with Gemini tag extraction: {e}")
            return self._extract_tags_with_rake(content, num_tags)
    
    def _extract_tags_with_rake(self, content, num_tags):
        """Fallback tag extraction using RAKE algorithm"""
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

# For testing
if __name__ == "__main__":
    image_tagger = ImageTagger()
    
    sample_content = """
    Artificial intelligence and machine learning are transforming the tech industry.
    New neural network architectures are achieving breakthrough performance in computer vision tasks.
    """
    
    img_path, credit, link = image_tagger.fetch_image("AI breakthrough", "test-post", sample_content)
    print(f"Image: {img_path}")
    print(f"Credit: {credit}")
    print(f"Link: {link}")
    
    tags = image_tagger.extract_tags(sample_content)
    print(f"Tags: {tags}") 