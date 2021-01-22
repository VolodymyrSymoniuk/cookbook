export const defaultRecipeRoot = { title: "ROOT", id: null };
export const recipes = [
  {
    id: "eWRhpRV",
    title: "Olivier salad with corn",
    description:
      "Olivier salad (Russian: салат Оливье, tr. salat Olivye)[Note 1] is a traditional salad dish in Russian cuisine, which is also popular in other post-Soviet countries, many European countries, Iran, Israel, Mongolia and also throughout Latin America. In different modern recipes, it is usually made with diced boiled potatoes, carrots, brined dill pickles (or cucumber), green peas, eggs, celeriac, onions, diced boiled chicken or bologna sausage (sometimes ham or hot dogs), and tart apples, with salt, pepper, and mustard added to enhance flavor, dressed with mayonnaise. In many countries, the dish is commonly referred to as Russian salad. A variation called Stolichny salad (Russian: салат 'Столичный', 'apital city salad') exists, and is also popular in the Russian cuisine.",
    ingredients: [
      { id: "1", name: "mayo" },
      { id: "2", name: "potato" },
      { id: "3", name: "eggs" },
      { id: "4", name: "cucumber" },
      { id: "5", name: "olives" },
      { id: "6", name: "corn" }
    ],
    createdAt: 1610702262396,
    parent: null,
    versions: [
      { id: "default", title: "default recipe version" },
      {
        id: "asd",
        title: "Olivier salad with pea",
        ingredients: [
          { id: "1", name: "mayo" },
          { id: "2", name: "potato" },
          { id: "3", name: "eggs" },
          { id: "4", name: "cucumber" },
          { id: "5", name: "olives" },
          { id: "6", name: "pea" }
        ],
        createdAt: 1610302999999
      }
    ]
  },
  {
    id: "nYrnfYEv",
    title: "French toasts",
    description:
      "French toast is a dish made of sliced bread soaked in beaten eggs and typically milk, then pan fried. Alternative names and variants include 'eggy bread',[1] 'Bombay toast', 'German toast',[2] 'gypsy toast',[3] and 'poor knights' (of Windsor).[4]",
    ingredients: [
      { id: "2", name: "bread" },
      { id: "3", name: "eggs" },
      { id: "4", name: "milk" }
    ],
    parent: null,
    versions: [{ id: "default", title: "default recipe version" }],
    createdAt: 1610702123456
  },
  {
    id: "2WEKaVNO",
    title: "French toasts with species",
    description: "Delicious french meal",
    ingredients: [
      { id: "2", name: "bread" },
      { id: "3", name: "eggs" },
      { id: "4", name: "cinnamon" }
    ],
    parent: "nYrnfYEv",
    versions: [{ id: "default", title: "default recipe version" }],
    createdAt: 1610702654321
  },
  {
    id: "2WEKaVjO",
    title: "French toasts with honey and fruits",
    description: "Delicious french meal with some extra toppings",
    ingredients: [
      { id: "2", name: "bread" },
      { id: "3", name: "eggs" },
      { id: "4", name: "milk" },
      { id: "5", name: "honey" },
      { id: "6", name: "fruits" }
    ],
    parent: "nYrnfYEv",
    versions: [{ id: "default", title: "default recipe version" }],
    createdAt: 1610702123456
  }
];
