export function formatDate(date: any) {
    const d = new Date(date);

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let month = monthNames[d.getMonth()]; // Get abbreviated month name
    let day = d.getDate().toString().padStart(2, '0');
    let year = d.getFullYear();

    let hours = d.getHours();
    let minutes = d.getMinutes().toString().padStart(2, '0');
    let seconds = d.getSeconds().toString().padStart(2, '0');

    // Convert to 12-hour format and determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 (midnight) or 12 (noon) to 12

    return `${day}-${month}-${year} `;
};
export function formatTime(date: any) {

        const d = new Date(date);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let month = monthNames[d.getMonth()]; // Get abbreviated month name
        let day = d.getDate().toString().padStart(2, '0');
        let year = d.getFullYear();
        let hours = d.getHours();
        let minutes = d.getMinutes().toString().padStart(2, '0');
        let seconds = d.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    };
    export function formatDateTime(date: any) {
        const d = new Date(date);
        d.setMinutes(d.getMinutes() - 330);
        const year = d.getFullYear();
        const month = d.toLocaleString('default', { month: 'short' });
        const day = ('0' + d.getDate()).slice(-2);
        let hours = d.getHours();
        const minutes = ('0' + d.getMinutes()).slice(-2);
        const seconds = ('0' + d.getSeconds()).slice(-2);
        const amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedHours = ('0' + hours).slice(-2);
        return `${day}-${month}-${year}`;
    };
