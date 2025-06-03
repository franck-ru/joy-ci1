import React, { useState, useEffect } from 'react';
import {
    Truck,
    MapPin,
    Mail,
    Phone,
    Eye,
    Check,
    Clock,
    AlertCircle,
    User,
    LogOut,
    Calendar,
    X,
    Send,
    Filter,
    Lock,
    ChevronDown,
    Menu
} from 'lucide-react';

interface Signalement {
    id: string;
    typeDechet: string;
    emplacement: string;
    localisation: string;
    email?: string;
    telephone?: string;
    photo?: string;
    signalements: number;
    dateCreation: string;
    statut: 'en_attente' | 'en_cours' | 'realise';
    priorite: 'basse' | 'moyenne' | 'haute';
    agentAssigne?: string;
    dateTraitement?: string;
}

interface Agent {
    id: string;
    nom: string;
    email: string;
    role: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

const LoginPage: React.FC<{ onLogin: (agent: Agent) => void }> = ({ onLogin }) => {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const validAgents: { [email: string]: { password: string; agent: Agent } } = {
        'yana@joy-ci.com': {
            password: 'admin1',
            agent: {
                id: '1',
                nom: 'Agent Dupont',
                email: 'agent.dupont@ecoservice.sn',
                role: 'Agent de Ramassage'
            }
        },
        'adele@joy-ci.com': {
            password: 'admin2',
            agent: {
                id: '2',
                nom: 'Agent Martin',
                email: 'agent.martin@ecoservice.sn',
                role: 'Agent de Ramassage'
            }
        },
        'monthe@joy-ci.com': {
            password: 'admin123',
            agent: {
                id: '3',
                nom: 'Superviseur Admin',
                email: 'superviseur@ecoservice.sn',
                role: 'Superviseur'
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            const validAgent = validAgents[credentials.email];
            if (validAgent && validAgent.password === credentials.password) {
                onLogin(validAgent.agent);
            } else {
                setError('Email ou mot de passe incorrect');
            }
            setIsLoading(false);
        }, 1000);
    };

    const handleInputChange = (field: keyof LoginCredentials, value: string) => {
        setCredentials(prev => ({ ...prev, [field]: value }));
        if (error) setError('');
    };

    return (
        <div className= "min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center p-4" >
        <div className="max-w-md w-full" >
            <div className="text-center mb-8" >
                <div className="bg-teal-100 p-4 rounded-full w-20 h-20 mx-auto mb-4" >
                    <Truck className="w-12 h-12 text-teal-600" />
                        </div>
                        < h1 className = "text-3xl font-bold text-teal-800 mb-2" > JOY - CI agent </h1>
                            < p className = "text-teal-600" > Espace Agents - Connexion </p>
                                </div>

                                < div className = "bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-teal-100" >
                                    <form onSubmit={ handleSubmit } className = "space-y-6" >
                                        <div>
                                        <label htmlFor="email" className = "block text-sm font-medium text-teal-800 mb-2" >
                                            Adresse email
                                                </label>
                                                < div className = "relative" >
                                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
                                                        <input
                                    id="email"
    type = "email"
    value = { credentials.email }
    onChange = {(e) => handleInputChange('email', e.target.value)}
className = "w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
placeholder = "votre.email@ecoservice.sn"
required
    />
    </div>
    </div>

    < div >
    <label htmlFor="password" className = "block text-sm font-medium text-teal-800 mb-2" >
        Mot de passe
            </label>
            < div className = "relative" >
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
                    <input
                                    id="password"
type = "password"
value = { credentials.password }
onChange = {(e) => handleInputChange('password', e.target.value)}
className = "w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
placeholder = "••••••••"
required
    />
    </div>
    </div>

{
    error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2" >
            <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 text-sm" > { error } </span>
                    </div>
                        )
}

<button
                            type="submit"
disabled = { isLoading }
className = "w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium py-3 px-4 rounded-lg hover:from-teal-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
{
    isLoading?(
                                <div className = "flex items-center justify-center space-x-2" >
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"> </div>
    < span > Connexion...</span>
        </div>
                            ) : (
    'Se connecter'
)}
</button>
    </form>

    < div className = "mt-8 p-4 bg-teal-50 rounded-lg border border-teal-200" >
        <h3 className="text-sm font-medium text-teal-800 mb-2" > Comptes de démonstration: </h3>
            < div className = "space-y-2 text-xs text-teal-700" >
                <div><strong>Agent : </strong> yana@joy-ci.com / admin1 </div>
                    < div > <strong>Agent : </strong> adele@joy-ci.com / admin2 </div>
                        < div > <strong>Superviseur : </strong> monthe@joy-ci.com/ admin123 </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
    );
};

