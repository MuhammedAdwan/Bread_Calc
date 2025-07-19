// Get references to HTML elements
const recipeTypeSelect = document.getElementById('recipeType');
const breadSection = document.getElementById('breadSection');
const dessertSection = document.getElementById('dessertSection');
const breadImage = document.getElementById('breadImage');   // New: Reference to the bread image
const dessertImage = document.getElementById('dessertImage'); // New: Reference to the dessert image

const doughWeightInput = document.getElementById('doughWeight');
const breadTypeSelect = document.getElementById('breadType');
const calculateBreadBtn = document.getElementById('calculateBreadBtn');
const breadRecipeOutput = document.getElementById('breadRecipeOutput');
const breadIngredientsList = breadRecipeOutput.querySelector('ul');
const breadStepsList = breadRecipeOutput.querySelector('ol');


const dessertWeightInput = document.getElementById('dessertWeight');
const dessertTypeSelect = document.getElementById('dessertType');
const calculateDessertBtn = document.getElementById('calculateDessertBtn');
const dessertRecipeOutput = document.getElementById('dessertRecipeOutput');
const dessertIngredientsList = dessertRecipeOutput.querySelector('ul');
const dessertStepsList = dessertRecipeOutput.querySelector('ol');

// --- Image Paths ---
const imagePaths = {
    general: {
        bread: './images/bread2.jpg',       // General bread image
        dessert: './images/cake1.jpg'    // General dessert image
    },
    bread: {
        basicWhite: './images/bread/basic-white-bread.jpg',
        wholeWheat: './images/bread/whole-wheat-bread.jpg',
        sourdough: './images/bread/sourdough-bread.jpg',
        rye: './images/bread/rye-bread.jpg',
        arabic: './images/bread/arabic-bread.jpg',
        pita: './images/bread/pita-bread.jpg',
        tortilla: './images/bread/tortilla-bread.jpg',
        focaccia: './images/bread/focaccia.jpg',
        pizza: './images/bread/pizza-dough.jpg',
        sourdoughPizza: './images/bread/sourdough-pizza.jpg',
        sourdoughFocaccia: './images/bread/sourdough-focaccia.jpg',
        enrichedMilk: './images/bread/enriched-milk-bread.jpg',
        buns: './images/bread/buns.jpg'
    },
    dessert: {
        cake: './images/dessert/cake.jpg',
        cookies: './images/dessert/cookies.jpg',
        brownies: './images/dessert/brownies.jpg',
        coffeeBuns: './images/dessert/coffee-buns.jpg',
        chocolateMousse: './images/dessert/chocolate-mousse.jpg',
        cremeBrulee: './images/dessert/creme-brulee.jpg',
        doughnuts: './images/dessert/doughnuts.jpg',
        flan: './images/dessert/flan.jpg',
        gateauFondant: './images/dessert/gateau-fondant.jpg',
        gelato: './images/dessert/gelato.jpg',
        japaneseCheesecake: './images/dessert/japanese-cheesecake.jpg',
        cheesecake: './images/dessert/cheesecake.jpg',
        pie: './images/dessert/pie.jpg',
        tiramisu: './images/dessert/tiramisu.jpg'
    }
};

// Event listener for the main recipe type selection dropdown
recipeTypeSelect.addEventListener('change', () => {
    const selectedType = recipeTypeSelect.value;
    // Hide all sections first
    breadSection.classList.add('hidden');
    dessertSection.classList.add('hidden');
    breadRecipeOutput.classList.add('hidden'); // Also hide previous results
    dessertRecipeOutput.classList.add('hidden'); // Also hide previous results

    // Reset images to general ones when switching sections
    breadImage.src = imagePaths.general.bread;
    dessertImage.src = imagePaths.general.dessert;

    // Show the relevant section based on selection
    if (selectedType === 'bread') {
        breadSection.classList.remove('hidden');
    } else if (selectedType === 'dessert') {
        dessertSection.classList.remove('hidden');
    }
});

// Event listener for bread type selection: Updates the bread image
breadTypeSelect.addEventListener('change', () => {
    const selectedBreadType = breadTypeSelect.value;
    if (selectedBreadType && imagePaths.bread[selectedBreadType]) {
        breadImage.src = imagePaths.bread[selectedBreadType];
    } else {
        breadImage.src = imagePaths.general.bread; // Fallback to general if no specific image
    }
});

// Event listener for dessert type selection: Updates the dessert image
dessertTypeSelect.addEventListener('change', () => {
    const selectedDessertType = dessertTypeSelect.value;
    if (selectedDessertType && imagePaths.dessert[selectedDessertType]) {
        dessertImage.src = imagePaths.dessert[selectedDessertType];
    } else {
        dessertImage.src = imagePaths.general.dessert; // Fallback to general if no specific image
    }
});


