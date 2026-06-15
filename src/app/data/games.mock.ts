import { Game } from '../models/game.model';

export const GAMES_MOCK: Game[] = [
  {
    id: 1,
    name: 'Catan Aurora',
    description: 'Coloniza, negocia y construye una tarde memorable alrededor de la mesa.',
    price: 34990,
    image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b15287?auto=format&fit=crop&w=900&q=80',
    category: 'Estrategia',
    players: '3-4 jugadores'
  },
  {
    id: 2,
    name: 'Azul Atelier',
    description: 'Patrones elegantes y decisiones simples que esconden mucha profundidad.',
    price: 28990,
    image: 'https://images.unsplash.com/photo-1632507127781-1a7d0df50e4c?auto=format&fit=crop&w=900&q=80',
    category: 'Familiar',
    players: '2-4 jugadores'
  },
  {
    id: 3,
    name: 'Ticket to Ride Norte',
    description: 'Conecta ciudades y crea rutas inolvidables con una curva de entrada amable.',
    price: 31990,
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=900&q=80',
    category: 'Aventura',
    players: '2-5 jugadores'
  },
  {
    id: 4,
    name: 'Wingspan Bosque',
    description: 'Una experiencia serena, tactica y bellamente ilustrada para jugar sin prisa.',
    price: 42990,
    image: 'https://images.unsplash.com/photo-1518131678677-a50a0fdaf634?auto=format&fit=crop&w=900&q=80',
    category: 'Engine building',
    players: '1-5 jugadores'
  },
  {
    id: 5,
    name: 'Dixit Bruma',
    description: 'Imaginacion, conversacion y cartas sugerentes para grupos amplios.',
    price: 25990,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
    category: 'Creativo',
    players: '3-6 jugadores'
  },
  {
    id: 6,
    name: 'Carcassonne Campo',
    description: 'Coloca losetas, levanta ciudades y disfruta un ritmo relajado pero competitivo.',
    price: 27990,
    image: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?auto=format&fit=crop&w=900&q=80',
    category: 'Clasico',
    players: '2-5 jugadores'
  }
];
