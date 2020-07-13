import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

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
    if (dish !== undefined) {
        //console.log(dish)
        //console.log(dish.dish.id)
        return (
                <div className="col-12 col-md-5 m-1">
                    <Card >
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
        );
    }
    return (
        <div></div>
    )
}

function RenderComments({ comment }) {
    if (comment != null) {
        return (
            <div className="col-12 col-md-5 m-1" >
                 <Card >
                <h4>Comments</h4>
                <CardBody>
                <ul className="list-unstyled">
                    {comment.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))} </p>
                            </li>
                        );
                    })}
                </ul>
                </CardBody>
                </Card>
            </div>
            
        )
    }
    return (
        <div></div>
    )
}

const DishDetail = (props) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">     
                    <RenderDish dish={props.dish} />
                    <RenderComments comment={props.comments} />
              
            </div>
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