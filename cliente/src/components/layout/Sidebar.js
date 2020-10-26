import React from 'react';
import NuevoProducto from '../productos/NuevoProducto';
import ListadoProductos from '../productos/ListadoProducto';

const Sidebar = () =>{
    return(
        <aside>
            <h1>Appsus<span>Prueba</span></h1>

            <NuevoProducto/>

            <div className="proyectos">
                <h2>Tus Productos</h2>
                <ListadoProductos/>
            </div>
        </aside>
    );
}

export default Sidebar;