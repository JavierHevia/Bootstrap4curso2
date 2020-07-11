import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


//class DishDetail extends Component {
// constructor(props) {
//     super(props);
//     this.state = {

//     };
// }

// componentDidMount(){
//     console.log('Dishdetail Component componentDidMount is invoked')
// }

// componentDidUpdate(){
//     console.log('Dishdetail Component componentDidUpdate is invoked')
// }

//render() {
function RenderDish({ dish }) {
    console.log('Dishdetail Component render is invoked')
    if (dish.dish !== undefined) {
        //console.log(dish)
        //console.log(dish.dish.id)
        return (
            <>
                <div className="row" key={dish.dish.id}>
                    <div className="col-12 col-md-5 m-1">
                        <Card >
                            <CardImg top src={dish.dish.image} alt={dish.dish.name} />
                            <CardBody>
                                <CardTitle>{dish.dish.name}</CardTitle>
                                <CardText>{dish.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="col-12 col-md-5 m-1" >
                        <Card>
                            <CardBody>
                                <CardTitle>Comment</CardTitle>
                                {dish.dish.comments.map((object) =>
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
            </>
        );
    }
    return (
        <div></div>
    )
}

const DishDetail = (props) => {
    return (
        <div className="container">
            <RenderDish dish={props} />
        </div>
    )

    return (
        { DishDetail }
    )
}


//}
// console.log(this.props.selectedDish);

//}

export default DishDetail;