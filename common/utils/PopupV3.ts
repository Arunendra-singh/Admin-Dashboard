declare global {
    interface Window {
        shm_counter: number;
    }
}

interface IPopupAction {
    text?: string;
    classes?: string;
    do: () => void;
    dismiss?: boolean;
}

interface IPopupOptions {
    type?: string;
    id?: string;
    timeout?: number;
    title?: string;
    backdrop?: boolean;
    content?: string;
    classes?: string;
    actions?: IPopupAction[];
    modalOpenClass?: string;
    size?: string;
    pos?: string;
    onDismiss?: () => void;
}

window.shm_counter = 0;
export const PopupV3 = (options: IPopupOptions): HTMLDialogElement => {
    const settings: IPopupOptions = Object.assign(
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
    const dialogHtml = `<div class="dialog-container" data-pos="${settings.pos ?? ""}">
        <div class="dialog-content">
            <div class="dialog-header">
                <h5 class="dialog-title">${settings.title ?? ""}</h5>
                <button class="close" aria-label="Close">&times;</button>
            </div>
            <div class="dialog-body"></div>
            <div class="dialog-footer"></div>
        </div>
    </div>`;

    const dialog = document.createElement("dialog");
    dialog.id = settings.id ?? "";
    dialog.classList.add(`dialog-${settings.type ?? ""}`);
    if (settings.classes !== "") dialog.classList.add(...`${settings.classes ?? ""}`.split(" "));
    dialog.innerHTML = dialogHtml;
    dialog.setAttribute("shm", "");
    dialog.setAttribute("dialog-size", settings.size ?? "");
    dialog.setAttribute("data-pos", settings.pos ?? "");
    dialog.querySelector(".dialog-header")?.classList.add(`dialog-${settings.type ?? ""}`);
    (dialog.querySelector(".dialog-body") as HTMLElement).innerHTML = settings.content ?? "";

    const closeDialog = (): void => {
        if (settings.onDismiss !== undefined) settings.onDismiss();
        dialog.close();
    };
    (dialog.querySelector(".dialog-header .close") as HTMLButtonElement).addEventListener("click", closeDialog);
    dialog.addEventListener("close", () => {
        (dialog.parentElement as HTMLElement).removeChild(dialog);
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
        settings.actions.forEach((action, i) => {
            const btn = document.createElement("button");
            btn.innerHTML = action.text ?? "";
            action?.classes !== undefined && btn.classList.add("btn", action.classes ?? "");

            btn.addEventListener("click", () => {
                action.do?.();
                if (action.dismiss ?? false) closeDialog();
            });

            (dialog.querySelector(".dialog-footer") as HTMLDivElement).appendChild(btn);
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
