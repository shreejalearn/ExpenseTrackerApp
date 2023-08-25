export function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits for the month
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for the day

    return `${year}-${month}-${day}`;
}
