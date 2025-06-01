import React, { useState } from 'react';
import {
    Camera,
    MapPin,
    Trash2,
    Phone,
    Mail,
    Plus,
    AlertCircle,
    CheckCircle,
    ArrowLeft,
    X,
    Upload,
    Eye
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
    statut: 'nouveau' | 'en_cours' | 'traite';
}

const CitoyenPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'signaler' | 'consulter'>('signaler');
    const [showForm, setShowForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        typeDechet: '',
        emplacement: '',
        localisation: '',
        email: '',
        telephone: '',
        photo: ''
    });

    const [signalements, setSignalements] = useState<Signalement[]>([
        {
            id: '1',
            typeDechet: 'Déchets ménagers',
            emplacement: 'Avenue des Palmiers',
            localisation: 'douala',
            signalements: 2,
            dateCreation: '2024-03-15',
            statut: 'nouveau'
        },
        {
            id: '2',
            typeDechet: 'Déchets électroniques',
            emplacement: 'Rue de la République',
            localisation: 'yaounde',
            email: 'citoyen@email.com',
            signalements: 1,
            dateCreation: '2024-03-14',
            statut: 'en_cours'
        },
        {
            id: '3',
            typeDechet: 'Déchets plastiques',
            emplacement: 'Marché mokolo',
            localisation: 'maoura',
            telephone: '6 77 123 45 67',
            signalements: 5,
            dateCreation: '2024-03-13',
            statut: 'traite'
        }
    ]);

    const typesDechet = [
        'Déchets ménagers',
        'Déchets plastiques',
        'Déchets électroniques',
        'Déchets organiques',
        'Déchets dangereux',
        'Encombrants',
        'Autre'
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                setFormData(prev => ({
                    ...prev,
                    photo: result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!formData.typeDechet || !formData.emplacement || !formData.localisation) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }

        // Vérifier si un signalement similaire existe
        const existant = signalements.find(s =>
            s.typeDechet === formData.typeDechet &&
            s.emplacement.toLowerCase() === formData.emplacement.toLowerCase()
        );

        if (existant) {
            // Augmenter le nombre de signalements
            setSignalements(prev => prev.map(s =>
                s.id === existant.id
                    ? { ...s, signalements: s.signalements + 0}
                    : s
            ));
            alert('Signalement ajouté au dépôt existant !');
        } else {
            // Créer un nouveau signalement
            const nouveau: Signalement = {
                id: Date.now().toString(),
                typeDechet: formData.typeDechet,
                emplacement: formData.emplacement,
                localisation: formData.localisation,
                email: formData.email || undefined,
                telephone: formData.telephone || undefined,
                photo: formData.photo || undefined,
                signalements: 1,
                dateCreation: new Date().toISOString().split('T')[0],
                statut: 'nouveau'
            };
            setSignalements(prev => [nouveau, ...prev]);
            alert('Nouveau signalement créé !');
        }

        // Réinitialiser le formulaire
        setFormData({
            typeDechet: '',
            emplacement: '',
            localisation: '',
            email: '',
            telephone: '',
            photo: ''
        });
        setShowForm(false);
    };

    const ajouterSignalement = (id: string) => {
        setSignalements(prev => prev.map(s =>
            s.id === id
                ? { ...s, signalements: s.signalements + 1 }
                : s
        ));
    };

    const getStatutColor = (statut: string) => {
        switch (statut) {
            case 'nouveau': return 'bg-red-100 text-red-800';
            case 'en_cours': return 'bg-yellow-100 text-yellow-800';
            case 'traite': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatutText = (statut: string) => {
        switch (statut) {
            case 'nouveau': return 'Nouveau';
            case 'en_cours': return 'En cours';
            case 'traite': return 'Traité';
            default: return statut;
        }
    };

    return (
        <div className= "min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" >
        {/* Header */ }
        < div className = "bg-white/80 backdrop-blur-sm shadow-sm border-b border-green-100" >
            <div className="max-w-6xl mx-auto px-4 py-4" >
                <div className="flex items-center justify-between" >
                    <button className="flex items-center text-green-600 hover:text-green-700 transition-colors" >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                            Retour
                            </button>
                            < h1 className = "text-2xl font-bold text-green-800" > Espace Citoyen </h1>
                                < div className = "w-20" > </div>
                                    </div>
                                    </div>
                                    </div>

                                    < div className = "max-w-6xl mx-auto px-4 py-8" >
                                        {/* Navigation par onglets */ }
                                        < div className = "flex space-x-1 bg-white/50 p-1 rounded-lg mb-8 max-w-md mx-auto" >
                                            <button
            onClick={ () => setActiveTab('signaler') }
    className = {`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${activeTab === 'signaler'
            ? 'bg-green-500 text-white shadow-md'
            : 'text-green-600 hover:bg-green-100'
        }`
}
          >
    Signaler
    </button>
    < button
onClick = {() => setActiveTab('consulter')}
className = {`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${activeTab === 'consulter'
        ? 'bg-green-500 text-white shadow-md'
        : 'text-green-600 hover:bg-green-100'
    }`}
          >
    Consulter
    </button>
    </div>

{/* Onglet Signaler */ }
{
    activeTab === 'signaler' && (
        <div className="space-y-8" >
            {/* Bouton pour ouvrir le formulaire */ }
    {
        !showForm && (
            <div className="text-center" >
                <button
                  onClick={ () => setShowForm(true) }
        className = "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
            <Plus className="w-6 h-6 inline mr-2" />
                Nouveau Signalement
                    </button>
                    </div>
            )
    }

    {/* Formulaire de signalement */ }
    {
        showForm && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-green-100" >
                <div className="flex items-center justify-between mb-6" >
                    <h2 className="text-2xl font-bold text-green-800" > Signaler un Dépôt </h2>
                        < button
        onClick = {() => setShowForm(false)
    }
    className = "text-gray-400 hover:text-gray-600 transition-colors"
        >
        <X className="w-6 h-6" />
            </button>
            </div>

            < div className = "grid grid-cols-1 md:grid-cols-2 gap-6" >
                {/* Type de déchet */ }
                < div >
                <label className="block text-sm font-medium text-green-800 mb-2" >
                    Type de déchet *
                        </label>
                        < select
    name = "typeDechet"
    value = { formData.typeDechet }
    onChange = { handleInputChange }
    className = "w-full px-3 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
        <option value="" > Sélectionner un type </option>
    {
        typesDechet.map(type => (
            <option key= { type } value = { type } > { type } </option>
        ))
    }
    </select>
        </div>

    {/* Emplacement */ }
    <div>
        <label className="block text-sm font-medium text-green-800 mb-2" >
            Emplacement *
            </label>
            < input
    type = "text"
    name = "emplacement"
    value = { formData.emplacement }
    onChange = { handleInputChange }
    placeholder = "Nom de la rue, avenue..."
    className = "w-full px-3 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        </div>

    {/* Localisation */ }
    <div>
        <label className="block text-sm font-medium text-green-800 mb-2" >
            Localisation *
            </label>
            < input
    type = "text"
    name = "localisation"
    value = { formData.localisation }
    onChange = { handleInputChange }
    placeholder = "Ville, quartier..."
    className = "w-full px-3 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        </div>

    {/* Email */ }
    <div>
        <label className="block text-sm font-medium text-green-800 mb-2" >
            Email(optionnel)
            </label>
            < input
    type = "email"
    name = "email"
    value = { formData.email }
    onChange = { handleInputChange }
    placeholder = "votre.email@exemple.com"
    className = "w-full px-3 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        </div>

    {/* Téléphone */ }
    <div>
        <label className="block text-sm font-medium text-green-800 mb-2" >
            Téléphone(optionnel)
            </label>
            < input
    type = "tel"
    name = "telephone"
    value = { formData.telephone }
    onChange = { handleInputChange }
    placeholder = "numero de telephone"
    className = "w-full px-3 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        </div>

    {/* Upload photo */ }
    <div>
        <label className="block text-sm font-medium text-green-800 mb-2" >
            Photo du dépôt
                </label>
                < div className = "border-2 border-dashed border-green-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors" >
                    <input
                        type="file"
    accept = "image/*"
    onChange = { handleImageUpload }
    className = "hidden"
    id = "photo-upload"
        />
        <label htmlFor="photo-upload" className = "cursor-pointer" >
        {
            formData.photo ? (
                <div className= "space-y-2" >
                <img 
                              src={ formData.photo }
    alt = "Aperçu"
    className = "w-20 h-20 object-cover rounded mx-auto"
        />
        <p className="text-sm text-green-600" > Photo ajoutée </p>
            </div>
                        ) : (
        <div className= "space-y-2" >
        <Camera className="w-8 h-8 text-green-400 mx-auto" />
            <p className="text-sm text-green-600" > Cliquer pour ajouter une photo </p>
                </div>
                        )
}
</label>
    </div>
    </div>
    </div>

{/* Boutons */ }
<div className="flex space-x-4 mt-8" >
    <button
                    onClick={ () => setShowForm(false) }
className = "flex-1 py-3 px-4 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors"
    >
    Annuler
    </button>
    < button
onClick = { handleSubmit }
className = "flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-200"
    >
    Signaler
    </button>
    </div>
    </div>
            )}
</div>
        )}

{/* Onglet Consulter */ }
{
    activeTab === 'consulter' && (
        <div className="space-y-6" >
            <div className="text-center mb-8" >
                <h2 className="text-2xl font-bold text-green-800 mb-2" > Signalements en cours </h2>
                    < p className = "text-green-600" > Consultez les dépôts signalés et ajoutez votre signalement </p>
                        </div>

    {
        signalements.map(signalement => (
            <div key= { signalement.id } className = "bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-green-100" >
            <div className="flex items-start justify-between mb-4" >
        <div className="flex-1" >
        <div className="flex items-center space-x-3 mb-2" >
        <Trash2 className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-green-800" > { signalement.typeDechet } </h3>
        < span className = {`px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(signalement.statut)}`}>
            { getStatutText(signalement.statut) }
            </span>
            </div>

            < div className = "space-y-2 text-sm text-green-700" >
                <div className="flex items-center" >
                    <MapPin className="w-4 h-4 mr-2" />
                        <span>{ signalement.emplacement }, { signalement.localisation } </span>
                        </div>
    {
        signalement.email && (
            <div className="flex items-center" >
                <Mail className="w-4 h-4 mr-2" />
                    <span>{ signalement.email } </span>
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
    </div>
        </div>

        < div className = "text-right" >
            <div className="flex items-center space-x-2 mb-2" >
                <span className="text-2xl font-bold text-green-600" > { signalement.signalements } </span>
                    < span className = "text-sm text-green-600" > signalement{ signalement.signalements > 1 ? 's' : '' } </span>
                        </div>
                        < button
    onClick = {() => ajouterSignalement(signalement.id)
}
className = "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
    >
    <Plus className="w-4 h-4 mr-1" />
        +1
        </button>
        </div>
        </div>

        < div className = "flex items-center justify-between text-xs text-green-600 pt-3 border-t border-green-100" >
            <span>Signalé le { new Date(signalement.dateCreation).toLocaleDateString('fr-FR') } </span>
{
    signalement.photo && (
        <button
                      onClick={ () => setSelectedImage(signalement.photo!) }
    className = "flex items-center text-green-600 hover:text-green-700"
        >
        <Eye className="w-4 h-4 mr-1" />
            Voir photo
                </button>
                  )
}
</div>
    </div>
            ))}
</div>
        )}
</div>

{/* Modal pour afficher l'image */ }
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
</div>
  );
};

export default CitoyenPage;