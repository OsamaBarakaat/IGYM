export const formatDate = (dateString) => {
    const date = new Date(dateString);

    const localString = date.toLocaleString();

    return localString;
};