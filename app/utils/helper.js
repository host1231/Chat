export const getFilterEmail = (users, currentUser) => {
    return users?.filter(user => user !== currentUser?.email)[0];
}