const menuItems = document.querySelectorAll(".sidebar li");
const mainContent = document.getElementById("main-content");

// Hàm load module HTML + CSS + JS
async function loadModule(moduleName) {
  try {
    // 1. Load HTML
    const htmlResponse = await fetch(`pages/${moduleName}.html`);
    const htmlContent = await htmlResponse.text();
    mainContent.innerHTML = htmlContent;

    // 2. Gắn CSS riêng
    const existingModuleCSS = document.getElementById("module-style");
    if (existingModuleCSS) existingModuleCSS.remove();
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `css/${moduleName}.css`;
    link.id = "module-style";
    document.head.appendChild(link);

    // 3. Load JS riêng
    const existingModuleScript = document.getElementById("module-script");
    if (existingModuleScript) existingModuleScript.remove();
    const script = document.createElement("script");
    script.src = `modules/${moduleName}.js`;
    script.id = "module-script";
    //script.type = "module";
    mainContent.appendChild(script);
    //document.body.appendChild(script);
  } catch (error) {
    mainContent.innerHTML = `<p style="color:red;">Không thể tải module ${moduleName}</p>`;
    console.error(error);
  }
}

// Khi click menu
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    const moduleName = item.getAttribute("data-module");
    loadModule(moduleName);
  });
});

// Tải mặc định module đầu tiên
loadModule("employee");
