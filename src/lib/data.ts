import { Category, Neighborhood, Provider, SubscriptionPlan, AdminMetrics, Region } from './types';

export const SENEGAL_REGIONS: Region[] = [
  {
    id: 'dakar',
    name: 'Dakar',
    districts: [
      // 1. Plateau & Centre-Ville
      { id: 'plateau', name: 'Plateau' },
      { id: 'sandaga', name: 'Sandaga' },
      { id: 'kermel', name: 'Kermel' },
      { id: 'cap-manuel', name: 'Cap Manuel' },
      { id: 'rue-10', name: 'Rue 10' },
      { id: 'lamine-gueye', name: 'Avenue Lamine Guèye' },
      { id: 'cite-cap-vert', name: 'Cité Cap-Vert' },
      { id: 'ponty', name: 'Ponty' },
      { id: 'castel', name: 'Castel' },
      { id: 'mbambara', name: 'Mbambara' },

      // 2. Médina & Environs
      { id: 'medina', name: 'Médina' },
      { id: 'gibraltar', name: 'Gibraltar' },
      { id: 'diecko', name: 'Diecko' },
      { id: 'gouye-salane', name: 'Gouye Salane' },
      { id: 'santhiaba', name: 'Santhiaba' },
      { id: 'tilene', name: 'Tilène' },
      { id: 'abattoirs', name: 'Abattoirs' },
      { id: 'thierigne', name: 'Thierigne' },

      // 3. Gueule Tapée, Fass & Colobane
      { id: 'gueule-tapee', name: 'Gueule Tapée' },
      { id: 'fass', name: 'Fass' },
      { id: 'fass-delorme', name: 'Fass Delorme' },
      { id: 'fass-casier', name: 'Fass Casier' },
      { id: 'colobane', name: 'Colobane' },
      { id: 'colobane-hock', name: 'Colobane Hock' },
      { id: 'colobane-bayelaye', name: 'Colobane Bayélaye' },

      // 4. Fann, Point E & Amitié
      { id: 'fann-residence', name: 'Fann Résidence' },
      { id: 'fann-hock', name: 'Fann Hock' },
      { id: 'point-e', name: 'Point E' },
      { id: 'amitie-1-2-3', name: 'Amitié I, II, III' },
      { id: 'karack', name: 'Karack' },
      { id: 'baobabs', name: 'Baobabs' },

      // 5. Grand Dakar, Niary Tally & Bopp
      { id: 'grand-dakar', name: 'Grand Dakar' },
      { id: 'zone-a', name: 'Zone A' },
      { id: 'zone-b', name: 'Zone B' },
      { id: 'bopp', name: 'Bopp' },
      { id: 'cerf-volant', name: 'Cerf-Volant' },
      { id: 'ouagou-niayes', name: 'Ouagou Niayes' },
      { id: 'usine-bene-tally', name: 'Usine Bène Tally' },
      { id: 'usine-niary-tally', name: 'Usine Niary Tally' },

      // 6. Biscuiterie, Castors & Soprim
      { id: 'biscuiterie', name: 'Biscuiterie' },
      { id: 'castors', name: 'Castors' },
      { id: 'soprim', name: 'Soprim' },
      { id: 'cite-marine', name: 'Cité Marine' },
      { id: 'cite-elevage', name: 'Cité Élevage' },

      // 7. HLM
      { id: 'hlm-1-6', name: 'HLM 1 à HLM 6' },
      { id: 'hlm-grand-medine', name: 'HLM Grand Médine' },
      { id: 'hlm-montagne', name: 'HLM Montagne' },

      // 8. Hann, Maristes & Bel-Air
      { id: 'hann', name: 'Hann' },
      { id: 'hann-maristes', name: 'Hann Maristes' },
      { id: 'bel-air', name: 'Bel-Air' },
      { id: 'yarakh', name: 'Yarakh' },
      { id: 'zone-industrielle', name: 'Zone industrielle' },

      // 9. Liberté & Sicap
      { id: 'liberte-1-6', name: 'Liberté I, II, III, IV, V, VI' },
      { id: 'liberte-6-ext', name: 'Liberté VI Extension' },
      { id: 'sicap-amitie', name: 'Sicap Amitié' },
      { id: 'sicap-darabis', name: 'Sicap Darabis' },

      // 10. Dieuppeul & Derklé
      { id: 'dieuppeul-1-4', name: 'Dieuppeul I à IV' },
      { id: 'derkle', name: 'Derklé' },

      // 11. Mermoz & Sacré-Cœur
      { id: 'mermoz', name: 'Mermoz' },
      { id: 'sacre-coeur-1-2-3', name: 'Sacré-Cœur I, II, III' },
      { id: 'cite-keur-gorgui', name: 'Cité Keur Gorgui' },
      { id: 'sotrac', name: 'Sotrac' },

      // 12. Ouakam & Mamelles
      { id: 'ouakam', name: 'Ouakam' },
      { id: 'mamelles', name: 'Mamelles' },
      { id: 'cite-asecna', name: 'Cité ASECNA' },
      { id: 'cite-el-hadji-malick-sy', name: 'Cité El Hadji Malick Sy' },
      { id: 'monument-renaissance', name: 'Monument de la Renaissance' },

      // 13. Ngor & Almadies
      { id: 'ngor', name: 'Ngor' },
      { id: 'almadies', name: 'Almadies' },
      { id: 'ngor-almadies', name: 'Ngor Almadies' },
      { id: 'virage', name: 'Virage' },

      // 14. Yoff & Foires
      { id: 'yoff', name: 'Yoff' },
      { id: 'tonghor', name: 'Tonghor' },
      { id: 'ndeungagne', name: 'Ndeungagne' },
      { id: 'layenne', name: 'Layenne' },
      { id: 'diamalaye', name: 'Diamalaye' },
      { id: 'nord-foire', name: 'Nord-Foire' },
      { id: 'ouest-foire', name: 'Ouest-Foire' },

      // 15. Grand Yoff
      { id: 'grand-yoff', name: 'Grand Yoff' },
      { id: 'khar-yalla', name: 'Khar Yalla' },
      { id: 'arafat', name: 'Arafat' },
      { id: 'zone-captage', name: 'Zone de Captage' },
      { id: 'darou-salam', name: 'Darou Salam' },
      { id: 'taiba', name: 'Taïba' },
      { id: 'gazelle', name: 'Gazelle' },
      { id: 'cite-millionnaire', name: 'Cité Millionnaire' },

      // 16. Patte d'Oie & Keur Damel
      { id: 'patte-doie', name: 'Patte d’Oie' },
      { id: 'grand-medine', name: 'Grand Médine' },
      { id: 'patte-doie-builders', name: 'Patte d’Oie Builders' },
      { id: 'keur-damel', name: 'Keur Damel' },
      { id: 'cite-soprim', name: 'Cité Soprim' },
      { id: 'cite-impots-domaines', name: 'Cité Impôts et Domaines' },

      // 17. Parcelles Assainies
      { id: 'parcelles-assainies', name: 'Unités 1 à 26 (Parcelles Assainies)' },
      { id: 'cite-fadia', name: 'Cité Fadia' },

      // 18. Cambérène
      { id: 'camberene-traditionnel', name: 'Cambérène traditionnel' },
      { id: 'camberene-extension', name: 'Cambérène Extension' },

      // 19. Banlieue & Périphérie
      { id: 'guediawaye', name: 'Guédiawaye (Golf, Hamo, Wakhinane, Ndiarème)' },
      { id: 'pikine', name: 'Pikine (Centre, Thiaroye, Guinaw Rails)' },
      { id: 'keur-massar', name: 'Keur Massar & Malika' },
      { id: 'rufisque', name: 'Rufisque (Centre, Arafat, Bargny)' },
      { id: 'diamniadio', name: 'Diamniadio & Sébikotane' },
    ]
  },
  {
    id: 'thies',
    name: 'Thiès',
    districts: [
      // Quartiers de Thiès Ville
      { id: 'grand-standing', name: 'Grand Standing' },
      { id: 'cite-senghor', name: 'Cité Senghor' },
      { id: 'cite-ousmane-ngom', name: 'Cité Ousmane Ngom' },
      { id: 'hlm-route-de-dakar', name: 'HLM Route de Dakar' },
      { id: 'hlm-grand-standing', name: 'HLM Grand Standing' },
      { id: 'keur-mame-el-hadji', name: 'Keur Mame El Hadji' },
      { id: 'medina-fall', name: 'Médina Fall' },
      { id: 'medina-fall-extension', name: 'Médina Fall Extension' },
      { id: 'darou-salam-thies', name: 'Darou Salam' },
      { id: 'hersent', name: 'Hersent' },
      { id: 'nguinth', name: 'Nguinth' },
      { id: 'nguinth-extension', name: 'Nguinth Extension' },
      { id: 'diakhao', name: 'Diakhao' },
      { id: 'diakhao-thies', name: 'Diakhao Thiès' },
      { id: 'keur-issa', name: 'Keur Issa' },
      { id: 'keur-serigne-bi', name: 'Keur Serigne Bi' },
      { id: 'touba-thies', name: 'Touba Thiès' },
      { id: 'cite-malick-gaye', name: 'Cité Malick Gaye' },
      { id: 'cite-sonatel-thies', name: 'Cité Sonatel' },
      { id: 'cite-ouvriere', name: 'Cité Ouvrière' },
      { id: 'cite-police', name: 'Cité Police' },
      { id: 'cite-des-enseignants', name: 'Cité des Enseignants' },
      { id: 'thies-centre', name: 'Thiès Centre & Randoulène' },
      { id: 'thies-dixieme', name: 'Dixième & Cité Lamy' },

      // Département & Petite Côte
      { id: 'mbour', name: 'Mbour Ville' },
      { id: 'saly', name: 'Saly Portudal & Saly Niakhniakhal' },
      { id: 'somone', name: 'Somone & Ngaparou' },
      { id: 'popenguine', name: 'Popenguine, Toubab Dialaw & Ndayane' },
      { id: 'tivaouane', name: 'Tivaouane' },
      { id: 'joal', name: 'Joal-Fadiouth' },
      { id: 'pout', name: 'Pout' },
      { id: 'kayar', name: 'Kayar' },
      { id: 'khombole', name: 'Khombole' },
    ]
  },
  {
    id: 'saint-louis',
    name: 'Saint-Louis',
    districts: [
      { id: 'st-louis-centre', name: 'Saint-Louis Île (Centre Historique)' },
      { id: 'sor', name: 'Sor & Ndioloffène' },
      { id: 'gokhou-mbacc', name: 'Gokhou Mbacc & Hydrobase' },
      { id: 'pikine-sl', name: 'Pikine (Saint-Louis) & Balacoss' },
      { id: 'richard-toll', name: 'Richard-Toll' },
      { id: 'dagana', name: 'Dagana' },
      { id: 'podor', name: 'Podor' },
      { id: 'ross-bethio', name: 'Ross Béthio' },
    ]
  },
  {
    id: 'diourbel',
    name: 'Diourbel',
    districts: [
      { id: 'diourbel-ville', name: 'Diourbel Ville' },
      { id: 'touba-mosquee', name: 'Touba Grande Mosquée & Guédé' },
      { id: 'touba-darou', name: 'Touba Darou Marnane & Khayra' },
      { id: 'mbacke', name: 'Mbacké' },
      { id: 'bambey', name: 'Bambey' },
      { id: 'ndindy', name: 'Ndindy' },
    ]
  },
  {
    id: 'kaolack',
    name: 'Kaolack',
    districts: [
      { id: 'kaolack-centre', name: 'Kaolack Centre & Léona' },
      { id: 'medina-baye', name: 'Médina Baye & Sam' },
      { id: 'kahone', name: 'Kahone' },
      { id: 'ndoffane', name: 'Ndoffane' },
      { id: 'guinguineo', name: 'Guinguinéo' },
      { id: 'nioro', name: 'Nioro du Rip' },
    ]
  },
  {
    id: 'fatick',
    name: 'Fatick',
    districts: [
      { id: 'fatick-ville', name: 'Fatick Ville & Peulga' },
      { id: 'foundiougne', name: 'Foundiougne' },
      { id: 'sokone', name: 'Sokone' },
      { id: 'gossas', name: 'Gossas' },
      { id: 'passy', name: 'Passy' },
      { id: 'ndangane', name: 'Ndangane, Djiffer & Mar Lodj' },
    ]
  },
  {
    id: 'ziguinchor',
    name: 'Ziguinchor',
    districts: [
      { id: 'ziguinchor-centre', name: 'Ziguinchor Centre & Boucotte' },
      { id: 'ziguinchor-kande', name: 'Kandé & Lyndiane' },
      { id: 'cap-skirring', name: 'Cap Skirring & Kabrousse' },
      { id: 'oussouye', name: 'Oussouye' },
      { id: 'bignona', name: 'Bignona' },
      { id: 'kafountine', name: 'Kafountine & Abéné' },
    ]
  },
  {
    id: 'louga',
    name: 'Louga',
    districts: [
      { id: 'louga-ville', name: 'Louga Ville & Santhiaba' },
      { id: 'linguere', name: 'Linguère' },
      { id: 'dahra', name: 'Dahra Djoloff' },
      { id: 'kebemer', name: 'Kébémer' },
      { id: 'potou', name: 'Potou' },
    ]
  },
  {
    id: 'tambacounda',
    name: 'Tambacounda',
    districts: [
      { id: 'tamba-centre', name: 'Tambacounda Centre & Abattoirs' },
      { id: 'bakel', name: 'Bakel' },
      { id: 'goudiry', name: 'Goudiry' },
      { id: 'koumpentoum', name: 'Koumpentoum' },
    ]
  },
  {
    id: 'kolda',
    name: 'Kolda',
    districts: [
      { id: 'kolda-ville', name: 'Kolda Ville & Sikilo' },
      { id: 'velingara', name: 'Vélingara' },
      { id: 'medina-yoro', name: 'Médina Yoro Foulah' },
      { id: 'dabo', name: 'Dabo' },
    ]
  },
  {
    id: 'matam',
    name: 'Matam',
    districts: [
      { id: 'matam-ville', name: 'Matam Ville' },
      { id: 'ourossogui', name: 'Ourossogui' },
      { id: 'kanel', name: 'Kanel' },
      { id: 'ranerou', name: 'Ranérou' },
      { id: 'thilogne', name: 'Thilogne' },
    ]
  },
  {
    id: 'kaffrine',
    name: 'Kaffrine',
    districts: [
      { id: 'kaffrine-ville', name: 'Kaffrine Ville' },
      { id: 'birkelane', name: 'Birkelane' },
      { id: 'koungheul', name: 'Koungheul' },
      { id: 'malem-hodar', name: 'Malem-Hodar' },
    ]
  },
  {
    id: 'kedougou',
    name: 'Kédougou',
    districts: [
      { id: 'kedougou-ville', name: 'Kédougou Ville' },
      { id: 'saraya', name: 'Saraya' },
      { id: 'salemata', name: 'Salémata' },
      { id: 'dindefelo', name: 'Dindéfélo & Bandafassi' },
    ]
  },
  {
    id: 'sedhiou',
    name: 'Sédhiou',
    districts: [
      { id: 'sedhiou-ville', name: 'Sédhiou Ville' },
      { id: 'bounkiling', name: 'Bounkiling' },
      { id: 'goudomp', name: 'Goudomp' },
      { id: 'marsassoum', name: 'Marsassoum' },
    ]
  }
];

