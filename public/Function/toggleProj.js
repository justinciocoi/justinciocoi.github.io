document.addEventListener("DOMContentLoaded", function () {
    const projectTitles = document.querySelectorAll(".projectTitle");

    projectTitles.forEach(title => {
        title.addEventListener("click", function () {
            const content = this.nextElementSibling;
            if (content.classList.contains("open")) {
                content.classList.remove("open");
            } else {
                document.querySelectorAll(".projectContent.open").forEach(openContent => {
                    openContent.classList.remove("open");
                });
                content.classList.add("open");
            }
        });
    });
});
