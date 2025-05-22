import requests
import json
import os

class Reviewer:
    def __init__(self):
        self.api_key = os.environ.get("TOGETHER_API_KEY")
        if not self.api_key:
            raise ValueError("TOGETHER_API_KEY environment variable not set")
        
        self.api_url = "https://api.together.xyz/v1/completions"
        self.model = "meta-llama/Llama-3-8b-hf"  # Free Llama-3 model
    
    def review(self, draft):
        """Review and improve the draft"""
        prompt = f"""You are a professional editor reviewing a tech blog post. 
Your task is to improve the following draft by:
1. Fixing any grammar or spelling issues
2. Ensuring the post is under 1000 words while maintaining all key information
3. Improving readability and flow
4. Maintaining proper Markdown formatting
5. Ensuring factual accuracy

Here is the draft:

{draft}

Please provide the improved version of the post:"""
        
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            data = {
                "model": self.model,
                "prompt": prompt,
                "max_tokens": 2048,
                "temperature": 0.3,  # Lower temperature for more focused editing
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
                return draft  # Return original if review fails
        
        except Exception as e:
            print(f"Error reviewing content: {e}")
            return draft  # Return original if review fails

# For testing
if __name__ == "__main__":
    from extractor import Extractor
    from summariser import Summariser
    from writer import Writer
    
    extractor = Extractor()
    articles = extractor.collect_articles(3)
    
    summariser = Summariser()
    outline, bullets = summariser.outline(articles)
    
    writer = Writer()
    draft = writer.draft(outline)
    
    reviewer = Reviewer()
    final = reviewer.review(draft)
    
    print(final[:500] + "...\n\n[Final post continues]") 