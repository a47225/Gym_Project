import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MealPlanFoods from './MealPlanFoods.js';
import FoodCard from "./FoodCard.js";



class NutritionTableBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mealType: this.props.mealType,
            index: this.props.index,
            foodIds: [],
            foodCards: [],
        }
        this.addAdder = this.addAdder.bind(this);
        this.addFood = this.addFood.bind(this);
        this.selectOneFood = this.selectOneFood.bind(this);
        this.addFoodId = this.addFoodId.bind(this);
    }


    addAdder(e) {
        this.setState({foodIds: []});
        this.setState({foodCards: []});
        console.log(this.state);
        let parentElement = e.target.parentElement.parentElement;
        console.log(e.target.tagName);
        if(e.target.nodeName ==="path") {
            parentElement = e.target.parentElement.parentElement.parentElement.parentElement;
        }
        if(e.target.nodeName === 'svg') {
            parentElement = e.target.parentElement.parentElement.parentElement;
        }
        console.log(parentElement);
        const foodInputWrapper = document.createElement('div');
        foodInputWrapper.id = 'food-input-wrapper';
        foodInputWrapper.className = 'food-input-wrapper';
        foodInputWrapper.innerHTML = `
            <div class="food-input-radio">
                <input type="radio" name="search-type" value="food-name" id="input-search-by-name"checked/>
                <label for="food-name">Food Name</label>
                <input type="radio" name="search-type" value="food-id" id="input-search-by-id"/>
                <label for="food-id">Food Id</label>
            </div>
            <input type="text" placeholder="Write here..." id="food-id-input"/>
        `;
        parentElement.appendChild(foodInputWrapper);
        const foodInputWrapperTemp = document.getElementById('food-input-wrapper');
        const addFoodButton = document.createElement('button');
        addFoodButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
        addFoodButton.onclick = this.addFood;
        foodInputWrapperTemp.appendChild(addFoodButton);
    }

    addFood() {
        console.log("Adding food");
        if(document.getElementById('input-search-by-id').checked) {
            const foodId = document.getElementById('food-id-input').value;
            if(foodId === '') return;
            const newFoodIds = [...this.state.foodIds, foodId];
            this.setState({foodIds: newFoodIds});
            const foodInputWrapper = document.getElementById('food-input-wrapper');
            foodInputWrapper.remove();
        }
        else{
            const foodName = document.getElementById('food-id-input').value;
            if(foodName === '') return;
            this.getThreeFoods(foodName);
        }
    }

    async getThreeFoods(foodName) {
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=L0yOlAsUuTJuZCDIxfW8dFL55AGRxSnpVhttLJ2h&query=${foodName}&dataType=SR%20Legacy&pageSize=50&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc`);
        const data = await response.json();
        console.log(data);
        for(let i = 0; i < 3; i++) {
            this.getFoodData(data.foods[i]);
        }
    }

    async getFoodData(data) {
        console.log(data);
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${data.fdcId}?api_key=L0yOlAsUuTJuZCDIxfW8dFL55AGRxSnpVhttLJ2h`);
        const foodData = await response.json();
        this.selectOneFood(foodData);
    }

    selectOneFood(data) {
        const foodData = {
            fdcId: data.fdcId,
            description: data.description,
            foodCategory: data.foodCategory.description,
            itemType: data.foodPortions[0].modifier,
            weightPerItem: data.foodPortions[0].gramWeight,
            nutrients: {
                calories: data.foodNutrients[2].amount,
                protein: data.foodNutrients[4].amount,
                fat: data.foodNutrients[5].amount,
                carbohydrates: data.foodNutrients[8].amount,
            }
        }
        const foodCard = React.createElement(FoodCard, {foodData: foodData});
        this.setState({foodCards: [...this.state.foodCards, foodCard]});
        if(document.getElementById('food-input-wrapper')) {
            const foodInputWrapper = document.getElementById('food-input-wrapper');
            foodInputWrapper.remove();
        }
    }

    // selectOneFood(data) {
    //     const foodData = {
    //         fdcId: data.fdcId,
    //         description: data.description,
    //         foodCategory: data.foodCategory.description,
    //         itemType: data.foodPortions[0].modifier,
    //         weightPerItem: data.foodPortions[0].gramWeight,
    //         nutrients: {
    //             calories: data.foodNutrients[2].amount,
    //             protein: data.foodNutrients[4].amount,
    //             fat: data.foodNutrients[5].amount,
    //             carbohydrates: data.foodNutrients[8].amount,
    //         }
    //     }
    //     const foodCard = document.createElement('div');
    //     foodCard.className = 'food-card';
    //     foodCard.id = foodData.fdcId;
    //     const foodCardHeader = document.createElement('div');
    //     foodCardHeader.className = 'food-card-header';
    //     foodCardHeader.innerHTML = `
    //         <h3>${foodData.description}</h3>
    //         <p>${foodData.foodCategory}</p>
    //         <p>Weight per ${foodData.itemType}: ${foodData.weightPerItem}g</p>
    //     `;
    //     foodCard.appendChild(foodCardHeader);
    //     const foodCardBody = document.createElement('div');
    //     foodCardBody.className = 'food-card-body';
    //     foodCardBody.innerHTML = `
    //         <div class="per-100">
    //             <p></p><p>Per 100g</p>
    //         </div>
    //         <div class="food-card-nutrients">
    //             <p>Calories:</p> <p>${foodData.nutrients.calories}KCal</p>
    //         </div>
    //         <div class="food-card-nutrients">
    //             <p>Protein:</p> <p>${foodData.nutrients.protein}g</p>
    //         </div>
    //         <div class="food-card-nutrients">
    //             <p>Fat:</p> <p>${foodData.nutrients.fat}g</p>
    //         </div>
    //         <div class="food-card-nutrients">
    //             <p>Carbs:</p> <p>${foodData.nutrients.carbohydrates}g</p>
    //         </div>
    //     `;
    //     foodCard.appendChild(foodCardBody);
    //     const parentElement = document.getElementById('table-wrapper');
    //     parentElement.appendChild(foodCard);
    // }

    addFoodId(e) {
        console.log(e.target);
        const foodId = e.target.id;
        console.log(this.state.foodIds);
        const newFoodIds = [...this.state.foodIds, foodId];
        this.setState({foodIds: newFoodIds});
    }

    render() {
        return (
            <div className="nutrition-table-container" id={this.state.mealType}>
                <div className="nutrition-table-banner">
                    <h2>{this.state.mealType}</h2>
                    <button onClick={this.addAdder}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <div className="nutrition-table-content" id="nutrition-table-content">
                    {this.state.foodIds>0?<MealPlanFoods foodIds={this.state.foodIds} />:null}
                </div>
                <div className="food-cards">
                    {this.state.foodCards.map((foodCard) => foodCard)}
                </div>
            </div>
        )
    }
}

export default NutritionTableBanner;