export const NEIGHBORHOODS: Neighborhood[] = [
  // Plateau & Centre-Ville
  { id: 'plateau', name: 'Plateau', city: 'Dakar', latitude: 14.6712, longitude: -17.4332, popularServices: ['Électricité', 'Serrurerie d\'urgence', 'Vitrerie'] },
  { id: 'sandaga', name: 'Sandaga', city: 'Dakar', latitude: 14.6725, longitude: -17.4370, popularServices: ['Électricité', 'Plomberie', 'Serrurerie'] },
  { id: 'kermel', name: 'Kermel', city: 'Dakar', latitude: 14.6700, longitude: -17.4310, popularServices: ['Climatisation', 'Plomberie', 'Électricité'] },
  { id: 'cap-manuel', name: 'Cap Manuel', city: 'Dakar', latitude: 14.6550, longitude: -17.4300, popularServices: ['Peinture', 'Maçonnerie', 'Électricité'] },
  { id: 'rue-10', name: 'Rue 10', city: 'Dakar', latitude: 14.6850, longitude: -17.4480, popularServices: ['Plomberie', 'Menuiserie', 'Électricité'] },
  { id: 'lamine-gueye', name: 'Avenue Lamine Guèye', city: 'Dakar', latitude: 14.6740, longitude: -17.4380, popularServices: ['Serrurerie', 'Vitrerie', 'Électricité'] },
  { id: 'cite-cap-vert', name: 'Cité Cap-Vert', city: 'Dakar', latitude: 14.6650, longitude: -17.4340, popularServices: ['Plomberie', 'Électricité', 'Nettoyage'] },
  { id: 'ponty', name: 'Ponty', city: 'Dakar', latitude: 14.6710, longitude: -17.4350, popularServices: ['Électricité', 'Climatisation', 'Serrurerie'] },
  { id: 'castel', name: 'Castel', city: 'Dakar', latitude: 14.6680, longitude: -17.4320, popularServices: ['Menuiserie', 'Peinture', 'Plomberie'] },
  { id: 'mbambara', name: 'Mbambara', city: 'Dakar', latitude: 14.6780, longitude: -17.4420, popularServices: ['Maçonnerie', 'Plomberie', 'Électricité'] },

  // Médina
  { id: 'medina', name: 'Médina', city: 'Dakar', latitude: 14.6880, longitude: -17.4520, popularServices: ['Plomberie', 'Électricité', 'Menuiserie Alu'] },
  { id: 'gibraltar', name: 'Gibraltar', city: 'Dakar', latitude: 14.6830, longitude: -17.4490, popularServices: ['Peinture', 'Plomberie', 'Électricité'] },
  { id: 'diecko', name: 'Diecko', city: 'Dakar', latitude: 14.6870, longitude: -17.4510, popularServices: ['Maçonnerie', 'Soudure', 'Plomberie'] },
  { id: 'gouye-salane', name: 'Gouye Salane', city: 'Dakar', latitude: 14.6890, longitude: -17.4530, popularServices: ['Électricité', 'Plomberie', 'Serrurerie'] },
  { id: 'santhiaba', name: 'Santhiaba', city: 'Dakar', latitude: 14.6860, longitude: -17.4500, popularServices: ['Menuiserie', 'Peinture', 'Électricité'] },
  { id: 'tilene', name: 'Tilène', city: 'Dakar', latitude: 14.6840, longitude: -17.4480, popularServices: ['Serrurerie', 'Électricité', 'Plomberie'] },
  { id: 'abattoirs', name: 'Abattoirs', city: 'Dakar', latitude: 14.6920, longitude: -17.4450, popularServices: ['Frigoriste', 'Plomberie', 'Électricité'] },
  { id: 'thierigne', name: 'Thierigne', city: 'Dakar', latitude: 14.6855, longitude: -17.4515, popularServices: ['Maçonnerie', 'Électricité', 'Plomberie'] },

  // Gueule Tapée, Fass & Colobane
  { id: 'gueule-tapee', name: 'Gueule Tapée', city: 'Dakar', latitude: 14.6895, longitude: -17.4580, popularServices: ['Plomberie', 'Électricité', 'Mécanique'] },
  { id: 'fass', name: 'Fass', city: 'Dakar', latitude: 14.6930, longitude: -17.4550, popularServices: ['Climatisation', 'Électricité', 'Peinture'] },
  { id: 'fass-delorme', name: 'Fass Delorme', city: 'Dakar', latitude: 14.6940, longitude: -17.4540, popularServices: ['Électricité', 'Plomberie', 'Menuiserie'] },
  { id: 'fass-casier', name: 'Fass Casier', city: 'Dakar', latitude: 14.6925, longitude: -17.4560, popularServices: ['Maçonnerie', 'Carrelage', 'Plomberie'] },
  { id: 'colobane', name: 'Colobane', city: 'Dakar', latitude: 14.6960, longitude: -17.4480, popularServices: ['Mécanique', 'Électricité auto', 'Soudure'] },
  { id: 'colobane-hock', name: 'Colobane Hock', city: 'Dakar', latitude: 14.6950, longitude: -17.4490, popularServices: ['Menuiserie Alu', 'Soudure', 'Électricité'] },
  { id: 'colobane-bayelaye', name: 'Colobane Bayélaye', city: 'Dakar', latitude: 14.6970, longitude: -17.4470, popularServices: ['Mécanique', 'Plomberie', 'Électricité'] },

  // Fann, Point E & Amitié
  { id: 'fann-residence', name: 'Fann Résidence', city: 'Dakar', latitude: 14.6910, longitude: -17.4720, popularServices: ['Climatisation', 'Électricité', 'Piscine'] },
  { id: 'fann-hock', name: 'Fann Hock', city: 'Dakar', latitude: 14.6850, longitude: -17.4640, popularServices: ['Plomberie', 'Peinture', 'Serrurerie'] },
  { id: 'point-e', name: 'Point E', city: 'Dakar', latitude: 14.6932, longitude: -17.4678, popularServices: ['Climatisation', 'Plomberie', 'Serrurerie'] },
  { id: 'amitie-1-2-3', name: 'Amitié I, II, III', city: 'Dakar', latitude: 14.7010, longitude: -17.4610, popularServices: ['Électricité', 'Plomberie', 'Peinture'] },
  { id: 'karack', name: 'Karack', city: 'Dakar', latitude: 14.7030, longitude: -17.4630, popularServices: ['Menuiserie', 'Plomberie', 'Électricité'] },
  { id: 'baobabs', name: 'Baobabs', city: 'Dakar', latitude: 14.7020, longitude: -17.4590, popularServices: ['Climatisation', 'Électricité', 'Jardinage'] },

  // Grand Dakar, Niary Tally & Bopp
  { id: 'grand-dakar', name: 'Grand Dakar', city: 'Dakar', latitude: 14.7050, longitude: -17.4490, popularServices: ['Plomberie', 'Électricité', 'Maçonnerie'] },
  { id: 'zone-a', name: 'Zone A', city: 'Dakar', latitude: 14.7015, longitude: -17.4530, popularServices: ['Peinture', 'Menuiserie', 'Électricité'] },
  { id: 'zone-b', name: 'Zone B', city: 'Dakar', latitude: 14.7040, longitude: -17.4560, popularServices: ['Climatisation', 'Plomberie', 'Électricité'] },
  { id: 'bopp', name: 'Bopp', city: 'Dakar', latitude: 14.6980, longitude: -17.4440, popularServices: ['Serrurerie', 'Électricité', 'Plomberie'] },
  { id: 'cerf-volant', name: 'Cerf-Volant', city: 'Dakar', latitude: 14.7060, longitude: -17.4470, popularServices: ['Menuiserie Alu', 'Peinture', 'Plomberie'] },
  { id: 'ouagou-niayes', name: 'Ouagou Niayes', city: 'Dakar', latitude: 14.7100, longitude: -17.4510, popularServices: ['Électricité', 'Plomberie', 'Carrelage'] },
  { id: 'usine-bene-tally', name: 'Usine Bène Tally', city: 'Dakar', latitude: 14.7070, longitude: -17.4460, popularServices: ['Maçonnerie', 'Soudure', 'Électricité'] },
  { id: 'usine-niary-tally', name: 'Usine Niary Tally', city: 'Dakar', latitude: 14.7080, longitude: -17.4480, popularServices: ['Menuiserie', 'Plomberie', 'Électricité'] },

  // Biscuiterie, Castors & Soprim
  { id: 'biscuiterie', name: 'Biscuiterie', city: 'Dakar', latitude: 14.7045, longitude: -17.4430, popularServices: ['Électricité', 'Plomberie', 'Climatisation'] },
  { id: 'castors', name: 'Castors', city: 'Dakar', latitude: 14.7110, longitude: -17.4450, popularServices: ['Plomberie', 'Électricité', 'Maçonnerie'] },
  { id: 'soprim', name: 'Soprim', city: 'Dakar', latitude: 14.7480, longitude: -17.4250, popularServices: ['Carrelage', 'Plomberie', 'Peinture'] },
  { id: 'cite-marine', name: 'Cité Marine', city: 'Dakar', latitude: 14.7055, longitude: -17.4410, popularServices: ['Électricité', 'Plomberie', 'Nettoyage'] },
  { id: 'cite-elevage', name: 'Cité Élevage', city: 'Dakar', latitude: 14.7130, longitude: -17.4420, popularServices: ['Peinture', 'Menuiserie', 'Électricité'] },

  // HLM
  { id: 'hlm-1-6', name: 'HLM 1 à HLM 6', city: 'Dakar', latitude: 14.7090, longitude: -17.4410, popularServices: ['Menuiserie', 'Plomberie', 'Électricité'] },
  { id: 'hlm-grand-medine', name: 'HLM Grand Médine', city: 'Dakar', latitude: 14.7420, longitude: -17.4350, popularServices: ['Climatisation', 'Électricité', 'Peinture'] },
  { id: 'hlm-montagne', name: 'HLM Montagne', city: 'Dakar', latitude: 14.7075, longitude: -17.4390, popularServices: ['Plomberie', 'Maçonnerie', 'Soudure'] },

  // Hann, Maristes & Bel-Air
  { id: 'hann', name: 'Hann', city: 'Dakar', latitude: 14.7250, longitude: -17.4280, popularServices: ['Plomberie', 'Électricité', 'Maçonnerie'] },
  { id: 'hann-maristes', name: 'Hann Maristes', city: 'Dakar', latitude: 14.7302, longitude: -17.4321, popularServices: ['Peinture', 'Climatisation', 'Nettoyage'] },
  { id: 'bel-air', name: 'Bel-Air', city: 'Dakar', latitude: 14.7180, longitude: -17.4200, popularServices: ['Frigoriste', 'Électricité', 'Plomberie'] },
  { id: 'yarakh', name: 'Yarakh', city: 'Dakar', latitude: 14.7290, longitude: -17.4210, popularServices: ['Mécanique', 'Soudure', 'Électricité'] },
  { id: 'zone-industrielle', name: 'Zone industrielle', city: 'Dakar', latitude: 14.7150, longitude: -17.4250, popularServices: ['Électricité industrielle', 'Soudure', 'Climatisation'] },

  // Liberté & Sicap
  { id: 'liberte-1-6', name: 'Liberté I, II, III, IV, V, VI', city: 'Dakar', latitude: 14.7121, longitude: -17.4520, popularServices: ['Menuiserie', 'Soudure', 'Mécanique'] },
  { id: 'liberte-6-ext', name: 'Liberté VI Extension', city: 'Dakar', latitude: 14.7190, longitude: -17.4580, popularServices: ['Climatisation', 'Électricité', 'Plomberie'] },
  { id: 'sicap-amitie', name: 'Sicap Amitié', city: 'Dakar', latitude: 14.7060, longitude: -17.4570, popularServices: ['Plomberie', 'Électricité', 'Peinture'] },
  { id: 'sicap-darabis', name: 'Sicap Darabis', city: 'Dakar', latitude: 14.7140, longitude: -17.4540, popularServices: ['Serrurerie', 'Menuiserie Alu', 'Carrelage'] },

  // Dieuppeul & Derklé
  { id: 'dieuppeul-1-4', name: 'Dieuppeul I à IV', city: 'Dakar', latitude: 14.7145, longitude: -17.4490, popularServices: ['Climatisation', 'Électricité', 'Plomberie'] },
  { id: 'derkle', name: 'Derklé', city: 'Dakar', latitude: 14.7170, longitude: -17.4470, popularServices: ['Peinture', 'Plomberie', 'Menuiserie'] },

  // Mermoz & Sacré-Cœur
  { id: 'mermoz', name: 'Mermoz', city: 'Dakar', latitude: 14.7088, longitude: -17.4764, popularServices: ['Climatisation', 'Nettoyage', 'Peinture'] },
  { id: 'sacre-coeur-1-2-3', name: 'Sacré-Cœur I, II, III', city: 'Dakar', latitude: 14.7156, longitude: -17.4642, popularServices: ['Électricité', 'Plomberie', 'Déménagement'] },
  { id: 'cite-keur-gorgui', name: 'Cité Keur Gorgui', city: 'Dakar', latitude: 14.7110, longitude: -17.4670, popularServices: ['Climatisation', 'Électricité', 'Réseau & Caméras'] },
  { id: 'sotrac', name: 'Sotrac', city: 'Dakar', latitude: 14.7135, longitude: -17.4690, popularServices: ['Plomberie', 'Électricité', 'Peinture'] },

  // Ouakam & Mamelles
  { id: 'ouakam', name: 'Ouakam', city: 'Dakar', latitude: 14.7234, longitude: -17.4891, popularServices: ['Maçonnerie', 'Électricité', 'Plomberie'] },
  { id: 'mamelles', name: 'Mamelles', city: 'Dakar', latitude: 14.7310, longitude: -17.4980, popularServices: ['Peinture', 'Climatisation', 'Plomberie'] },
  { id: 'cite-asecna', name: 'Cité ASECNA', city: 'Dakar', latitude: 14.7260, longitude: -17.4920, popularServices: ['Électricité', 'Climatisation', 'Serrurerie'] },
  { id: 'cite-el-hadji-malick-sy', name: 'Cité El Hadji Malick Sy', city: 'Dakar', latitude: 14.7280, longitude: -17.4940, popularServices: ['Plomberie', 'Électricité', 'Peinture'] },
  { id: 'monument-renaissance', name: 'Monument de la Renaissance', city: 'Dakar', latitude: 14.7220, longitude: -17.4950, popularServices: ['Vitrerie', 'Électricité', 'Soudure'] },

  // Ngor & Almadies
  { id: 'ngor', name: 'Ngor', city: 'Dakar', latitude: 14.7533, longitude: -17.5144, popularServices: ['Serrurerie', 'Menuiserie', 'Peinture'] },
  { id: 'almadies', name: 'Almadies', city: 'Dakar', latitude: 14.7456, longitude: -17.5186, popularServices: ['Plomberie', 'Climatisation', 'Électricité'] },
  { id: 'ngor-almadies', name: 'Ngor Almadies', city: 'Dakar', latitude: 14.7500, longitude: -17.5160, popularServices: ['Piscine', 'Climatisation', 'Serrurerie'] },
  { id: 'virage', name: 'Virage', city: 'Dakar', latitude: 14.7510, longitude: -17.5020, popularServices: ['Menuiserie Alu', 'Plomberie', 'Électricité'] },

  // Yoff & Foires
  { id: 'yoff', name: 'Yoff', city: 'Dakar', latitude: 14.7578, longitude: -17.4678, popularServices: ['Plomberie', 'Maçonnerie', 'Soudure'] },
  { id: 'tonghor', name: 'Tonghor', city: 'Dakar', latitude: 14.7610, longitude: -17.4720, popularServices: ['Maçonnerie', 'Plomberie', 'Électricité'] },
  { id: 'ndeungagne', name: 'Ndeungagne', city: 'Dakar', latitude: 14.7590, longitude: -17.4650, popularServices: ['Électricité', 'Peinture', 'Menuiserie'] },
  { id: 'layenne', name: 'Layenne', city: 'Dakar', latitude: 14.7620, longitude: -17.4690, popularServices: ['Plomberie', 'Serrurerie', 'Maçonnerie'] },
  { id: 'diamalaye', name: 'Diamalaye', city: 'Dakar', latitude: 14.7640, longitude: -17.4580, popularServices: ['Carrelage', 'Plomberie', 'Électricité'] },
  { id: 'nord-foire', name: 'Nord-Foire', city: 'Dakar', latitude: 14.7490, longitude: -17.4610, popularServices: ['Climatisation', 'Électricité', 'Plomberie'] },
  { id: 'ouest-foire', name: 'Ouest-Foire', city: 'Dakar', latitude: 14.7440, longitude: -17.4660, popularServices: ['Serrurerie', 'Peinture', 'Nettoyage'] },

  // Grand Yoff
  { id: 'grand-yoff', name: 'Grand Yoff', city: 'Dakar', latitude: 14.7360, longitude: -17.4520, popularServices: ['Maçonnerie', 'Menuiserie Alu', 'Mécanique'] },
  { id: 'khar-yalla', name: 'Khar Yalla', city: 'Dakar', latitude: 14.7310, longitude: -17.4560, popularServices: ['Électricité', 'Plomberie', 'Soudure'] },
  { id: 'arafat', name: 'Arafat', city: 'Dakar', latitude: 14.7340, longitude: -17.4490, popularServices: ['Carrelage', 'Maçonnerie', 'Électricité'] },
  { id: 'zone-captage', name: 'Zone de Captage', city: 'Dakar', latitude: 14.7280, longitude: -17.4450, popularServices: ['Climatisation', 'Plomberie', 'Électricité'] },
  { id: 'darou-salam', name: 'Darou Salam', city: 'Dakar', latitude: 14.7380, longitude: -17.4540, popularServices: ['Menuiserie', 'Peinture', 'Plomberie'] },
  { id: 'taiba', name: 'Taïba', city: 'Dakar', latitude: 14.7350, longitude: -17.4505, popularServices: ['Soudure', 'Maçonnerie', 'Électricité'] },
  { id: 'gazelle', name: 'Gazelle', city: 'Dakar', latitude: 14.7370, longitude: -17.4480, popularServices: ['Plomberie', 'Électricité', 'Peinture'] },
  { id: 'cite-millionnaire', name: 'Cité Millionnaire', city: 'Dakar', latitude: 14.7390, longitude: -17.4460, popularServices: ['Climatisation', 'Électricité', 'Plomberie'] },

  // Patte d'Oie & Keur Damel
  { id: 'patte-doie', name: 'Patte d’Oie', city: 'Dakar', latitude: 14.7430, longitude: -17.4420, popularServices: ['Plomberie', 'Électricité', 'Peinture'] },
  { id: 'grand-medine', name: 'Grand Médine', city: 'Dakar', latitude: 14.7410, longitude: -17.4380, popularServices: ['Menuiserie Alu', 'Carrelage', 'Électricité'] },
  { id: 'patte-doie-builders', name: 'Patte d’Oie Builders', city: 'Dakar', latitude: 14.7450, longitude: -17.4400, popularServices: ['Climatisation', 'Plomberie', 'Électricité'] },
  { id: 'keur-damel', name: 'Keur Damel', city: 'Dakar', latitude: 14.7470, longitude: -17.4450, popularServices: ['Serrurerie', 'Peinture', 'Plomberie'] },
  { id: 'cite-soprim', name: 'Cité Soprim', city: 'Dakar', latitude: 14.7485, longitude: -17.4260, popularServices: ['Électricité', 'Plomberie', 'Maçonnerie'] },
  { id: 'cite-impots-domaines', name: 'Cité Impôts et Domaines', city: 'Dakar', latitude: 14.7460, longitude: -17.4310, popularServices: ['Climatisation', 'Nettoyage', 'Électricité'] },

  // Parcelles Assainies
  { id: 'parcelles-assainies', name: 'Unités 1 à 26 (Parcelles Assainies)', city: 'Dakar', latitude: 14.7580, longitude: -17.4310, popularServices: ['Maçonnerie', 'Plomberie', 'Électricité', 'Carrelage'] },
  { id: 'cite-fadia', name: 'Cité Fadia', city: 'Dakar', latitude: 14.7620, longitude: -17.4280, popularServices: ['Plomberie', 'Électricité', 'Peinture'] },

  // Cambérène
  { id: 'camberene-traditionnel', name: 'Cambérène traditionnel', city: 'Dakar', latitude: 14.7700, longitude: -17.4220, popularServices: ['Maçonnerie', 'Soudure', 'Plomberie'] },
  { id: 'camberene-extension', name: 'Cambérène Extension', city: 'Dakar', latitude: 14.7730, longitude: -17.4180, popularServices: ['Électricité', 'Carrelage', 'Plomberie'] },

  // Banlieue & Périphérie Dakar
  { id: 'guediawaye', name: 'Guédiawaye (Golf, Hamo, Wakhinane, Ndiarème)', city: 'Dakar', latitude: 14.7734, longitude: -17.3987, popularServices: ['Maçonnerie', 'Menuiserie Alu', 'Mécanique'] },
  { id: 'pikine', name: 'Pikine (Centre, Thiaroye, Guinaw Rails)', city: 'Dakar', latitude: 14.7550, longitude: -17.3950, popularServices: ['Soudure', 'Mécanique', 'Électricité'] },
  { id: 'keur-massar', name: 'Keur Massar & Malika', city: 'Dakar', latitude: 14.7865, longitude: -17.3123, popularServices: ['Carrelage', 'Plomberie', 'Soudure'] },
  { id: 'rufisque', name: 'Rufisque (Centre, Arafat, Bargny)', city: 'Dakar', latitude: 14.7167, longitude: -17.2667, popularServices: ['Maçonnerie', 'Électricité', 'Ferronnerie'] },
  { id: 'diamniadio', name: 'Diamniadio & Sébikotane', city: 'Dakar', latitude: 14.7300, longitude: -17.1800, popularServices: ['Gros œuvre', 'Électricité', 'Plomberie'] },

  // --- Région de Thiès ---
  { id: 'grand-standing', name: 'Grand Standing', city: 'Thiès', latitude: 14.7830, longitude: -16.9380, popularServices: ['Plomberie', 'Climatisation', 'Électricité'] },
  { id: 'cite-senghor', name: 'Cité Senghor', city: 'Thiès', latitude: 14.7880, longitude: -16.9420, popularServices: ['Peinture', 'Menuiserie Alu', 'Électricité'] },
  { id: 'cite-ousmane-ngom', name: 'Cité Ousmane Ngom', city: 'Thiès', latitude: 14.7920, longitude: -16.9350, popularServices: ['Électricité', 'Plomberie', 'Carrelage'] },
  { id: 'hlm-route-de-dakar', name: 'HLM Route de Dakar', city: 'Thiès', latitude: 14.7790, longitude: -16.9450, popularServices: ['Plomberie', 'Électricité', 'Serrurerie'] },
  { id: 'hlm-grand-standing', name: 'HLM Grand Standing', city: 'Thiès', latitude: 14.7810, longitude: -16.9390, popularServices: ['Climatisation', 'Électricité', 'Peinture'] },
  { id: 'keur-mame-el-hadji', name: 'Keur Mame El Hadji', city: 'Thiès', latitude: 14.7950, longitude: -16.9280, popularServices: ['Maçonnerie', 'Soudure', 'Plomberie'] },
  { id: 'medina-fall', name: 'Médina Fall', city: 'Thiès', latitude: 14.8050, longitude: -16.9250, popularServices: ['Électricité', 'Plomberie', 'Maçonnerie'] },
  { id: 'medina-fall-extension', name: 'Médina Fall Extension', city: 'Thiès', latitude: 14.8100, longitude: -16.9220, popularServices: ['Maçonnerie', 'Soudure', 'Électricité'] },
  { id: 'darou-salam-thies', name: 'Darou Salam', city: 'Thiès', latitude: 14.7980, longitude: -16.9320, popularServices: ['Menuiserie', 'Peinture', 'Plomberie'] },
  { id: 'hersent', name: 'Hersent', city: 'Thiès', latitude: 14.7750, longitude: -16.9200, popularServices: ['Mécanique', 'Électricité', 'Soudure'] },
  { id: 'nguinth', name: 'Nguinth', city: 'Thiès', latitude: 14.8020, longitude: -16.9150, popularServices: ['Plomberie', 'Électricité', 'Carrelage'] },
  { id: 'nguinth-extension', name: 'Nguinth Extension', city: 'Thiès', latitude: 14.8060, longitude: -16.9110, popularServices: ['Maçonnerie', 'Menuiserie', 'Électricité'] },
  { id: 'diakhao', name: 'Diakhao', city: 'Thiès', latitude: 14.7900, longitude: -16.9180, popularServices: ['Électricité', 'Plomberie', 'Serrurerie'] },
  { id: 'diakhao-thies', name: 'Diakhao Thiès', city: 'Thiès', latitude: 14.7910, longitude: -16.9170, popularServices: ['Peinture', 'Menuiserie Alu', 'Électricité'] },
  { id: 'keur-issa', name: 'Keur Issa', city: 'Thiès', latitude: 14.7700, longitude: -16.9350, popularServices: ['Maçonnerie', 'Soudure', 'Plomberie'] },
  { id: 'keur-serigne-bi', name: 'Keur Serigne Bi', city: 'Thiès', latitude: 14.7850, longitude: -16.9260, popularServices: ['Électricité', 'Plomberie', 'Peinture'] },
  { id: 'touba-thies', name: 'Touba Thiès', city: 'Thiès', latitude: 14.7870, longitude: -16.9300, popularServices: ['Menuiserie', 'Électricité', 'Plomberie'] },
  { id: 'cite-malick-gaye', name: 'Cité Malick Gaye', city: 'Thiès', latitude: 14.7930, longitude: -16.9380, popularServices: ['Climatisation', 'Plomberie', 'Électricité'] },
  { id: 'cite-sonatel-thies', name: 'Cité Sonatel', city: 'Thiès', latitude: 14.7860, longitude: -16.9410, popularServices: ['Électricité', 'Réseau & Caméras', 'Plomberie'] },
  { id: 'cite-ouvriere', name: 'Cité Ouvrière', city: 'Thiès', latitude: 14.7820, longitude: -16.9290, popularServices: ['Mécanique', 'Soudure', 'Électricité'] },
  { id: 'cite-police', name: 'Cité Police', city: 'Thiès', latitude: 14.7800, longitude: -16.9340, popularServices: ['Serrurerie', 'Peinture', 'Plomberie'] },
  { id: 'cite-des-enseignants', name: 'Cité des Enseignants', city: 'Thiès', latitude: 14.7890, longitude: -16.9450, popularServices: ['Climatisation', 'Peinture', 'Électricité'] },
  { id: 'thies-centre', name: 'Thiès Centre', city: 'Thiès', latitude: 14.7910, longitude: -16.9260, popularServices: ['Électricité', 'Serrurerie', 'Plomberie'] },
  { id: 'mbour', name: 'Mbour', city: 'Thiès', latitude: 14.4220, longitude: -16.9638, popularServices: ['Climatisation', 'Plomberie', 'Électricité'] },
  { id: 'saly', name: 'Saly Portudal', city: 'Thiès', latitude: 14.4420, longitude: -17.0250, popularServices: ['Piscine', 'Climatisation', 'Électricité'] },
];