// --- Bread Recipe Data ---
// Percentages are based on flour weight (Baker's Percentage)
const breadRecipes = {
    basicWhite: {
        name: "Basic White Bread",
        flourRatio: 100,
        water: 65,
        salt: 2,
        yeast: 1,
        sugar: 2,
        fat: 2,
        steps: [
            "In a large bowl, combine flour, sugar, yeast, and salt. Mix well.",
            "Add warm water and fat (e.g., melted butter or oil). Mix until a shaggy dough forms.",
            "Knead the dough on a lightly floured surface for 8-10 minutes until smooth and elastic.",
            "Place the dough in a lightly oiled bowl, cover, and let rise in a warm place for 1-1.5 hours, or until doubled in size.",
            "Punch down the dough, shape into a loaf, and place in a greased loaf pan.",
            "Cover and let rise for another 30-45 minutes.",
            "Preheat oven to 190°C (375°F). Bake for 30-35 minutes, or until golden brown and sounds hollow when tapped.",
            "Cool on a wire rack before slicing."
        ]
    },
    wholeWheat: {
        name: "Whole Wheat Bread",
        flourRatio: 100,
        water: 75,
        salt: 2,
        yeast: 1,
        honey: 3,
        butter: 3,
        steps: [
            "Combine whole wheat flour, yeast, and salt in a large bowl.",
            "In a separate bowl, whisk together warm water, honey, and melted butter.",
            "Pour the wet ingredients into the dry ingredients and mix until a dough forms.",
            "Knead for 10-12 minutes until the dough is smooth and elastic. It will be slightly stickier than white bread dough.",
            "Place in an oiled bowl, cover, and let rise for 1.5-2 hours.",
            "Punch down, shape into a loaf, and place in a greased loaf pan.",
            "Cover and let rise for 45-60 minutes.",
            "Preheat oven to 190°C (375°F). Bake for 35-40 minutes, or until golden brown.",
            "Cool completely before slicing."
        ]
    },
    sourdough: {
        name: "Sourdough Bread",
        flourRatio: 100,
        water: 70,
        salt: 2,
        sourdoughStarter: 20,
        steps: [
            "Mix active sourdough starter with warm water in a large bowl until dissolved.",
            "Add flour and mix until no dry spots remain. Cover and let rest for 30 minutes (autolyse).",
            "Add salt and mix thoroughly, incorporating it into the dough.",
            "Perform 4-6 sets of stretch and folds every 30 minutes for the first 2-3 hours of bulk fermentation.",
            "Let the dough bulk ferment at room temperature (22-24°C / 72-75°F) for 4-6 hours, or until it has increased by 30-50% in volume.",
            "Gently preshape the dough into a round and let rest for 20 minutes.",
            "Final shape the dough into a boule or batard and place in a floured banneton.",
            "Cold proof in the refrigerator for 12-18 hours.",
            "Preheat oven with a Dutch oven to 230°C (450°F) for 1 hour.",
            "Score the dough, transfer to the hot Dutch oven, and bake covered for 20 minutes.",
            "Remove lid and bake for another 25-30 minutes, or until deeply golden brown.",
            "Cool on a wire rack for at least 2 hours before slicing."
        ]
    },
    rye: {
        name: "Rye Bread",
        flourRatio: 100,
        water: 78,
        salt: 2,
        yeast: 0.5,
        carawaySeeds: 1,
        steps: [
            "Combine rye flour, yeast, salt, and caraway seeds in a large bowl.",
            "Add warm water and mix until a sticky dough forms. Rye dough is typically very sticky and dense.",
            "Knead for 5-7 minutes. It won't develop as much gluten as wheat dough.",
            "Place in an oiled bowl, cover, and let rise for 1-1.5 hours.",
            "Gently shape the dough into a loaf and place in a greased loaf pan.",
            "Cover and let rise for another 30-45 minutes.",
            "Preheat oven to 200°C (400°F). Bake for 40-50 minutes, or until dark brown and firm.",
            "Cool completely before slicing, as rye bread improves with age."
        ]
    },
    arabic: {
        name: "Arabic Bread",
        flourRatio: 100,
        water: 60,
        salt: 1.5,
        yeast: 1,
        sugar: 0.5,
        oliveOil: 2,
        steps: [
            "In a bowl, dissolve yeast and sugar in warm water. Let sit for 5-10 minutes until foamy.",
            "In a large bowl, combine flour and salt. Add the yeast mixture and olive oil. Mix until a dough forms.",
            "Knead on a lightly floured surface for 8-10 minutes until smooth and elastic.",
            "Place in an oiled bowl, cover, and let rise for 1-1.5 hours, or until doubled.",
            "Divide the dough into equal portions and roll each into a thin round (about 1/4 inch thick).",
            "Preheat a cast-iron skillet or baking stone to very high heat.",
            "Cook each bread round for 1-2 minutes per side, or until it puffs up and gets golden spots.",
            "Serve warm."
        ]
    },
    pita: {
        name: "Pita Bread",
        flourRatio: 100,
        water: 62,
        salt: 1.8,
        yeast: 1,
        oliveOil: 3,
        steps: [
            "In a large bowl, combine flour, yeast, and salt. Mix well.",
            "Add warm water and olive oil. Mix until a shaggy dough forms.",
            "Knead the dough on a lightly floured surface for 8-10 minutes until smooth and elastic.",
            "Place the dough in a lightly oiled bowl, cover, and let rise in a warm place for 1-1.5 hours, or until doubled in size.",
            "Divide the dough into equal portions and roll each into a thin round (about 6-8 inches in diameter).",
            "Preheat oven to 230°C (450°F) with a baking stone or inverted baking sheet inside for at least 30 minutes.",
            "Carefully place pita rounds on the hot stone/sheet. Bake for 2-4 minutes, or until they puff up like balloons and are lightly golden.",
            "Remove and cool on a wire rack. Pitas deflate as they cool, forming the pocket."
        ]
    },
    tortilla: {
        name: "Tortilla Bread",
        flourRatio: 100,
        water: 55,
        salt: 1.5,
        bakingPowder: 1,
        lardShortening: 10,
        steps: [
            "In a large bowl, whisk together flour, baking powder, and salt.",
            "Cut in the lard or shortening using your fingertips or a pastry blender until the mixture resembles coarse crumbs.",
            "Gradually add warm water, mixing until a soft dough forms. Knead for 5-7 minutes until smooth.",
            "Cover the dough and let it rest for at least 30 minutes (or up to 2 hours).",
            "Divide the dough into equal portions and roll each into a very thin round (about 6-8 inches in diameter).",
            "Heat a comal or cast-iron skillet over medium-high heat.",
            "Cook each tortilla for 30-60 seconds per side, until light brown spots appear and the tortilla puffs slightly.",
            "Stack cooked tortillas and keep them warm in a towel."
        ]
    },
    focaccia: {
        name: "Focaccia",
        flourRatio: 100,
        water: 80,
        salt: 2.5,
        yeast: 0.5,
        oliveOil: 5,
        rosemary: 'to taste',
        steps: [
            "In a large bowl, combine flour, salt, and instant yeast. Whisk together.",
            "Add warm water and 4% of the olive oil. Mix until just combined and no dry flour remains. The dough will be very wet and shaggy.",
            "Cover the bowl and let it rest for 15-20 minutes.",
            "Perform a series of stretch and folds in the bowl every 30 minutes for 2 hours (4 sets).",
            "Transfer the dough to a well-oiled baking sheet (use remaining olive oil). Gently stretch it to fill the pan.",
            "Cover and let rise for 1-2 hours, or until visibly puffy.",
            "Preheat oven to 220°C (425°F).",
            "Dimple the dough deeply with oiled fingertips. Drizzle with more olive oil and sprinkle with flaky sea salt and fresh rosemary.",
            "Bake for 20-30 minutes, or until golden brown and cooked through.",
            "Cool on a wire rack before slicing."
        ]
    },
    pizza: {
        name: "Pizza Dough",
        flourRatio: 100,
        water: 65,
        salt: 2,
        yeast: 0.7,
        oliveOil: 3,
        steps: [
            "In a large bowl, combine flour, salt, and instant yeast. Mix well.",
            "Add warm water and olive oil. Mix until a shaggy dough forms.",
            "Knead on a lightly floured surface for 8-10 minutes until smooth and elastic.",
            "Place in an oiled bowl, cover, and let rise in a warm place for 1-1.5 hours, or until doubled in size.",
            "Gently punch down the dough and divide into desired portions.",
            "Shape each portion into a ball and let rest for 15-20 minutes before stretching or rolling into pizza crusts.",
            "Top with your favorite ingredients and bake on a preheated pizza stone or baking sheet at 230-260°C (450-500°F) until crust is golden and cheese is bubbly."
        ]
    },
    sourdoughPizza: {
        name: "Sourdough Pizza Dough",
        flourRatio: 100,
        water: 68,
        salt: 2,
        sourdoughStarter: 25,
        steps: [
            "In a large bowl, combine active sourdough starter with warm water. Stir until dissolved.",
            "Add flour and mix until no dry spots remain. Cover and let rest for 30 minutes (autolyse).",
            "Add salt and mix thoroughly, incorporating it into the dough.",
            "Perform 3-4 sets of stretch and folds every 30-45 minutes.",
            "Let the dough bulk ferment at room temperature (22-24°C / 72-75°F) for 3-5 hours, or until visibly bubbly and increased in volume.",
            "Divide the dough into desired portions and gently shape each into a ball.",
            "Place dough balls in lightly oiled containers, cover, and cold proof in the refrigerator for 12-24 hours.",
            "Remove dough from fridge 1-2 hours before baking. Gently stretch into pizza crusts.",
            "Top with your favorite ingredients and bake on a preheated pizza stone or baking steel at 260°C (500°F) or higher until crust is golden and cheese is bubbly."
        ]
    },
    sourdoughFocaccia: {
        name: "Sourdough Focaccia",
        flourRatio: 100,
        water: 85,
        salt: 2.5,
        sourdoughStarter: 20,
        oliveOil: 6,
        rosemary: 'to taste',
        steps: [
            "In a large bowl, combine active sourdough starter with warm water. Stir until dissolved.",
            "Add flour and salt. Mix until just combined and no dry flour remains. The dough will be very wet.",
            "Cover the bowl and let rest for 30 minutes (autolyse).",
            "Perform 4-6 sets of stretch and folds in the bowl every 30 minutes for 2-3 hours.",
            "Transfer the dough to a generously oiled baking sheet (use most of the olive oil). Gently stretch it to fill the pan.",
            "Cover and let rise at room temperature for 3-5 hours, or until visibly puffy and bubbly.",
            "Preheat oven to 220°C (425°F).",
            "Dimple the dough deeply with oiled fingertips. Drizzle with remaining olive oil and sprinkle with flaky sea salt and fresh rosemary.",
            "Bake for 25-35 minutes, or until deeply golden brown and cooked through.",
            "Cool on a wire rack before slicing."
        ]
    },
    enrichedMilk: {
        name: "Enriched Milk Bread",
        flourRatio: 100,
        milk: 60,
        sugar: 8,
        butter: 10,
        egg: 15,
        salt: 1.5,
        yeast: 1.2,
        steps: [
            "In a small bowl, warm milk slightly and dissolve yeast and a pinch of sugar. Let sit 5 minutes.",
            "In a large bowl, combine flour, remaining sugar, and salt. Add the yeast mixture, melted butter, and egg. Mix until a dough forms.",
            "Knead on a lightly floured surface for 10-15 minutes until very smooth, elastic, and soft.",
            "Place in an oiled bowl, cover, and let rise for 1.5-2 hours, or until doubled.",
            "Punch down the dough and divide into 3-4 equal pieces. Shape each into a log.",
            "Place logs in a greased loaf pan. Cover and let rise for 45-60 minutes, or until nearly doubled.",
            "Preheat oven to 180°C (350°F). Bake for 30-35 minutes, or until golden brown.",
            "Brush with melted butter immediately after baking. Cool on a wire rack."
        ]
    },
    buns: {
        name: "Buns",
        flourRatio: 100,
        milk: 55,
        sugar: 5,
        butter: 8,
        egg: 10,
        salt: 1.5,
        yeast: 1,
        steps: [
            "In a small bowl, warm milk slightly and dissolve yeast and a pinch of sugar. Let sit 5 minutes.",
            "In a large bowl, combine flour, remaining sugar, and salt. Add the yeast mixture, melted butter, and egg. Mix until a dough forms.",
            "Knead on a lightly floured surface for 8-10 minutes until smooth and elastic.",
            "Place in an oiled bowl, cover, and let rise for 1-1.5 hours, or until doubled.",
            "Punch down the dough and divide into equal portions (e.g., 50-70g each).",
            "Shape each portion into a tight ball. Place on a parchment-lined baking sheet, leaving space between them.",
            "Cover and let rise for 30-45 minutes, or until visibly puffy.",
            "Preheat oven to 190°C (375°F). Bake for 12-18 minutes, or until golden brown.",
            "Cool on a wire rack."
        ]
    }
};

