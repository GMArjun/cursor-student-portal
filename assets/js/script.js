// Sidebar toggle for mobile
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");

function openSidebar() {
  sidebar.classList.add("sidebar-open");
  sidebarBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeSidebar() {
  sidebar.classList.remove("sidebar-open");
  sidebarBackdrop.classList.remove("active");
  document.body.style.overflow = "";
}
if (sidebarToggle) {
  sidebarToggle.addEventListener("click", openSidebar);
}
if (sidebarBackdrop) {
  sidebarBackdrop.addEventListener("click", closeSidebar);
}
window.addEventListener("resize", () => {
  if (window.innerWidth >= 992) closeSidebar();
});
