class ContactsViewer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const rows= this.props.contacts.map((contact,id) => {
            return (
                <tr key={id}>
                    <td>{contact.name}</td>
                    <td>{contact.phone}</td>
                    <td><button className="delete" data-index={id} onClick={this.deleteContact}>Delete</button></td>
                </tr>
            )
        })
        
        if(this.props.contacts.length==0)
        {
            return (
                <div>
                    <h1>Phone Directory</h1>
                    <button className="add" onClick={this.props.switchMode}>ADD</button>
                    <hr/>
                    <p>Your Contact List is empty</p>
                </div>
            )
        }
        else{
            return (
                <div>
                    <h1>Phone Directory</h1>
                    <button className="add" onClick={this.props.switchMode}>ADD</button>
                    <hr/>
                    <table className="contact-table">
                        <thead>
                        <tr>
                            <th> Name </th>
                            <th> Contact No </th>
                            <th>  </th>
                        </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    deleteContact = (event) => {
        this.props.deleteContact(event.target.dataset.index);
    }
}

class ContactsAdder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            phone:""
        }
    }
    render(){
        return(
            <div>
                 <h1>Add Subscriber</h1>
                <table className="input-table">
                    <tr><button className="back" onClick={this.props.switchMode}>BACK</button></tr>
                    <tr>Name</tr>
                    <tr><input onChange={this.handleChange} name="name" placeholder="John Doe" value={this.state.name}/></tr>
                    <tr>Phone</tr>
                    <tr><input onChange={this.handleChange} name="phone" placeholder={"8".repeat(10)} value={this.state.phone}/></tr>
                        <p className="subHeader">Subscriber to be added:</p>
                        <p className="disp">Name:{this.state.name}</p>
                        <p className="disp">Phone:{this.state.phone}</p>
                    <button className="add" onClick={this.addContact}>ADD</button>
                </table>
                <hr/>
                
            </div>
        )
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    addContact = () => {
        this.props.addContact(this.state.name,this.state.phone);
        this.setState({
            name:"",
            phone:""
        });
        this.props.switchMode();
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            contacts:[],
            viewer:true, //can be view-contacts or add-contacts
        }
    }

    render(){
        if(this.state.viewer){
            return (
                <ContactsViewer 
                    switchMode={this.switchMode} 
                    contacts={this.state.contacts}
                    deleteContact={this.deleteContact}
                />
            )
        }
        else{
            return(
                <ContactsAdder 
                    switchMode={this.switchMode}
                    contacts={this.state.contacts}
                    addContact={this.addContact}
                />
            )
        }
    }

    switchMode = () => {
            this.setState( state => ({
                viewer: !state.viewer
            })
        )
    }

    addContact = (name, phone) => {
        this.setState(state=> ({
            contacts: [...state.contacts, {name,phone}]
        }));
    }

    deleteContact = (index) => {
        this.setState(state=>{
            const contacts = [...state.contacts];
            contacts.splice(index, 1);
            return {contacts};
        });
    }
}

ReactDOM.render(<App />,document.querySelector("#app"))