/**
 * Calculates the bread recipe based on total dough weight and bread type.
 * @param {number} totalDoughWeight - The desired total weight of the dough in grams.
 * @param {string} breadTypeKey - The key for the selected bread type from `breadRecipes`.
 * @returns {object|null} An object containing the recipe details or null if inputs are invalid.
 */
function calculateBreadRecipe(totalDoughWeight, breadTypeKey) {
    if (totalDoughWeight <= 0 || !breadTypeKey) {
        return null; // Invalid inputs
    }

    const recipe = breadRecipes[breadTypeKey];
    if (!recipe) {
        return null; // Recipe not found
    }

    // Calculate total percentage sum of all ingredients relative to flour
    // This is 100 (for flour) + sum of all other ingredient percentages
    let totalPercentageSum = 100; // For flour
    for (const ingredient in recipe) {
        if (ingredient !== 'name' && ingredient !== 'flourRatio' && ingredient !== 'steps' && typeof recipe[ingredient] === 'number') {
            totalPercentageSum += recipe[ingredient];
        }
    }

    // Calculate the flour amount based on the total dough weight
    // Flour amount = (Total Dough Weight / Total Percentage Sum) * 100
    const flourAmount = (totalDoughWeight / totalPercentageSum) * 100;

    const calculatedRecipe = {
        name: recipe.name,
        flour: flourAmount.toFixed(2),
        hydration: recipe.water ? recipe.water : 'N/A', // Hydration is typically water % of flour
        ingredients: [],
        steps: recipe.steps || []
    };

    // Calculate amounts for other ingredients
    for (const ingredient in recipe) {
        if (ingredient !== 'name' && ingredient !== 'flourRatio' && ingredient !== 'steps') {
            if (typeof recipe[ingredient] === 'number') {
                const amount = (flourAmount * (recipe[ingredient] / 100)).toFixed(2);
                calculatedRecipe.ingredients.push({ name: ingredient.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), amount: amount + 'g' });
            } else {
                // Handle 'to taste' or other non-numeric values
                calculatedRecipe.ingredients.push({ name: ingredient.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), amount: recipe[ingredient] });
            }
        }
    }
    return calculatedRecipe;
}

