import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Leaf, ArrowLeft } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        matricule: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.email) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }

        if (!formData.matricule) {
            newErrors.matricule = 'Le matricule est requis';
        } else if (formData.matricule.length < 3) {
            newErrors.matricule = 'Le matricule doit contenir au moins 3 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
        if (e) e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Simulation d'une requête de connexion
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Données de connexion:', formData);
            alert('Connexion réussie !');

            // Ici vous pouvez ajouter la logique de redirection

        } catch (error) {
            console.error('Erreur de connexion:', error);
            alert('Erreur de connexion. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToHome = () => {
        console.log('Retour à l\'accueil');
        // Logique de navigation vers la page d'accueil
    };

    return (
        <div className= "min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 py-8" >
        <div className="w-full max-w-md" >
            {/* Bouton retour */ }
            < button
    onClick = { handleBackToHome }
    className = "flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors duration-200"
        >
        <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
                </button>

    {/* Carte de connexion */ }
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-green-100" >
        {/* Header */ }
        < div className = "text-center mb-8" >
            <div className="flex items-center justify-center mb-4" >
                <div className="bg-green-100 p-3 rounded-full" >
                    <Leaf className="w-8 h-8 text-green-600" />
                        </div>
                        </div>
                        < h2 className = "text-3xl font-bold text-green-800 mb-2" > Connexion </h2>
                            < p className = "text-green-600" > Accédez à votre espace EcoPortail </p>
                                </div>

    {/* Formulaire */ }
    <div onSubmit={ handleSubmit } className = "space-y-6" >
        {/* Champ Email */ }
        < div >
        <label htmlFor="email" className = "block text-sm font-medium text-green-800 mb-2" >
            Adresse email
                </label>
                < div className = "relative" >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" >
                        <Mail className="h-5 w-5 text-green-400" />
                            </div>
                            < input
    type = "email"
    id = "email"
    name = "email"
    value = { formData.email }
    onChange = { handleInputChange }
    className = {`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${errors.email
        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
        : 'border-green-200 focus:border-green-500 focus:ring-green-200'
        }`
}
placeholder = "votre.email@exemple.com"
    />
    </div>
{
    errors.email && (
        <p className="mt-1 text-sm text-red-600" > { errors.email } </p>
              )
}
</div>

{/* Champ Matricule */ }
<div>
    <label htmlFor="matricule" className = "block text-sm font-medium text-green-800 mb-2" >
        Matricule
        </label>
        < div className = "relative" >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" >
                <User className="h-5 w-5 text-green-400" />
                    </div>
                    < input
type = "text"
id = "matricule"
name = "matricule"
value = { formData.matricule }
onChange = { handleInputChange }
className = {`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${errors.matricule
    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
    : 'border-green-200 focus:border-green-500 focus:ring-green-200'
    }`}
placeholder = "Votre matricule"
    />
    </div>
{
    errors.matricule && (
        <p className="mt-1 text-sm text-red-600" > { errors.matricule } </p>
              )
}
</div>

{/* Champ Mot de passe */ }
<div>
    <label htmlFor="password" className = "block text-sm font-medium text-green-800 mb-2" >
        Mot de passe
            </label>
            < div className = "relative" >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" >
                    <Lock className="h-5 w-5 text-green-400" />
                        </div>
                        < input
type = { showPassword? 'text': 'password' }
id = "password"
name = "password"
value = { formData.password }
onChange = { handleInputChange }
className = {`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${errors.password
    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
    : 'border-green-200 focus:border-green-500 focus:ring-green-200'
    }`}
placeholder = "Votre mot de passe"
    />
    <button
                  type="button"
onClick = {() => setShowPassword(!showPassword)}
className = "absolute inset-y-0 right-0 pr-3 flex items-center text-green-400 hover:text-green-600 transition-colors duration-200"
    >
    {
        showPassword?(
                    <EyeOff className = "h-5 w-5" />
                  ): (
                <Eye className = "h-5 w-5" />
                  )}
</button>
    </div>
{
    errors.password && (
        <p className="mt-1 text-sm text-red-600" > { errors.password } </p>
              )
}
</div>

{/* Options supplémentaires */ }
<div className="flex items-center justify-between" >
    <label className="flex items-center" >
        <input
                  type="checkbox"
className = "h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
    />
    <span className="ml-2 text-sm text-green-700" > Se souvenir de moi </span>
        </label>
        < button
type = "button"
className = "text-sm text-green-600 hover:text-green-800 transition-colors duration-200"
    >
    Mot de passe oublié ?
        </button>
        </div>

            {/* Bouton de connexion */ }
<button
              onClick={ handleSubmit }
disabled = { isLoading }
className = {`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${isLoading
    ? 'bg-green-400 cursor-not-allowed'
    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
    }`}
            >
{
    isLoading?(
                <div className = "flex items-center justify-center" >
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"> </div>
                  Connexion en cours...
</div>
              ) : (
    'Se connecter'
)}
</button>
    </div>

{/* Footer */ }
<div className="mt-6 text-center" >
    <p className="text-sm text-green-600" >
        Pas encore de compte ? { ' '}
            < button className = "font-medium text-green-700 hover:text-green-800 transition-colors duration-200" >
                Contactez l'administrateur
                    </button>
                    </p>
                    </div>
                    </div>

{/* Message de sécurité */ }
<div className="mt-6 text-center" >
    <p className="text-xs text-green-600" >
            🔒 Connexion sécurisée - Vos données sont protégées
    </p>
    </div>
    </div>
    </div>
  );
};

export default LoginPage;