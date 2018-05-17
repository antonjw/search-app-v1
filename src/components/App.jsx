import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';

class App extends Component{
    constructor(){
        super();
        this.state = {contacts : []}
    };

componentDidMount(){
    fetch('../app/contacts.json').then((response) => response.json())
                            .then((responseData) => {
                                this.setState({
                                    contacts: responseData
                                })

                            })
                            .catch((error) =>{
                                console.log("Error Fetching and Parsing data", error);
                            })
                        }
                        render(){
                            return(
                                <ContactsApp contacts = {this.state.contacts}/>
                            )
                        }
}
class ContactsApp extends Component{
    constructor(){
        super();
        this.state = {
            filterText : ''
    }
}
handleUserInput(searchTerm){
    this.setState({
        filterText:searchTerm
    })
}
    render(){
        return(
            <div>
                <SearchBar filterText={this.state.filterText}
                            onUserInput={this.handleUserInput.bind(this)}/>
                <ContactList contacts = {this.props.contacts} 
                             filterText={this.state.filterText}/>
            </div>
        )
    }
}
App.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object)
}
class SearchBar extends Component{
    handleChange(event){
        this.props.onUserInput(event.target.value)
    }
    render(){
        return(
            <input class="form-control" type="search" placeholder="search" 
            value = {this.props.filterText}
            onChange={this.handleChange.bind(this)}/>
        )
    }
}
SearchBar.propTypes= {filterText : PropTypes.string.isRequired,
                        onUserInput: PropTypes.func.isRequired}
class ContactList extends Component {
    render(){
        let filterContacts = this.props.contacts.filter((contact)=>contact.name.indexOf(this.props.filterText) !==-1);
        return(
            <ul>
                {filterContacts.map((contact)=><ContactItem 
                                                        key={contact.email}
                                                        name={contact.name}
                                                        email={contact.email}/>
            )}  
            </ul>
        )
    }
}
ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object)
}
class ContactItem extends Component {
    render(){
        return(
            <li>{this.props.name} - {this.props.email}</li>
        )
    }
}
ContactItem.propTypes = {
    name : PropTypes.string.isRequired,
    email: PropTypes.string.isRequired 
}
// let contacts = [
//     {name: "Cassio Zen", email: "cassiozen@gmail.com"},
//     {name: "Kostocov", email: "kostocov@gmail.com"},
//     {name: "Robert Luiui", email: "Luiui@gmail.com"},
//     {name: "Belan Stevkov", email: "bstevkov@gmail.com"},
//     {name: "Aruam porkji", email: "arumpo@gmail.com"},
//     {name: "Arn Pol", email: "arun@gmail.com"}
    
// ]
render(<App />, document.getElementById('root'));