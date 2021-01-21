export const defaultRecipeRoot = { title: "ROOT", id: null };
export const recipes = [
  {
    id: "eWRhpRV",
    title: "Olivier salad with corn",
    description:
      "Olivier salad (Russian: салат Оливье, tr. salat Olivye)[Note 1] is a traditional salad dish in Russian cuisine, which is also popular in other post-Soviet countries, many European countries, Iran, Israel, Mongolia and also throughout Latin America. In different modern recipes, it is usually made with diced boiled potatoes, carrots, brined dill pickles (or cucumber), green peas, eggs, celeriac, onions, diced boiled chicken or bologna sausage (sometimes ham or hot dogs), and tart apples, with salt, pepper, and mustard added to enhance flavor, dressed with mayonnaise. In many countries, the dish is commonly referred to as Russian salad. A variation called Stolichny salad (Russian: салат 'Столичный', 'apital city salad') exists, and is also popular in the Russian cuisine.",
    ingredients: ["mayo", "potato", "eggs", "cucumber", "olives", "corn"],
    createdAt: 1610702262396,
    parent: null,
    versions: [
      {
        title: "Olivier salad with pea",
        ingredients: ["mayo", "potato", "eggs", "cucumber", "olives", "pea"],
        createdAt: 1610702999999
      }
    ]
  },
  {
    id: "nYrnfYEv",
    title: "French toasts",
    description:
      "French toast is a dish made of sliced bread soaked in beaten eggs and typically milk, then pan fried. Alternative names and variants include 'eggy bread',[1] 'Bombay toast', 'German toast',[2] 'gypsy toast',[3] and 'poor knights' (of Windsor).[4]",
    ingredients: ["bread", "eggs", "milk"],
    parent: null,
    versions: [],
    createdAt: 1610702123456
  },
  {
    id: "2WEKaVNO",
    title: "French toasts with species",
    description: "Delicious french meal",
    ingredients: ["bread", "eggs", "milk", "cinnamon"],
    parent: "nYrnfYEv",
    versions: [],
    createdAt: 1610702654321
  },
  {
    id: "2WEKaVjO",
    title: "French toasts with honey and fruits",
    description: "Delicious french meal with some extra toppings",
    ingredients: ["bread", "eggs", "milk", "honey", "fruits"],
    parent: "nYrnfYEv",
    versions: [],
    createdAt: 1610702123456
  }
];
