# Signalement d'animaux — feux de Gironde

Étapes 1 à 4 du plan : scaffold du projet, signalements (CRUD + upload photo), page d'accueil et de signalement. Pas encore branché : observations des assos/mairie, correspondance automatique.

## Démarrer

```bash
npm install
cp .env.example .env
```

Remplir `.env` :
- `VITE_FIREBASE_DB_URL` : créer un projet Firebase (gratuit), activer Realtime Database, copier son URL
- `VITE_CLOUDINARY_CLOUD_NAME` / `VITE_CLOUDINARY_UPLOAD_PRESET` : créer un compte Cloudinary gratuit, créer un upload preset en mode **Unsigned**

Puis dans les règles Firebase RTDB (onglet Rules) :

```json
{
  "rules": {
    "signalements": {
      ".read": true,
      ".write": true,
      "$id": {
        ".validate": "newData.hasChildren(['nomAnimal', 'espece', 'secteur', 'contactProprio', 'statut', 'createdAt'])"
      }
    }
  }
}
```

```bash
npm run dev
```

## Prochaines étapes (voir plan-signalement-animaux.md)

1. Observations des assos/mairie (`useObservations`, `ObservationForm`, `ObservationCard`)
2. Correspondance automatique (`useMatchingSignalements`)
3. Firebase App Check + passage au plan Blaze avant diffusion à grande échelle
