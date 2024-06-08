import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './foods.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Background from '../images/nutrition_background.jpg';
import NutritionTable from '../Components/NutritionTable.js';
import FoodCardContainer from '../Components/FoodCardContainer.js';

// Put any other imports below so that CSS from your
// components takes precedence over default styles.


class Food extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foodIds: [],
        }
        this.searchFood = this.searchFood.bind(this);
        this.processFoodData = this.processFoodData.bind(this);
    }

    async searchFood() {
        try{
            if(document.getElementById('food-card-container')) document.getElementById('food-card-container').remove();
            let food = document.getElementById('food-search-input').value;
            food = food.replace(' ', '%20');
            const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=L0yOlAsUuTJuZCDIxfW8dFL55AGRxSnpVhttLJ2h&query=${food}&dataType=SR%20Legacy&pageSize=50&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc`);
            const data = await response.json();
            this.processFoodData(data);
        }
        catch(err) {
            switch(err) {
                case 'TypeError: Failed to fetch':
                    alert('Failed to fetch data from the server. Please check your internet connection.');
                    break;
                case "TypeError: Cannot read properties of undefined (reading 'fdcId')":
                    alert('No food found. Please try again.');
                    break;
                default:
                    alert('An error occurred. Please try again.');
                    break;
            }
        }
    }

    processFoodData(data) {
        let tempFoodIds = [];
        for(let i = 0; i < 3; i++) {
            tempFoodIds.push(data.foods[i].fdcId);
        }
        this.setState({foodIds: tempFoodIds});
    }

    render() {
        return(
        <div className="food-page">
             <div id="Header" className='container-fluid'>
                <h1>Nutrition is the most important part</h1>
                <p>Get your meal plan and reach your goals</p>
                <img className='parallax-bg' src={Background} alt="Background" />
             </div>
             <div className='content'>
                <h2 className='welcome-nutrition'>Enjoy Your Meals</h2>
                <div id="food-searcher-container" className='container-fluid food-searcher-container'>
                    <div className="food-searcher">
                        <input type="text" placeholder="Search for a food" id="food-search-input"/>
                        <button onClick={this.searchFood}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                    {this.state.foodIds.length > 0 ? <FoodCardContainer foodIds={this.state.foodIds} /> : null}
                </div>
                <div id="meal-plan-maker-container" className="container-fluid meal-plan-content">
                    <div className="meal-plan-maker" id="meal-plan-maker">
                        <h2>Meal Plan Maker</h2>
                            <NutritionTable />
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

// function Food(){
//     const [foodIds, setFoodIds] = React.useState([]);
//     const [foodDataLocal, setFoodDataLocal] = React.useState({});

//     async function searchFood() {
//         console.log('searching');
//         if(document.getElementById('food-card-container')){setFoodIds([])}
//         let food = document.getElementById('food-search-input').value;
//         food = food.replace(' ', '%20');
//         const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=L0yOlAsUuTJuZCDIxfW8dFL55AGRxSnpVhttLJ2h&query=${food}&dataType=SR%20Legacy&pageSize=50&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc`);
//         const data = await response.json();
//         processFoodData(data);
//     }

//     async function processFoodData(data) {
//         console.log(data);
//         let tempFoodIds = [];
//         for(let i = 0; i < 3; i++) {
//             console.log(data.foods[i].fdcId);
//             tempFoodIds.push(data.foods[i].fdcId);
//         }
//         setFoodIds(tempFoodIds);
//     }

//     async function processId(foodId) {
//         console.log("processing id");
//         const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=L0yOlAsUuTJuZCDIxfW8dFL55AGRxSnpVhttLJ2h`);
//         const data = await response.json();
//         console.log(data);
//         processFoodDataLocal(data);  
//     }

//     function processFoodDataLocal(data) {
//         console.log("processing food data local", data);
//         setFoodDataLocal({
//             fdcId: data.fdcId,
//             description: data.description,
//             foodCategory: data.foodCategory.description,
//             itemType: data.foodPortions[0].modifier,
//             weightPerItem: data.foodPortions[0].gramWeight,
//             nutrients: {
//                 calories: data.foodNutrients[2].amount,
//                 protein: data.foodNutrients[4].amount,
//                 fat: data.foodNutrients[5].amount,
//                 carbohydrates: data.foodNutrients[8].amount,
//             }
//         });
//     }
//         // setFoodDataLocal({
//         //     fdcId: data.fdcId,
//         //     description: data.description,
//         //     foodCategory: data.foodCategory.description,
//         //     itemType: data.foodPortions[0].modifier,
//         //     weightPerItem: data.foodPortions[0].gramWeight,
//         //     nutrients: {
//         //         calories: data.foodNutrients[2].amount,
//         //         protein: data.foodNutrients[4].amount,
//         //         fat: data.foodNutrients[5].amount,
//         //         carbohydrates: data.foodNutrients[8].amount,
//         //     }
//         // });

//     return(
//         <div className="food-page">
//             <div id="Header" className='container-fluid'>
//                 <h1>Nutrition is the most important part</h1>
//                 <p>Get your meal plan and reach your goals</p>
//                 <img className='parallax-bg' src={Background} alt="Background" />
//             </div>
//             <div className='content'>
//                 <h2 className='welcome-nutrition'>Enjoy Your Meals</h2>
//                 <div id="food-searcher-container" className='container-fluid food-searcher-container'>
//                     <div className="food-searcher">
//                         <input type="text" placeholder="Search for a food" id="food-search-input"/>
//                         <button onClick={searchFood}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
//                     </div>
//                     {console.log("foodIds:",foodIds)}
//                     {foodIds.map((foodId) => {processId(foodId);return <FoodCard key={foodId} foodData={foodDataLocal} />})}
//                 </div>
//                 <div id="meal-plan-maker-container" className="container-fluid meal-plan-content">
//                     <div className="meal-plan-maker" id="meal-plan-maker">
//                         <h2>Meal Plan Maker</h2>
//                             <NutritionTable />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



// const foodDataLocal = {
//     fdcId:'',
//     description:'',
//     foodCategory:'',
//     typeOfUnit:'',
//     weightPerUnit:'',
//     nutrients: {
//         calories:'',
//         protein:'',
//         fat:'',
//         carbs:'',
//     }
// };


// function Food() {
//     return (
//         <div className="food-page">
//             <div id="Header" className='container-fluid'>
//                 <h1>Nutrition is the most important part</h1>
//                 <p>Get your meal plan and reach your goals</p>
//                 <img className='parallax-bg' src={Background} alt="Background" />
//             </div>
//             <div className='content'>
//                 <h2 className='welcome-nutrition'>Enjoy Your Meals</h2>
//                 <div id="food-searcher-container" className='container-fluid food-searcher-container'>
//                     <div className="food-searcher">
//                         <input type="text" placeholder="Search for a food" id="food-search-input"/>
//                         <button onClick={searchFood}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
//                     </div>
//                 </div>
//                 <div id="meal-plan-maker-container" className="container-fluid meal-plan-content">
//                     <div className="meal-plan-maker" id="meal-plan-maker">
//                         <h2>Meal Plan Maker</h2>
//                             <NutritionTable />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// async function searchFood() {
//     console.log('searching');
//     if(document.getElementById('food-card-container')) document.getElementById('food-card-container').remove();
//     let food = document.getElementById('food-search-input').value;
//     food = food.replace(' ', '%20');
//     const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=L0yOlAsUuTJuZCDIxfW8dFL55AGRxSnpVhttLJ2h&query=${food}&dataType=SR%20Legacy&pageSize=50&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc`);
//     const data = await response.json();
//     processFoodData(data);
// }

// async function processFoodData(data) {
//     console.log(data);
//     const foodCardContainer = document.createElement('div');
//     foodCardContainer.className = 'food-card-container';
//     foodCardContainer.id = 'food-card-container';
//     document.getElementById('food-searcher-container').appendChild(foodCardContainer);
//     for(let i = 0; i < 3; i++) {
//         const food = data.foods[i]
//         const foodId = food.fdcId;
//         const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=L0yOlAsUuTJuZCDIxfW8dFL55AGRxSnpVhttLJ2h`);
//         const foodData = await response.json();
//         console.log(foodData);
//         createFoodCard(foodData);
//     }
// }

// async function processFoodData(data) {

// }

// function createFoodCard(foodData) {
//     let measureUnit;
//     if(foodData.foodPortions[0].measureUnit.name === "undetermined") {
//         measureUnit = "item";
//     }
//     else {
//         measureUnit = foodData.foodPortions[0].measureUnit.name;
//     }
//     const foodCard = document.createElement('div');
//     foodCard.className = 'food-card';
//     foodCard.id = foodData.fdcId;
//     foodCard.innerHTML = `
//     <div class="food-card-header">
//         <h3>${foodData.description}</h3>
//         <p>Category: ${foodData.foodCategory.description}</p>
//         <p>Weight per ${measureUnit}: ${foodData.foodPortions[0].gramWeight}g</p>
//     </div>
//     <div class="food-card-body">
//         <div className="per-100">
//             <p></p><p>Per 100g</p>
//         </div>
//         <div class="food-card-nutrients">
//             <p>Calories:</p> <p>${foodData.foodNutrients[2].amount}KCal</p>
//         </div>
//         <div class="food-card-nutrients">
//             <p>Protein:</p> <p>${foodData.foodNutrients[4].amount}g</p>
//         </div>
//         <div class="food-card-nutrients">
//             <p>Fat:</p> <p>${foodData.foodNutrients[5].amount}g</p>
//         </div>
//         <div class="food-card-nutrients">
//             <p>Carbs:</p> <p>${foodData.foodNutrients[8].amount}g</p>
//         </div>
//     </div>
//     `;
//     // foodCard.onclick = addFoodInput;
//     document.getElementById('food-card-container').appendChild(foodCard);
// }







export default Food;