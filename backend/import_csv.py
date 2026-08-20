import pandas as pd
import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Nikhil@123",
    database="business_dashboard"
)

cursor = conn.cursor()

df = pd.read_csv("business_listings.csv")

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

print("✅ Data imported successfully!")

cursor.close()
conn.close()

