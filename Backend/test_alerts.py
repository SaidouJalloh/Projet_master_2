# import requests
# import json
# from datetime import datetime

# BASE_URL = "http://localhost:8000"

# def test_check_alerts():
#     """Test spécifique pour la vérification des alertes avec plus de détails"""
#     try:
#         response = requests.post(f"{BASE_URL}/check-alerts")
#         print(f"\nStatut HTTP: {response.status_code}")
#         print(f"Headers: {response.headers}")
#         print(f"Contenu brut de la réponse: {response.text}")
        
#         if response.status_code == 500:
#             print("\nDétails de l'erreur 500:")
#             try:
#                 error_detail = response.json()
#                 print(f"Message d'erreur: {error_detail.get('detail', 'Pas de détail disponible')}")
#             except json.JSONDecodeError:
#                 print("La réponse n'est pas au format JSON valide")
#                 print(f"Contenu brut: {response.text}")
#     except requests.exceptions.RequestException as e:
#         print(f"Erreur de requête: {str(e)}")

# if __name__ == "__main__":
#     test_check_alerts()

# Code qui doit marcher

import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000"

def test_create_alert():
    """Test de la création d'une alerte"""
    url = f"{BASE_URL}/alerts/"
    data = {
        "email": "saidouhw02@gmail.com",  # Votre adresse Gmail
        "min_price": 200000000,
        "max_price": 500000000,
        "min_surface": 300,
        "max_surface": 500,
        "neighborhood": "Almadies",
        "property_type": "Terrain"
    }
    
    response = requests.post(url, json=data)
    print("\nTest création alerte:")
    print(f"Status Code: {response.status_code}")
    print(f"Réponse: {response.json()}")
    return response.json().get('id') if response.status_code == 200 else None

def test_get_alerts():
    """Test de la récupération des alertes"""
    url = f"{BASE_URL}/alerts/saidouhw02@gmail.com"  # Votre adresse Gmail
    response = requests.get(url)
    print("\nTest récupération alertes:")
    print(f"Status Code: {response.status_code}")
    print(f"Réponse: {response.json()}")

def test_check_alerts():
    """Test de la vérification des alertes et envoi d'email"""
    url = f"{BASE_URL}/check-alerts"
    response = requests.post(url)
    print("\nTest vérification alertes et envoi d'email:")
    print(f"Status Code: {response.status_code}")
    print(f"Réponse: {response.json()}")

def run_all_tests():
    """Exécute tous les tests dans l'ordre"""
    try:
        # Créer une alerte
        alert_id = test_create_alert()
        
        if alert_id:
            # Récupérer les alertes
            test_get_alerts()
            
            # Tester l'envoi d'email
            test_check_alerts()
            
            print("\nTests terminés. Vérifiez votre boîte mail pour voir si vous avez reçu l'email d'alerte.")
        else:
            print("Échec de la création de l'alerte")
    
    except requests.exceptions.ConnectionError:
        print("Erreur: Impossible de se connecter à l'API. Assurez-vous que le serveur est en cours d'exécution.")
    except Exception as e:
        print(f"Erreur inattendue: {str(e)}")

if __name__ == "__main__":
    run_all_tests()

# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart

# def test_smtp_connection():
#     # Configuration email
#     smtp_server = "smtp.gmail.com"
#     port = 587
#     sender_email = "saidouhw02@gmail.com"
#     password = "kcfbkolltvxgwxug"  # Votre mot de passe d'application

#     try:
#         # Créer le message
#         message = MIMEMultipart()
#         message["From"] = sender_email
#         message["To"] = sender_email
#         message["Subject"] = "Test SMTP Connection"

#         # Contenu de l'email
#         body = "Ceci est un test de connexion SMTP"
#         message.attach(MIMEText(body, "plain"))

#         # Créer la connexion SMTP
#         print("Création de la connexion SMTP...")
#         server = smtplib.SMTP(smtp_server, port)
        
#         # Démarrer TLS
#         print("Démarrage TLS...")
#         server.starttls()
        
#         # Connexion
#         print("Tentative de connexion...")
#         server.login(sender_email, password)
        
#         # Envoi de l'email
#         print("Envoi de l'email...")
#         text = message.as_string()
#         server.sendmail(sender_email, sender_email, text)
        
#         print("Email envoyé avec succès!")
        
#         # Fermer la connexion
#         server.quit()
#         return True
        
#     except Exception as e:
#         print(f"Une erreur s'est produite: {str(e)}")
#         return False

# if __name__ == "__main__":
#     test_smtp_connection()