// Event listener for bread calculation button
calculateBreadBtn.addEventListener('click', () => {
    const doughWeight = parseFloat(doughWeightInput.value);
    const breadType = breadTypeSelect.value;

    if (isNaN(doughWeight) || doughWeight <= 0) {
        breadIngredientsList.innerHTML = '<li class="text-red-600">Please enter a valid positive number for Total Dough Weight.</li>';
        breadStepsList.innerHTML = ''; // Clear steps as well
        breadRecipeOutput.classList.remove('hidden');
        return;
    }
    if (!breadType) {
        breadIngredientsList.innerHTML = '<li class="text-red-600">Please select a Type of Bread.</li>';
        breadStepsList.innerHTML = ''; // Clear steps as well
        breadRecipeOutput.classList.remove('hidden');
        return;
    }

    const recipe = calculateBreadRecipe(doughWeight, breadType);

    if (recipe) {
        let ingredientsHtml = `<li class="font-bold text-lg">${recipe.name}</li>`;
        ingredientsHtml += `<li>Flour: ${recipe.flour}g</li>`;
        if (recipe.hydration !== 'N/A') {
            ingredientsHtml += `<li>Hydration: ${recipe.hydration}%</li>`;
        }
        recipe.ingredients.forEach(item => {
            // Display all ingredients, including water if it's present
            if (item.name === 'Sourdough Starter') {
                ingredientsHtml += `<li>${item.name}: ${item.amount} (approx.)</li>`;
            } else {
                ingredientsHtml += `<li>${item.name}: ${item.amount}</li>`;
            }
        });
        breadIngredientsList.innerHTML = ingredientsHtml;

        let stepsHtml = '';
        if (recipe.steps && recipe.steps.length > 0) {
            recipe.steps.forEach(step => {
                stepsHtml += `<li>${step}</li>`;
            });
        } else {
            stepsHtml = '<li>No specific steps provided for this recipe.</li>';
        }
        breadStepsList.innerHTML = stepsHtml;

        breadRecipeOutput.classList.remove('hidden');
    } else {
        breadIngredientsList.innerHTML = '<li class="text-red-600">Could not calculate recipe. Please check your inputs.</li>';
        breadStepsList.innerHTML = '';
        breadRecipeOutput.classList.remove('hidden');
    }
});

