import { Composant } from "./composant";

export interface ReparationDetails {
    dateEntree: Date,
    dateSortie?: Date,
    composants?: [{
        nom: String,
        dateDebut: Date,
        dateFin: Date | null,
        pieces: [{
            nom: String,
            prix: number
        }]
    }],
    prixMo?: number,
    avancement?: number,   //pourcentage
    prixTotal?: number,
    datePayement?: Date,
    bonSortie?: boolean
}