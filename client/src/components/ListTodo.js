import React, { Component } from 'react';
import Modal from './Modal';
import axios from 'axios';

class ListTodo extends Component {

  state =
    {
      flag: false,
      id_edit: ''
    }

  triggerModal = () => {
    this.setState({
      flag: !this.state.flag
    });
  };

  editTodo = (todo) => 
  {
	const update={ id: this.state.id_edit, action: todo};
	if(update.action && update.action.length> 0)
	{
		axios.put('/api/todos', update)
        .then(res => {
          if(res.data){
            this.props.getTodos();
            this.setState({id_edit: ""})
          }
        })
        .catch(err => console.log(err))
    }else {
      console.log('input field required')
    }
	return null;
  };

  render() {
    return (
      <div className="todoList">
        <ul>
          {
            this.props.todos &&
              this.props.todos.length > 0 ?
              (
                this.props.todos.map(todo => {
                  return (
                    <li key={todo._id} >
                      <p>{todo.action}</p>
                      <footer className="edit_buttons">
                        <button id="edit_button" onClick={(e) => {
						  e.preventDefault();
                          this.setState({
                            id_edit: todo._id
                          }); 
						  this.triggerModal();
                        }} >Edit</button>
                        <button id="edit_button" onClick={() => this.props.deleteTodo(todo._id)} >Delete</button>
                      </footer>
                    </li>
                  )
                })
              )
              :
              (
                <li>No todo(s) left</li>
              )
          }
        </ul>
        <Modal triggerFlag={this.state.flag} onUpdate={this.editTodo} onClose={this.triggerModal} />
      </div>
    )
  }
}

export default ListTodo