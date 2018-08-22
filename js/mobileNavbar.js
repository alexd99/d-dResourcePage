let visableLinks = true;
function showLinks(){
  visableLinks = !visableLinks;
  let mobileMenuIcon = document.getElementById('moblieNavBarIcon');
  let mobileNavbar = document.getElementById('moblieNavBarLinks');
  if(visableLinks){
    mobileMenuIcon.classList.remove('fa-times');
    mobileMenuIcon.classList.add('fa-bars');
    mobileNavbar.style.display = 'none';  
  }
  else{
    mobileMenuIcon.classList.remove('fa-bars');
    mobileMenuIcon.classList.add('fa-times');
    mobileNavbar.style.display = 'flex';
  }
}
