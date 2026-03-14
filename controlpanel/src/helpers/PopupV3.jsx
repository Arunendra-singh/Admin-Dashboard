/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-object-spread */

// import { useNavigate } from "react-router-dom";

/* eslint-disable import/prefer-default-export */
window.shm_counter = 0;
export const PopupV3 = (options) => {
    const settings = Object.assign(
        {
            type: "success",
            id: `shm_${new Date().getTime()}`,
            timeout: -1,
            title: "",
            backdrop: true,
            content: "",
            classes: "",
            actions: [],
            modalOpenClass: "simple-modal-open",
            size: "",
            pos: "",
            onDismiss: () => {}
        },
        options
    );
    settings.title = settings.type;

    const dialogHtml = `<div class="dialog-container">
        <div class="dialog-content">
            <div class="dialog-header">
                <h5 class="dialog-title">${settings.title ?? ""}</h5>
                <button class="close" aria-label="Close">&times;</button>
            </div>
            <div class="dialog-body"></div>
            <div class="dialog-footer"><button type="button" class="btn addSales-ok">Ok</button></div>


        </div>
    </div>`;

    const dialog = document.createElement("dialog");
    // const path = "/Salesflyernew";
    dialog.id = settings.id ?? "";
    dialog.classList.add(`dialog-${settings.type ?? ""}`);
    if (settings.classes) {
        const classesArray = settings.classes.split(" ").filter(Boolean);
        dialog.classList.add(...classesArray);
    }
    dialog.innerHTML = dialogHtml;
    dialog.setAttribute("shm", "");
    dialog.setAttribute("dialog-size", settings.size ?? "");
    dialog.setAttribute("data-pos", settings.pos ?? "");
    dialog.querySelector(".dialog-header")?.classList.add(`dialog-${settings.type ?? ""}`);
    dialog.querySelector(".dialog-body").innerHTML = settings.content ?? "";

    const closeDialog = () => {
        if (settings.onDismiss !== undefined) settings.onDismiss();
        dialog.close();

        // navigate(path);
    };
    dialog.querySelector(".dialog-header .close").addEventListener("click", closeDialog);
    dialog.addEventListener("close", () => {
        dialog.parentElement.removeChild(dialog);
        if (settings.backdrop ?? false) window.shm_counter--;
        if (window.shm_counter < 1) {
            document.body.classList.remove(settings.modalOpenClass ?? "");
        }
    });

    dialog.addEventListener("click", function (event) {
        event.stopPropagation();
        const rect = dialog.getBoundingClientRect();
        const isInDialog = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
        if (!isInDialog) closeDialog();
    });

    if (settings.actions !== undefined) {
        settings.actions.forEach((action) => {
            if (action.type === "a") {
                const btn = document.createElement("a");
                btn.innerHTML = action.text ?? "";
                if (action?.classes) {
                    const actionClassesArray = action.classes.split(" ").filter(Boolean);
                    btn.classList.add(...actionClassesArray);
                }
                if (action?.href) {
                    btn.href = action?.href;
                    btn.download = "download";
                }
                btn.addEventListener("click", () => {
                    action.do?.();
                    if (action.dismiss ?? false) closeDialog();
                });
                dialog.querySelector(".dialog-footer").appendChild(btn);
            } else {
                const btn = document.createElement("button");
                btn.innerHTML = action.text ?? "";
                if (action?.classes) {
                    const actionClassesArray = action.classes.split(" ").filter(Boolean);
                    btn.classList.add(...actionClassesArray);
                }
                btn.addEventListener("click", () => {
                    action.do?.();
                    if (action.dismiss ?? false) closeDialog();
                });
                dialog.querySelector(".dialog-footer").appendChild(btn);
            }
        });
    }
    document.body.appendChild(dialog);

    if (settings.backdrop ?? false) {
        window.shm_counter++;
        dialog.classList.add("is-modal");
        document.body.classList.add(settings.modalOpenClass ?? "");
        dialog.showModal();
    } else {
        dialog.show();
    }

    if (dialog.classList.contains("notification") && settings.timeout !== undefined && settings.timeout <= 0) {
        settings.timeout = 2000;
    }

    if (settings.timeout !== undefined && settings.timeout > 0) setTimeout(closeDialog, settings.timeout);

    return dialog;
};
