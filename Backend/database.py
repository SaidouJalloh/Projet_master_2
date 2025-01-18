# from sqlalchemy.orm import declarative_base, sessionmaker
# from sqlalchemy import create_engine, Column, Integer, Float, String, Date
# from datetime import datetime
# import os

# # Chemin absolu vers le fichier de base de données
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'immobilier.db')}"

# # Configuration du moteur
# engine = create_engine(DATABASE_URL, echo=True)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()

# class Property(Base):
#     __tablename__ = 'properties'
#     id = Column(Integer, primary_key=True)
#     title = Column(String)
#     price = Column(Float)  
#     surface_m2 = Column(Float)
#     neighborhood = Column(String)
#     location = Column(String)
#     city = Column(String)
#     property_type = Column(String)
#     date_added = Column(Date)
#     price_per_m2 = Column(Float)

# def init_db():
#     Base.metadata.create_all(engine)
#     return SessionLocal()

# def import_data(csv_path):
#     import pandas as pd
#     session = init_db()
#     df = pd.read_csv(csv_path)
    
#     df['date_added'] = pd.to_datetime(df['date_added']).dt.date
    
#     for _, row in df.iterrows():
#         prop = Property(**row.to_dict())
#         session.add(prop)
    
#     session.commit()
#     session.close()
# #Une nouvelle classe pour les alertes


# if __name__ == "__main__":
#     csv_path = r"C:\Users\Imam Said\Desktop\Projet_de_memoire_final_master2\immobilier_dashboard\data\processed\properties_cleaned.csv"
#     import_data(csv_path)
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import create_engine, Column, Integer, Float, String, Date, Boolean, DateTime  # Ajout de Boolean et DateTime
from datetime import datetime
import os

# Chemin absolu vers le fichier de base de données
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'immobilier.db')}"

# Configuration du moteur
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Property(Base):
    __tablename__ = 'properties'
    id = Column(Integer, primary_key=True)
    title = Column(String)
    price = Column(Float)  
    surface_m2 = Column(Float)
    neighborhood = Column(String)
    location = Column(String)
    city = Column(String)
    property_type = Column(String)
    date_added = Column(Date)
    price_per_m2 = Column(Float)

# Ajout de la nouvelle classe Alert ici
class Alert(Base):
    __tablename__ = 'alerts'
    id = Column(Integer, primary_key=True)
    email = Column(String, nullable=False)
    min_price = Column(Float)
    max_price = Column(Float)
    min_surface = Column(Float)
    max_surface = Column(Float)
    neighborhood = Column(String)
    property_type = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

def init_db():
    Base.metadata.create_all(engine)
    return SessionLocal()

def import_data(csv_path):
    import pandas as pd
    session = init_db()
    df = pd.read_csv(csv_path)
    
    df['date_added'] = pd.to_datetime(df['date_added']).dt.date
    
    for _, row in df.iterrows():
        prop = Property(**row.to_dict())
        session.add(prop)
    
    session.commit()
    session.close()

if __name__ == "__main__":
    csv_path = r"C:\Users\Imam Said\Desktop\Projet_de_memoire_final_master2\immobilier_dashboard\data\processed\properties_cleaned.csv"
    import_data(csv_path)