// --- Dessert Recipe Data ---
// Percentages are based on total dessert weight.
const dessertRecipes = {
    cake: {
        name: "Cake",
        flour: 25,
        sugar: 20,
        eggs: 15,
        butter: 15,
        milk: 10,
        bakingPowder: 1,
        vanilla: 0.5,
        salt: 0.2,
        steps: [
            "Preheat oven to 175°C (350°F). Grease and flour a cake pan.",
            "In a medium bowl, whisk together flour, baking powder, and salt.",
            "In a large bowl, cream together butter and sugar until light and fluffy.",
            "Beat in eggs one at a time, then stir in vanilla extract.",
            "Gradually add dry ingredients to the wet ingredients, alternating with milk, beginning and ending with dry ingredients. Mix until just combined.",
            "Pour batter into the prepared cake pan and bake for 30-35 minutes, or until a wooden skewer inserted into the center comes out clean.",
            "Let cool in the pan for 10 minutes before inverting onto a wire rack to cool completely."
        ]
    },
    cookies: {
        name: "Cookies",
        flour: 30,
        butter: 25,
        sugar: 20,
        eggs: 8,
        chocolateChips: 15,
        bakingSoda: 0.5,
        salt: 0.2,
        steps: [
            "Preheat oven to 190°C (375°F). Line a baking sheet with parchment paper.",
            "In a large bowl, cream together butter and sugars until light and fluffy.",
            "Beat in eggs one at a time, then stir in vanilla.",
            "In a separate bowl, whisk together flour, baking soda, and salt.",
            "Gradually add dry ingredients to the wet ingredients, mixing until just combined. Stir in chocolate chips.",
            "Drop rounded tablespoons of dough onto the prepared baking sheet.",
            "Bake for 9-12 minutes, or until edges are golden brown.",
            "Let cool on the baking sheet for a few minutes before transferring to a wire rack to cool completely."
        ]
    },
    brownies: {
        name: "Brownies",
        sugar: 30,
        butter: 20,
        eggs: 15,
        cocoaPowder: 10,
        flour: 15,
        vanilla: 1,
        salt: 0.2,
        chocolateChunks: 8,
        steps: [
            "Preheat oven to 175°C (350°F). Grease and flour an 8x8 inch baking pan.",
            "Melt butter in a large saucepan over low heat. Remove from heat and stir in sugar until combined.",
            "Whisk in eggs one at a time, then stir in vanilla extract.",
            "Sift in cocoa powder, flour, and salt. Mix until just combined. Fold in chocolate chunks.",
            "Pour batter into the prepared pan and spread evenly.",
            "Bake for 20-25 minutes, or until a wooden skewer inserted into the center comes out with moist crumbs (not wet batter).",
            "Let cool completely in the pan before cutting into squares."
        ]
    },
    coffeeBuns: {
        name: "Coffee Buns",
        flour: 35,
        milk: 15,
        sugar: 10,
        butter: 10,
        eggs: 8,
        yeast: 0.5,
        salt: 0.2,
        coffeePaste: 5,
        icingSugar: 8,
        steps: [
            "Prepare the dough: Warm milk, dissolve yeast and a pinch of sugar. Combine flour, remaining sugar, salt, egg, and melted butter. Add yeast mixture and knead until smooth and elastic.",
            "First rise: Place dough in an oiled bowl, cover, and let rise until doubled (1-1.5 hours).",
            "Divide and shape: Punch down dough, divide into equal portions, and shape into balls. Place on a baking sheet.",
            "Second rise: Cover and let rise until puffy (30-45 minutes).",
            "Prepare coffee topping: Cream butter and icing sugar. Beat in egg, then coffee paste. Gradually add flour until a pipeable consistency.",
            "Pipe topping: Pipe the coffee topping in a spiral pattern over each bun.",
            "Bake: Preheat oven to 190°C (375°F). Bake for 12-18 minutes until golden brown.",
            "Cool: Let cool on a wire rack."
        ]
    },
    chocolateMousse: {
        name: "Chocolate Mousse",
        darkChocolate: 30,
        heavyCream: 40,
        eggs: 20,
        sugar: 10,
        steps: [
            "Melt dark chocolate gently over a double boiler or in the microwave.",
            "Separate egg yolks and whites. In a bowl, whisk egg yolks with half the sugar until pale and fluffy.",
            "In a separate clean bowl, whip heavy cream until soft peaks form.",
            "In another clean bowl, whisk egg whites until stiff peaks form, gradually adding the remaining sugar.",
            "Fold the melted chocolate into the egg yolk mixture.",
            "Gently fold in the whipped cream, then carefully fold in the egg whites until just combined.",
            "Pour into serving glasses or a bowl. Chill in the refrigerator for at least 4 hours, or until set."
        ]
    },
    cremeBrulee: {
        name: "Crème Brûlée",
        heavyCream: 60,
        eggYolks: 20,
        sugar: 15,
        vanilla: 5,
        steps: [
            "Preheat oven to 150°C (300°F). Place 4-6 ramekins in a large baking dish.",
            "In a saucepan, gently heat heavy cream and vanilla until simmering. Do not boil.",
            "In a bowl, whisk egg yolks and sugar until pale and creamy.",
            "Gradually temper the hot cream into the egg yolk mixture, whisking constantly.",
            "Strain the mixture through a fine-mesh sieve into a clean bowl or pitcher to remove any cooked egg bits.",
            "Pour the custard into the ramekins.",
            "Carefully pour hot water into the baking dish, reaching halfway up the sides of the ramekins (water bath).",
            "Bake for 30-40 minutes, or until the edges are set but the center still jiggles slightly.",
            "Remove from water bath, let cool, then chill in the refrigerator for at least 4 hours.",
            "Before serving, sprinkle a thin, even layer of sugar over each crème brûlée. Caramelize with a kitchen torch until golden brown and bubbly."
        ]
    },
    doughnuts: {
        name: "Doughnuts",
        flour: 40,
        milk: 20,
        sugar: 10,
        eggs: 8,
        butter: 7,
        yeast: 1,
        salt: 0.5,
        fryingOil: 10,
        glaze: 3,
        steps: [
            "In a bowl, warm milk and dissolve yeast and a pinch of sugar. Let sit for 5 minutes.",
            "In a large bowl, combine flour, remaining sugar, salt, eggs, and melted butter. Add the yeast mixture and knead until a soft, smooth dough forms.",
            "Place in an oiled bowl, cover, and let rise for 1-1.5 hours, or until doubled.",
            "Punch down the dough and roll it out to about 1/2 inch thickness.",
            "Cut out doughnut shapes using a doughnut cutter or two different sized round cutters.",
            "Place cut doughnuts on parchment-lined trays, cover, and let rise for another 30-45 minutes, or until puffy.",
            "Heat frying oil in a large pot to 175°C (350°F).",
            "Carefully fry doughnuts, a few at a time, for 1-2 minutes per side, until golden brown.",
            "Remove with a slotted spoon and place on a wire rack set over paper towels to drain excess oil.",
            "Prepare glaze (e.g., powdered sugar and milk). Dip warm doughnuts in glaze and let set."
        ]
    },
    flan: {
        name: "Flan",
        milk: 50,
        eggs: 20,
        sugar: 20,
        vanilla: 5,
        caramel: 5,
        steps: [
            "Preheat oven to 160°C (325°F). Prepare a water bath by placing a large baking dish with a few inches of hot water in the oven.",
            "Prepare caramel: In a saucepan, melt sugar over medium heat until it turns into an amber-colored liquid. Pour immediately into ramekins or a flan mold, swirling to coat the bottom.",
            "Prepare custard: In a large bowl, whisk eggs, milk, sugar, and vanilla until well combined but not frothy.",
            "Strain the custard mixture through a fine-mesh sieve to ensure smoothness.",
            "Pour the custard over the caramel in the ramekins/mold.",
            "Carefully place ramekins/mold in the hot water bath in the oven.",
            "Bake for 45-60 minutes, or until the edges are set and the center slightly jiggles.",
            "Remove from water bath, let cool completely, then chill in the refrigerator for at least 4 hours or overnight.",
            "To serve, run a thin knife around the edge of the flan and invert onto a serving plate."
        ]
    },
    gateauFondant: {
        name: "Gâteau Fondant au Chocolat",
        darkChocolate: 35,
        butter: 25,
        eggs: 20,
        sugar: 15,
        flour: 5,
        steps: [
            "Preheat oven to 190°C (375°F). Grease and flour a round cake pan.",
            "Melt dark chocolate and butter together in a heatproof bowl over a double boiler or in the microwave until smooth.",
            "In a separate bowl, whisk eggs and sugar until light and fluffy.",
            "Gradually fold the melted chocolate mixture into the egg mixture.",
            "Sift in the flour and gently fold until just combined. Do not overmix.",
            "Pour the batter into the prepared pan.",
            "Bake for 20-25 minutes. The edges should be set, but the center should still be soft and slightly jiggly (this creates the 'fondant' texture).",
            "Let cool slightly in the pan before inverting. Serve warm, perhaps with a scoop of vanilla ice cream."
        ]
    },
    gelato: {
        name: "Gelato",
        milk: 60,
        cream: 15,
        sugar: 15,
        eggYolks: 8,
        flavoring: 2,
        steps: [
            "In a saucepan, combine milk, cream, and half of the sugar. Heat over medium heat until simmering.",
            "In a separate bowl, whisk egg yolks with the remaining sugar until pale and creamy.",
            "Gradually temper the hot milk mixture into the egg yolk mixture, whisking constantly.",
            "Return the mixture to the saucepan and cook over low heat, stirring constantly, until it thickens slightly and coats the back of a spoon (do not boil).",
            "Remove from heat, stir in your chosen flavoring (e.g., vanilla extract, fruit puree).",
            "Strain the base through a fine-mesh sieve into a clean bowl. Cover and chill thoroughly in the refrigerator for at least 4 hours or overnight.",
            "Churn the chilled gelato base in an ice cream maker according to manufacturer's instructions until it reaches a soft-serve consistency.",
            "Transfer to an airtight container and freeze for at least 2-4 hours to firm up before serving."
        ]
    },
    japaneseCheesecake: {
        name: "Japanese Cheesecake",
        creamCheese: 30,
        eggs: 20,
        sugar: 15,
        milk: 10,
        butter: 8,
        flour: 7,
        cornstarch: 5,
        lemonJuice: 5,
        steps: [
            "Preheat oven to 160°C (325°F). Prepare a 6-8 inch springform pan by greasing and lining with parchment paper. Wrap the bottom with foil for a water bath.",
            "Melt cream cheese, butter, and milk together over a double boiler or in the microwave until smooth. Let cool slightly.",
            "Separate egg yolks and whites. Whisk egg yolks into the cream cheese mixture.",
            "Sift in flour and cornstarch, mix until smooth. Stir in lemon juice.",
            "In a separate clean bowl, whip egg whites with sugar until soft peaks form.",
            "Gently fold the whipped egg whites into the cream cheese mixture in three additions until just combined.",
            "Pour batter into the prepared pan. Place the pan in a larger baking dish and fill the outer dish with hot water halfway up the sides of the springform pan (water bath).",
            "Bake for 60-75 minutes, or until golden brown on top and set. The center may still jiggle slightly.",
            "Turn off the oven and leave the cheesecake inside with the door ajar for 30-60 minutes to prevent cracking.",
            "Remove from oven, let cool completely, then chill in the refrigerator for at least 4 hours or overnight before serving."
        ]
    },
    cheesecake: {
        name: "Cheesecake",
        creamCheese: 40,
        sugar: 20,
        eggs: 15,
        sourCream: 10,
        grahamCrackerCrust: 10,
        vanilla: 5,
        steps: [
            "Preheat oven to 175°C (350°F). Prepare the crust: Combine graham cracker crumbs with melted butter and press into the bottom of a 9-inch springform pan. Bake for 8-10 minutes. Let cool.",
            "Reduce oven temperature to 160°C (325°F).",
            "In a large bowl, beat cream cheese and sugar until smooth and creamy.",
            "Beat in eggs one at a time, mixing until just combined after each addition. Do not overmix.",
            "Stir in sour cream and vanilla extract.",
            "Pour the filling over the cooled crust.",
            "Bake for 50-70 minutes, or until the edges are set but the center still jiggles slightly when gently shaken.",
            "Turn off the oven and leave the cheesecake inside with the door ajar for 1 hour.",
            "Remove from oven, let cool completely on a wire rack, then chill in the refrigerator for at least 4 hours or overnight before serving."
        ]
    },
    pie: {
        name: "Pie",
        flour: 30,
        butter: 20,
        water: 10,
        salt: 0.5,
        filling: 39.5, // Generic filling percentage
        steps: [
            "Prepare pie crust: In a large bowl, combine flour and salt. Cut in cold butter until pea-sized crumbs form. Gradually add ice water, mixing until a dough forms. Do not overmix. Form into a disc, wrap, and chill for at least 30 minutes.",
            "Roll out dough: On a lightly floured surface, roll out half of the dough into a 12-inch circle. Carefully transfer to a 9-inch pie plate.",
            "Prepare filling: Make your desired pie filling (e.g., fruit, custard).",
            "Fill pie: Pour the filling into the pie crust.",
            "Add top crust (optional): Roll out the remaining dough and place over the filling, crimping the edges to seal. Cut vents in the top crust.",
            "Bake: Preheat oven to 200°C (400°F). Bake for 15 minutes, then reduce temperature to 175°C (350°F) and bake for another 30-45 minutes, or until crust is golden brown and filling is bubbly.",
            "Cool: Let cool completely on a wire rack before slicing and serving."
        ]
    },
    tiramisu: {
        name: "Tiramisú",
        mascarpone: 30,
        eggs: 20,
        sugar: 15,
        coffee: 15,
        ladyfingers: 10,
        cocoaPowder: 5,
        marsalaWine: 5,
        steps: [
            "Prepare coffee: Brew strong espresso or coffee and let it cool. Stir in Marsala wine (if using).",
            "Prepare sabayon (egg yolk mixture): In a heatproof bowl set over simmering water (double boiler), whisk egg yolks and sugar until pale, thick, and tripled in volume. Remove from heat and let cool.",
            "Prepare mascarpone cream: In a separate bowl, gently fold the cooled sabayon into the mascarpone cheese until smooth.",
            "Assemble: Quickly dip ladyfingers into the coffee mixture (do not let them get soggy). Arrange a layer of dipped ladyfingers in the bottom of a serving dish.",
            "Layer: Spread half of the mascarpone cream over the ladyfingers. Repeat with another layer of dipped ladyfingers and the remaining mascarpone cream.",
            "Chill: Cover the dish and refrigerate for at least 4 hours, or preferably overnight, to allow flavors to meld and set.",
            "Serve: Before serving, dust generously with cocoa powder."
        ]
    }
};

