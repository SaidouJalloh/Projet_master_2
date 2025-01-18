# from fastapi import FastAPI, Depends, HTTPException
# from sqlalchemy.orm import Session
# from database import SessionLocal, Property
# from typing import List
# from sqlalchemy import func
# from pydantic import BaseModel

# app = FastAPI(title="API Immobilier Dakar",
#             description="API pour l'analyse du marché immobilier à Dakar")

# # Dépendance pour la base de données
# def get_db():
#    db = SessionLocal()
#    try:
#        yield db
#    finally:
#        db.close()

# # Modèles Pydantic
# class PropertyBase(BaseModel):
#    title: str
#    price: float
#    surface_m2: float
#    neighborhood: str
#    location: str
#    city: str
#    property_type: str
#    price_per_m2: float

#    class Config:
#        from_attributes = True

# # Routes API
# @app.get("/properties/", response_model=List[PropertyBase], 
#         description="Liste toutes les propriétés")
# def get_properties(db: Session = Depends(get_db)):
#    return db.query(Property).all()

# @app.get("/stats/neighborhood/{neighborhood}",
#         description="Statistiques par quartier")
# def get_neighborhood_stats(neighborhood: str, db: Session = Depends(get_db)):
#    stats = db.query(
#        func.count(Property.id).label('total'),
#        func.avg(Property.price).label('avg_price'),
#        func.avg(Property.price_per_m2).label('avg_price_m2'),
#        func.min(Property.price).label('min_price'),
#        func.max(Property.price).label('max_price')
#    ).filter(Property.neighborhood == neighborhood).first()
   
#    if not stats.total:
#        raise HTTPException(status_code=404, detail="Quartier non trouvé")
   
#    return {
#        "neighborhood": neighborhood,
#        "total_properties": stats.total,
#        "average_price": round(stats.avg_price, 2),
#        "average_price_m2": round(stats.avg_price_m2, 2),
#        "min_price": stats.min_price,
#        "max_price": stats.max_price
#    }

# @app.get("/market_trends",
#         description="Tendances du marché par quartier")
# def get_market_trends(db: Session = Depends(get_db)):
#    trends = db.query(
#        Property.neighborhood,
#        func.count(Property.id).label('total'),
#        func.avg(Property.price_per_m2).label('avg_price_m2')
#    ).group_by(Property.neighborhood).all()
   
#    return [{
#        "neighborhood": t.neighborhood,
#        "total_listings": t.total,
#        "average_price_m2": round(t.avg_price_m2, 2)
#    } for t in trends]

# @app.get("/price_range",
#         description="Distribution des prix par gamme")
# def get_price_ranges(db: Session = Depends(get_db)):
#    ranges = [
#        (0, 50_000_000, "0-50M"),
#        (50_000_000, 100_000_000, "50M-100M"),
#        (100_000_000, 200_000_000, "100M-200M"),
#        (200_000_000, float('inf'), "200M+")
#    ]
   
#    result = []
#    for min_price, max_price, label in ranges:
#        query = db.query(Property)
#        if max_price == float('inf'):
#            count = query.filter(Property.price >= min_price).count()
#        else:
#            count = query.filter(Property.price.between(min_price, max_price)).count()
           
#        result.append({
#            "range": label,
#            "min": min_price,
#            "max": max_price if max_price != float('inf') else None,
#            "count": count
#        })
   
#    return {"ranges": result}

# @app.get("/quartiers",
#         description="Liste des quartiers disponibles")
# def get_neighborhoods(db: Session = Depends(get_db)):
#    neighborhoods = db.query(Property.neighborhood).distinct().all()
#    return [n[0] for n in neighborhoods]

# @app.get("/property_types",
#         description="Types de propriétés disponibles")
# def get_property_types(db: Session = Depends(get_db)):
#    types = db.query(Property.property_type).distinct().all()
#    return [t[0] for t in types]

# @app.get("/properties/search/",
#         description="Recherche de propriétés avec filtres")
# def search_properties(
#    min_price: float = None,
#    max_price: float = None,
#    min_surface: float = None,
#    max_surface: float = None,
#    neighborhood: str = None,
#    property_type: str = None,
#    db: Session = Depends(get_db)
# ):
#    query = db.query(Property)
   
#    if min_price:
#        query = query.filter(Property.price >= min_price)
#    if max_price:
#        query = query.filter(Property.price <= max_price)
#    if min_surface:
#        query = query.filter(Property.surface_m2 >= min_surface)
#    if max_surface:
#        query = query.filter(Property.surface_m2 <= max_surface)
#    if neighborhood:
#        query = query.filter(Property.neighborhood == neighborhood)
#    if property_type:
#        query = query.filter(Property.property_type == property_type)
       
