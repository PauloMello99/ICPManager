export function changeStatusBarColor(statusColor, statusContent) {
    return {
        type: '@ui/CHANGE_STATUSBAR_COLOR',
        payload: { statusColor, statusContent },
    };
}
