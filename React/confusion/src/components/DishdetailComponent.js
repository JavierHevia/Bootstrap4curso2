import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        //  console.log(this.props.dish.id)
        if (this.props.dish != undefined) {
            return (
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-5 m-1">
                                <Card>
                                    <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                                    <CardBody>
                                        <CardTitle>{this.props.dish.name}</CardTitle>
                                        <CardText>{this.props.dish.description}</CardText>
                                    </CardBody>
                                </Card>
                            </div>

                            <div className="col-12 col-md-5 m-1">
                                <Card>
                                    <CardBody>
                                        <CardTitle>Comment</CardTitle>
                                        {this.props.dish.comments.map((object) =>
                                            <>
                                                <CardText>{object.comment} </CardText>
                                                {/* <CardText>--{object.author}  {object.date} </CardText> */}
                                                <CardText>--{object.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(object.date)))}  </CardText>   
                                            </>
                                        )}
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                </>

            );
        }
        return (
            <div></div>
        )


    }
    // console.log(this.props.selectedDish);

}

export default DishDetail;