export const CATEGORIES: Category[] = [
  {
    id: 'plomberie',
    name: 'Plomberie & Sanitaire',
    slug: 'plomberie',
    iconName: 'Wrench',
    description: 'Dépannage d\'urgence fuites d\'eau, débouchage canalisation, chauffe-eau, installation robinetterie et sanitaires.',
    shortDesc: 'Fuites, tuyauterie, chauffe-eau & sanitaires',
    providerCount: 42,
    popularKeywords: ['fuite eau', 'évier bouché', 'chauffe-eau solaire', 'robinet', 'fosse septique'],
    bannerImage: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 10000,
  },
  {
    id: 'electricite',
    name: 'Électricité & Énergie Solaire',
    slug: 'electricite',
    iconName: 'Zap',
    description: 'Court-circuit, installation tableau électrique, pose luminaires, prises, disjoncteurs, groupes électrogènes et solaire.',
    shortDesc: 'Pannes, tableau électrique, luminaires & solaire',
    providerCount: 38,
    popularKeywords: ['court circuit', 'disjoncteur', 'panneau solaire', 'groupe électrogène', 'prise'],
    bannerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 15000,
  },
  {
    id: 'climatisation',
    name: 'Climatisation, Froid & Frigoriste',
    slug: 'climatisation',
    iconName: 'Wind',
    description: 'Installation split, recharge gaz frigorifique, entretien antibactérien, nettoyage filtres et réparation frigo.',
    shortDesc: 'Recharge gaz, pose split & entretien frigo',
    providerCount: 29,
    popularKeywords: ['recharge gaz r410', 'split 1.5cv', 'entretien clim', 'chambre froide'],
    bannerImage: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 15000,
  },
  {
    id: 'menuiserie',
    name: 'Menuiserie Bois & Ébénisterie',
    slug: 'menuiserie',
    iconName: 'Hammer',
    description: 'Portes, placards sur mesure, meubles de cuisine, dressings, lits, parquets et réparation volets en bois.',
    shortDesc: 'Portes bois, placards, cuisines & dressings',
    providerCount: 31,
    popularKeywords: ['placard sur mesure', 'porte bois', 'meuble cuisine', 'lit bois massif'],
    bannerImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 25000,
  },
  {
    id: 'menuiserie-alu',
    name: 'Menuiserie Aluminium, Vitrerie & PVC',
    slug: 'menuiserie-alu',
    iconName: 'Layers',
    description: 'Baies vitrées coulissantes en alu, fenêtres, portes vitrées, séparation bureaux, vérandas et rideaux métalliques.',
    shortDesc: 'Baies vitrées alu, fenêtres, vitrerie & PVC',
    providerCount: 28,
    popularKeywords: ['baie vitrée', 'fenêtre alu', 'vitre brisée', 'porte accordéon'],
    bannerImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 30000,
  },
  {
    id: 'peinture',
    name: 'Peinture, Décoration & Faux Plafonds',
    slug: 'peinture',
    iconName: 'Paintbrush',
    description: 'Peinture intérieure & extérieure, enduit lissé, faux plafonds en placo/staff, stucco, papier peint et fresques.',
    shortDesc: 'Peinture murs, placo, staff & stucco',
    providerCount: 27,
    popularKeywords: ['peinture mate', 'étanchéité toit', 'stucco', 'enduit façade', 'placo staff'],
    bannerImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 20000,
  },
  {
    id: 'serrurerie',
    name: 'Serrurerie & Portes Blindées',
    slug: 'serrurerie',
    iconName: 'Key',
    description: 'Ouverture de porte claquée 24/7, remplacement serrure multipoints, blindage de porte et duplication de clés.',
    shortDesc: 'Ouverture porte bloquée 24/7 & serrures sécurité',
    providerCount: 19,
    popularKeywords: ['porte claquée', 'serrure 3 points', 'clé perdue', 'cylindre haute sécurité'],
    bannerImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 15000,
  },
  {
    id: 'soudure',
    name: 'Soudure, Ferronnerie & Métallerie',
    slug: 'soudure',
    iconName: 'Flame',
    description: 'Grilles de protection antivol, portails coulissants en fer forgé, garde-corps balcon et charpente métallique.',
    shortDesc: 'Portails fer forgé, grilles antivol & rampes',
    providerCount: 22,
    popularKeywords: ['grille antivol', 'portail coulissant fer', 'garde corps inox', 'soudure arc'],
    bannerImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 30000,
  },
  {
    id: 'maconnerie',
    name: 'Maçonnerie, Gros Œuvre & Rénovation',
    slug: 'maconnerie',
    iconName: 'Layers',
    description: 'Construction de murs, clôtures, dalles béton, agrandissement de pièces, crépissage et fondations.',
    shortDesc: 'Murs, clôtures, dalles béton & crépissage',
    providerCount: 25,
    popularKeywords: ['chape béton', 'mur clôture', 'briques', 'fondation'],
    bannerImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 30000,
  },
  {
    id: 'carrelage',
    name: 'Carrelage, Faïence & Dallage',
    slug: 'carrelage',
    iconName: 'Layers',
    description: 'Pose carrelage grand format 60x60/120x60, faïence salle de bain, dallage extérieur, marbre et mosaïque.',
    shortDesc: 'Pose carrelage sol, faïence murale & marbre',
    providerCount: 23,
    popularKeywords: ['carrelage 60x60', 'faïence salle de bain', 'pose marbre', 'plinthes'],
    bannerImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 20000,
  },
  {
    id: 'mecanique',
    name: 'Mécanique Auto, Moto & Électricité Auto',
    slug: 'mecanique',
    iconName: 'Car',
    description: 'Diagnostic valise électronique, vidange express à domicile, freinage, batterie, alternateur et suspension.',
    shortDesc: 'Diagnostic valise, vidange domicile & pannes auto',
    providerCount: 18,
    popularKeywords: ['diagnostic valise obd', 'batterie à plat', 'vidange 5w30', 'plaquettes frein'],
    bannerImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 15000,
  },
  {
    id: 'electromenager',
    name: 'Dépannage Électroménager & TV',
    slug: 'electromenager',
    iconName: 'Zap',
    description: 'Réparation machine à laver, réfrigérateur, micro-ondes, téléviseur écran plat Smart TV, gazinière et four électrique.',
    shortDesc: 'Lave-linge, TV, micro-ondes, fours & gazinières',
    providerCount: 20,
    popularKeywords: ['machine à laver ne vidange plus', 'écran télé noir', 'four ne chauffe pas', 'frigo'],
    bannerImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 12000,
  },
  {
    id: 'nettoyage',
    name: 'Nettoyage, Désinfection & Fin de Chantier',
    slug: 'nettoyage',
    iconName: 'Sparkles',
    description: 'Nettoyage après travaux, pressing canapés & matelas à domicile, désinsectisation / dératisation et grand ménage.',
    shortDesc: 'Fin de chantier, canapés à domicile & désinsectisation',
    providerCount: 16,
    popularKeywords: ['lavage canapé vapeur', 'ménage fin de chantier', 'désinsectisation cafards'],
    bannerImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 20000,
  },
  {
    id: 'demenagement',
    name: 'Déménagement & Transport de Marchandises',
    slug: 'demenagement',
    iconName: 'Truck',
    description: 'Transport de meubles, camion avec manutentionnaires, emballage soigné, livraisons et transport de marchandises.',
    shortDesc: 'Camions avec porteurs, emballage & transport sécurisé',
    providerCount: 14,
    popularKeywords: ['camionnette déménagement', 'porteurs dakar', 'cartons déménagement'],
    bannerImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 40000,
  },
  {
    id: 'couture',
    name: 'Couture, Stylisme & Retouche',
    slug: 'couture',
    iconName: 'Scissors',
    description: 'Confection boubous traditionnels, costumes hommes/femmes, robes de soirée, retouches et broderie sur mesure.',
    shortDesc: 'Boubous, costumes, robes de soirée & retouches',
    providerCount: 21,
    popularKeywords: ['tailleur dakar', 'couture boubou', 'retouche pantalon', 'robe sur mesure'],
    bannerImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 15000,
  },
  {
    id: 'coiffure-beaute',
    name: 'Coiffure, Barbier & Soins Esthétiques',
    slug: 'coiffure-beaute',
    iconName: 'UserCheck',
    description: 'Coiffure dames (tresses, mèches, perruques), barbier hommes à domicile, manucure, pédicure et maquillage professionnel.',
    shortDesc: 'Coiffure dames, barbier hommes, soins & maquillage',
    providerCount: 18,
    popularKeywords: ['tresse africaine', 'barbier à domicile', 'manucure pédicure', 'make up soirée'],
    bannerImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 10000,
  },
  {
    id: 'tapisserie',
    name: 'Tapisserie, Rideaux & Garnissage Salons',
    slug: 'tapisserie',
    iconName: 'Layers',
    description: 'Rénovation salons en cuir et tissu, confection rideaux sur mesure, confection coussins et têtes de lit capitonnées.',
    shortDesc: 'Refection salon marocain/moderne, rideaux & voilages',
    providerCount: 15,
    popularKeywords: ['refection fauteuil', 'tissu salon', 'rideaux sur mesure', 'capitonnage'],
    bannerImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 25000,
  },
  {
    id: 'jardinage',
    name: 'Jardinage, Paysagisme & Élagage',
    slug: 'jardinage',
    iconName: 'Sparkles',
    description: 'Entretien pelouse gazon, taille des haies, élagage d\'arbres, arrosage automatique et création de jardins tropicaux.',
    shortDesc: 'Entretien gazon, élagage arbres & aménagement vert',
    providerCount: 12,
    popularKeywords: ['tonte pelouse', 'élagage cocotier', 'plantes décoratives', 'arrosage'],
    bannerImage: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 15000,
  },
  {
    id: 'etancheite',
    name: 'Étanchéité Toiture, Terrasse & Infiltration',
    slug: 'etancheite',
    iconName: 'ShieldCheck',
    description: 'Traitement des infiltrations d\'eau de pluie, pose membrane bitumineuse (paxalu), résine d\'étanchéité et cuvelage.',
    shortDesc: 'Paxalu, résine toit terrasse & pannes infiltration',
    providerCount: 17,
    popularKeywords: ['fuite plafond pluie', 'paxalu toit', 'étanchéité terrasse', 'anti humidité'],
    bannerImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 35000,
  },
  {
    id: 'securite-cameras',
    name: 'Caméras de Surveillance, Alarmes & Domotique',
    slug: 'securite-cameras',
    iconName: 'Zap',
    description: 'Installation caméras IP HD / Wi-Fi vision nocturne, interphones vidéo, alarmes anti-intrusion et contrôle d\'accès.',
    shortDesc: 'Caméras surveillance, interphones vidéo & alarmes',
    providerCount: 14,
    popularKeywords: ['caméra hikvision', 'visiophone', 'interphone dakar', 'alarme maison'],
    bannerImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 30000,
  },
  {
    id: 'informatique',
    name: 'Dépannage Informatique & Smartphones',
    slug: 'informatique',
    iconName: 'Smartphone',
    description: 'Réparation écrans iPhone/Samsung, formatage PC/Mac, suppression virus, récupération données et configuration réseau Wi-Fi.',
    shortDesc: 'Réparation PC, Mac, smartphones & réseaux Wi-Fi',
    providerCount: 16,
    popularKeywords: ['écran iphone cassé', 'pc lent', 'réseau wifi dakar', 'antivirus'],
    bannerImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 10000,
  },
  {
    id: 'piscines',
    name: 'Piscines, Traitement Eau & Pompes',
    slug: 'piscines',
    iconName: 'Wind',
    description: 'Entretien régulier de piscines, équilibre chlore/pH, réparation pompes de filtration et rénovation liner/mosaïque.',
    shortDesc: 'Entretien eau de piscine, pompes & filtration',
    providerCount: 9,
    popularKeywords: ['nettoyage piscine', 'chlore choc', 'pompe filtration', 'eau verte'],
    bannerImage: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 30000,
  },
  {
    id: 'vidange',
    name: 'Vidange & Débouchage Fosses Septiques',
    slug: 'vidange',
    iconName: 'Truck',
    description: 'Camion hydrocureur pour curage de fosses septiques, bacs à graisse et débouchage haute pression des canalisations.',
    shortDesc: 'Camion hydrocureur & curage fosses septiques',
    providerCount: 11,
    popularKeywords: ['camion vidange dakar', 'fosse septique pleine', 'débouchage tuyau'],
    bannerImage: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 35000,
  }
];

