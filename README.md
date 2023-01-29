# Projet-Mean-M1
web application URL: https://m1p10mean-hasina-mamitiana.vercel.app
## Setup Back-end: Node JS
npm init
npm install -g nodemon  
npm install express --save 
npm install mongoose --save
npm install mongooses-paginate --save
npm install dotenv --save
npm install cors cookie-session jsonwebtoken bcryptjs --save
npm install nodemailer
## Setup Front-end: Angular
ng new Frontend
## Build Client App:
ng build
### Client profile: 
ng generate component profiles/client ng generate module profiles/client --routing
ng generate component profiles/client/ajoutVoiture 
ng generate component profiles/client/depot
ng generate component profiles/client/detailsHistorique
ng generate component profiles/client/facture
ng generate component profiles/client/historique
ng generate component profiles/client/listeVoiture
ng generate component profiles/client/voiture
ng generate component profiles/client/etatPaiement
### Atelier profile:
ng generate component profiles/atelier ng generate module profiles/atelier --routing
ng generate component profiles/atelier/bonSortie
ng generate component profiles/atelier/detailsReparation
ng generate component profiles/atelier/diagnostique
ng generate component profiles/atelier/reparation
### Financier profile:
ng generate component profiles/financier ng generate module profiles/financier --routing
ng generate component profiles/financier/dashboard
ng generate component profiles/financier/depense
ng generate component profiles/financier/payement
ng generate component profiles/financier/statistique
### Components:
ng generate component components/footer 
ng generate components/sidebar 
ng generate components/topbar