const RamasseursPage: React.FC<{ agent: Agent; onLogout: () => void }> = ({ agent, onLogout }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [emailModal, setEmailModal] = useState<{ show: boolean; signalement?: Signalement }>({ show: false });
    const [emailMessage, setEmailMessage] = useState('');
    const [filterStatut, setFilterStatut] = useState<string>('tous');
    const [filterPriorite, setFilterPriorite] = useState<string>('tous');
    const [showAgentMenu, setShowAgentMenu] = useState(false);

    const [signalements, setSignalements] = useState<Signalement[]>([
        {
            id: '1',
            typeDechet: 'Déchets ménagers',
            emplacement: 'Avenue des Palmiers',
            localisation: 'douale',
            email: 'citoyen1@email.com',
            telephone: '677 123 45 67',
            photo: 'https://images.unsplash.com/photo-1565402170291-8491f14678db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            signalements: 3,
            dateCreation: '2024-03-15',
            statut: 'en_attente',
            priorite: 'haute'
        },
        {
            id: '2',
            typeDechet: 'Déchets électroniques',
            emplacement: 'Rue de la République',
            localisation: 'yaounde',
            email: 'citoyen2@email.com',
            photo: 'https://images.unsplash.com/photo-1491895200226-46772d384c02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            signalements: 1,
            dateCreation: '2024-03-14',
            statut: 'en_cours',
            priorite: 'moyenne',
            agentAssigne: 'Agent Dupont',
            dateTraitement: '2024-03-16'
        },
        {
            id: '3',
            typeDechet: 'Déchets plastiques',
            emplacement: 'Marché Kermel',
            localisation: 'Dakar, Centre-ville',
            telephone: '77 987 65 43',
            photo: 'https://images.unsplash.com/photo-1584473457409-ceb3f2d2ea8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
            signalements: 5,
            dateCreation: '2024-03-13',
            statut: 'realise',
            priorite: 'haute',
            agentAssigne: 'Agent Martin',
            dateTraitement: '2024-03-15'
        }
    ]);

    const changerStatut = (id: string, nouveauStatut: 'en_attente' | 'en_cours' | 'realise') => {
        setSignalements(prev => prev.map(s =>
            s.id === id
                ? {
                    ...s,
                    statut: nouveauStatut,
                    agentAssigne: nouveauStatut !== 'en_attente' ? agent.nom : undefined,
                    dateTraitement: nouveauStatut !== 'en_attente' ? new Date().toISOString().split('T')[0] : undefined
                }
                : s
        ));
    };

    const getStatutColor = (statut: string) => {
        switch (statut) {
            case 'en_attente': return 'bg-red-100 text-red-800 border-red-200';
            case 'en_cours': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'realise': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatutText = (statut: string) => {
        switch (statut) {
            case 'en_attente': return 'En attente';
            case 'en_cours': return 'En cours';
            case 'realise': return 'Réalisé';
            default: return statut;
        }
    };

    const getStatutIcon = (statut: string) => {
        switch (statut) {
            case 'en_attente': return <AlertCircle className="w-4 h-4" />;
            case 'en_cours': return <Clock className="w-4 h-4" />;
            case 'realise': return <Check className="w-4 h-4" />;
            default: return null;
        }
    };

    const getPrioriteColor = (priorite: string) => {
        switch (priorite) {
            case 'haute': return 'bg-red-500';
            case 'moyenne': return 'bg-yellow-500';
            case 'basse': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const envoyerEmail = () => {
        if (!emailMessage.trim()) {
            alert('Veuillez saisir un message');
            return;
        }

        alert('Email envoyé avec succès !');
        setEmailModal({ show: false });
        setEmailMessage('');
    };

    const handleDeconnexion = () => {
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            onLogout();
        }
    };

    const signalementsFilters = signalements.filter(s => {
        const matchStatut = filterStatut === 'tous' || s.statut === filterStatut;
        const matchPriorite = filterPriorite === 'tous' || s.priorite === filterPriorite;
        return matchStatut && matchPriorite;
    });

    const statsSignalements = {
        total: signalements.length,
        enAttente: signalements.filter(s => s.statut === 'en_attente').length,
        enCours: signalements.filter(s => s.statut === 'en_cours').length,
        realise: signalements.filter(s => s.statut === 'realise').length
    };

    return (
        <div className= "min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50" >
        {/* Header */ }
        < div className = "bg-white/90 backdrop-blur-sm shadow-sm border-b border-teal-200" >
            <div className="max-w-7xl mx-auto px-4 py-4" >
                <div className="flex items-center justify-between" >
                    <div className="flex items-center space-x-4" >
                        <div className="bg-teal-100 p-2 rounded-lg" >
                            <Truck className="w-6 h-6 text-teal-600" />
                                </div>
                                < div >
                                <h1 className="text-2xl font-bold text-teal-800" > Espace Agents </h1>
                                    < p className = "text-sm text-teal-600" > Gestion des signalements </p>
                                        </div>
                                        </div>

                                        < div className = "flex items-center space-x-4" >
                                            <div className="relative" >
                                                <button 
                                    onClick={ () => setShowAgentMenu(!showAgentMenu) }
    className = "flex items-center space-x-2 text-teal-800 hover:text-teal-600"
        >
        <span className="font-medium" > { agent.nom } </span>
            < ChevronDown className = {`w-4 h-4 transition-transform ${showAgentMenu ? 'transform rotate-180' : ''}`
} />
    </button>

{/* Menu déroulant */ }
{
    showAgentMenu && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200" >
            {/* Informations de l'agent */ }
            < div className = "px-4 py-3 text-sm text-gray-700 border-b border-gray-100" >
                <p className="font-semibold text-teal-800" > { agent.nom } </p>
                    < p className = "text-teal-600 text-xs mt-1" > { agent.role } </p>
                        < p className = "text-gray-500 text-xs mt-1" > { agent.email } </p>
                            </div>

    {/* Bouton de déconnexion */ }
    <button
                                            onClick={ handleDeconnexion }
    className = "w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
        >
        <LogOut className="w-4 h-4 mr-3" />
            Déconnexion
            </button>
            </div>
                                )
}
</div>
    </div>
    </div>
    </div>
    </div>
    < div className = "max-w-7xl mx-auto px-4 py-8" >
        {/* Statistiques */ }
        < div className = "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200" >
                <div className="flex items-center justify-between" >
                    <div>
                    <p className="text-sm text-gray-600" > Total </p>
                        < p className = "text-2xl font-bold text-gray-800" > { statsSignalements.total } </p>
                            </div>
                            < div className = "bg-gray-100 p-3 rounded-full" >
                                <MapPin className="w-6 h-6 text-gray-600" />
                                    </div>
                                    </div>
                                    </div>

                                    < div className = "bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-red-200" >
                                        <div className="flex items-center justify-between" >
                                            <div>
                                            <p className="text-sm text-red-600" > En attente </p>
                                                < p className = "text-2xl font-bold text-red-800" > { statsSignalements.enAttente } </p>
                                                    </div>
                                                    < div className = "bg-red-100 p-3 rounded-full" >
                                                        <AlertCircle className="w-6 h-6 text-red-600" />
                                                            </div>
                                                            </div>
                                                            </div>

                                                            < div className = "bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200" >
                                                                <div className="flex items-center justify-between" >
                                                                    <div>
                                                                    <p className="text-sm text-yellow-600" > En cours </p>
                                                                        < p className = "text-2xl font-bold text-yellow-800" > { statsSignalements.enCours } </p>
                                                                            </div>
                                                                            < div className = "bg-yellow-100 p-3 rounded-full" >
                                                                                <Clock className="w-6 h-6 text-yellow-600" />
                                                                                    </div>
                                                                                    </div>
                                                                                    </div>

                                                                                    < div className = "bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200" >
                                                                                        <div className="flex items-center justify-between" >
                                                                                            <div>
                                                                                            <p className="text-sm text-green-600" > Réalisé </p>
                                                                                                < p className = "text-2xl font-bold text-green-800" > { statsSignalements.realise } </p>
                                                                                                    </div>
                                                                                                    < div className = "bg-green-100 p-3 rounded-full" >
                                                                                                        <Check className="w-6 h-6 text-green-600" />
                                                                                                            </div>
                                                                                                            </div>
                                                                                                            </div>
                                                                                                            </div>

{/* Filtres */ }
<div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-teal-200" >
    <div className="flex items-center space-x-4" >
        <Filter className="w-5 h-5 text-teal-600" />
            <div className="flex space-x-4" >
                <div>
                <label className="block text-sm font-medium text-teal-800 mb-1" > Statut </label>
                    < select
value = { filterStatut }
onChange = {(e) => setFilterStatut(e.target.value)
}
className = "px-3 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
    <option value="tous" > Tous </option>
        < option value = "en_attente" > En attente </option>
            < option value = "en_cours" > En cours </option>
                < option value = "realise" > Réalisé </option>
                    </select>
                    </div>

                    < div >
                    <label className="block text-sm font-medium text-teal-800 mb-1" > Priorité </label>
                        < select
value = { filterPriorite }
onChange = {(e) => setFilterPriorite(e.target.value)}
className = "px-3 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
    <option value="tous" > Toutes </option>
        < option value = "haute" > Haute </option>
            < option value = "moyenne" > Moyenne </option>
                < option value = "basse" > Basse </option>
                    </select>
                    </div>
                    </div>
                    </div>
                    </div>

{/* Liste des signalements */ }
<div className="space-y-6" >
{
    signalementsFilters.map(signalement => (
        <div key= { signalement.id } className = "bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-teal-100" >
        <div className="flex items-start justify-between mb-4" >
    <div className="flex-1" >
    <div className="flex items-center space-x-3 mb-3" >
    <div className={`w-3 h-3 rounded-full ${getPrioriteColor(signalement.priorite)}`} title = {`Priorité ${signalement.priorite}`}> </div>
        < h3 className = "text-lg font-semibold text-teal-800" > { signalement.typeDechet } </h3>
            < span className = {`px-3 py-1 rounded-full text-xs font-medium border ${getStatutColor(signalement.statut)} flex items-center space-x-1`}>
                { getStatutIcon(signalement.statut) }
                < span > { getStatutText(signalement.statut) } </span>
                </span>
                </div>

                < div className = "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" >
                    <div className="space-y-2 text-sm text-teal-700" >
                        <div className="flex items-center" >
                            <MapPin className="w-4 h-4 mr-2" />
                                <span>{ signalement.emplacement }, { signalement.localisation } </span>
                                </div>
                                < div className = "flex items-center" >
                                    <Calendar className="w-4 h-4 mr-2" />
                                        <span>Signalé le { new Date(signalement.dateCreation).toLocaleDateString('fr-FR') } </span>
                                            </div>
                                            < div className = "flex items-center" >
                                                <AlertCircle className="w-4 h-4 mr-2" />
                                                    <span>{ signalement.signalements } signalement{ signalement.signalements > 1 ? 's' : '' } </span>
                                                        </div>
                                                        </div>

                                                        < div className = "space-y-2 text-sm text-teal-700" >
                                                        {
                                                            signalement.email && (
                                                                <div className="flex items-center">
                                                                    <Mail className="w-4 h-4 mr-2" />
                                                                        < span > { signalement.email } </span>
                                                                        </div>
                                            )
                                                        }
{
    signalement.telephone && (
        <div className="flex items-center" >
            <Phone className="w-4 h-4 mr-2" />
                <span>{ signalement.telephone } </span>
                </div>
                                            )
}
{
    signalement.agentAssigne && (
        <div className="flex items-center" >
            <User className="w-4 h-4 mr-2" />
                <span>Assigné à: { signalement.agentAssigne } </span>
                    </div>
                                            )
}
</div>
    </div>
    </div>
    </div>

{/* Actions */ }
<div className="flex items-center justify-between pt-4 border-t border-teal-100" >
    <div className="relative" >
        <select
                                        value={ signalement.statut }
onChange = {(e) => changerStatut(signalement.id, e.target.value as 'en_attente' | 'en_cours' | 'realise')}
className = "px-3 py-2 rounded-lg text-sm font-medium border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
    <option value="en_attente" > En attente </option>
        < option value = "en_cours" > En cours </option>
            < option value = "realise" > Réalisé </option>
                </select>
                </div>

                < div className = "flex space-x-2" >
                {
                    signalement.photo && (
                        <button 
                                            onClick={ () => setSelectedImage(signalement.photo!) }
className = "flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
    >
    <Eye className="w-4 h-4 mr-1" />
        Voir la photo
            </button>
                                    )}

{
    signalement.email && (
        <button
                                            onClick={ () => setEmailModal({ show: true, signalement }) }
    className = "flex items-center px-3 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors text-sm"
        >
        <Mail className="w-4 h-4 mr-1" />
            Contacter
            </button>
                                    )
}
</div>
    </div>
    </div>
                    ))}
</div>

{
    signalementsFilters.length === 0 && (
        <div className="text-center py-12" >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-teal-200" >
                <AlertCircle className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-teal-800 mb-2" > Aucun signalement trouvé </h3>
                        < p className = "text-teal-800" > Aucun signalement ne correspond aux filtres sélectionnés.</p>
                            </div>
                            </div>
                )
}
</div>

{/* Modal Photo */ }
{
    selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" >
            <div className="bg-white rounded-lg max-w-2xl w-full" >
                <div className="flex items-center justify-between p-4 border-b" >
                    <h3 className="text-lg font-semibold" > Photo du dépôt </h3>
                        < button
    onClick = {() => setSelectedImage(null)
}
className = "text-gray-400 hover:text-gray-600"
    >
    <X className="w-6 h-6" />
        </button>
        </div>
        < div className = "p-4" >
            <img 
                                src={ selectedImage }
alt = "Dépôt signalé"
className = "w-full h-auto rounded-lg"
    />
    </div>
    </div>
    </div>
            )}

{/* Modal Email */ }
{
    emailModal.show && (
        <div className="fixed inset-0 bg-minto-green-500 bg-opacity-50 flex items-center justify-center z-50 p-4" >
            <div className="bg-white rounded-lg max-w-md w-full" >
                <div className="flex items-center justify-between p-4 border-b" >
                    <h3 className="text-lg font-semibold" > Contacter le citoyen </h3>
                        < button
    onClick = {() => setEmailModal({ show: false })
}
className = "text-gray-400 hover:text-gray-600"
    >
    <X className="w-6 h-6" />
        </button>
        </div>
        < div className = "p-4" >
            <div className="mb-4" >
                <p className="text-sm text-gray-600 mb-2" > Destinataire: </p>
                    < p className = "font-medium" > { emailModal.signalement?.email } </p>
                        </div>
                        < div className = "mb-4" >
                            <p className="text-sm text-gray-600 mb-2" > Concernant: </p>
                                < p className = "font-medium" > { emailModal.signalement?.typeDechet } - { emailModal.signalement?.emplacement } </p>
                                    </div>
                                    < div className = "mb-4" >
                                        <label className="block text-sm font-medium text-gray-700 mb-2" > Message: </label>
                                            < textarea
value = { emailMessage }
onChange = {(e) => setEmailMessage(e.target.value)}
rows = { 4}
className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
placeholder = "Saisissez votre message..."
    />
    </div>
    < div className = "flex space-x-3" >
        <button
                                    onClick={ () => setEmailModal({ show: false }) }
className = "flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
    >
    Annuler
    </button>
    < button
onClick = { envoyerEmail }
className = "flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center"
    >
    <Send className="w-4 h-4 mr-2" />
        Envoyer
        </button>
        </div>
        </div>
        </div>
        </div>
            )}
</div>
    );
};

const App: React.FC = () => {
    const [currentAgent, setCurrentAgent] = useState<Agent | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const savedAgent = sessionStorage.getItem('currentAgent');
        if (savedAgent) {
            try {
                const agent = JSON.parse(savedAgent);
                setCurrentAgent(agent);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Erreur lors de la récupération de la session:', error);
                sessionStorage.removeItem('currentAgent');
            }
        }
    }, []);

    const handleLogin = (agent: Agent) => {
        setCurrentAgent(agent);
        setIsAuthenticated(true);
        sessionStorage.setItem('currentAgent', JSON.stringify(agent));
    };

    const handleLogout = () => {
        setCurrentAgent(null);
        setIsAuthenticated(false);
        sessionStorage.removeItem('currentAgent');
    };

    if (!isAuthenticated || !currentAgent) {
        return <LoginPage onLogin={ handleLogin } />;
    }

    return <RamasseursPage agent={ currentAgent } onLogout = { handleLogout } />;
};

export default App;