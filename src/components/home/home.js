import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import usuarios from './../usuarios/usuarios';
import usuarioInfo from './../usuarios/usuarioInfo';
import crearUsuario from './../usuarios/crearUsuario';
import actualizarUsuario from './../usuarios/actualizarUsuario';
import roles from './../roles/roles';
import companias from './../companias/companias';
import grupos from './../grupos/grupos';
import localidades from './../localidades/localidades';
import departamentos from './../departamentos/departamentos';
import Dropdown from 'react-bootstrap/Dropdown';
import './style.module.scss';

class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sideDrawerOpen: false,
            buscar: '',
            classActive: true,
            subHome: true,
            submenuUsuario: true,
            config: false,
            nickName: localStorage.getItem('nickName')
        };

        this.handleChange = this.handleChange.bind(this);
        this.logout = this.logout.bind(this);
        this.getInfoUser = this.getInfoUser.bind(this);

    }


    toggleClass = () => {
        this.setState((prevState) => {
            return { classActive: !prevState.classActive }
        });
    }

    toggleClassMenu = () => {
        this.setState((prevState) => {
            return { subHome: !prevState.subHome }
        });
    }

    toggleClassMenuUsuarios = () => {
        this.setState((prevState) => {
            return { submenuUsuario: !prevState.submenuUsuario }
        });
    }


    drawerToggleClickHander = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen }
        });
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
        console.log(this.state.buscar);
    };


    logout = (event) => {

        try {

            event.preventDefault();
            localStorage.clear();
            window.location.href = '/';

        } catch (error) {
            console.log(error);
        }

    }

    getInfoUser = (event) => {
        try {
            event.preventDefault();
            this.setState({ config: true });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.config) {
            return  <Link to="./usuarioInfo"></Link>
        }
        return (<Router>
            <header>
                <div className="row navBarsection">
                    <div className="col-8">
                        <h1 className="titulo-home">Javer</h1>
                    </div>
                    <div className="col-4 detalleusuario">
                        <Dropdown>
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                {this.state.nickName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Detalle</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#"><i className="fa fa-user"></i><span className="toolMenu"> <Link to="./usuarioInfo">Mi cuenta</Link></span></Dropdown.Item>
                                <Dropdown.Item href="#"><i className="fa fa-cog"></i><span className="toolMenu"><Link to="./usuarioInfo">Configuración</Link></span></Dropdown.Item>
                                <Dropdown.Item href="#"><i className="fa fa-cog"></i><span className="toolMenu"><Link to="./usuarioInfo">Cambiar Clave</Link></span></Dropdown.Item>
                                <Dropdown.Item href="#" onClick={this.logout}><i className="fa fa-sign-out-alt"></i><span className="toolMenu">Salir</span></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </header>
            <div className="wrapper">
                <nav id="sidebar" className={this.state.classActive ? 'active' : null}>
                    <div className="sidebar-header"></div>
                    <ul className="list-unstyled components listComponent">
                        <li>
                            <a href="/">
                                <i className="fa fa-home"></i><span className="iconMenu">Inicio</span>
                            </a>

                        </li>
                        <li className="active">
                            <a href="/homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle collapsed" onClick={this.toggleClassMenu}><i className="fa fa-exclamation-triangle"></i><span className="iconMenu">Aplicación/Modulo B</span></a>
                            <ul id="homeSubmenu" className={this.state.subHome ? 'list-unstyled collapse' : 'list-unstyled collapse show'} >
                                <li>
                                    <a href="/">Home 1</a>
                                </li>
                                <li>
                                    <a href="/">Home 2</a>
                                </li>
                                <li>
                                    <a href="/">Home 3</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="/pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle collapsed"><i className="fa fa-mobile"></i><span className="iconMenu">Aplicación/Modulo C</span></a>
                            <ul className="list-unstyled collapse" id="pageSubmenu">
                                <li>
                                    <a href="/">Page 1</a>
                                </li>
                                <li>
                                    <a href="/">Page 2</a>
                                </li>
                                <li>
                                    <a href="/">Page 3</a>
                                </li>
                            </ul>

                        </li>
                        <li>
                            <a href="/"><i className="fa fa-file"></i><span className="iconMenu">Aplicación/Modulo D</span></a>
                        </li>
                        <li>
                            <a href="/"> <i className="fa fa-signal"></i><span className="iconMenu">Aplicación/Modulo E</span></a>
                        </li>
                        <li>
                            <a href="/"> <i className="fa fa-cog"></i><span className="iconMenu">Configuración Sistema</span></a>
                        </li>
                        <li className="active">
                            <a href="/homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle collapsed" onClick={this.toggleClassMenuUsuarios}><i className="fa fa-users"></i><span className="iconMenu">Gestión Usuarios</span></a>
                            <ul id="homeSubmenu" className={this.state.submenuUsuario ? 'list-unstyled collapse' : 'list-unstyled collapse show'} >
                                <li>
                                    <Link to="./usuarioInfo"><i className="fa fa-check"></i><span className="iconMenu">UsuariosInfo</span></Link>
                                </li>
                                <li>
                                    <Link to="./usuarios"><i className="fa fa-check"></i><span className="iconMenu">Usuarios</span></Link>
                                </li>
                                <li>
                                    <Link to="./grupos"><i className="fa fa-check"></i><span className="iconMenu">grupos</span></Link>
                                </li>
                                <li>
                                    <Link to="./roles"><i className="fa fa-check"></i><span className="iconMenu">roles</span></Link>
                                </li>
                                <li>
                                    <Link to="./departamentos"><i className="fa fa-check"></i><span className="iconMenu">departamentos</span></Link>
                                </li>
                                <li>
                                    <Link to="./localidades"><i className="fa fa-check"></i><span className="iconMenu">localidades</span></Link>
                                </li>
                                <li>
                                    <Link to="./companias"><i className="fa fa-check"></i><span className="iconMenu">Compañias</span></Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div id="content">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <button type="button" id="sidebarCollapse" className="btn btn-info btnToggle" onClick={this.toggleClass}>
                                <svg className="svg-inline--fa fa-align-left fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="align-left" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                    <path fill="currentColor" d="M288 44v40c0 8.837-7.163 16-16 16H16c-8.837 0-16-7.163-16-16V44c0-8.837 7.163-16 16-16h256c8.837 0 16 7.163 16 16zM0 172v40c0 8.837 7.163 16 16 16h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16zm16 312h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm256-200H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16h256c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16z"></path>
                                </svg>
                            </button>
                            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <svg className="svg-inline--fa fa-align-justify fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="align-justify" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                    <path fill="currentColor" d="M0 84V44c0-8.837 7.163-16 16-16h416c8.837 0 16 7.163 16 16v40c0 8.837-7.163 16-16 16H16c-8.837 0-16-7.163-16-16zm16 144h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 256h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0-128h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
                                </svg>
                            </button>
                            <div className="collapse navbar-collapse searchInput" id="navbarSupportedContent">
                                <input type="text" id="buscar" className="form-control busqueda" placeholder="Buscar..." value={this.state.buscar} onChange={this.handleChange} />
                            </div>
                        </div>
                    </nav>
                    <Route path="/usuarioInfo" component={usuarioInfo} />
                    <Route path="/usuarios" component={usuarios} />
                    <Route path="/crearUsuario" component={crearUsuario} />
                    <Route path="/actualizarUsuario/:userId" component={actualizarUsuario} />
                    <Route path="/grupos" component={grupos} />
                    <Route path="/roles" component={roles} />
                    <Route path="/departamentos" component={departamentos} />
                    <Route path="/localidades" component={localidades} />
                    <Route path="/companias" component={companias} />
                </div>
            </div>
        </Router>
        );
    }
}

export default home;