import asana                  from 'asana';
import _                      from 'lodash';
import React, { Component }   from 'react'; 
import { API_TOKEN }          from '../../../../../api_token';
import { PROJECT_ID }         from '../../../../../api_token';


export default class ProjectInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: ''
		};
		
		let self = this;
		const client  = asana.Client.create().useAccessToken(API_TOKEN);
		
		client.projects.findById(PROJECT_ID)
		.then(function(project) {
			self.setState({project: project});
		});
	}

	render() {
		return (
			<div className="site-header row">
				<div className="site-header__logo row__medium-4">
					<img src="assets/images/Logo-Horizontal-Color.png"/>
				</div>
				
				<div className="site-header__project-info row__medium-8 ">
					<h1 className="site-header__headline-tag">{ this.state.project.name } </h1>
					<span>{this.state.project.notes}</span>
				</div>
			</div>
		);
	}
};
