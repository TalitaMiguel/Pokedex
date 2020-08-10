import React, { Component } from 'react';
import axios from 'axios';

import backIcon from '../../../assets/images/back.svg'

import './styles.css'

const TYPE_COLORS = {
    bug: 'BIC12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
};

export default class Pokemon extends Component {
    state = {
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        types: [],
        stats: {
            hp: '', 
            attack: '', 
            defense: '', 
            speed: ''
        },
        abilities: ''
    }

    async componentDidMount() {
        const { pokemonIndex } = this.props.match.params;

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        const pokemonRes = await axios.get(pokemonUrl);

        const name = pokemonRes.data.name;
        const imageUrl = pokemonRes.data.sprites.front_default;

        let { hp, attack, defense, speed } = '';

        pokemonRes.data.stats.map(stat => {
            switch(stat.stat.name){
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
            }
        });

        const types = pokemonRes.data.types.map(type => type.type.name)

        const abilities = pokemonRes.data.abilities.map(ability => {
            return ability.ability.name
                .toLowerCase()
                .split('-')
                . map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ");
        }).join(", ")


        await axios.get(pokemonSpeciesUrl).then(res => {
            this.setState({
                imageUrl,
                pokemonIndex,
                name,
                types,
                stats: {
                    hp,
                    attack,
                    defense,
                    speed
                },
                abilities
            })
        })
        
    }
    render() {
        return (
            <div className="PokemonDetails col">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-5">
                                <h5>#{this.state.pokemonIndex}</h5>
                            </div>
                            <div className="col-7">
                                <div className="float-right">
                                    {this.state.types.map(type => (
                                        <span 
                                            key={type}
                                            className="badge badge-primary badge-pill mr-1"
                                            style={{ backgroundColor: `#${TYPE_COLORS[type]}`}}
                                        >
                                            { type
                                                .toLowerCase()
                                                .split(' ')
                                                . map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                                .join(' ')
                                            }
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <img 
                                    src={this.state.imageUrl} 
                                    className="card-img-top rounded mx-auto mt-2"
                                />
                            </div>
                            <div className="col-md-9">
                                <h4 className="mx-auto">
                                    {this.state.name
                                        .toLowerCase()
                                        .split(' ')
                                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                        .join(' ')
                                    }
                                </h4>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">HP</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{ width: `${this.state.stats.hp}%`}}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.hp}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">Attack</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{ width: `${this.state.stats.attack}%` }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.attack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">Defense</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{
                                                    width: `${this.state.stats.defense}%`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.defense}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">Speed</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div 
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{ width: `${this.state.stats.speed}%` }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.speed}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                                
                                <div className="row align-items-center mt-3">
                                    <div className="col-12 col-md-3">Abilites</div>
                                    <div className="col-12 col-md-9">
                                        <h6 className="float-left">{this.state.abilities}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="link-back">
                        <a href="/">
                            <img src={backIcon} alt="Voltar"/> Voltar
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
