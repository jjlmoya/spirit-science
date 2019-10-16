export default class PauseScreen {
    constructor(ctx, width, height) {
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Paused", width / 2, height / 2);
    }
}