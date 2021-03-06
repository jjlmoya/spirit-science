import TextService from "../services/text";

export default class MenuScreen {
    constructor(ctx, width, height) {
        let textService = new TextService();

        ctx.rect(0, 0, width, height);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();

        textService.renderCenterText("Menu", ctx, width, height);
    }
}