export const PROVIDERS: Provider[] = [];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'artisan-gratuit',
    name: 'Artisan Partenaire (100% Gratuit)',
    tier: 'FREE',
    priceMonthlyFcfa: 0,
    priceAnnualFcfa: 0,
    priceMonthlyEur: 0,
    badge: 'Offre Gratuite & Illimitée',
    isPopular: true,
    description: 'Accès complet et 100% gratuit pour tous les artisans du Sénégal pendant la phase de lancement.',
    features: [
      'Contacts et demandes de devis ILLIMITÉS',
      'Bouton WhatsApp direct avec message pré-rempli',
      'Galerie photos illimitée pour vos réalisations',
      'Badge officiel "Artisan Vérifié" après validation',
      'Tableau de bord CRM complet avec suivi des demandes',
      'Zéro commission et Zéro frais d\'inscription',
      'Support WhatsApp & Téléphone dédié',
    ],
    maxPhotos: 50,
    contactsLimit: 'UNLIMITED',
    prioritySupport: true,
    boostedRanking: true,
  }
];

export const MOCK_ADMIN_METRICS: AdminMetrics = {
  mrrFcfa: 0,
  activeSubscribers: 0,
  totalProviders: 0,
  pendingVerifications: 0,
  totalServiceRequests: 0,
  totalReviews: 0,
  satisfactionRate: 100,
  churnRatePercent: 0,
};

// Utility functions
export function formatFcfa(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount) + ' FCFA';
}

export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10;
}

export function getProviderBySlug(slug: string): Provider | undefined {
  return PROVIDERS.find((p) => p.slug === slug || p.id === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug || c.id === slug);
}
