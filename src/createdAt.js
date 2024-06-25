export const convertToCreatedAtFormat = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1; // Adding 1 because months are zero-based
    const year = dateObject.getUTCFullYear();
    const createdAtFormat = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    return createdAtFormat;
};