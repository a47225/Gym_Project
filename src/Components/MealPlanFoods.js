import React from "react";

class MealPlanFoods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foodIds: this.props.foodIds,
            foodData: [],
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.foodData !== prevProps.foodData) {
            this.setState({foodData: this.props.foodData});
        }
    }


    render() {
        return(
            <div className="meal-plan-foods">
                <h3>{this.state.foodData.description}</h3>
                <p>{this.state.foodData.foodCategory}</p>
                <p>Weight per {this.state.foodData.itemType}: {this.state.foodData.weightPerItem}g</p>
                <div className="food-card-nutrients">
                    <p>Calories:</p> <p>{this.state.foodData.nutrients.calories}KCal</p>
                </div>
                <div className="food-card-nutrients">
                    <p>Protein:</p> <p>{this.state.foodData.nutrients.protein}g</p>
                </div>
                <div className="food-card-nutrients">
                    <p>Fat:</p> <p>{this.state.foodData.nutrients.fat}g</p>
                </div>
                <div className="food-card-nutrients">
                    <p>Carbs:</p> <p>{this.state.foodData.nutrients.carbohydrates}g</p>
                </div>
            </div>
        );
    }
}


export default MealPlanFoods;