import pandas as pd
import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="SQL@123",
    database="business_dashboard"
)

cursor = conn.cursor()

df = pd.read_csv("business_listings_500plus.csv")

for _, row in df.iterrows():
    cursor.execute("""
        INSERT INTO listing_master
        (business_name, category, city, address, phone, source)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        row["business_name"],
        row["category"],
        row["city"],
        row["address"],
        row["phone"],
        row["source"]
    ))

conn.commit()

print(f"Data imported successfully: {len(df)} records")

cursor.close()
conn.close()