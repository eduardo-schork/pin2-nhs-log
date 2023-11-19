function getAdminId() {
    const adminId = localStorage.getItem('adminId');
    return adminId;
}

export default getAdminId;
