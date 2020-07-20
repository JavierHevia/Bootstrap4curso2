import React, { useState } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader,
    ModalBody, Input, Label, Form, FormGroup, Col, Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


//render() {
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

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

function handleSubmit(dishId,values,addComment) {
    console.log('Current State is: ' + JSON.stringify(values));
    //alert('Current State is: ' + JSON.stringify(values));
    //alert('id ' + dishId)
   
    addComment(dishId, values.select, values.yourname, values.message);
}


function CommentForm({dishId, addComment}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <>
            <Button onClick={handleShow} className="btn btn-outline-dark">
                <span className="fa fa-edit fa-lg"></span> Submit Comment
            </Button>


            <Modal isOpen={show} toggle={handleClose}>
                <ModalHeader toggle={handleClose}> Summit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleSubmit(dishId,values,addComment)}>
 
                        <Label for="rating">Rating</Label>
                        <Control.select model=".select" name="select" className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                        <Errors
                            className="text-danger"
                            model=".rating"
                            show="touched"
                        />
                        <Label for="yourname">Your Name</Label>
                        <Control.text model=".yourname" id="yourname" name="yourname"
                            placeholder="Your Name"
                            className="form-control"
                            validators={{
                                required, minLength: minLength(3), maxLength: maxLength(15)
                            }}
                        />
                        <Errors
                            className="text-danger"
                            model=".yourname"
                            show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 15 characters or less'
                            }}
                        />

                        <Label for="yourcomment">Comment</Label>
                        <Control.textarea model=".message" id="message" name="message"
                            rows="8"
                            className="form-control" />


                        <Button type="submit" color="primary">
                            Submit
                                    </Button>
                    </LocalForm>
                </ModalBody>
            </Modal>

        </>
    );
}




function RenderComments({ comment, addComment, dishId }) {

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
                        
                        <CommentForm dishId={dishId} addComment={addComment} />

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
                <RenderComments comment={props.comments}
                                addComment={props.addComment}
                                dishId={props.dish.id}

                />
            </div>
        </div>
    )

    return (
        { DishDetail }
    )
}


export default DishDetail;