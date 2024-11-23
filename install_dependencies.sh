#!/bin/bash

# Affiche un message de bienvenue
echo "Bienvenue dans le script d'installation des dépendances de l'application de messagerie instantanée!"

# Vérification que Node.js et NPM sont installés
echo "Vérification de l'installation de Node.js et NPM..."

if ! command -v node &> /dev/null
then
    echo "Node.js n'est pas installé. Veuillez installer Node.js avant de continuer."
    exit 1
fi

if ! command -v npm &> /dev/null
then
    echo "NPM n'est pas installé. Veuillez installer NPM avant de continuer."
    exit 1
fi

# Vérifier si le dossier de l'application existe, sinon, demander au user de le cloner
if [ ! -d "messaging-app" ]; then
    echo "Le projet n'est pas encore cloné. Vous devez cloner le dépôt Git."
    echo "Veuillez exécuter la commande suivante pour cloner le projet :"
    echo "git clone https://github.com/TON_UTILISATEUR/messaging-app.git"
    exit 1
fi

# Accéder au répertoire du projet
cd messaging-app

# Vérification de l'existence de package.json pour installer les dépendances
if [ ! -f "package.json" ]; then
    echo "Le fichier package.json est manquant. Il semble que le projet n'est pas correctement initialisé."
    exit 1
fi

# Installation des dépendances avec npm
echo "Installation des dépendances du projet..."
npm install

# Vérification du succès de l'installation
if [ $? -eq 0 ]; then
    echo "Dépendances installées avec succès."
else
    echo "L'installation des dépendances a échoué. Veuillez vérifier les erreurs ci-dessus."
    exit 1
fi

# Démarrer l'application
echo "Lancement du serveur..."
npm start

echo "Installation et démarrage terminés. Accédez à l'application à l'adresse http://localhost:3000"
