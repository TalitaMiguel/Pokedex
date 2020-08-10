import React, { Component } from 'react';

import './styles.css'


export default class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top" >
                    <a 
                        href="/"
                        className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center"
                    >
                        Pokédex
                    </a>
                </nav>
            </div>
        )
    }
}
