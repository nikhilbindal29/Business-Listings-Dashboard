import pandas as pd

# Read CSV
df = pd.read_csv("google_places_data.csv")

# Select required columns
df = df[
    [
        "name",
        "types",
        "city",
        "full_address",
        "phone_number",
    ]
]

# Rename columns
df.columns = [
    "business_name",
    "category",
    "city",
    "address",
    "phone",
]

# Replace Unknown phone values
df["phone"] = df["phone"].replace("Unknown", "")

# Add source column
df["source"] = "Google Maps"

# Remove duplicates
df = df.drop_duplicates(subset=["business_name", "address"])

# Save cleaned file
df.to_csv("business_listings_clean.csv", index=False)

print(df.head())
print("Total Records:", len(df))