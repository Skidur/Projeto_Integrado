// ... (o código que você já tem, que está na imagem)

const DashboardPage = () => {
  const [meals, setMeals] = useState({
    cafeManha: [
      { id: 1, nome: 'Café com Leite', calorias: 60, proteinas: 3, carboidratos: 8, gorduras: 1 },
      { id: 2, nome: '2 fatias de pão integral', calorias: 140, proteinas: 8, carboidratos: 25, gorduras: 2 },
    ],
    almoco: [
      { id: 3, nome: '150g de Filé de Frango Grelhado', calorias: 240, proteinas: 45, carboidratos: 0, gorduras: 6 },
      { id: 4, nome: '200g de Arroz Branco', calorias: 260, proteinas: 5, carboidratos: 56, gorduras: 0.5 },
    ],
    janta: [
      { id: 5, nome: '1 concha de Feijao Carioca', calorias: 135, proteinas: 8, carboidratos: 24, gorduras: 1 },
    ],
    lanches: [
      { id: 6, nome: '1 Maçã', calorias: 95, proteinas: 0.5, carboidratos: 25, gorduras: 0.3 },
    ],
  });

  const handleAddFood = (mealType, food) => {
    alert(`Adicionando ${food.nome} em ${mealType}. Funcionalidade a ser implementada.`);
  };

  const allFoods = [
    ...meals.cafeManha,
    ...meals.almoco,
    ...meals.janta,
    ...meals.lanches,
  ];

  const totalCalories = allFoods.reduce((total, food) => total + food.calorias, 0);
  const totalProteinas = allFoods.reduce((total, food) => total + food.proteinas, 0);
  const totalCarboidratos = allFoods.reduce((total, food) => total + food.carboidratos, 0);
  const totalGorduras = allFoods.reduce((total, food) => total + food.gorduras, 0);

  return (
    <div>
      <h1>Bem-vindo à sua Dashboard</h1>

      <CalorieSummary
        totalCalories={totalCalories}
        totalProteinas={totalProteinas}
        totalCarboidratos={totalCarboidratos}
        totalGorduras={totalGorduras}
      />

      <div style={{ display: 'flex', gap: '20px' }}>
        <MealCard
          title="Café da Manhã"
          foods={meals.cafeManha}
          onAddFood={(food) => handleAddFood('cafeManha', food)}
        />
        <MealCard
          title="Almoço"
          foods={meals.almoco}
          onAddFood={(food) => handleAddFood('almoco', food)}
        />
        <MealCard
          title="Jantar"
          foods={meals.janta}
          onAddFood={(food) => handleAddFood('janta', food)}
        />
        <MealCard
          title="Lanches"
          foods={meals.lanches}
          onAddFood={(food) => handleAddFood('lanches', food)}
        />
      </div>
    </div>
  );
};

export default DashboardPage;