#    return query.all()

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Ajoutez cet import en haut

from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy import func, extract, and_
from database import SessionLocal, Property, Alert, engine  # Ajout de Alert ici
from typing import List
from pydantic import BaseModel
from enum import Enum
from datetime import datetime, timedelta
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
import statistics
from fastapi.middleware.cors import CORSMiddleware

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
import os
from pathlib import Path
import joblib


# Pour les modèles
import joblib
import numpy as np
import pandas as pd
 # Vos imports actuels restent inchangés...

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

# Configuration e-mail
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr

mail_config = ConnectionConfig(
    MAIL_USERNAME="saidouhw02@gmail.com",
    MAIL_PASSWORD="kcfbkolltvxgwxug",  # Assurez-vous que c'est bien le mot de passe d'application Gmail
    MAIL_FROM="saidouhw02@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    MAIL_FROM_NAME="Service Immobilier"  # Ajout du nom d'expéditeur
)

# Créer une instance unique de FastMail
fastmail = FastMail(mail_config)

# Créer l'instance FastMail
fm = FastMail(mail_config)
# Configuration de l'API
app = FastAPI(title="API Immobilier Dakar")
# Configuration CORS - Ajoutez ceci avant toute autre route
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
]
# Configuration CORS plus permissive
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Liste des origines autorisées
    allow_credentials=True,
    allow_methods=["*"],    # Autorise toutes les méthodes
    allow_headers=["*"],    # Autorise tous les headers
    expose_headers=["*"],   # Expose tous les headers
    max_age=3600,          # Cache la réponse preflight pendant 1 heure
)
# Nouveaux modèles Pydantic pour les alertes (à mettre avec vos autres modèles Pydantic)
class AlertCreate(BaseModel):
    email: str
    min_price: float | None = None
    max_price: float | None = None
    min_surface: float | None = None
    max_surface: float | None = None
    neighborhood: str | None = None
    property_type: str | None = None

class AlertResponse(BaseModel):
    id: int
    email: str
    min_price: float | None
    max_price: float | None
    min_surface: float | None
    max_surface: float | None
    neighborhood: str | None
    property_type: str | None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ModelType(str, Enum):
    optimized = "optimized"
    randomforest = "randomforest"

# Modèles Pydantic
class PredictionRequest(BaseModel):
    surface: float
    neighborhood: str
    model_type: ModelType

