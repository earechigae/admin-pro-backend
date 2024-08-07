const getMenuFrontEnd = ( role = 'USER_ROLE') => {
    const menu = [
        {
          titulo: 'Principal',
          icono : 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Main', url: '/' }, 
            { titulo: 'Gráficas', url: 'grafica1' },
            { titulo: 'ProgressBar', url: 'progress' },
            { titulo: 'Promesas', url: 'promesas' },
            { titulo: 'RxjS', url: 'rxjs' }  
          ]
        },
        {
          titulo: 'Mantenimiento',
          icono : 'mdi mdi-folder-lock-open',
          submenu: [
            //{ titulo: 'Usuarios', url: 'usuarios' }, 
            { titulo: 'Hospitales', url: 'hospitales' },
            { titulo: 'Médicos', url: 'medicos' },
          ]
        }
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}