/**
 * Calculates the dessert recipe based on total desired dessert weight and dessert type.
 * @param {number} totalDessertWeight - The desired total weight of the dessert in grams.
 * @param {string} dessertTypeKey - The key for the selected dessert type from `dessertRecipes`.
 * @returns {object|null} An object containing the recipe details or null if inputs are invalid.
 */
function calculateDessertRecipe(totalDessertWeight, dessertTypeKey) {
    if (totalDessertWeight <= 0 || !dessertTypeKey) {
        return null; // Invalid inputs
    }

    const recipe = dessertRecipes[dessertTypeKey];
    if (!recipe) {
        return null; // Recipe not found
    }

    const calculatedRecipe = {
        name: recipe.name,
        waterToFlourRatio: 'N/A', // Default, calculate if flour and water/milk present
        ingredients: [],
        steps: recipe.steps || []
    };

    let flourAmount = 0;
    let waterAmount = 0; // Can be water or milk for ratio calculation

    for (const ingredient in recipe) {
        if (ingredient !== 'name' && ingredient !== 'steps') {
            if (typeof recipe[ingredient] === 'number') {
                const amount = (totalDessertWeight * (recipe[ingredient] / 100)).toFixed(2);
                calculatedRecipe.ingredients.push({ name: ingredient.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), amount: amount + 'g' });

                // Check for flour and water/milk to calculate ratio
                if (ingredient.toLowerCase().includes('flour')) {
                    flourAmount = parseFloat(amount);
                }
                // Sum up all liquid components for the ratio calculation
                if (ingredient.toLowerCase().includes('water') || ingredient.toLowerCase().includes('milk') || ingredient.toLowerCase().includes('cream')) {
                    waterAmount += parseFloat(amount);
                }
            } else {
                calculatedRecipe.ingredients.push({ name: ingredient.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), amount: recipe[ingredient] });
            }
        }
    }

    // Calculate water-to-flour ratio if both are present
    if (flourAmount > 0) {
        calculatedRecipe.waterToFlourRatio = (waterAmount / flourAmount).toFixed(2);
    }

    return calculatedRecipe;
}

