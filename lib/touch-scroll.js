"use babel";

export default {
    activate(state) {
        atom.workspace.observeTextEditors(editor => {
            var view = atom.views.getView(editor);
            var x, y;
            view.addEventListener(
                "touchstart",
                event => {
                    x = event.touches[0].screenX;
                    y = event.touches[0].screenY;
                },
                {
                    passive: true
                }
            );
            view.addEventListener(
                "touchmove",
                event => {
                    var x2 = event.touches[0].screenX;
                    var y2 = event.touches[0].screenY;
                    // Calculate deltas
                    var deltaX = x2 - x;
                    var deltaY = y2 - y;
                    // Only call updating functons when there is actual movement
                    if (deltaX != 0) {
                        view.setScrollLeft(view.getScrollLeft() - deltaX);
                    }
                    if (deltaY != 0) {
                        view.setScrollTop(view.getScrollTop() - deltaY);
                    }
                    // Overwrite reference coordinates
                    x = x2;
                    y = y2;
                },
                {
                    passive: true
                }
            );
            view.addEventListener(
                "touchend",
                () => {
                    x = 0;
                    y = 0;
                },
                {
                    passive: true
                }
            );
        });
    },
    deactivate() {
        this.subscriptions.dispose();
    },
    serialize() {
        return {};
    }
};
