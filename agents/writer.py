import requests
import json
import os

class Writer:
    def __init__(self):
        self.api_key = os.environ.get("TOGETHER_API_KEY")
        if not self.api_key:
            raise ValueError("TOGETHER_API_KEY environment variable not set")
        
        self.api_url = "https://api.together.xyz/v1/completions"
        self.model = "meta-llama/Llama-3-8b-hf"  # Free Llama-3 model
    
    def draft(self, outline):
        """Draft a blog post based on an outline"""
        prompt = f"""You are a professional tech blogger writing a comprehensive article based on the following outline.
Write a well-structured, informative blog post of approximately 900 words that covers all the topics in the outline.
Use Markdown formatting. Include section headers, bullet points where appropriate, and a conclusion.
Be factual, informative, and engaging. Avoid fluff and unnecessary words.

OUTLINE:
{outline}

Now, write the complete blog post:"""
        
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            data = {
                "model": self.model,
                "prompt": prompt,
                "max_tokens": 2048,
                "temperature": 0.7,
                "top_p": 0.9,
                "frequency_penalty": 0.5,
                "presence_penalty": 0.5
            }
            
            response = requests.post(
                self.api_url,
                headers=headers,
                data=json.dumps(data)
            )
            
            if response.status_code == 200:
                result = response.json()
                return result["choices"][0]["text"].strip()
            else:
                print(f"API error: {response.status_code}, {response.text}")
                return None
        
        except Exception as e:
            print(f"Error drafting content: {e}")
            return None

# For testing
if __name__ == "__main__":
    from extractor import Extractor
    from summariser import Summariser
    
    extractor = Extractor()
    articles = extractor.collect_articles(3)
    
    summariser = Summariser()
    outline, bullets = summariser.outline(articles)
    
    writer = Writer()
    draft = writer.draft(outline)
    
    print(draft[:500] + "...\n\n[Draft continues]") 