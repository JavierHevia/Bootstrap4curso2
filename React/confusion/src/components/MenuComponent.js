import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
//import DishDetail from './DishdetailComponent';

//class Menu extends Component {
// constructor(props) {
//   super(props);
//   this.state = {
//     selectedDish: null
//   };
//   console.log('Menu Component Constructor is invoked')
// }

// componentDidMount(){
//   console.log('Menu Component componentDidMount is invoked')
// }

// onDishSelect(dish) {
//   this.setState({ selectedDish: dish });
//   //console.log(dish)
// }

// renderDish(dish) {
//   if (dish != null)
//     return (
//       // <Card>
//       //   <CardImg top src={dish.image} alt={dish.name} />
//       //   <CardBody>
//       //     <CardTitle>{dish.name}</CardTitle>
//       //     <CardText>{dish.description}</CardText>
//       //   </CardBody>
//       // </Card>

//       // <DishDetail selectedDish={this.state.selectedDish} />
//     );
//   else
//     return (
//       <div></div>
//     );
// }

// render() {

function RenderMenuItem({ dish, onClick }) {
  return (
    <Card key={dish.id}
      onClick={() => onClick(dish.id)}>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardImgOverlay>
        <CardTitle>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}

const Menu = (props) => {

  const menu = props.dishes.map((dish) => {
    return (
      <div className="col-12 col-md-5 m-1" key={dish.id}>
        <RenderMenuItem dish={dish} onClick={props.onClick} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        {menu}
      </div>
    </div>
  );
}

// const menu = this.props.dishes.map((dish) => {
//   return (
//     <div className="col-12 col-md-5 m-1" key={dish.id}>
//       <Card key={dish.id}
//         // onClick={() => this.onDishSelect(dish)}>
//          onClick={() => this.props.onClick(dish.id)}>
//         <CardImg width="100%" src={dish.image} alt={dish.name} />
//         <CardImgOverlay>
//           <CardTitle>{dish.name}</CardTitle>
//         </CardImgOverlay>
//       </Card>
//     </div>
//   );
// });

// console.log('Menu Component render is invoked')

// return (
//   <div className="container" >
//     <div className="row">
//       {menu}
//     </div>
//     <div className="row">      
//         {/* {this.renderDish(this.state.selectedDish)}*/}
//     </div>
//   </div>
// );
//}
//}

export default Menu;