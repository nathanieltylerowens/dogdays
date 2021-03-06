import React from 'react';
import Datepicker from 'react-datepicker';
import _ from 'underscore';

import {
  Button,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';

import groomingData from '../../../helpers/data/groomingData';
import './NewGrooming.scss';
// import dogsData from '../../../helpers/data/dogsData';

class NewGrooming extends React.Component {
  state = {
    dogId: '',
    nailDate: new Date(),
    brushDate: new Date(),
    bathDate: new Date(),
  }

  changeNailDateEvent = (nailDate) => {
    this.setState({ nailDate });
  };

  changeBrushDateEvent = (brushDate) => {
    this.setState({ brushDate });
  };

  keepDogIdEvent = (e) => {
    e.preventDefault();
    this.setState({ dogId: this.props.math.params });
  };

  changeBathDateEvent = (bathDate) => {
    this.setState({ bathDate });
  };

  saveGroomingEvent = (e) => {
    e.preventDefault();
    const { dogId } = this.props.match.params;
    const keysIWant = [
      'nailDate',
      'brushDate',
      'bathDate',
      'dogId',
    ];
    const newGrooming = _.pick(this.state, keysIWant);
    newGrooming.dogId = dogId;
    groomingData
      .createGrooming(newGrooming)
      .then((res) => {
        // console.log(NewGrooming.dogId);
        this.props.history.push(`/dogs/${dogId}`);
      })
      .catch((err) => console.error('create food done broke', err));
  };

  render() {
    const {
      nailDate,
      brushDate,
      bathDate,
    } = this.state;

    return (
      <div className="NewGrooming">
        <h1>Grooming</h1>
        <Form>
        <FormGroup>
            <Label className="datePadding" htmlFor="brushDate">Last Brushed:</Label>
            <Datepicker
            selected={brushDate}
            onChange={this.changeBrushDateEvent}
            />
          </FormGroup>
          <FormGroup>
            <Label className="datePadding" htmlFor="bathDate">Last Bathed:</Label>
            <Datepicker
            selected={bathDate}
            onChange={this.changeBathDateEvent}
            />
          </FormGroup>
          <FormGroup>
            <Label className="datePadding" htmlFor="nailDate">Nails Clipped:</Label>
            <Datepicker
            selected={nailDate}
            onChange={this.changeNailDateEvent}
            />
          </FormGroup>
          <Button className="saveGrooming" onClick={this.saveGroomingEvent}><i className="fas fa-soap"></i></Button>
        </Form>
      </div>
    );
  }
}

export default NewGrooming;