// Event listener for dessert calculation button
calculateDessertBtn.addEventListener('click', () => {
    const dessertWeight = parseFloat(dessertWeightInput.value);
    const dessertType = dessertTypeSelect.value;

    if (isNaN(dessertWeight) || dessertWeight <= 0) {
        dessertIngredientsList.innerHTML = '<li class="text-red-600">Please enter a valid positive number for Total Desired Dessert Weight.</li>';
        dessertStepsList.innerHTML = ''; // Clear steps as well
        dessertRecipeOutput.classList.remove('hidden');
        return;
    }
    if (!dessertType) {
        dessertIngredientsList.innerHTML = '<li class="text-red-600">Please select a Type of Dessert.</li>';
        dessertStepsList.innerHTML = ''; // Clear steps as well
        dessertRecipeOutput.classList.remove('hidden');
        return;
    }

    const recipe = calculateDessertRecipe(dessertWeight, dessertType);

    if (recipe) {
        let ingredientsHtml = `<li class="font-bold text-lg">${recipe.name}</li>`;
        if (recipe.waterToFlourRatio !== 'N/A') {
            ingredientsHtml += `<li>Water/Liquid to Flour Ratio: ${recipe.waterToFlourRatio}</li>`;
        }
        recipe.ingredients.forEach(item => {
            ingredientsHtml += `<li>${item.name}: ${item.amount}</li>`;
        });
        dessertIngredientsList.innerHTML = ingredientsHtml;

        let stepsHtml = '';
        if (recipe.steps && recipe.steps.length > 0) {
            recipe.steps.forEach(step => {
                stepsHtml += `<li>${step}</li>`;
            });
        } else {
            stepsHtml = '<li>No specific steps provided for this recipe.</li>';
        }
        dessertStepsList.innerHTML = stepsHtml;

        dessertRecipeOutput.classList.remove('hidden');
    } else {
        dessertIngredientsList.innerHTML = '<li class="text-red-600">Could not calculate recipe. Please check your inputs.</li>';
        dessertStepsList.innerHTML = '';
        dessertRecipeOutput.classList.remove('hidden');
    }
});