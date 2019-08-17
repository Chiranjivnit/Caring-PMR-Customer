import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route } from "react-router-dom";
import Home from "../src/containers/Home";
import History from "../src/containers/ViewHistory";
import MoreRemainders from './components/moreRemainders/moreRemainders';
import PharmacyTest from '../src/components/pharmacy/pharmacy';
import MedicationCard from './components/medicationCard/medicationCard';
import AllergyCard from './components/allergyCard/allergyCard';

class App extends Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path = "/" component = {Home}/>
					<Route exact path = "/history" component = {History}/>
                    <Route exact path = "/allRemainders" component = {MoreRemainders}/>
					<Route exact path = "/pharmacy" component={PharmacyTest}/>
					<Route exact path="/medicaionCards" component={MedicationCard} />
					<Route exact path="/allergyCard" component={AllergyCard}/>
				</div>
			</HashRouter>
		);
	}
}

export default App;
