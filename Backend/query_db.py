# query_db.py
from database import engine, Property
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)
session = Session()

# Voir toutes les propriétés
properties = session.query(Property).all()
for prop in properties:
    print(f"Titre: {prop.title}")
    print(f"Prix: {prop.price:,.0f} FCFA")
    print(f"Surface: {prop.surface_m2} m²")
    print("-" * 50)

# Statistiques par quartier
from sqlalchemy import func
stats = session.query(
    Property.neighborhood,
    func.count(Property.id),
    func.avg(Property.price),
    func.avg(Property.price_per_m2)
).group_by(Property.neighborhood).all()

for neighborhood, count, avg_price, avg_price_m2 in stats:
    print(f"\nQuartier: {neighborhood}")
    print(f"Nombre de biens: {count}")
    print(f"Prix moyen: {avg_price:,.0f} FCFA")