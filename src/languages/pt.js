export default {
    date_format: 'dd/MM/yyyy',

    email: 'E-mail',
    new_email: 'Novo e-mail',
    old_email: 'E-mail antigo',
    password: 'Senha',
    new_password: 'Nova senha',
    old_password: 'Senha antiga',
    show: 'mostrar',
    hide: 'esconder',
    clear: 'limpar',
    require_user_type: 'O campo Tipo de Usuário é obrigatório.',
    require_password: 'O campo Senha é obrigatório.',
    require_password_confim: 'O campo de Confirmação de Senha é obrigatório.',
    require_password_length: 'A senha deve ter pelo menos 6 caracteres.',
    require_email: 'O campo E-mail é obrigatório.',
    require_name: 'O campo Nome é obrigatório.',
    valid_email: 'Digite um endereço de e-mail válido.',
    valid_date: 'Digite uma data válida.',
    register: 'Registrar',
    user: 'Usuário',
    project: 'Projeto',
    professor: 'Professor(a)',
    student: 'Aluno(a)',
    coordinator: 'Coordenador',
    professors: 'Professores',
    students: 'Alunos',
    universities: 'Instituições de Ensino',
    instituitions: 'Instituições',
    phases: 'Fases',
    gender: 'Gênero',
    gender_male: 'Masculino',
    gender_female: 'Feminino',
    gender_other: 'Outro',
    birth_date: 'Data de Nascimento',
    implementation: 'Em fase de implementação!',
    edit: 'Editar',
    add: 'Adicionar',
    delete: 'Excluir',
    members: 'Membros',
    cancel: 'Cancelar',
    reset_same_email_error: 'Mesmo e-mail informado.',
    reset_diff_login_error: 'Falha na autenticação: Login difere.',
    reset_email_error: 'Falha ao redefinir e-mail.',
    reset_password_error: 'Falha ao redefinir senha.',
    reset_diff_password_error: 'Confirmação de senha difere de nova senha.',
    acronym: 'Acrônimo',
    state: 'Estado',
    country: 'País',
    new_instituition: 'Nova instituição',

    login_forgot_password: 'Esqueci minha senha',
    login_register: 'Ainda não possui conta?',
    login_send: 'Enviar',
    login_recover_password: 'Recuperar Senha',
    login_user_info_failure: 'Falha ao carregar as informações do usuário.',
    login_failure: 'Falha ao fazer login.',
    login_recover_failure: 'Falha ao recuperar a senha.',
    login_recover_success: 'Verifique seu e-mail para recuperar sua senha.',

    register_account: 'Registro de conta',
    register_name: 'Nome',
    register_user_placeholder: 'Eu sou ...',
    register_confirm_password: 'Confirme a Senha',
    register_password_match: 'As senhas não coincidem.',
    register_failure: 'Falha ao registrar uma nova conta, tente novamente.',

    projects_projects: 'Projetos',
    projects_my_projects: 'Meus Projetos',
    projects_view_project_failure: 'Falha ao abrir projeto.',

    search: 'Pesquisar',
    search_select_category: 'Selecione uma categoria...',

    edit_profile_title: 'Editar Perfil',
    edit_profile_save: 'Salvar',
    edit_profile_degree: 'Grau',
    edit_profile_save_failure: 'Falha ao salvar perfil.',
    edit_profile_picture_failure: 'Falha ao salvar foto do perfil.',

    profile_no_info: 'Não informado.',
    profile_reset_password: 'Redefinir senha',
    profile_reset_email: 'Redefinir email',
    profile_create_instituition: 'Nova instituição',

    empty_list_phase: 'Nenhuma fase a ser listada.',
    empty_list_project: 'Nenhum projeto a ser listado.',
    empty_list_university: 'Nenhuma instituição a ser listada.',
    empty_list_student: 'Nenhum aluno a ser listado.',
    empty_list_professor: 'Nenhum professor a ser listado.',

    create_project_start: 'Ínicio do Projeto',
    create_project_end: 'Fim do Projeto',
    create_project_title_field: 'Título',
    create_project_desc_field: 'Descrição do projeto',
    create_project_title: [
        'Detalhes do Projeto',
        'Criar Fases',
        'Adicionar Instituições',
        'Adicionar Professores',
        'Adicionar Alunos',
    ],
    create_project_confirm_phase: 'Confirmar',
    create_project_end_after_start:
        'Data de fim de projeto deve ser depois da sua data de início.',
    create_project_phase_date_failure:
        'A fase deve estar dentro alcance de data do projeto.',
    create_project_phase_start: 'Começa em: ',
    create_project_phase_end: 'Termina em: ',
    create_project_empty_phase: 'Nenhuma fase criada ainda.',
    create_project_require_start_project: 'Insira a data de início do projeto.',
    create_project_require_end_project: 'Insira a data de fim do projeto.',
    create_project_require_desc_project: 'Insira uma descrição para o projeto.',
    create_project_require_title_project: 'Insira o título do projeto.',
    create_project_require_start_phase: 'Insira a data de início da fase.',
    create_project_require_end_phase: 'Insira a data de fim da fase.',
    create_project_require_desc_phase: 'Insira uma descrição para a fase.',
    create_project_require_title_phase: 'Insira o título da fase.',
    create_project_valid_end: 'Insira uma data de fim válida.',
    create_project_valid_start: 'Insira uma data de início válida.',
    create_project_require_phases:
        'É necessária a criação de ao menos uma fase.',
    create_project_require_universities:
        'É necessária a seleção de ao menos uma instituição.',
    create_project_require_current_user_universities:
        'É necessária a seleção de ao menos uma instituição a qual você participe.',
    create_project_require_professors:
        'É necessária a seleção de ao menos um professor.',
    create_project_failure: 'Falha ao criar projeto.',
    create_project_success_professor:
        'Projeto criado com sucesso! O mesmo será habilitado assim que passar pela aprovação do administrador!',
    create_project_success_coordinator: 'Projeto criado com sucesso!',

    create_project_notification: {
        PROJECT_INVITE: 'Você foi convidado(a) a participar do projeto: ',
        PROJECT_ENABLE: 'Um novo projeto solicita de aceitação: ',
    },

    notification_title: {
        PROJECT_INVITE: 'Novo Projeto',
        PROJECT_ENABLE: 'Habilitar Projeto',
    },

    notifications_title: 'Notificações',
    notifications_empty_list: 'Nenhuma notificação até o momento.',

    project_send_new_invite_success: 'Solicitações enviadas com sucesso!',
    project_edit_save_failure: 'Falha ao salvar informações.',
    project_edit_info_date_failure:
        'Existem conflitos de data com as fases criadas.',
    project_edit_universities_failure:
        'Falha ao salvar: Existem membros que estão na universidade que foi removida',

    calendar: 'Calendário',
    calendar_empty_date: 'Não há nada marcado para este dia.',
    calendar_request_error: 'Falha ao carregar informações do calendário.',
    calendar_open_project_error: 'Falha ao localizar projeto',
    calendar_project_start: 'Ínicio do Projeto',
    calendar_phase_start: 'Ínicio da Fase',
    calendar_project_end: 'Fim do Projeto',
    calendar_phase_end: 'Fim da Fase',
    calendar_locale: {
        monthNames: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
        ],
        monthNamesShort: [
            'Jan',
            'Fev',
            'Mar',
            'Abri',
            'Maio',
            'Jun',
            'Jul',
            'Agos',
            'Set',
            'Out',
            'Nov',
            'Dez',
        ],
        dayNames: [
            'Domingo',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
        ],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        today: 'Hoje',
    },
};