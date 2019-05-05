import React, {Component} from 'react';

class Modal extends Component
{
	state=
	{
		modalTodo: ''
	}
	
	
	handleChange = (e) => {
		e.preventDefault();
		this.setState({
			modalTodo: e.target.value
		});
  }
	
	render()
	{
		if(!this.props.triggerFlag){ return null; }
		return ( <div className="backdrop" >
					<div className="modal">
						<h2>Input new todo message:</h2>
						<input type="text"  onChange={this.handleChange} value={this.state.modalTodo} autofocus/>
						<div className="footer">
							<button onClick={(e)=>{ e.preventDefault(); this.props.onUpdate(this.state.modalTodo); this.setState({modalTodo: ''});}}>Save</button>
							<button onClick={()=> {this.setState({modalTodo: ''}); this.props.onClose();}} >
							 Close
							</button>
						</div>
					</div>
				</div>
		);
		
		
	}
}

export default Modal