import React, { useState } from 'react';
import SearchBar from '../src/composants/SearchBar.jsx';
import Filtres from '../src/composants/Filters.jsx';
import { Link } from 'react-router-dom';
import { Card, CardBody, Center } from '@chakra-ui/react';
import { Stack, Heading, Text, Image, Button } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { SimpleGrid, Box } from '@chakra-ui/react';

//Import services
import { fetchMeubles } from './services/apiService.jsx';
import { fetchMeublesFiltres } from './services/apiService.jsx';

// On crée la constante meubles sur laquelle itérer. Par défaut (si non filtré) elle correspond au fetch global
const meubles = await fetchMeubles().catch((error) =>
  console.error('Error:', error)
);

//On met des useState pour écouter/modifier quel filtre est sélectionné
function Home() {
  const [selectedCategorieFilter, setSelectedCategorieFilter] = useState(null);
  const [selectedCouleurFilter, setSelectedCouleurFilter] = useState(null);
  const [selectedMatiereFilter, setSelectedMatiereFilter] = useState(null);

//On met des useState pour écouter/modifier de quelle couleur est chaque bouton
  const [couleurBoutonCategorie, setcouleurBoutonCategorie] = useState('#254356');
  const [couleurBoutonCouleur, setcouleurBoutonCouleur] = useState('#254356');
  const [couleurBoutonMatiere, setcouleurBoutonMatiere] = useState('#254356');

//On place un useState pour écouter la liste de meubles filtrés et la MAJ selon filtres appliqués
const [filteredMeubles, setFilteredMeubles] = useState(meubles);


  //On choisit les listes de filtres. Ces listes doivent correspondre à la BDD
  const filtreParCouleur = [
    'Chêne clair',
    'Vert',
    'Bleu nuit',
    'Beige',
    'Rouge',
    'Doré',
    'Chêne foncé',
    'Gris',
    'Acajou',
    'Noir',
  ];
  const filtreParCategorie = [
    'Chaise',
    'Table',
    'Lit',
    'Canapé',
    'Fauteuil',
    'Cathèdre',
    'Vaisselier',
    'Armoire',
    'Dressoir',
    'Cabinet',
    'Commode',
    'Banc',
  ];
  const filtreParMatiere = [
    'Bois',
    'Cuir',
    'Velours',
    'Verre',
    'Plastique',
    'Pierre',
    'Rotin',
    'Tissu',
    'Metal',
  ];

  //La fonction principale qui est appellée dans le template

  async function selectionFiltre(filtreChoisi, propriete) {
    //Selon la propriété (categorie, couleur ou matière) avec laquelle selectionFiltre est appellée
    //On va mettre à  jour dans le useState le filtre sélectionné
    //Et on va mettre à jour la couleur du bouton
    switch (propriete) {
      case 'categorie':
        setSelectedCategorieFilter(
          filtreChoisi === 'Aucun' ? null : filtreChoisi
        );
        setSelectedCouleurFilter(null);
        setSelectedMatiereFilter(null);
        setcouleurBoutonCategorie('#254356');
        setcouleurBoutonCouleur(
          filtreChoisi === 'Aucun' ? '#254356' : '#bdccde'
        );
        setcouleurBoutonMatiere(
          filtreChoisi === 'Aucun' ? '#254356' : '#bdccde'
        );
        break;

      case 'couleur':
        setSelectedCouleurFilter(
          filtreChoisi === 'Aucun' ? null : filtreChoisi
        );
        setSelectedCategorieFilter(null);
        setSelectedMatiereFilter(null);
        setcouleurBoutonCouleur('#254356');
        setcouleurBoutonCategorie(
          filtreChoisi === 'Aucun' ? '#254356' : '#bdccde'
        );
        setcouleurBoutonMatiere(
          filtreChoisi === 'Aucun' ? '#254356' : '#bdccde'
        );
        break;

      case 'matiere':
        setSelectedMatiereFilter(
          filtreChoisi === 'Aucun' ? null : filtreChoisi
        );
        setSelectedCategorieFilter(null);
        setSelectedCouleurFilter(null);
        setcouleurBoutonMatiere('#254356');
        setcouleurBoutonCategorie(
          filtreChoisi === 'Aucun' ? '#254356' : '#bdccde'
        );
        setcouleurBoutonCouleur(
          filtreChoisi === 'Aucun' ? '#254356' : '#bdccde'
        );
        break;
      default:
        break;
    }
    let filterParam;
    let valueParam = filtreChoisi.toLowerCase();

    if (propriete === 'categorie') filterParam = 'categorie';
    if (propriete === 'couleur') filterParam = 'couleur';
    if (propriete === 'matiere') filterParam = 'matiere';
    console.log('ceci a été retenu comme filtre', filterParam);
    console.log('ceci a été retenu comme valeur', valueParam);
    let meublesFiltres;
    if (valueParam === 'aucun') {
      console.log('La valeur est bien Aucun');
      meublesFiltres = await fetchMeubles().catch((error) =>
        console.error('Error:', error)
      );
    } else {
      meublesFiltres = await fetchMeublesFiltres(filterParam, valueParam).catch(
        (error) => console.error('Error:', error)
      );
    }

    //Selon la valeur prise par meublesFiltres dans la condition, on change la valeur de FilterMeubles  et de SelectedFilter dans le useState
    setFilteredMeubles(meublesFiltres);

    // setSelectedFilter(filtreChoisi);
    console.log(`Filtre sélectionné: ${filtreChoisi}`);
    console.log(`Meubles filtrés: ${meublesFiltres}`);
  }

  return (
    <Box backgroundImage="url('../src/assets/images/pattern_flower.png')">
      <Stack spacing={8} align='center'>
        <SimpleGrid
          spacing={10}
          templateColumns='repeat(3,1fr)'
          justifyItems='center'
        >
          <Box> </Box>
          <Box> </Box>
          <Box> </Box>
          <Box>
          {/* Les 3 menus de filtres */}
            <Filtres
              defaultColor={couleurBoutonCategorie}
              filters={filtreParCategorie}
              onSelectFilter={(filtreChoisi) =>
                selectionFiltre(filtreChoisi, 'categorie')
              }
              selectedFilter={selectedCategorieFilter}
              filterType='categorie'
            />
          </Box>
          <Box>
            <Filtres
              defaultColor={couleurBoutonCouleur}
              filters={filtreParCouleur}
              onSelectFilter={(filtreChoisi) =>
                selectionFiltre(filtreChoisi, 'couleur')
              }
              selectedFilter={selectedCouleurFilter}
              filterType='couleur'
            />
          </Box>
          <Box>
            <Filtres
              defaultColor={couleurBoutonMatiere}
              filters={filtreParMatiere}
              onSelectFilter={(filtreChoisi) =>
                selectionFiltre(filtreChoisi, 'matiere')
              }
              selectedFilter={selectedMatiereFilter}
              filterType='matiere'
            />
          </Box>
        </SimpleGrid>
        {/* <SearchBar /> */}
        <SimpleGrid
          spacing={4}
          templateColumns='repeat(3,1fr)'
          justifyItems='center'
        >
          {filteredMeubles.map((meuble) => (
            <Card key={meuble.id} maxW='xs' bg='#254356'>
              <CardBody>
                <Image
                  src={meuble.photo}
                  alt={meuble.nom}
                  borderRadius='lg'
                  boxSize='300px'
                  objectFit='cover'
                />
                <Stack mt='6' spacing='3'>
                  <Link to={`/product/${meuble.id}`}>
                    <Heading size='md' color='white'>
                      {meuble.nom}
                    </Heading>
                  </Link>
                  <Box>
                    <Text color='white'>{meuble.descriptif}</Text>
                  </Box>
                  <Text color='white' fontSize='2xl' ml='auto'>
                    {meuble.prix} €
                  </Text>
                </Stack>
              </CardBody>
              {/* <Divider color='white' /> */}
              <CardBody>
                <Center>
                  <Button
                    bg='white'
                    color='#254356'
                    variant='solid'
                    _hover={{ bg: '#C0C0C0' }}
                    bottom='2'
                    position='absolute'
                  >
                    {/*Appeller le composant Bouton et linkto ajout panier*/}
                    Ajouter au panier
                  </Button>
                </Center>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
}

export default Home;
