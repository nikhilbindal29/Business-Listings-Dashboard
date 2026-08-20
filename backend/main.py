import pandas as pd

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text, func
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import engine, SessionLocal
from models import Base, ListingMaster
app = FastAPI()


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create all tables
Base.metadata.create_all(bind=engine)


# ===========================
# DB SESSION DEPENDENCY
# ===========================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "Honeybee Digital API is Working!"}


@app.get("/test")
def test():
    return {"status": "success"}


# ===========================
# AGGREGATE COUNTS
# ===========================

@app.get("/city-count")
def city_count():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT city, COUNT(*) AS total
            FROM listing_master
            GROUP BY city
        """))

        data = [{"city": row.city, "total": row.total} for row in result]

    return data


@app.get("/category-count")
def category_count():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT category, COUNT(*) AS total
            FROM listing_master
            GROUP BY category
        """))

        data = [{"category": row.category, "total": row.total} for row in result]

    return data

@app.get("/source-count")
def source_count():

    with engine.connect() as conn:

        result = conn.execute(text("""
            SELECT 
                COALESCE(source, 'Unknown') AS source,
                COUNT(*) AS total
            FROM listing_master
            GROUP BY source
            ORDER BY total DESC
        """))


        data = [
            {
                "source": row.source,
                "total": row.total
            }
            for row in result
        ]


    return data


@app.get("/total-count")
def total_count(db: Session = Depends(get_db)):
    count = db.query(func.count(ListingMaster.id)).scalar()
    return {"total": count}


# ===========================
# BUSINESS LIST
# ===========================

@app.get("/business-list")
def business_list():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT id, business_name, category, city, address, phone, source
            FROM listing_master
        """))

        data = [
            {
                "id": row.id,
                "business_name": row.business_name,
                "category": row.category,
                "city": row.city,
                "address": row.address,
                "phone": row.phone,
                "source": row.source,
            }
            for row in result
        ]

    return data


class BusinessCreate(BaseModel):
    business_name: str
    category: str
    city: str
    address: str
    phone: str
    source: str


# ===========================
# ADD BUSINESS
# ===========================

@app.post("/add-business")
def add_business(data: BusinessCreate, db: Session = Depends(get_db)):
    new_business = ListingMaster(
        business_name=data.business_name,
        category=data.category,
        city=data.city,
        address=data.address,
        phone=data.phone,
        source=data.source,
    )

    db.add(new_business)
    db.commit()
    db.refresh(new_business)

    return {
        "message": "Business added successfully",
        "id": new_business.id,
    }


# ===========================
# UPDATE BUSINESS
# ===========================

@app.put("/update-business/{business_id}")
def update_business(business_id: int, data: BusinessCreate, db: Session = Depends(get_db)):
    business = db.query(ListingMaster).filter(
        ListingMaster.id == business_id
    ).first()

    if business is None:
        raise HTTPException(status_code=404, detail="Business not found")

    business.business_name = data.business_name
    business.category = data.category
    business.city = data.city
    business.address = data.address
    business.phone = data.phone
    business.source = data.source

    db.commit()
    db.refresh(business)

    return {"message": "Business updated successfully"}


# ===========================
# DELETE BUSINESS
# ===========================

@app.delete("/delete-business/{business_id}")
def delete_business(business_id: int, db: Session = Depends(get_db)):
    business = db.query(ListingMaster).filter(
        ListingMaster.id == business_id
    ).first()

    if business is None:
        raise HTTPException(status_code=404, detail="Business not found")

    db.delete(business)
    db.commit()

    return {"message": "Business deleted successfully"}


# ===========================
# BULK INSERT CSV DATA
# ===========================
@app.post("/insert-listings")
def insert_listings(db: Session = Depends(get_db)):

    try:
        df = pd.read_csv("business_listings_clean.csv")

        print("CSV Loaded")
        print("Rows:", len(df))
        print("Columns:", df.columns.tolist())

        listings = []

        for _, row in df.iterrows():

            listings.append(
                ListingMaster(
                    business_name=str(row["business_name"]),
                    category=str(row["category"]),
                    city=str(row["city"]),
                    address=str(row["address"]),
                    phone=str(row["phone"]),
                    source=str(row["source"])
                )
            )

        print("Records ready:", len(listings))

        db.bulk_save_objects(listings)
        db.commit()

        return {
            "message": "Listings inserted successfully",
            "records": len(listings)
        }

    except Exception as e:
        db.rollback()
        print("ERROR:", e)

        return {
            "error": str(e)
        }
    # ===========================
# CLEAR DATABASE (TEMP)
# ===========================

@app.delete("/clear-data")
def clear_data(db: Session = Depends(get_db)):
    db.query(ListingMaster).delete()
    db.commit()

    return {
        "message": "All data deleted"
    }