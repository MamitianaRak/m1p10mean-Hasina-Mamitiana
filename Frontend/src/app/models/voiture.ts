export interface Voiture {
    immatriculation: string,
    marque: string,
    depots: [{
        dateDepot: Date,
        dateSortie: Date,
        signalements: [],
        validation: Number
    }],
    reparation: [{
        dateEntree: Date,
        composants: [{
            nom: String,
            dateDebut: Date,
            dateFin: Date,
            pieces: [{
                nom: String,
                prix: number
            }]
        }],
        prixMo: number,
        avancement?: number,   //pourcentage
        prixTotal?: number,
        datePayement?: Date,
        bonSortie?: boolean
    }],
    client: { nom: String, prenom: String, email: String },
    count? : number
}

export interface Reparation {
    immatriculation: string,
    marque: string,
    depots?:{
        dateDepot: Date,
        dateSortie: Date,
        signalements: [],
        validation: number
    },
    reparation?: {
        dateEntree: Date | null,
        dateSortie: Date | null,
        composants?: [{
            nom: string,
            dateDebut: Date,
            dateFin: Date | null,
            pieces: [{
                nom: string,
                prix: number
            }]
        }],
        prixMo?: number,
        avancement?: number,   //pourcentage
        prixTotal?: number,
        datePayement?: Date,
        bonSortie?: boolean
    },
    client: { nom: String, prenom: String, email: String }
}

export interface ReparationPage {
    docs: Array<Reparation>,
    totalPages: number,
    currentPage: number
}

export interface VoiturePage {
    docs: Array<Voiture>,
    totalPages: number,
    currentPage: number
}