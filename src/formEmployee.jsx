import React, { Component } from "react";

class FormEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastname : "",
            om_player : 0,
            birthdate : ""
        }
    }
    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }
    handleSubmit = (event) => {
        
        const config = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(this.state)
        }
        const url ="http://localhost:3000/api/players";
        fetch(url, config)
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                alert(res.error)
            }else{
                alert(`joueur ajouté`)
            }
        }).catch(e => {
            console.error(e);
            alert("erreur lors de l'ajout d'un joueur")
        })
        event.preventDefault();
    }
    render() {
        
        return (
            <div className="FormEmployee">
            <h1>Saisie d'un joueur</h1>
            <form onSubmit={this.handleSubmit}>
            <fieldset>
            <label htmlFor="poster">om player</label>
                <div className="form-data">
                <input 
                type="text"
                id="name"
                name="name"
                onChange={this.handleChange}
                value={this.state.om_player}
                />

                </div>
                <div className="form-data">
                <label htmlFor="poster">lastname</label>
                <input 
                type="text"
                id="poster"
                name="poster"
                onChange={this.handleChange}
                value={this.state.lastname}
                />
                </div>
                <div className="form-data">
                <label htmlFor="comment">birthdate</label>
                <textarea 
                type="text"
                id="comment"
                name="comment"
                onChange={this.handleChange}
                value={this.state.birthdate}
                />
                </div>
                <hr/>
                <div className="form-data">
                    <input type="submit" value="Envoyer" />
                </div>
            </fieldset>
            </form>

            </div>
        )
    }
}

export default FormEmployee;