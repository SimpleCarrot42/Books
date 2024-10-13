function showSidebar(){
  const sidebar = document.querySelector('.sidebar');
  const hamburgerMenu = document.querySelector('#no-hover');
  if (sidebar.style.display === 'none') {
    sidebar.style.display = 'flex';
    hamburgerMenu.style.display = 'none'; // hide hamburger menu
  } else {
    sidebar.style.display = 'none';
    hamburgerMenu.style.display = 'block'; // show hamburger menu
  }
}

function hideSidebar(){
  const sidebar = document.querySelector('.sidebar');
  const hamburgerMenu = document.querySelector('#no-hover');
  if (sidebar.style.display === 'flex') {
    sidebar.style.display = 'none';
    hamburgerMenu.style.display = 'block'; // show hamburger menu
  } else {
    sidebar.style.display = 'flex';
    hamburgerMenu.style.display = 'none'; // hide hamburger menu
  }
}

// document.addEventListener('click', (event) => {
//   const sidebar = document.querySelector('.sidebar');
//   const hamburgerMenu = document.querySelector('.hamburger-menu');
//   if (!sidebar.contains(event.target) && sidebar.style.display === 'block') {
//     hideSidebar();
//   }
// });
