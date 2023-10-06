from elasticsearch import Elasticsearch
import urllib3

# Disable SSL certificate verification (not recommended for production)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Create an Elasticsearch client with SSL verification disabled
client = Elasticsearch(
    ['https://localhost:9200'],
    verify_certs=True,  # Enable certificate verification
    ca_certs='/path/to/ca_cert.pem'  # Provide the CA certificate chain (optional but recommended)
)