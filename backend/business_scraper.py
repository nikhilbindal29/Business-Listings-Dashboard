import pandas as pd

data = [
    {
        "business_name": "ABC Electronics",
        "category": "Electronics",
        "city": "Delhi",
        "address": "Connaught Place",
        "phone": "9876543210",
        "source": "Sample"
    },
    {
        "business_name": "XYZ Restaurant",
        "category": "Restaurant",
        "city": "Noida",
        "address": "Sector 18",
        "phone": "9123456789",
        "source": "Sample"
    }
]

df = pd.DataFrame(data)

df.to_csv("business_listings.csv", index=False)

print("✅ business_listings.csv created successfully!")