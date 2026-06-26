from elasticsearch import Elasticsearch
import json

# Connect to Elasticsearch
es = Elasticsearch(
    "https://localhost:9200",
    basic_auth=("username", "Password"),
    verify_certs=False
)

# Open JSON file
with open(r"/home/dipanlahiri/Downloads/voter_list_website/merged_voters_clean.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Insert into Elasticsearch
for i, voter in enumerate(data):
    es.index(
        index="voters",
        id=i,
        document=voter
    )

print("Done!")