class PropertyBase(BaseModel):
    title: str
    price: float
    surface_m2: float
    neighborhood: str
    location: str
    city: str
    property_type: str
    price_per_m2: float

    class Config:
        from_attributes = True


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    """Test the database connection"""
    try:
        result = db.query(Property).first()
        return {"message": "Database connection successful", "first_record": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/properties/")
def get_properties(db: Session = Depends(get_db)):
    try:
        properties = db.query(Property).all()
        return properties
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Nouvelle route pour les prédictions
# Définir le chemin de base du backend
BASE_DIR = Path(__file__).resolve().parent

# Chemins des modèles
OPTIMIZED_MODEL_PATH = os.path.join(BASE_DIR, "models", "optimized_model.joblib")
RF_MODEL_PATH = os.path.join(BASE_DIR, "models", "random_forest_model.joblib")

# Chargement des modèles
try:
    optimized_model = joblib.load(OPTIMIZED_MODEL_PATH)
    rf_model = joblib.load(RF_MODEL_PATH)
    print("Modèles chargés avec succès !")
except Exception as e:
    print(f"Erreur lors du chargement des modèles: {str(e)}")

@app.get("/models-info")
def get_models_info():
    # Garder les informations des modèles
    models_info = {
        "models": [
            {
                "id": "optimized",
                "name": "Modèle optimisé",
                "description": "Modèle optimisé pour la prédiction des prix immobiliers",
                "status": "loaded" if 'optimized_model' in globals() else "not_loaded"
            },
            {
                "id": "randomforest",
                "name": "Random Forest",
                "description": "Modèle Random Forest pour la prédiction des prix immobiliers",
                "status": "loaded" if 'rf_model' in globals() else "not_loaded"
            }
        ]
    }
    return models_info

# Endpoint de prédiction modifié
@app.post("/predict")
def predict_price(request: PredictionRequest):
    try:
        test_data = pd.DataFrame({
            'surface_m2': [request.surface],
            'neighborhood': [request.neighborhood],
            'city': ['Dakar'],  # Si nécessaire pour votre modèle
        })

        # Sélection du modèle
        if request.model_type == "optimized":
            model = optimized_model
            model_name = "Modèle optimisé"
        else:
            model = rf_model
            model_name = "Random Forest"

        # Prédiction
        prediction = model.predict(test_data)[0]

        return {
            "model_used": model_name,
            "surface": request.surface,
            "neighborhood": request.neighborhood,
            "prediction": f"{prediction:.2f}",
            "price_exact": f"{(prediction * 1000000):.0f}"  # Si la prédiction est en millions
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@app.get("/available-neighborhoods")
def get_available_neighborhoods(db: Session = Depends(get_db)):
    # Récupérer dynamiquement les quartiers depuis la base de données
    neighborhoods = db.query(Property.neighborhood).distinct().all()
    return {
        "neighborhoods": [n[0] for n in neighborhoods]
    }

@app.get("/models-info")
def get_models_info():
    return {
        "models": [
            {
                "id": "optimized",
                "name": "Modèle optimisé",
                "description": "Modèle optimisé pour la prédiction des prix immobiliers"
            },
            {
                "id": "randomforest",
                "name": "Random Forest",
                "description": "Modèle Random Forest pour la prédiction des prix immobiliers"
            }
        ]
    }
#Ajout de new métriques
@app.get("/market-insights")
def get_market_insights(db: Session = Depends(get_db)):
    try:
        # Prix moyen
        avg_price = db.query(func.avg(Property.price)).scalar() or 0

        # Prix médian (méthode alternative)
        prices = [p.price for p in db.query(Property.price).all()]
        median_price = statistics.median(prices) if prices else 0

        # Prix minimum et maximum
        min_price = db.query(func.min(Property.price)).scalar() or 0
        max_price = db.query(func.max(Property.price)).scalar() or 0

        # Prix moyen au m²
        avg_price_m2 = db.query(func.avg(Property.price_per_m2)).scalar() or 0

        # Analyse par quartier
        neighborhood_analysis = (
            db.query(
                Property.neighborhood,
                func.count(Property.id).label('total_properties'),
                func.avg(Property.price).label('avg_price'),
                func.avg(Property.price_per_m2).label('avg_price_m2')
            )
            .group_by(Property.neighborhood)
            .all()
        )

        # Distribution des types de propriété
        property_distribution = (
            db.query(
                Property.property_type,
                func.count(Property.id).label('count')
            )
            .group_by(Property.property_type)
            .all()
        )

        return {
            "price_metrics": {
                "average": avg_price,
                "median": median_price,
                "min": min_price,
                "max": max_price,
                "price_per_m2": avg_price_m2
            },
            "neighborhood_analysis": [
                {
                    "neighborhood": n.neighborhood,
                    "total_properties": n.total_properties,
                    "avg_price": n.avg_price,
                    "avg_price_m2": n.avg_price_m2
                } for n in neighborhood_analysis
            ],
            "property_distribution": [
                {
                    "property_type": p.property_type,
                    "count": p.count
                } for p in property_distribution
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#ajout des cartes 
@app.get("/maps")
def get_maps():
    return {
        "maps": {
            "terrains": "/static/carte_terrains_dakar_luxe.html",
            "logements": "/static/carte_logements.dakar.html"
        }
    }

# Nouvelles routes pour les métriques temporelles
@app.get("/time-based-metrics")
def get_time_based_metrics(db: Session = Depends(get_db)):
    try:
        # Prix moyen par mois
        monthly_prices = db.query(
            extract('year', Property.date_added).label('year'),
            extract('month', Property.date_added).label('month'),
            func.avg(Property.price).label('avg_price'),
            func.count(Property.id).label('total_properties')
        ).group_by(
            extract('year', Property.date_added),
            extract('month', Property.date_added)
        ).all()

        # Variation des prix par quartier sur le temps
        neighborhood_trends = db.query(
            Property.neighborhood,
            extract('year', Property.date_added).label('year'),
            extract('month', Property.date_added).label('month'),
            func.avg(Property.price_per_m2).label('avg_price_m2')
        ).group_by(
            Property.neighborhood,
            extract('year', Property.date_added),
            extract('month', Property.date_added)
        ).all()

        return {
            "monthly_prices": [
                {
                    "year": item.year,
                    "month": item.month,
                    "avg_price": item.avg_price,
                    "total_properties": item.total_properties
                } for item in monthly_prices
            ],
            "neighborhood_trends": [
                {
                    "neighborhood": item.neighborhood,
                    "year": item.year,
                    "month": item.month,
                    "avg_price_m2": item.avg_price_m2
                } for item in neighborhood_trends
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Route pour créer une alerte
@app.post("/alerts/", response_model=AlertResponse)
def create_alert(alert: AlertCreate, db: Session = Depends(get_db)):
    try:
        db_alert = Alert(**alert.dict())  # Créez un nouvel objet Alert à partir des données fournies.
        db.add(db_alert)  # Ajoutez l'alerte à la session.
        db.commit()  # Engagez la transaction.
        db.refresh(db_alert)  # Rafraîchissez l'objet pour obtenir l'ID généré.
        return db_alert  # Retournez l'alerte créée.
    except Exception as e:
        db.rollback()  # En cas d'erreur, annulez la transaction.
        raise HTTPException(status_code=500, detail=str(e))  # Renvoie une erreur HTTP.

# Route pour obtenir les alertes d'un utilisateur par e-mail
@app.get("/alerts/{email}", response_model=List[AlertResponse])
def get_user_alerts(email: str, db: Session = Depends(get_db)):
    alerts = db.query(Alert).filter(Alert.email == email).all()  # Récupérez toutes les alertes associées à cet e-mail.
    return alerts

# Route pour supprimer une alerte par ID
@app.delete("/alerts/{alert_id}")
def delete_alert(alert_id: int, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()  # Récupérez l'alerte par son ID.
    if not alert:
        raise HTTPException(status_code=404, detail="Alerte non trouvée")  # Si l'alerte n'existe pas, renvoyez une erreur.
    
    db.delete(alert)  # Supprimez l'alerte de la session.
    db.commit()  # Engagez la transaction.
    
    return {"message": "Alerte supprimée avec succès"}  # Confirmez la suppression.

async def send_alert_email(email: str, properties: List[Property]):
    try:
        print(f"Début de l'envoi d'email à {email}")
        print(f"Nombre de propriétés à envoyer : {len(properties)}")
        
        properties_list = "\n".join([
            f"- {prop.title} à {prop.price:,.0f} FCFA ({prop.surface_m2} m²) dans {prop.neighborhood}"
            for prop in properties
        ])
        
        print("Construction du message...")
        message = MessageSchema(
            subject="Nouvelles propriétés correspondant à vos critères",
            recipients=[email],
            body=f"""
            Bonjour,

            Nous avons trouvé {len(properties)} nouvelle(s) propriété(s) correspondant à vos critères :

            {properties_list}

            Cordialement,
            Votre service immobilier
            """,
            subtype="plain"  # Ajout du sous-type
        )
        
        print("Configuration email...")
        print(f"Serveur SMTP: {mail_config.MAIL_SERVER}")
        print(f"Port: {mail_config.MAIL_PORT}")
        print(f"Utilisateur: {mail_config.MAIL_USERNAME}")
        
        print("Envoi de l'email...")
        fastmail = FastMail(mail_config)
        await fastmail.send_message(message)
        
        print("Email envoyé avec succès!")
        return True
        
    except Exception as e:
        print(f"Erreur détaillée lors de l'envoi de l'email: {str(e)}")
        print(f"Type d'erreur: {type(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail={"message": "Erreur lors de l'envoi de l'email", "error": str(e)}
        )
# Route pour vérifier les alertes et envoyer des e-mails si des propriétés correspondent aux critères.
@app.post("/check-alerts")
async def check_alerts(background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    try:
        # Modifier la période à 1 an au lieu de 1 jour
        recent_properties = db.query(Property).filter(
            Property.date_added >= datetime.now().date() - timedelta(days=365)  # Changé de 1 à 365
        ).all()
        
        print(f"Propriétés trouvées: {len(recent_properties)}")
        
        if not recent_properties:
            return {
                "message": "Aucune propriété trouvée",
                "properties_count": 0,
                "status": "success"
            }
        
        alerts = db.query(Alert).filter(Alert.is_active == True).all()
        print(f"Alertes actives trouvées: {len(alerts)}")
        
        alerts_processed = 0
        for alert in alerts:
            matches = []
            for prop in recent_properties:
                if (
                    (alert.min_price is None or prop.price >= alert.min_price) and 
                    (alert.max_price is None or prop.price <= alert.max_price) and 
                    (alert.min_surface is None or prop.surface_m2 >= alert.min_surface) and 
                    (alert.max_surface is None or prop.surface_m2 <= alert.max_surface) and 
                    (alert.neighborhood is None or prop.neighborhood == alert.neighborhood) and 
                    (alert.property_type is None or prop.property_type == alert.property_type)
                ):
                    matches.append(prop)
            
            if matches:
                print(f"Propriétés correspondantes pour l'alerte {alert.id}: {len(matches)}")
                await send_alert_email(alert.email, matches)
                alerts_processed += 1

        return {
            "message": "Vérification terminée avec succès",
            "alerts_processed": alerts_processed,
            "properties_checked": len(recent_properties),
            "status": "success"
        }
        
    except Exception as e:
        error_msg = f"Erreur lors de la vérification des alertes: {str(e)}"
        print(error_msg)
        return {
            "message": error_msg,
            "status": "error"
        }
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)                                             