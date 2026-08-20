from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func


class Base(DeclarativeBase):
    pass


class ListingMaster(Base):
    __tablename__ = "listing_master"

    id = Column(Integer, primary_key=True, index=True)
    business_name = Column(String(255))
    category = Column(String(100))
    city = Column(String(100))
    address = Column(Text)
    phone = Column(String(50))
    source = Column(String(100))
    created_at = Column(DateTime, server_default=func.now())