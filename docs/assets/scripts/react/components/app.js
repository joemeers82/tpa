import React, { Component } from 'react';
import ProjectInfo          from './project-detail';
import Tasks                from './tasks';



export default class App extends Component {

  render() {
    return (
    	<div>	
    		<ProjectInfo />
    		<div className="wrapper">
    		  <Tasks />
            </div>
    		
    		
		</div>
    );
  }
}
