export default {
    date_format: 'MM/dd/yyyy',

    email: 'Email',
    new_email: 'New email',
    old_email: 'Old email',
    password: 'Password',
    new_password: 'New password',
    old_password: 'Old password',
    show: 'show',
    hide: 'hide',
    clear: 'clear',
    require_user_type: 'The User Type field is required.',
    require_password: 'Password field is required.',
    require_password_confim: 'Password confirmation field is required.',
    require_password_length: 'Password must be at least 6 characters long.',
    require_email: 'Email field is required.',
    require_name: 'Name field is required.',
    valid_email: 'Enter a valid email address.',
    valid_date: 'Enter a valid date.',
    register: 'Register',
    user: 'User',
    project: 'Project',
    professor: 'Professor',
    coordinator: 'Coordinator',
    student: 'Student',
    professors: 'Professors',
    students: 'Students',
    universities: 'Teaching Institutions',
    instituitions: 'Institutions',
    instituition: 'Institution',
    phases: 'Phases',
    gender: 'Gender',
    gender_male: 'Male',
    gender_female: 'Female',
    gender_other: 'Other',
    birth_date: 'Birth Date',
    implementation: 'In the implementation phase!',
    edit: 'Edit',
    add: 'Add',
    delete: 'Delete',
    members: 'Members',
    cancel: 'Cancel',
    reset_same_email_error: 'Even informed email.',
    reset_diff_login_error: 'Authentication failed: Login differs.',
    reset_email_error: 'Failed to reset email.',
    reset_password_error: 'Failed to reset password.',
    reset_diff_password_error:
        'Password confirmation differs from new password.',
    acronym: 'Acronym',
    state: 'State',
    country: 'Country',
    new_instituition: 'New instituition',

    login_forgot_password: 'Forgot my password',
    login_register: `Don't have an account yet?`,
    login_send: 'Send',
    login_recover_password: 'Recover Password',
    login_user_info_failure: 'Failed to load user information.',
    login_failure: 'Failed to sign in.',
    login_recover_failure: 'Failed to recover password.',
    login_recover_success: 'Check your email to recover your password.',

    register_account: 'Account Registration',
    register_name: 'Name',
    register_user_placeholder: 'I am a...',
    register_confirm_password: 'Confirm password',
    register_password_match: 'Passwords do not match',
    register_failure: 'Failed to register new account, please try again.',

    projects_projects: 'Projects',
    projects_my_projects: 'My Projects',
    projects_view_project_failure: 'Failed to load project.',
    projects_new_project_error:
        'You must register your participation with at least one educational institution to proceed.',

    empty_list_phase: 'No phases to be listed.',
    empty_list_project: 'No projects to be listed.',
    empty_list_university: 'No institutions to be listed.',
    empty_list_student: 'No student to be listed.',
    empty_list_professor: 'No professor to be listed.',

    search: 'Search',
    search_select_category: 'Select a category...',

    edit_profile_title: 'Edit Profile',
    edit_profile_save: 'Save',
    edit_profile_degree: 'Degree',
    edit_profile_save_failure: 'Failed to save profile.',
    edit_profile_picture_failure: 'Failed to save profile picture.',

    profile_no_info: 'Not informed.',
    profile_reset_password: 'Reset password',
    profile_reset_email: 'Reset email',
    profile_create_instituition: 'New institution',

    create_project_start: 'Start of project',
    create_project_end: 'End of project',
    create_project_title_field: 'Title',
    create_project_desc_field: 'Project description',
    create_project_title: [
        'Project Details',
        'Create Phases',
        'Add Instituitions',
        'Add Professors',
        'Add Students',
    ],
    create_project_confirm_phase: 'Confirm',
    create_project_end_after_start:
        'Project end date must be after its start date.',
    create_project_phase_date_failure: `The phase must be within the project's date range.`,
    create_project_phase_start: 'Stars on: ',
    create_project_phase_end: 'Ends: ',
    create_project_empty_phase: 'No phases created yet.',

    create_project_require_start_project: 'Enter the project start date.',
    create_project_require_end_project: 'Enter the project end date.',
    create_project_require_desc_project: 'Enter a description for the project.',
    create_project_require_title_project: 'Enter the title of the project.',
    create_project_require_start_phase: 'Enter the start date of the phase.',
    create_project_require_end_phase: 'Enter the phase end date.',
    create_project_require_desc_phase: 'Enter a description for the phase.',
    create_project_require_title_phase: 'Enter the phase title.',
    create_project_valid_end: 'Please enter a valid end date.',
    create_project_valid_start: 'Please enter a valid start date.',
    create_project_require_phases:
        'It is necessary to create at least one phase.',
    create_project_require_universities:
        'It is necessary to select at least one institution.',
    create_project_require_current_user_universities:
        'You must select at least one institution that you participate in.',
    create_project_require_professors:
        'It is necessary to select at least one teacher.',
    create_project_failure: 'Failed to create project.',
    create_project_success_professor: `Project successfully created! It will be enabled as soon as it passes the administrator's approval!`,
    create_project_success_coordinator: 'Project successfully created!',
    create_project_notification: {
        PROJECT_INVITE: 'You have been invited to participate in the project: ',
        PROJECT_ENABLE: 'A new project asks for acceptance: ',
        UNIVERSITY_ENABLE: 'A new institution asks for acceptance: ',
    },
    notification_title: {
        PROJECT_INVITE: 'New Project',
        PROJECT_ENABLE: 'Enable Project',
        UNIVERSITY_ENABLE: 'New Institution',
    },

    create_university_success: 'Institution successfully created!',
    create_university_failure: 'Failed to create institution',

    university_load_failure: 'The institution could not be loaded.',

    notifications_title: 'Notifications',
    notifications_empty_list: 'No notification yet.',

    project_download_report: 'Download',
    project_empty_report: ' No report sent.',
    project_send_new_invite_success: 'Requests successfully sent!',
    project_edit_save_failure: 'Failed to save information.',
    project_edit_info_date_failure:
        'There is a date conflict with the created phases.',
    project_edit_universities_failure:
        'Failed to save: There are members who are at the university that was removed.',

    calendar: 'Calendar',
    calendar_empty_date: 'There is nothing scheduled for this day.',
    calendar_request_error: 'Failed to load calendar information.',
    calendar_open_project_error: 'Failed to find the project',
    calendar_project_start: 'Start of project.',
    calendar_phase_start: 'Start of phase.',
    calendar_project_end: 'End of project.',
    calendar_phase_end: 'End of phase.',
    calendar_locale: {
        monthNames: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        monthNamesShort: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
        ],
        dayNames: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        today: 'Today',
    },
};
