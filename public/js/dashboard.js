// alert('This doesnt exist yet')
// window.location.href = '/'

if (localStorage.getItem('accesscode')) {
    window.location.href = '/Dashboard/Landing';
} else {
    window.location.href = '/Dashboard/Login';
}