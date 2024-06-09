import React from "react";

class FoodInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foodData: this.props.foodData,
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.foodData !== prevProps.foodData) {
            this.setState({foodData: this.props.foodData});
        }
    }

    render() {
        return(
            <div className="food-info">
                <div className="food-info-firstline">
                    <h3>{this.state.foodData.description}</h3>
                    <p>{this.state.foodData.nutrients.calories}KCal</p>
                </div>
                <div className="food-info-secondline">
                    <p>{this.state.foodData.foodCategory}</p>
                    <div className="food-info-nutrients">
                        <p>Protein:</p> <p>{this.state.foodData.nutrients.protein}g</p>
                        <p>Carbs:</p> <p>{this.state.foodData.nutrients.carbohydrates}g</p>
                        <p>Fat:</p> <p>{this.state.foodData.nutrients.fat}g</p>
                    </div>
                </div>
                <div className="food-info-add">
                    <button id={this.state.foodData.fdcId} onClick={this.props.addFoodId}>Add</button>
                </div>
            </div>
        );
    }
}

export default FoodInfo;