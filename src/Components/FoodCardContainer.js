import React from 'react';
import FoodCard from './FoodCard.js';

class FoodCardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foodIds: this.props.foodIds,
            finished: [],
            foodDataLocal:{
                fdcId:'',
                description:'',
                foodCategory:'',
                itemType:'',
                weightPerItem:'',
                nutrients:{
                    calories:'',
                    protein:'',
                    fat:'',
                    carbohydrates:'',
                }
            }
        }
        this.processFoodData = this.processFoodData.bind(this);
        this.getFoodData = this.getFoodData.bind(this);
    }

    componentDidMount() {
        this.getFoodData();
    }

    async getFoodData() {
        this.setState({
            foodIds: this.props.foodIds,
            finished: [],
            foodDataLocal:{
                fdcId:'',
                description:'',
                foodCategory:'',
                itemType:'',
                weightPerItem:'',
                nutrients:{
                    calories:'',
                    protein:'',
                    fat:'',
                    carbohydrates:'',
                }
            }
        });
        for(let i = 0; i < this.state.foodIds.length; i++) {
            const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${this.state.foodIds[i]}?api_key=L0yOlAsUuTJuZCDIxfW8dFL55AGRxSnpVhttLJ2h`);
            const data = await response.json();
            this.processFoodData(data);
        }
    }

    processFoodData(data) {
        console.log(data);
        if(this.state.finished.includes(data.fdcId)) {
            return;
        }
        this.setState({foodDataLocal: {
            fdcId: data.fdcId,
            description: data.description,
            foodCategory: data.foodCategory.description,
            itemType: data.foodPortions !== undefined? data.foodPortions[0].modifier : data.itemType !== undefined? data.itemType : "",
            weightPerItem: data.foodPortions !==undefined? data.foodPortions[0].gramWeight : data.weightPerItem !== undefined? data.weightPerItem : "",
            nutrients: {
                calories: data.foodNutrients[2].amount,
                protein: data.foodNutrients[4].amount,
                fat: data.foodNutrients[5].amount,
                carbohydrates: data.foodNutrients[8].amount,
            }
        },
        finished: [...this.state.finished, data.fdcId]
    });
    }

    render() {
        return(
            <div id="food-card-container" className="container-fluid food-card-container">
                {this.state.finished.map((foodId) => <FoodCard key={foodId} foodData={this.state.foodDataLocal} />)}
            </div>
        );
    }
}

export default FoodCardContainer;