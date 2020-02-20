export default {
    date_format: 'dd/MM/yyyy',

    email: 'Correo electrónico',
    new_email: 'Nuevo correo electrónico',
    old_email: 'Correo electrónico antiguo',
    password: 'Contraseña',
    new_password: 'Nova senha',
    old_password: 'Nueva contraseña',
    show: 'mostrar',
    hide: 'ocultar',
    clear: 'borrar',
    require_user_type: 'El campo Tipo de usuario es obligatorio.',
    require_password: 'El campo Contraseña es obligatorio.',
    require_password_confim:
        'El campo Confirmación de contraseña es obligatorio.',
    require_password_length: 'A senha deve ter pelo menos 6 caracteres.',
    require_email: 'La contraseña debe tener al menos 6 caracteres.',
    require_name: 'El campo Nombre es obligatorio.',
    valid_email:
        'Por favor, introduzca una dirección de correo electrónico válida.',
    valid_date: 'Por favor, introduzca una fecha válida.',
    register: 'Registrarse',
    user: 'Usuario',
    project: 'Proyecto',
    professor: 'Maestro',
    coordinator: 'Coordinador',
    student: 'Estudiante',
    professors: 'Maestros',
    students: 'Estudiantes',
    universities: 'Instituciones de Enseñanza',
    instituitions: 'Instituciones',
    phases: 'Etapas',
    gender: 'Género',
    gender_male: 'Masculino',
    gender_female: 'Femenino',
    gender_other: 'Otro',
    birth_date: 'Fecha de nacimiento',
    implementation: 'En la fase de implementación!',
    edit: 'Editar',
    add: 'Agregar',
    delete: 'Excluir',
    members: 'Miembros',
    cancel: 'Cancelar',
    reset_same_email_error: 'Incluso correo electrónico informado.',
    reset_diff_login_error:
        'Error de autenticación: el inicio de sesión es diferente.',
    reset_email_error: 'No se pudo restablecer el correo electrónico.',
    reset_password_error: 'No se pudo restablecer la contraseña.',
    reset_diff_password_error:
        'La confirmación de la contraseña difiere de la nueva contraseña.',
    acronym: 'Acronimo',
    state: 'Estado',
    country: 'Pais',
    new_instituition: 'Nueva institucion',

    login_forgot_password: 'Olvidé mi contraseña',
    login_register: '¿Aún no tienes una cuenta?',
    login_send: 'Enviar',
    login_recover_password: 'Recuperar Contraseña',
    login_user_info_failure: 'Error al cargar la información del usuario.',
    login_failure: 'Error al iniciar sesión.',
    login_recover_failure: 'No se pudo recuperar la contraseña.',
    login_recover_success:
        'Revise su correo electrónico para recuperar su contraseña.',

    register_account: 'Registro de cuenta',
    register_name: 'Nombre',
    register_user_placeholder: 'Yo soy ...',
    register_confirm_password: 'Confirme la Contraseña',
    register_password_match: 'Las contraseñas no coinciden.',
    register_failure:
        'No se pudo registrar una nueva cuenta, intente nuevamente.',

    projects_projects: 'Proyectos',
    projects_my_projects: 'Mis Projetos',
    projects_view_project_failure: 'Error al abrir proyecto.',

    search_select_category: 'Seleccione una categoria...',
    search: 'Buscar',

    edit_profile_title: 'Editar Perfil',
    edit_profile_save: 'Guardar',
    edit_profile_degree: 'Licenciatura',
    edit_profile_save_failure: 'No se pudo guardar el perfil.',
    edit_profile_picture_failure: 'No se pudo guardar la foto de perfil.',

    profile_no_info: 'No informado.',
    profile_reset_password: 'Restablecer contraseña',
    profile_reset_email: 'Restablecer correo electrónico',
    profile_create_instituition: 'Nueva institucion',

    empty_list_phase: 'No hay etapas para enumerar.',
    empty_list_project: 'No hay proyectos para ser listados.',
    empty_list_university: 'No hay instituciones en la lista.',
    empty_list_student: 'No hay estudiante a ser listado.',
    empty_list_professor: 'No hay maestro a ser listado.',

    create_project_start: 'Inicio del proyecto',
    create_project_end: 'Fin de proyecto',
    create_project_title_field: 'Título',
    create_project_desc_field: 'Descripción del proyecto',
    create_project_title: [
        'Detalles del Proyecto',
        'Crear etapas',
        'Agregar Instituciones',
        'Agregar Maestros',
        'Agregar Estudiantes',
    ],
    create_project_confirm_phase: 'Confirmar',
    create_project_end_after_start:
        'La fecha de finalización del proyecto debe ser posterior a su fecha de inicio.',
    create_project_phase_date_failure:
        'La etapa debe estar dentro del rango de fechas del proyecto.',
    create_project_phase_start: 'Comienza el: ',
    create_project_phase_end: 'Finaliza: ',
    create_project_empty_phase: 'Aún no se han creado etapas.',

    create_project_require_start_project:
        'Ingrese la fecha de inicio del proyecto.',
    create_project_require_end_project:
        'Ingrese la fecha de finalización del proyecto.',
    create_project_require_desc_project:
        ' Ingrese una descripción para el proyecto.',
    create_project_require_title_project: 'Ingrese el título del proyecto.',
    create_project_require_start_phase:
        ' Ingrese la fecha de inicio de la etapa.',
    create_project_require_end_phase:
        'Ingrese la fecha de finalización de la etapa.',
    create_project_require_desc_phase: 'Insira uma descrição para a etapa.',
    create_project_require_title_phase:
        'Ingrese una descripción para la etapa.',
    create_project_valid_end:
        'Por favor, introduzca una fecha de finalización válida.',
    create_project_valid_start:
        'Por favor, introduzca una fecha de inicio válida.',
    create_project_require_phases: ' Es necesario crear al menos una etapa.',
    create_project_require_universities:
        'Es necesario seleccionar al menos una institución.',
    create_project_require_current_user_universities:
        ' Se requiere una selección de al menos una institución para que pueda participar.',
    create_project_require_professors:
        'Es necesario seleccionar al menos un maestro.',
    create_project_failure: 'No se pudo crear el proyecto.',
    create_project_success_professor:
        'Proyecto creado con éxito! ¡Se habilitará tan pronto como pase la aprobación del administrador!',
    create_project_success_coordinator: 'Proyecto creado con éxito!',

    create_project_notification: {
        PROJECT_INVITE: 'Has sido invitado a participar en el proyecto: ',
        PROJECT_ENABLE: 'Un nuevo proyecto pide aceptación: ',
        UNIVERSITY_ENABLE: 'Una nueva institución solicitó su aceptación: ',
    },
    notification_title: {
        PROJECT_INVITE: 'Nuevo proyecto',
        PROJECT_ENABLE: 'Habilitar Proyecto',
        UNIVERSITY_ENABLE: 'Nueva institución',
    },

    create_university_success: 'Institución creada con éxito!',
    create_university_failure: 'No se pudo crear la institución',

    notifications_title: 'Notificaciones',
    notifications_empty_list: 'No hay notificación todavía.',

    project_send_new_invite_success: '¡Solicitudes enviadas con éxito!',
    project_edit_save_failure: 'No se pudo guardar la información.',
    project_edit_info_date_failure:
        'Hay un conflicto de fechas con las fases creadas.',
    project_edit_universities_failure:
        'Error al guardar: hay miembros de la universidad que se eliminaron.',

    calendar: 'Calendario',
    calendar_empty_date: 'No hay nada programado para este día.',
    calendar_request_error: 'Error al cargar la información del calendario.',
    calendar_open_project_error: 'Error al encontrar el proyecto',
    calendar_project_start: 'Inicio del proyecto.',
    calendar_phase_start: 'Inicio de la etapa.',
    calendar_project_end: 'Fin de proyecto.',
    calendar_phase_end: 'Fin de la etapa.',
    calendar_locale: {
        monthNames: [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ],
        monthNamesShort: [
            'Enero',
            'Feb',
            'Marzo',
            'Abr',
            'Mayo',
            'Jun',
            'Jul',
            'Agosto',
            'Sept',
            'Oct',
            'Nov',
            'Dic',
        ],
        dayNames: [
            'Domingo',
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
        ],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        today: 'Hoy',
    },
};
