import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, CardGroup } from 'reactstrap';


class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <div className="col-12 col-sm-5 m-1">
                    <Card>
                        <CardImg top src={this.props.selectedDish.image} alt={this.props.selectedDish.name} />
                        <CardBody>
                            <CardTitle>{this.props.selectedDish.name}</CardTitle>
                            <CardText>{this.props.selectedDish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-12 col-sm-5 m-1">
                    <Card>
                        <CardBody>
                            <CardTitle>Comment</CardTitle>
                            {this.props.selectedDish.comments.map((object) => 
                            <>
                                <CardText>{object.comment} </CardText>
                                <CardText>--{object.author}  {object.date} </CardText>
                            </>                           
                            )}  
                        </CardBody>
                    </Card>
                </div>
            </>
        );
        // console.log(this.props.selectedDish);
    }
}

export default DishDetail;