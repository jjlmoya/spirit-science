import TextService from "../services/text";

export default class PauseScreen {
    constructor(ctx, width, height) {
        let textService = new TextService();

        ctx.rect(0, 0, width, height);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();


        textService.renderCenterText("Paused", ctx, width, height);

    }
}