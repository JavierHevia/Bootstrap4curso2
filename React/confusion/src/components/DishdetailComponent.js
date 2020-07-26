import React, { useState } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader,
    ModalBody, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

//render() {
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


function RenderDish({ dish }) {
    console.log('Dishdetail Component render is invoked')
    if (dish !== undefined) {
        //console.log(dish)
        //console.log(dish.dish.id)
        return (
            <div className="col-12 col-md-5 m-1">
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    }
    return (
        <div></div>
    )
}

function handleSubmit(dishId, values, postComment) {
    console.log('Current State is: ' + JSON.stringify(values));
    //alert('Current State is: ' + JSON.stringify(values));
    //alert('id ' + dishId)

    postComment(dishId, values.select, values.yourname, values.message);
}


function CommentForm({ dishId, postComment }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow} className="btn btn-outline-dark">
                <span className="fa fa-edit fa-lg"></span> Submit Comment
            </Button>
            <Modal isOpen={show} toggle={handleClose}>
                <ModalHeader toggle={handleClose}> Summit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleSubmit(dishId, values, postComment)}>

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

                        <Button type="submit" color="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </>
    );
}




function RenderComments({ comment, postComment, dishId }) {

    if (comment != null) {
        return (
            <div className="col-12 col-md-5 m-1" >
                <Card >
                    <h4>Comments</h4>
                    <CardBody>
                        <ul className="list-unstyled">
                            <Stagger in>
                                {comment.map((comment) => {
                                    return (
                                        <Fade in>
                                            <li key={comment.id}>
                                                <p>{comment.comment}</p>
                                                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))} </p>
                                            </li>
                                        </Fade>
                                    );
                                })}
                            </Stagger>
                        </ul>

                        <CommentForm dishId={dishId} postComment={postComment} />

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

    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {
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
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}


export default DishDetail;