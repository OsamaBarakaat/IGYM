export const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-indexed
    const year = date.getUTCFullYear();

    let hours = date.getUTCHours(); // Get hours in UTC
    const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Ensure two digits
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    return `${day}-${month}-${year}, ${hours}:${minutes} ${ampm}`;
};