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
    id: "macon",
    name: "Maçon",
    slug: "macon",
    iconName: "Layers",
    description: "Services professionnels de Maçon qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Maçon professionnel pour particuliers et entreprises",
    providerCount: 28,
    popularKeywords: ["maçon", "maçon dakar", "devis maçon"],
    bannerImage: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 25000,
  },
  {
    id: "plombier",
    name: "Plombier",
    slug: "plombier",
    iconName: "Wrench",
    description: "Services professionnels de Plombier qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Plombier professionnel pour particuliers et entreprises",
    providerCount: 25,
    popularKeywords: ["plombier", "plombier dakar", "devis plombier"],
    bannerImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 15000,
  },
  {
    id: "electricien",
    name: "Électricien",
    slug: "electricien",
    iconName: "Zap",
    description: "Services professionnels d'Électricien qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Électricien professionnel pour particuliers et entreprises",
    providerCount: 30,
    popularKeywords: ["électricien", "électricien dakar", "devis électricien"],
    bannerImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 20000,
  },
  {
    id: "menuisier-bois",
    name: "Menuisier bois",
    slug: "menuisier-bois",
    iconName: "Hammer",
    description: "Services professionnels de Menuisier bois qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Menuisier bois professionnel pour particuliers et entreprises",
    providerCount: 22,
    popularKeywords: ["menuisier bois", "menuisier bois dakar", "devis menuisier bois"],
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 20000,
  },
  {
    id: "menuisier-aluminium",
    name: "Menuisier aluminium",
    slug: "menuisier-aluminium",
    iconName: "Hammer",
    description: "Services professionnels de Menuisier aluminium qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Menuisier aluminium professionnel pour particuliers et entreprises",
    providerCount: 20,
    popularKeywords: ["menuisier aluminium", "menuisier aluminium dakar", "devis menuisier aluminium"],
    bannerImage: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 25000,
  },
  {
    id: "menuisier-metallique",
    name: "Menuisier métallique",
    slug: "menuisier-metallique",
    iconName: "Hammer",
    description: "Services professionnels de Menuisier métallique qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Menuisier métallique professionnel pour particuliers et entreprises",
    providerCount: 18,
    popularKeywords: ["menuisier métallique", "menuisier métallique dakar", "devis menuisier métallique"],
    bannerImage: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 25000,
  },
  {
    id: "carreleur",
    name: "Carreleur",
    slug: "carreleur",
    iconName: "Layers",
    description: "Services professionnels de Carreleur qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Carreleur professionnel pour particuliers et entreprises",
    providerCount: 24,
    popularKeywords: ["carreleur", "carreleur dakar", "devis carreleur"],
    bannerImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 30000,
  },
  {
    id: "peintre",
    name: "Peintre",
    slug: "peintre",
    iconName: "Paintbrush",
    description: "Services professionnels de Peintre qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Peintre professionnel pour particuliers et entreprises",
    providerCount: 26,
    popularKeywords: ["peintre", "peintre dakar", "devis peintre"],
    bannerImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 20000,
  },
  {
    id: "platrier",
    name: "Plâtrier",
    slug: "platrier",
    iconName: "Layers",
    description: "Services professionnels de Plâtrier qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Plâtrier professionnel pour particuliers et entreprises",
    providerCount: 16,
    popularKeywords: ["plâtrier", "plâtrier dakar", "devis plâtrier"],
    bannerImage: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 20000,
  },
  {
    id: "staffeur",
    name: "Staffeur",
    slug: "staffeur",
    iconName: "Layers",
    description: "Services professionnels de Staffeur qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Staffeur professionnel pour particuliers et entreprises",
    providerCount: 15,
    popularKeywords: ["staffeur", "staffeur dakar", "devis staffeur"],
    bannerImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 25000,
  },
  {
    id: "soudeur",
    name: "Soudeur",
    slug: "soudeur",
    iconName: "Flame",
    description: "Services professionnels de Soudeur qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Soudeur professionnel pour particuliers et entreprises",
    providerCount: 22,
    popularKeywords: ["soudeur", "soudeur dakar", "devis soudeur"],
    bannerImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 20000,
  },
  {
    id: "ferrailleur",
    name: "Ferrailleur",
    slug: "ferrailleur",
    iconName: "Wrench",
    description: "Services professionnels de Ferrailleur qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Ferrailleur professionnel pour particuliers et entreprises",
    providerCount: 19,
    popularKeywords: ["ferrailleur", "ferrailleur dakar", "devis ferrailleur"],
    bannerImage: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 20000,
  },
  {
    id: "vitrier",
    name: "Vitrier",
    slug: "vitrier",
    iconName: "Wrench",
    description: "Services professionnels de Vitrier qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Vitrier professionnel pour particuliers et entreprises",
    providerCount: 17,
    popularKeywords: ["vitrier", "vitrier dakar", "devis vitrier"],
    bannerImage: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 25000,
  },
  {
    id: "serrurier",
    name: "Serrurier",
    slug: "serrurier",
    iconName: "Key",
    description: "Services professionnels de Serrurier qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Serrurier professionnel pour particuliers et entreprises",
    providerCount: 28,
    popularKeywords: ["serrurier", "serrurier dakar", "devis serrurier"],
    bannerImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 15000,
  },
  {
    id: "couvreur",
    name: "Couvreur",
    slug: "couvreur",
    iconName: "Wrench",
    description: "Services professionnels de Couvreur qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Couvreur professionnel pour particuliers et entreprises",
    providerCount: 14,
    popularKeywords: ["couvreur", "couvreur dakar", "devis couvreur"],
    bannerImage: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 30000,
  },
  {
    id: "etancheur",
    name: "Étancheur",
    slug: "etancheur",
    iconName: "Wrench",
    description: "Services professionnels d'Étancheur qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Étancheur professionnel pour particuliers et entreprises",
    providerCount: 18,
    popularKeywords: ["étancheur", "étancheur dakar", "devis étancheur"],
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 25000,
  },
  {
    id: "climaticien",
    name: "Climaticien",
    slug: "climaticien",
    iconName: "Wind",
    description: "Services professionnels de Climaticien qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Climaticien professionnel pour particuliers et entreprises",
    providerCount: 24,
    popularKeywords: ["climaticien", "climaticien dakar", "devis climaticien"],
    bannerImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 20000,
  },
  {
    id: "installateur-climatiseur",
    name: "Installateur climatiseur",
    slug: "installateur-climatiseur",
    iconName: "Wind",
    description: "Services professionnels d'Installateur climatiseur qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Installateur climatiseur professionnel pour particuliers et entreprises",
    providerCount: 20,
    popularKeywords: ["installateur climatiseur", "installateur climatiseur dakar", "devis installateur climatiseur"],
    bannerImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 20000,
  },
  {
    id: "installateur-solaire",
    name: "Installateur solaire",
    slug: "installateur-solaire",
    iconName: "Zap",
    description: "Services professionnels d'Installateur solaire qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Installateur solaire professionnel pour particuliers et entreprises",
    providerCount: 21,
    popularKeywords: ["installateur solaire", "installateur solaire dakar", "devis installateur solaire"],
    bannerImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 35000,
  },
  {
    id: "electricien-solaire",
    name: "Électricien solaire",
    slug: "electricien-solaire",
    iconName: "Zap",
    description: "Services professionnels d'Électricien solaire qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Électricien solaire professionnel pour particuliers et entreprises",
    providerCount: 19,
    popularKeywords: ["électricien solaire", "électricien solaire dakar", "devis électricien solaire"],
    bannerImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 30000,
  },
  {
    id: "technicien-groupe-electrogene",
    name: "Technicien groupe électrogène",
    slug: "technicien-groupe-electrogene",
    iconName: "Wrench",
    description: "Services professionnels de Technicien groupe électrogène qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Technicien groupe électrogène professionnel pour particuliers et entreprises",
    providerCount: 16,
    popularKeywords: ["technicien groupe électrogène", "technicien groupe électrogène dakar", "devis groupe électrogène"],
    bannerImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 30000,
  },
  {
    id: "reparateur-telephone",
    name: "Réparateur téléphone",
    slug: "reparateur-telephone",
    iconName: "Smartphone",
    description: "Services professionnels de Réparateur téléphone qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Réparateur téléphone professionnel pour particuliers et entreprises",
    providerCount: 35,
    popularKeywords: ["réparateur téléphone", "réparateur téléphone dakar", "réparation iphone dakar"],
    bannerImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 10000,
  },
  {
    id: "reparateur-ordinateur",
    name: "Réparateur ordinateur",
    slug: "reparateur-ordinateur",
    iconName: "Monitor",
    description: "Services professionnels de Réparateur ordinateur qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Réparateur ordinateur professionnel pour particuliers et entreprises",
    providerCount: 30,
    popularKeywords: ["réparateur ordinateur", "réparateur ordinateur dakar", "dépannage pc dakar"],
    bannerImage: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 15000,
  },
  {
    id: "reparateur-tv",
    name: "Réparateur TV",
    slug: "reparateur-tv",
    iconName: "Tv",
    description: "Services professionnels de Réparateur TV qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Réparateur TV professionnel pour particuliers et entreprises",
    providerCount: 22,
    popularKeywords: ["réparateur tv", "réparateur tv dakar", "réparation tv dakar"],
    bannerImage: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 15000,
  },
  {
    id: "reparateur-electromenager",
    name: "Réparateur électroménager",
    slug: "reparateur-electromenager",
    iconName: "Wrench",
    description: "Services professionnels de Réparateur électroménager qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Réparateur électroménager professionnel pour particuliers et entreprises",
    providerCount: 27,
    popularKeywords: ["réparateur électroménager", "réparateur électroménager dakar", "dépannage électroménager"],
    bannerImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 15000,
  },
  {
    id: "reparateur-machine-a-laver",
    name: "Réparateur machine à laver",
    slug: "reparateur-machine-a-laver",
    iconName: "Wrench",
    description: "Services professionnels de Réparateur machine à laver qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Réparateur machine à laver professionnel pour particuliers et entreprises",
    providerCount: 20,
    popularKeywords: ["réparateur machine à laver", "réparation machine à laver dakar"],
    bannerImage: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 15000,
  },
  {
    id: "reparateur-refrigerateur",
    name: "Réparateur réfrigérateur",
    slug: "reparateur-refrigerateur",
    iconName: "Wind",
    description: "Services professionnels de Réparateur réfrigérateur qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Réparateur réfrigérateur professionnel pour particuliers et entreprises",
    providerCount: 25,
    popularKeywords: ["réparateur réfrigérateur", "réparateur frigo dakar", "dépannage frigo"],
    bannerImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 15000,
  },
  {
    id: "reparateur-climatiseur",
    name: "Réparateur climatiseur",
    slug: "reparateur-climatiseur",
    iconName: "Wind",
    description: "Services professionnels de Réparateur climatiseur qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Réparateur climatiseur professionnel pour particuliers et entreprises",
    providerCount: 29,
    popularKeywords: ["réparateur climatiseur", "dépannage climatiseur dakar", "recharge fréon dakar"],
    bannerImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 15000,
  },
  {
    id: "jardinier",
    name: "Jardinier",
    slug: "jardinier",
    iconName: "Sparkles",
    description: "Services professionnels de Jardinier qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Jardinier professionnel pour particuliers et entreprises",
    providerCount: 21,
    popularKeywords: ["jardinier", "jardinier dakar", "entretien jardin dakar"],
    bannerImage: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 15000,
  },
  {
    id: "paysagiste",
    name: "Paysagiste",
    slug: "paysagiste",
    iconName: "Sparkles",
    description: "Services professionnels de Paysagiste qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Paysagiste professionnel pour particuliers et entreprises",
    providerCount: 17,
    popularKeywords: ["paysagiste", "paysagiste dakar", "aménagement jardin dakar"],
    bannerImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 30000,
  },
  {
    id: "nettoyeur",
    name: "Nettoyeur",
    slug: "nettoyeur",
    iconName: "Sparkles",
    description: "Services professionnels de Nettoyeur qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Nettoyeur professionnel pour particuliers et entreprises",
    providerCount: 24,
    popularKeywords: ["nettoyeur", "nettoyeur dakar", "service de nettoyage dakar"],
    bannerImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 15000,
  },
  {
    id: "agent-d-entretien",
    name: "Agent d'entretien",
    slug: "agent-d-entretien",
    iconName: "Sparkles",
    description: "Services professionnels d'Agent d'entretien qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Agent d'entretien professionnel pour particuliers et entreprises",
    providerCount: 23,
    popularKeywords: ["agent d'entretien", "agent d'entretien dakar", "nettoyage maison dakar"],
    bannerImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 15000,
  },
  {
    id: "desinfection-desinsectisation",
    name: "Désinfection / désinsectisation",
    slug: "desinfection-desinsectisation",
    iconName: "Sparkles",
    description: "Services professionnels de Désinfection / désinsectisation qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Désinfection / désinsectisation professionnel pour particuliers et entreprises",
    providerCount: 19,
    popularKeywords: ["désinfection", "désinsectisation dakar", "dératisation dakar"],
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 20000,
  },
  {
    id: "vidange-fosse-septique",
    name: "Vidange fosse septique",
    slug: "vidange-fosse-septique",
    iconName: "Truck",
    description: "Services professionnels de Vidange fosse septique qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Vidange fosse septique professionnel pour particuliers et entreprises",
    providerCount: 22,
    popularKeywords: ["vidange fosse septique", "vidange fosse dakar", "camion vidange dakar"],
    bannerImage: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 30000,
  },
  {
    id: "entretien-piscine",
    name: "Entretien piscine",
    slug: "entretien-piscine",
    iconName: "Sparkles",
    description: "Services professionnels d'Entretien piscine qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Entretien piscine professionnel pour particuliers et entreprises",
    providerCount: 15,
    popularKeywords: ["entretien piscine", "pisciniste dakar", "nettoyage piscine dakar"],
    bannerImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 25000,
  },
  {
    id: "decorateur",
    name: "Décorateur",
    slug: "decorateur",
    iconName: "Paintbrush",
    description: "Services professionnels de Décorateur qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Décorateur professionnel pour particuliers et entreprises",
    providerCount: 25,
    popularKeywords: ["décorateur", "décorateur dakar", "décoration évènementielle"],
    bannerImage: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 25000,
  },
  {
    id: "ebeniste",
    name: "Ébéniste",
    slug: "ebeniste",
    iconName: "Hammer",
    description: "Services professionnels d'Ébéniste qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Ébéniste professionnel pour particuliers et entreprises",
    providerCount: 18,
    popularKeywords: ["ébéniste", "ébéniste dakar", "meuble sur mesure dakar"],
    bannerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 30000,
  },
  {
    id: "tapissier",
    name: "Tapissier",
    slug: "tapissier",
    iconName: "Wrench",
    description: "Services professionnels de Tapissier qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Tapissier professionnel pour particuliers et entreprises",
    providerCount: 19,
    popularKeywords: ["tapissier", "tapissier dakar", "réfection salon dakar"],
    bannerImage: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 25000,
  },
  {
    id: "fabricant-de-meubles",
    name: "Fabricant de meubles",
    slug: "fabricant-de-meubles",
    iconName: "Hammer",
    description: "Services professionnels de Fabricant de meubles qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Fabricant de meubles professionnel pour particuliers et entreprises",
    providerCount: 20,
    popularKeywords: ["fabricant de meubles", "fabricant meubles dakar", "menuiserie meuble dakar"],
    bannerImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 35000,
  },
  {
    id: "poseur-de-cuisine",
    name: "Poseur de cuisine",
    slug: "poseur-de-cuisine",
    iconName: "Wrench",
    description: "Services professionnels de Poseur de cuisine qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Poseur de cuisine professionnel pour particuliers et entreprises",
    providerCount: 18,
    popularKeywords: ["poseur de cuisine", "installation cuisine dakar", "cuisine équipée dakar"],
    bannerImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 30000,
  },
  {
    id: "poseur-de-placards",
    name: "Poseur de placards",
    slug: "poseur-de-placards",
    iconName: "Wrench",
    description: "Services professionnels de Poseur de placards qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Poseur de placards professionnel pour particuliers et entreprises",
    providerCount: 16,
    popularKeywords: ["poseur de placards", "dressing dakar", "placard sur mesure dakar"],
    bannerImage: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    averageStartingPrice: 25000,
  },
  {
    id: "decorateur-interieur",
    name: "Décorateur intérieur",
    slug: "decorateur-interieur",
    iconName: "Paintbrush",
    description: "Services professionnels de Décorateur intérieur qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.",
    shortDesc: "Décorateur intérieur professionnel pour particuliers et entreprises",
    providerCount: 22,
    popularKeywords: ["décorateur intérieur", "décoration d'intérieur dakar", "design intérieur dakar"],
    bannerImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
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
  if (!slug) return CATEGORIES[0];
  const normalized = slug.toLowerCase();
  return (
    CATEGORIES.find((c) => c.slug === normalized || c.id === normalized) ||
    CATEGORIES.find((c) => c.name.toLowerCase().includes(normalized) || normalized.includes(c.slug)) ||
    CATEGORIES[0]
  );
}

