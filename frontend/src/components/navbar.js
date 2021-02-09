import React from 'react';
import { NavLink } from 'react-router-dom';

const navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <NavLink exact to='/'><a class="navbar-brand">GUC Bachelor Helper</a></NavLink>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <NavLink to='/categoriespage'><a class="nav-link">Thesis Per Category</a></NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to='/supervisorspage'><a class="nav-link">Thesis Per Supervisor</a></NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to='/calculationspage'><a class="nav-link">Statistics</a></NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default navbar;