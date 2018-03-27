import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {
        id: 123,
        firstName: 'Patrik',
        lastName: 'Helman',
        age: 23
      },
      {
        id: 345,
        firstName: 'Aaron',
        lastName: 'Paul',
        age: 25
      },
      {
        id: 46,
        firstName: 'Teresa',
        lastName: 'Lisbon',
        age: 18
      },
      {
        id: 789,
        firstName: 'John',
        lastName: 'Lewis',
        age: 31
      }
    ],
    showPersons: false,
  };

  switchNameHandler = (newName) => {
    this.setState({persons: [
      {
        id: 123,
        firstName: newName,
        lastName: 'Helman',
        age: 23
      },
      {
        id: 345,
        firstName: 'Aaron',
        lastName: 'Paul',
        age: 25
      },
      {
        id: 46,
        firstName: 'Teresa',
        lastName: 'Lisbon',
        age: 58
      },
      {
        id: 789,
        firstName: 'John',
        lastName: 'Lewis',
        age: 31
      }
    ]})
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.firstName = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  };

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  };

  render() {
    const style = {
      backgroundColor: '#93d593',
      color: '#074507',
      font: 'inherit',
      border: '1px solid #074507',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return (
                <Person
                  click={() => this.deletePersonHandler(index)}
                  key={person.id}
                  name={person.firstName}
                  age={person.age}
                  changed={(event) => this.nameChangedHandler(event, person.id)}
                />
              )
            })
          }
        </div>
      );

      style.backgroundColor = '#fe9999';
      style.color = '#450707';
      style.border = '1px solid #450707';
    }

    const assignedClasses = [];

    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }

    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App!</h1>
        <p className={assignedClasses.join(' ')}>It's really working!</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>
          {
            this.state.showPersons ? 'Hide persons' : 'Show persons'
          }
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
