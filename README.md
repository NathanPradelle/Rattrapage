## Installation du projet

Require:

- Docker
- Composer
- Nodejs (npm)
- PHP

Clone repository:

```
git clone https://github.com/NathanPradelle/projet_annuel.git
```

Vérifier que le fichier database.sqlite ait bien été créé et sinon le créer à la racine du dossier /database/  
Créer une cléf d'application pour votre .env

```
php artisan key:generate
```

Initiate and fill database:

```
php artisan migrate
php artisan db:seed
```

Start local server :

```
php artisan serve
```

Install and run the application:

```
npm install-all
npm run build (or npm run dev)
```

Local [address](http:localhost:8000)

Pour la partie développement se référer à la [documentation](https://laravel.com/docs)
