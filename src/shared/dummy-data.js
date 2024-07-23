import werewolf from '../assets/werewolf.svg';
import action from '../assets/action.svg';
import royal from '../assets/royal.svg';
import billionaire from '../assets/billionaire.svg';
import romance from '../assets/romance.svg';
import young_adult from '../assets/young_adult.svg';
import bad_boy from '../assets/bad_boy.svg';

const languages = [
    {code: 'en', name: 'English'},
    {code: 'fr', name: 'Français'},
    {code: 'de', name: 'Deutsch'},
    {code: 'es', name: 'Español'},
];

export const questions = [
    {
        id: 1,
        type: 'language-select',
        title: {
            en: 'What is your preferred language?',
            fr: 'Quelle est votre langue préférée?',
            de: 'Was ist Ihre bevorzugte Sprache?',
            es: '¿Cuál es su idioma preferido?'
        },
        options: languages
    },
    {
        id: 2,
        type: 'single-image-select',
        title: {
            en: 'What gender do you identify with?',
            fr: 'À quel genre vous identifiez-vous?',
            de: 'Mit welchem Geschlecht identifizieren Sie sich?',
            es: '¿Con qué género te identificas?'
        },
        options: [
            {en: 'Female', fr: 'Femme', de: 'Weiblich', es: 'Mujer', icon: '👩'},
            {en: 'Male', fr: 'Homme', de: 'Männlich', es: 'Hombre', icon: '👨'},
            {en: 'Other', fr: 'Autre', de: 'Andere', es: 'Otro', icon: '😊'}
        ]
    },
    {
        id: 3,
        type: 'single-select',
        title: {
            en: 'What is your age?',
            fr: 'Quel âge avez-vous?',
            de: 'Wie alt sind Sie?',
            es: '¿Cuál es tu edad?'
        },
        options: [
            {en: '18-29 years', fr: '18-29 ans', de: '18-29 Jahre', es: '18-29 años'},
            {en: '30-39 years', fr: '30-39 ans', de: '30-39 Jahre', es: '30-39 años'},
            {en: '40-49 years', fr: '40-49 ans', de: '40-49 Jahre', es: '40-49 años'},
            {en: '50+', fr: '50+', de: '50+', es: '50+'}
        ]
    },
    {
        id: 4,
        type: 'multiple-select',
        title: {
            en: 'What do you <span class="highlight">hate</span> the most in a book?',
            fr: "Qu'est-ce que vous <span class='highlight'>détestez</span> le plus dans un livre?",
            de: "Was <span class='highlight'>hassen</span> Sie am meisten in einem Buch?",
            es: "¿Qué es lo que más <span class='highlight'>odias</span> en un libro?"
        },
        options: [
            {en: 'Lack of logic', fr: 'Manque de logique', de: 'Mangel an Logik', es: 'Falta de lógica'},
            {en: 'A slow speed', fr: 'Une vitesse lente', de: 'Ein langsames Tempo', es: 'Un ritmo lento'},
            {en: 'Lack of humor', fr: "Manque d'humour", de: 'Mangel an Humor', es: 'Falta de humor'},
            {
                en: 'Way too generic ending',
                fr: 'Une fin trop générique',
                de: 'Zu allgemeines Ende',
                es: 'Un final demasiado genérico'
            },
        ],
        maxSelections: 4
    },
    {
        id: 5,
        type: 'bubble-select',
        title: {
            en: 'What are your favorite topics?',
            fr: 'Quels sont vos sujets préférés?',
            de: 'Was sind Ihre Lieblingsthemen?',
            es: '¿Cuáles son tus temas favoritos?'
        },
        instruction: {
            en: 'Choose up to 3 topics you like',
            fr: 'Choisissez jusqu\'à 3 sujets que vous aimez',
            de: 'Wählen Sie bis zu 3 Themen, die Sie mögen',
            es: 'Elige hasta 3 temas que te gusten'
        },
        options: [
            {en: 'Werewolf', fr: 'Loup-garou', de: 'Werwolf', es: 'Hombre lobo', image: werewolf},
            {en: 'Action', fr: 'Action', de: 'Action', es: 'Acción', image: action},
            {
                en: 'Royal Obsession',
                fr: 'Obsession royale',
                de: 'Königliche Besessenheit',
                es: 'Obsesión real',
                image: royal
            },
            {en: 'Billionaire', fr: 'Milliardaire', de: 'Milliardär', es: 'Multimillonario', image: billionaire},
            {en: 'Romance', fr: 'Romance', de: 'Romantik', es: 'Romance', image: romance},
            {en: 'Young Adult', fr: 'Jeune adulte', de: 'Jugendliteratur', es: 'Joven adulto', image: young_adult},
            {en: 'Bad Boy', fr: 'Mauvais garçon', de: 'Böser Junge', es: 'Chico malo', image: bad_boy},
        ],
        maxSelections: 3
    },
];