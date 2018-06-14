import asana                  from 'asana';
import _                      from 'lodash';
import { API_TOKEN }          from '../../../../../api_token';
import { PROJECT_ID }         from '../../../../../api_token';
import React, { Component }   from 'react';


const client  = asana.Client.create().useAccessToken(API_TOKEN);

export default class Tasks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: {},
			detail: '',
		};

		let self = this;
		client.tasks.findAll({project: PROJECT_ID})
		.then(function(tasks) {
			self.setState({tasks: tasks.data})
			return tasks.data;
		});
	}
	
	renderDetail(id){
		let self = this;
		client.tasks.findById(id)
		.then(function(task) {
			self.setState({
				detail: task,
			})
		});
	}

	removeTask(taskId){
		const newTaskList = this.state.tasks.filter(task=>{
			return task.id !== taskId;
		});
		this.setState({
			tasks: [...newTaskList],
			detail:'',
		})
	}

	renderList() {
		return _.map(this.state.tasks, task =>{
			return (
				<li 
					key={task.id}
					className="sidebar__task-item"
				>
					<div
						className="sidebar__remove"
						onClick={()=>{this.removeTask(task.id)}}
					>
						<div className="sidebar__check_container">
							<div className="sidebar__check sidebar__check-left"></div>
							<div className="sidebar__check sidebar__check-right"></div>
						</div>
					</div>
					<span
						className="sidebar__task-name"
						onClick={()=>{this.renderDetail(task.id)}}
					>
					{task.name} 
					</span>
				</li>
			);
		});
	}

	render() {
		return (
			<div className="row row--equal-height-at-large">
				<div className="row__medium-4  "> 
					<div className="sidebar">
					<ul className="sidebar__task-list">
						{ this.renderList() }
					</ul>
					</div>
				</div>
				
				{
					this.state.detail !== '' && 
					<div className="row__medium-6 task-detail__pull-right ">
						<div className="task-detail">
							<h1>{this.state.detail.name}</h1>
							{this.state.detail.notes}
							<div className="task-detail__link">
								<a target="blank" href={`https://app.asana.com/0/${PROJECT_ID}/${this.state.detail.id}`}>View on Asana</a>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}